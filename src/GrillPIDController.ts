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
        return this.maxSpeed;
    }

    set fanSpeedMin(value: number)
    {
        this.maxSpeed = value;
        this.changed('fanSpeedMax', value);
    }

    processTemperature(newTemp: number)
    {
        let controlVal = this.calculate(newTemp);
        controlVal = this.mapControlVal(controlVal);
        let fanSpeed = this.mapFanSpeed(controlVal);
        let cycleOn = this.mapDutyCycle(controlVal);
        let cycleRate = 60;
        let fanDuty = (cycleOn / cycleRate) * 100;
        if (this.isEnabled) this.comms.setFan(fanSpeed, fanDuty, cycleRate);
    }

    protected mapControlVal(value: number)
    {
        value *= this.controlMasterScale;
        if (value >= 1 ) value = 1;
        if (value <= 0) value = 0;
        return value;
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
            default:
                return;
        }
    }
}