import { EventEmitter } from "./Elements/EventEmitter";
import { GrillStatus } from "./GrillStatus";
import { GrillCommunicator } from "./GrillCommunicator";
import { BasicTempController } from "./BasicTempController";
import { TempLogger } from "./TempLogger";
import { GrillPIDController } from "./GrillPIDController";
import { PIDControllerChangedEvent } from "./PIDController";

export interface SetButtonClickedEvent
{
    button: HTMLButtonElement;
    input: HTMLInputElement | HTMLSelectElement;
    event: MouseEvent;
    id: string;
    value: string;
};

export class GrillController 
{

    protected setEvents = new EventEmitter<SetButtonClickedEvent>();

    protected grillComms = new GrillCommunicator;
    protected status = new GrillStatus(this.grillComms);
    protected basicController = new BasicTempController(this.grillComms);
    protected pidController = new GrillPIDController(this.grillComms);
    protected logger = new TempLogger;

    constructor()
    {
        this.status.onUpdate((status) => this.updateStatus(status));
        this.basicController.onUpdate((controller) => this.updateControllerStatus(controller));
        this.pidController.onChange((event: PIDControllerChangedEvent) => this.pidValueChanged(event));
        this.setEvents.on('set', (event: SetButtonClickedEvent) => this.basicController.onSetButtonClick(event));
        this.setEvents.on('set', (event: SetButtonClickedEvent) => this.grillComms.onSetButtonClick(event));
        this.setEvents.on('set', (event: SetButtonClickedEvent) => this.onSetButtonClick(event));
        this.setEvents.on('set', (event: SetButtonClickedEvent) => this.pidController.onSetButtonClick(event));
    }

    boot()
    {
        console.log("Grill Controller Booting....");
        let buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.set-button');
        buttons.forEach( (button) => {
            if (!button) return;
            if (button.tagName === "BUTTON")
            {
                button.onclick = (event) => this.setButtonClicked(button as HTMLButtonElement, event);
            }
        });
        this.loadControllerStatus();
        this.status.enableAutoUpdate(2000);
        console.log("Grill Controller Booted.");
    }

    setButtonClicked(button: HTMLButtonElement, event: MouseEvent)
    {
        var target = button.dataset.target;
        if (!target) return;
        var ip = document.getElementById(target);
        if (!ip) return;
        let input: HTMLInputElement | HTMLSelectElement;
        if (ip.tagName == "INPUT")
        {
            input = ip as HTMLInputElement;
        }
        else if (ip.tagName == "SELECT")
        {
            input = ip as HTMLSelectElement;
        }
        else return;
        var val = input.value;
        this.setEvents.emit('set', {
            button: button,
            input: input,
            event: event,
            id: target,
            value: val
        });
    }
            
    onSetButtonClick(event: SetButtonClickedEvent)
    {
        if (event.id == 'ControlModeSelection')
        {
            let val = parseInt(event.value);
            switch(val)
            {
                case 0:
                    this.basicController.disable();
                    this.pidController.disable();
                    break;
                case 1:
                    this.basicController.manual();
                    this.pidController.disable();
                    break;
                case 2:
                    this.basicController.enable();
                    this.pidController.disable();
                    break;
                case 3:
                    this.basicController.disable();
                    this.pidController.enable();
                    break;
            }
            let state = this.getControllerStateDisplay();
            this.setInputValueById('ControlCurrentMode', state);
        }
    }

    protected getTemperatureString(value: number)
    {
        if (value <= -20) return '---';
        else if (value >= 750) return 'MAX';
        else return value + " °F";
    }

    protected updateStatus(status: GrillStatus)
    {
        console.log("Updated");
        let temp = status.currentTemp;
        this.updateTemperatures(temp);
        let tempString = this.getTemperatureString(temp);
        let fanSpeed =  status.fanSpeed ? status.fanSpeed.toString() : 'OFF';
        let fanStatus = status.fanStatus ? 'ON' : 'OFF';
        this.updateFanGraphicDisplay(status.fanStatus, status.fanSpeed);
        let dutyCycle = `${status.fanOnTime.toString()}s per ${status.fanCycleTime.toString()}s`;
        this.updateMainTempDisplay(temp, tempString);
        this.setInputValueById('StatusCurrentTemp', tempString);
        this.setInputValueById('StatusFanState', fanStatus);
        this.setInputValueById('StatusFanSpeed', fanSpeed);
        this.setInputValueById('StatusFanDutyCycle', dutyCycle);
    }

    protected updateMainTempDisplay(temp: number, display: string)
    {
        let el = document.getElementById('MainTempDisplay');
        if (!el) return;
        let ip = el as HTMLInputElement;
        let target = this.basicController.targetTemp;
        if (this.pidController.isEnabled) target = this.pidController.target;
        if (temp > target)
        {
            ip.classList.add('text-danger');
            ip.classList.remove('text-success')
        }
        else
        {
            ip.classList.add('text-success');
            ip.classList.remove('text-danger')
        }
        ip.value = display;
    }
    protected updateTemperatures(newTemp: number)
    {
        this.basicController.newTemperature(newTemp);
        this.pidController.processTemperature(newTemp);
        let target = this.basicController.targetTemp;
        if (this.pidController.isEnabled) target = this.pidController.target;
        this.logger.logGrillTemp(newTemp, target);
        this.logger.plotData('Logger');
    }

    protected updateFanGraphicDisplay(fanStatus: boolean, fanSpeed: number)
    {
        if (fanSpeed)
        {
            let animationSpeed =  (fanSpeed - 0) * (.25 - .8) / (1023 - 0) + .25;
            let el = document.getElementById('StatusFanImage');
            if (el)
            {
                el.classList.add('fan-on');
                el.style.animationDuration = animationSpeed.toString() + 's';
                if (!fanStatus) el.style.animationDuration = '3s';
            }
        }
        else 
        {
            let el = document.getElementById('StatusFanImage');
            if (el)
            {
                el.classList.remove('fan-on');
                el.style.animationDuration = '0s';
            }
        }
    }

    protected updateControllerStatus(controller: BasicTempController)
    {
        let targetTemp = controller.targetTemp;
        let fanSpeed = controller.fanSpeed;
        let dutyOn = controller.onTime;
        let dutyCycle = controller.cycleTime;
        let dutyString = dutyOn.toString() + 's per ' + dutyCycle.toString() + 's';
        let tempString = targetTemp.toString() + " °F";
        let state = this.getControllerStateDisplay();
        this.setInputValueById('ControlCurrentMode', state);
        this.setInputValueById('MainTargetDisplay', tempString);
        this.setInputValueById('ControlCurrentTargetTemp', tempString);
        this.setInputValueById('ControlCurrentFanSpeed', fanSpeed.toString());
        this.setInputValueById('ControlCurrentDutyCycle', dutyString);
        this.setInputValueById('ControlCurrentPositiveH', controller.positiveHys.toString());
        this.setInputValueById('ControlCurrentNegativeH', controller.negativeHys.toString());
        this.storeControllerStatus();
    }

    protected storeControllerStatus()
    {
        let status = this.basicController.getState();
        let data = 
        {
            basicController: status
        };
        let dataString = JSON.stringify(data);
        localStorage.setItem('bbq-data', dataString);
    }

    protected loadControllerStatus()
    {
        let dataString = localStorage.getItem('bbq-data');
        if (dataString)
        {
            try{
                let data = JSON.parse(dataString);
                if (data.hasOwnProperty('basicController'))
                {
                    this.basicController.loadState(data.basicController);
                }
            }
            catch (e)
            {
                console.error("Couldn't load controller state.", e);
            }
        }
    }

    protected getControllerStateDisplay()
    {
        if (this.basicController.enabled) return 'STANDARD';
        else if (this.pidController.isEnabled) return 'PID';
        else if (this.basicController.isManual) return 'MANUAL'; 
        else return 'DISABLED';
    }

    protected controllerUpdate()
    {

    }

    protected setInputValueById(id: string, newValue: string)
    {
        let el = document.getElementById(id);
        if (!el) return;
        if (el.tagName === 'INPUT')
        {
            let input = el as HTMLInputElement;
            input.value = newValue;
        }
    }

    protected pidValueChanged(event: PIDControllerChangedEvent)
    {
        var display = '';
        switch(event.parameter)
        {
            case 'P':
            case 'I':
            case 'D':
                display = 'P: ' + this.pidController.P.toPrecision(2) + ' ';
                display += 'I: ' + this.pidController.I.toPrecision(2) + ' ';
                display += 'D: ' + this.pidController.D.toPrecision(2);
                this.setInputValueById('PidCurrentGains', display);
                return;
            case 'fanSpeedMin':
            case 'fanSpeedMax':
                display = 'Min: ' + this.pidController.fanSpeedMin.toString() + ' ';
                display += 'Max: ' + this.pidController.fanSpeedMax.toString();
                this.setInputValueById('PidCurrentFanSpeeds', display);
                return;
            case 'Output':
                display = 'P: ' + this.pidController.PState.toPrecision(2) + ' ';
                display += 'I: ' + this.pidController.IState.toPrecision(2) + ' ';
                display += 'D: ' + this.pidController.DState.toPrecision(2);
                this.setInputValueById('PidCurrentState', display);
                var output = this.pidController.output;
                this.setInputValueById('PidCurrentOutput', output.toString());
                return; 
            case 'fanSpeedOut':
                var speed = this.pidController.fanSpeedOut;
                this.setInputValueById('PidOutputFanSpeed', speed.toString());
                var dutyOn = this.pidController.fanCycleOn;
                var dutyOff = this.pidController.fanCycleOut;
                var dutyString = dutyOn.toString() + 's per' + dutyOff.toString() + 's';
                this.setInputValueById('PidOutputFanDuty', dutyString);
                return;
        }
    }

}