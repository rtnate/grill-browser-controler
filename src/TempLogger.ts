import * as Plotly from "plotly.js";

export class TempDataTrace
{
    timestamps = Array<Date>();
    temperatures = Array<number>();
    target = Array<number>();

    add(temp: number, target: number)
    {
        this.timestamps.push(new Date);
        this.target.push(target);
        this.temperatures.push(temp);
    }
}

export class TempLogger
{
    protected startTime = new Date;
    protected grillTempData = new TempDataTrace;
    protected targetTempData = new TempDataTrace
    protected dataRevision = 0;
    protected timer = 0;

    constructor()
    {

    }

    logGrillTemp(temp: number, target: number)
    {
       this.grillTempData.add(temp, target);
    }


    plotData(target: string)
    {

        let trace = this.grillTempData;
        this.dataRevision++;
        let rev = this.dataRevision;
        let layout = {title: 'Temperature', datarevision: rev};
        if (this.timer == 0){
            let traceA: {x: Array<Date>, y: Array<number>, type: 'scatter', name: string} = {
                x: this.grillTempData.timestamps,
                y: this.grillTempData.temperatures,
                type: 'scatter',
                name: 'Grill Temperature'
            };
            let traceB: {x: Array<Date>, y: Array<number>, type: 'scatter', name: string} = {
                x: this.grillTempData.timestamps,
                y: this.grillTempData.target,
                type: 'scatter',
                name: 'Target Temperature'
            };
            Plotly.react(target, [traceA, traceB], layout, {responsive: true});
        }
        this.timer = (this.timer + 1) % 8;
    }

}