import { BasicEventEmitter } from "./BasicEventEmitter";

export interface PIDControllerChangedEvent 
{
    parameter: string;
    value: number;
}

export interface PIDControlerInterface 
{
    P: number;
    I: number;
    D: number;
    calculate(input: number): number;
    onChange(handler: (event: PIDControllerChangedEvent) => void): void;
}

export class PIDControler implements PIDControlerInterface
{
    protected lastError = 0;
    protected cumError = 0;
    protected gP = 0.0;
    protected gI = 0.0;
    protected gD = 0.0;
    protected setPoint = 0;
    protected lastControlVal = 0;
    protected lastRateError = 0;

    protected startTime = new Date;
    protected previousTime = new Date;
    protected logUpdates = false;

    protected changedEvent = new BasicEventEmitter<PIDControllerChangedEvent>();

    constructor(){

    }

    reset()
    {
        this.lastControlVal = 0;
        this.lastError = 0;
        this.cumError = 0;
        this.lastRateError = 0;
        this.startTime = new Date;
        this.previousTime = new Date;
    }
    get P()
    {
        return this.gP;
    }

    set P(value: number)
    {
        this.gP = value;
        this.changed('P', value);
    }

    get I()
    {
        return this.gI;
    }

    set I(value: number)
    {
        this.gI = value;
        this.changed('I', value);
    }

    get D()
    {
        return this.gD;
    }

    set D(value: number)
    {
        this.gD = value;
        this.changed('D', value);
    }

    get target()
    {
        return this.setPoint;
    }

    set target(value: number)
    {
        this.setPoint = value;
        this.changed('target', value);
    }

    get PState(){ return this.lastError; };
    
    get IState(){ return this.cumError; };

    get DState(){ return this.lastRateError; };

    get output(){ return this.lastControlVal; };

    calculate(input: number)
    {
        let now = new Date().getTime();
        let elapsedTime = (now - this.previousTime.getTime()) / 1000;
        if (this.logUpdates) console.log("PID Elapsed Time:", elapsedTime);
        let error = this.setPoint - input;
        if (this.logUpdates) console.log("PID Error: ", error, "Input: ", input, "Set Point: ", this.setPoint);
        let cumError = error * elapsedTime;
        this.cumError += cumError;
        let rateError = (error - this.lastError) / elapsedTime;
        let output = error * this.gP + this.cumError * this.gI + rateError * this.gD;
        this.lastError = error;
        this.lastControlVal = output;
        this.lastRateError = rateError;
        this.changed('IState', this.cumError);
        this.changed('PState', error);
        this.changed('DState', this.lastRateError);
        this.changed('Output', this.lastControlVal);
        return output;
    }

    onChange(handler: (event: PIDControllerChangedEvent) => void)
    {
        this.changedEvent.subscribe(handler);
    }

    protected changed(parameter: string, value: number)
    {
        this.changedEvent.emit({parameter: parameter, value: value});
    }

    

}