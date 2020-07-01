import { SmartElement } from "./SmartElement";

export interface ButtonListener
{
    buttonClicked(id: string, button: Button): void;
}

export class Button extends SmartElement
{
    protected button: HTMLButtonElement;
    protected listeners = Array<ButtonListener>();

    constructor(protected id: string, protected title: string)
    {
        super();
        this.button = document.createElement("button");
        this.button.id = this.id;
        this.button.innerHTML = this.title;
        this.button.onclick = () => { this.onClick(); };
    }

    get element(){ return this.button; }

    protected onClick()
    {
        this.listeners.forEach((listener) => listener.buttonClicked(this.id, this));
    }

    addListener(listener: ButtonListener)
    {
        this.listeners.push(listener);
    }

}