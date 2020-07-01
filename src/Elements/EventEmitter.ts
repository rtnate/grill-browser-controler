
export interface EventHandler<HandlerSignature> 
{
    [key: string]: Array<HandlerSignature>;
}

export class EventEmitter<DataType = void>{

    protected callbacks: EventHandler<(arg: DataType) => void> = {};

    on(event: string, callback: (arg: DataType) => void){
        if(!this.callbacks[event]) this.callbacks[event] = [];
        this.callbacks[event].push(callback)
    }

    emit(event: string, data: DataType){
        let cbs = this.callbacks[event]
        if(cbs){
            cbs.forEach((cb: (arg: DataType) => void) => {
                cb(data);
            });
        }
    }
}