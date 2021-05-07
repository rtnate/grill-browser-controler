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

    protected posH = 0;

    protected negH = 0;

    protected curTemp = 0;
    
    protected lastTemp = 0;

    protected setPoint = 0;

    protected fanOnTime = 0;
    
    protected fanOffTime = 0;

    protected fanState = false;

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

    get positiveHys(){ return this.posH; };

    set positiveHys(val: number)
    {
        this.posH = val;
        this.updated();
    }

    get negativeHys(){ return this.negH; };

    set negativeHys(val: number)
    {
        this.negH = val;
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
        if (time >= 120000) time = 120000;
        this.fanOnTime = time;
        this.updated();
    }

    get onTime(): number { return this.fanOnTime; };

    set offTime(time: number)
    {
        if (time === NaN) return;
        if (time <= 0) time = 0;
        if (time >= 120000) time = 120000;
        this.fanOffTime = time;
        this.updated();
    }

    get offTime(){ return this.fanOffTime; };

    set cycleOnTime(time: number)
    {
        if (time === NaN) return;
        if (time <= 0) time = 0;
        if (time >= this.fanCycle)
        {
            this.fanDuty = 100;
        }
        else 
        {
            let fract = time / this.fanCycle;
            this.fanDuty = fract * 100;
        }
    }

    get cycleOnTime(): number 
    {
        return this.fanDuty/100 * this.fanCycle;
    }
    
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
                let onTime = parseFloat(event.value);
                let ip = document.getElementById('ControlDutyCycleSelectionCycle');
                if (ip)
                {
                    let value = (ip as HTMLInputElement).value;
                    this.offTime = parseFloat(value);
                }
                this.onTime = onTime;
                break;
            case 'ControlPositiveHSetting':
                this.positiveHys = parseFloat(event.value);
                break;
            case 'ControlNegativeHSetting':
                this.negativeHys = parseFloat(event.value);
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
        this.curTemp = temp;
        if (this.active) this.control(temp);
        this.lastTemp = temp;
    }

    protected control(currentTemp: number)
    {
        let change = currentTemp - this.lastTemp;
        //IF TEMPERATURE IS INCREASING
        if (change > 0)
        {
            //Set Point is the target less positive going hysteresis
            this.setPoint = this.targetTemp - this.posH;
        }
        //IF TEMPERATURE IS DECREASING 
        else if (change < 0)
        {
            //Set Point is the target less negative going hysteresis
            this. setPoint = this.targetTemp + this.negH;
        }
        //IF TEMPERATURE IS NOT CHANGING, SET POINT DOES NOT MOVE
        else {}
        if (currentTemp < this.setPoint) this.turnOnFan();
        else this.turnOffFan();
    }

    protected turnOnFan()
    {
        this.fanState = true;
        if (this.comms.connectionActive) this.comms.setFanOnOff(this.fanSpeed, this.fanOnTime, this.fanOffTime);
    }

    protected turnOffFan()
    {
        this.fanState = false;
        if (this.comms.connectionActive) this.comms.setFanOnOff(0, this.fanOnTime, this.fanOffTime);
    }

    protected updateFan()
    {
        let speed = this.fanState ? this.fanSpeed : 0;
        if (this.comms.connectionActive) this.comms.setFanOnOff(speed, this.fanOnTime, this.fanOffTime).then(
            (result) => console.log("Updated Fan: ", result)
        ).catch(
            (err) => console.error(err)
        )
    }

    protected updated()
    {
        if (this.active) this.updateFan();
        this.updateListeners.forEach((listener) => listener(this));
    }

    getState()
    {
        let val = 
        {
            fanOnSpeed: this.fanOnSpeed,

            controlTargetTemp: this.controlTargetTemp,

            fanDuty: this.fanDuty,

            fanCycle: this.fanCycle,

            offTime: this.offTime,

            onTime: this.onTime,

            active: this.active,

            manualMode: this.manualMode,

            posH: this.posH,

            negH: this.negH,

            curTemp: this.curTemp,
            
            lastTemp: this.lastTemp,
        };
        return val;
    }

    loadState(state: any)
    {
        if (state.hasOwnProperty('fanOnSpeed')) this.fanOnSpeed = state.fanOnSpeed;

        if (state.hasOwnProperty('controlTargetTemp')) this.controlTargetTemp = state.controlTargetTemp;

        if (state.hasOwnProperty('fanDuty')) this.fanDuty = state.fanDuty;

        if (state.hasOwnProperty('fanCycle')) this.fanCycle = state.fanCycle;

        if (state.hasOwnProperty('active')) this.active = state.active;

        if (state.hasOwnProperty('manualMode')) this.manualMode = state.manualMode;

        if (state.hasOwnProperty('posH')) this.posH = state.posH;

        if (state.hasOwnProperty('negH')) this.negH = state.negH;

        if (state.hasOwnProperty('curTemp')) this.curTemp = state.curTemp;

        if (state.hasOwnProperty('lastTemp')) this.lastTemp = state.lastTemp;

        if (state.hasOwnProperty('onTime')) this.onTime = state.onTime;

        if (state.hasOwnProperty('offTime')) this.offTime = state.offTime;

        this.updated();
    }

}