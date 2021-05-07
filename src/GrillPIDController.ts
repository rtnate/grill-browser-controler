import { PIDControler } from "./PIDController";
import { GrillCommunicator } from "./GrillCommunicator";
import { SetButtonClickedEvent } from "./GrillController";

export class GrillPIDController extends PIDControler
{
    protected controlMasterScale = 0.5;
    protected maxSpeed = 400;
    protected minSpeed = 100;
    protected maxCycle = 30;
    protected enabled = false;
    protected outputSpeed = 0;
    protected outputDuty = 0;
    protected outputCycle = 0;

    constructor(protected comms: GrillCommunicator)
    {
        super();
    }

    enable()
    {
        this.enabled = true;
    }

    disable()
    {
        this.enabled = false;
    }

    get isEnabled(){ return this.enabled; };

    get fanSpeedMax()
    {
        return this.maxSpeed;
    }

    set fanSpeedMax(value: number)
    {
        this.maxSpeed = value;
        this.changed('fanSpeedMax', value);
    }

    get fanSpeedMin()
    {
        return this.minSpeed;
    }

    set fanSpeedMin(value: number)
    {
        this.minSpeed = value;
        this.changed('fanSpeedMax', value);
    }

    get fanSpeedOut(){ return this.outputSpeed; };

    get fanDutyOut(){ return this.outputDuty; };

    get fanCycleOn(){ return (this.fanDutyOut / 100) * this.fanCycleOut; };

    get fanCycleOut(){ return this.outputCycle; };

    processTemperature(newTemp: number)
    {
        let controlVal = this.calculate(newTemp);
        //controlVal = this.mapControlVal(controlVal);
        this.outputSpeed = Math.round(this.mapControlVal(controlVal));
        let cycleOn = 15;
        this.outputCycle = 30;
        this.outputDuty = (cycleOn / this.outputCycle) * 100;
        this.changed('fanSpeedOut', this.outputSpeed);
        if (this.isEnabled) this.comms.setFan(this.outputSpeed, this.outputDuty, this.outputCycle);
    }

    protected mapControlVal(value: number)
    {
        if (value >= this.fanSpeedMax) return this.fanSpeedMax;
        else if (value <= this.fanSpeedMin) return 0;
        else return value;
    }

    protected mapFanSpeed(value: number)
    {
        const in_min = 0;
        const in_max = 1;
        const out_min = this.fanSpeedMin;
        const out_max = this.fanSpeedMax;
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    protected mapDutyCycle(value: number)
    {
        const in_min = 0;
        const in_max = 1;
        const out_min = 10;
        const out_max = 30;
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    onSetButtonClick(event: SetButtonClickedEvent)
    {
        let id = event.id;
        switch(id)
        {
            case 'PidGainSelection':
                this.P = parseFloat(event.value);
                return;
            case 'PidResetSelection':
                this.I = parseFloat(event.value);
                return;
            case 'PidRateSelection':
                this.D = parseFloat(event.value);
                return;
            case 'PidMinFanSpeedSelection':
                this.fanSpeedMin = parseFloat(event.value);
                return;
            case 'PidMaxFanSpeedSelection':
                this.fanSpeedMax = parseFloat(event.value);
                return;
            case 'ControlTempSelection':
                this.target = parseFloat(event.value);
            default:
                return;
        }
    }

    getState()
    {
        let val = 
        {
            lastError: this.lastError,
            cumError: this.cumError,
            gP: this.gP,
            gI: this.gI,
            gD: this.gD,
            setPoint: this.setPoint,
            lastControlVal: this.lastControlVal,
            lastRateError: this.lastRateError, 
            startTime: this.startTime,
            previousTime: this.previousTime,
            controlMasterScale: this.controlMasterScale,
            maxSpeed: this.maxSpeed,
            minSpeed: this.minSpeed,
            maxCycle: this.maxCycle,
            enabled: this.enabled,
            outputSpeed: this.outputSpeed,
            outputDuty: this.outputDuty,
            outputCycle: this.outputCycle
        };
        return val;
    }

    loadState(state: any)
    {
        // if (state.hasOwnProperty('lastError')) this.lastError = state.lastError;
        // if (state.hasOwnProperty('cumError')) this.cumError = state.cumError;
        if (state.hasOwnProperty('gP')) this.P = state.gP;
        if (state.hasOwnProperty('gI')) this.I = state.gI;
        if (state.hasOwnProperty('gD')) this.D = state.gD;
        if (state.hasOwnProperty('setPoint')) this.target = state.setPoint;
        // if (state.hasOwnProperty('lastControlVal')) this.lastControlVal = state.lastControlVal;
        // if (state.hasOwnProperty('lastRateError')) this.lastRateError = state.lastRateError; 
        // if (state.hasOwnProperty('startTime')) this.startTime = state.startTime;
        // if (state.hasOwnProperty('previousTime')) this.previousTime = state.previousTime;
        if (state.hasOwnProperty('controlMasterScale')) this.controlMasterScale = state.controlMasterScale;
        if (state.hasOwnProperty('maxSpeed')) this.fanSpeedMax = state.maxSpeed;
        if (state.hasOwnProperty('minSpeed')) this.fanSpeedMin = state.minSpeed;
        if (state.hasOwnProperty('maxCycle')) this.maxCycle = state.maxCycle;
        if (state.hasOwnProperty('enabled')) this.enabled = state.enabled;
        // if (state.hasOwnProperty('outputSpeed')) this.outputSpeed = state.outputSpeed;
        // if (state.hasOwnProperty('outputDuty')) this.outputDuty = state.outputDuty;
        // if (state.hasOwnProperty('outputCycle')) this.outputCycle = state.outputCycle;  
    }
}