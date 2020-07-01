export class BasicEventEmitter<EventParameter>
{
    protected listeners = new Array<(arg: EventParameter) => void>();

    constructor()
    {

    }

    emit(arg: EventParameter)
    {
        this.listeners.forEach((listener) => listener(arg));
    }

    subscribe(handler: (arg: EventParameter) => void)
    {
        this.listeners.push(handler);
    }
}