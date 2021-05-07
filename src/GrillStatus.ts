import { GrillCommunicator } from "./GrillCommunicator";
import { GetTemperatureFromADCValue } from "./TempatureConverter";

export type GrillStatusUpdateHandler = ((status: GrillStatus) => void); 

export class GrillStatus
{

    protected currentCycleTime = 0;
    protected currentOnTime = 0;
    protected currentFanSpeed = 0;
    protected currentFanState = false;
    protected grillTemp = 0;
    protected dummyTemp = 0;
    protected auto = 0;
    protected onTime = 0;
    protected offTime = 0;
    protected displayAsDutyCycle = false;
    protected updateHandlers = Array<GrillStatusUpdateHandler>();

    constructor(protected comms: GrillCommunicator)
    {
    }

    get currentTemp(): number 
    {
        let temp = this.grillTemp.toFixed(2);
        return parseFloat(temp);
    }

    get fanStatus(): boolean 
    {
        return this.currentFanState;
    }

    get fanSpeed(): number 
    {
        return this.currentFanSpeed;
    }

    get fanOnTime(): number 
    {
        return this.currentOnTime / 100;
    }

    get fanCycleTime(): number 
    {
        return this.currentCycleTime;
    }

    get fanDutyString(): string 
    {
        if (this.displayAsDutyCycle)
        {
            return `${this.fanOnTime.toString()}s per ${this.fanCycleTime.toString()}s`;
        }
        else 
        {
            let onDisplay = (this.onTime / 1000).toFixed(2);
            let offDisplay = (this.offTime / 1000).toFixed(2);
            return `On ${onDisplay}s, Off ${offDisplay}`;
        }
    }

    onUpdate(handler: (status: GrillStatus) => void)
    {
        this.updateHandlers.push(handler);
    }

    enableAutoUpdate(timeout: number)
    {
        this.auto = setInterval(() => this.update(), timeout);
    }

    disableAutoUpdate()
    {
        if (this.auto) clearInterval(this.auto);
    }

    update()
    {
        if (!this.comms.connectionActive) return;
        this.comms.getGrillStatus().then(
            (data) => 
            {
                if (data)
                {
                    this.loadNewStatus(data);
                    this.updated();
                }
            }
        );
    }

    protected loadNewStatus(data: any)
    {
        if (data.hasOwnProperty('fan_duty') && data.hasOwnProperty('fan_cycle'))
        {
            this.currentCycleTime = data.fan_cycle;
            this.currentOnTime = data.fan_cycle * data.fan_duty;
            this.displayAsDutyCycle = true;
        }
        else if (data.hasOwnProperty('on_time') && data.hasOwnProperty('off_time'))
        {
            this.onTime = data.on_time;
            this.offTime = data.off_time;
            this.displayAsDutyCycle = false;
        }

        if (data.hasOwnProperty('fan_speed'))
        {
            this.currentFanSpeed = data.fan_speed;
        }
        if (data.hasOwnProperty('fan_status'))
        {
            this.currentFanState = data.fan_status;
        }
        if (data.hasOwnProperty('temp_probe_raw'))
        {
            let adc = data.temp_probe_raw;
            let temp = GetTemperatureFromADCValue(adc, 'F');
            this.grillTemp = temp;
        }
    }

    protected updated()
    {
        this.updateHandlers.forEach((handler: GrillStatusUpdateHandler) => handler(this));
    }
}