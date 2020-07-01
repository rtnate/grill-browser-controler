import { GrillCommunicator } from "./GrillCommunicator";
import { SetButtonClickedEvent } from "./GrillController";
import { GrillStatus } from "./GrillStatus";

export class BasicTempController
{
    protected fanOnSpeed: number = 100;

    protected controlTargetTemp = 100;

    protected fanDuty = 25;

    protected fanCycle = 60;

    protected updateListeners = Array<(arg: BasicTempController) => void>();

    protected active = false;

    protected manualMode = false;

    constructor(protected comms: GrillCommunicator)
    {

    }

    enable()
    {
        this.active = true; 
        this.manualMode = false;
        this.updated();
    };

    disable()
    {
        this.active = false;
        this.manualMode = false;
        this.updated();
    };

    manual()
    {
        this.active = false;
        this.manualMode = true;
        this.updated();
    }

    get enabled(){ return this.active; };

    get isManual(){ return this.manualMode; };

    set fanSpeed(speed: number)
    {
        let numSpeed = speed;
        if (numSpeed === NaN) return;
        if (numSpeed <= 0) numSpeed = 0;
        if (numSpeed >= 1000) numSpeed = 1000;
        this.fanOnSpeed = numSpeed;
        this.updated();
    }

    get fanSpeed(): number { return this.fanOnSpeed; };

    set targetTemp(temp: number)
    {
        if (temp === NaN) return;
        if (temp <= 0) temp = 0;
        if (temp >= 400) temp = 400;
        this.controlTargetTemp = temp;
        this.updated();
    }

    get targetTemp(): number { return this.controlTargetTemp; };

    set onTime(time: number)
    {
        if (time === NaN) return;
        if (time <= 0) time = 0;
        if (time >= this.fanCycle)
        {
            this.fanDuty = 100;
            return;
        }
        let fract = time / this.fanCycle;
        this.fanDuty = fract * 100;
        this.updated();
    }

    get onTime(): number { return this.fanDuty/100 * this.fanCycle; };

    set cycleTime(time: number)
    {
        if (time === NaN) return;
        if (time <= 0) time = 0;
        if (time >= 600) time = 600;
        this.fanCycle = time;
        this.updated();
    }
    
    get cycleTime(): number { return this.fanCycle; };

    onSetButtonClick(event: SetButtonClickedEvent)
    {
        let id = event.id;
        switch(id)
        {
            case 'ControlTempSelection':
                this.targetTemp = parseFloat(event.value);
                break;
            case 'ControlFanSpeedSelection':
                this.fanSpeed = parseFloat(event.value);
                break;
            case 'ControlDutyCycleSelectionOn':
                let dutyOn = parseFloat(event.value);
                let ip = document.getElementById('ControlDutyCycleSelectionCycle');
                if (ip)
                {
                    let value = (ip as HTMLInputElement).value;
                    this.cycleTime = parseFloat(value);
                }
                this.onTime = dutyOn;
                break;
        }
        if (this.manualMode == true)
        {
            this.turnOnFan();
        }
    }

    onUpdate(handler: (controller: BasicTempController) => void)
    {
        this.updateListeners.push(handler);
    }

    newTemperature(temp: number)
    {
        if (this.active) this.control(temp);

    }

    protected control(currentTemp: number)
    {
        if (currentTemp < this.targetTemp) this.turnOnFan();
        else this.turnOffFan();
    }

    protected turnOnFan()
    {
        if (this.comms.connectionActive) this.comms.setFan(this.fanSpeed, this.fanDuty, this.fanCycle);
    }

    protected turnOffFan()
    {
        if (this.comms.connectionActive) this.comms.setFan(0, this.fanDuty, this.fanCycle);
    }

    protected updated()
    {
        this.updateListeners.forEach((listener) => listener(this));
    }

}