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
        this.setInputValueById('MainTempDisplay', tempString);
        this.setInputValueById('StatusCurrentTemp', tempString);
        this.setInputValueById('StatusFanState', fanStatus);
        this.setInputValueById('StatusFanSpeed', fanSpeed);
        this.setInputValueById('StatusFanDutyCycle', dutyCycle);
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
        switch(event.parameter)
        {
            case 'P':
            case 'I':
            case 'D':
                let display = 'P: ' + this.pidController.P.toPrecision(2) + ' ';
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
        }
    }

}