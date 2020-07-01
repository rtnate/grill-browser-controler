export class SmartElement
{
    protected el: HTMLElement;

    constructor()
    {
        this.el = document.createElement('div');
    }

    attach(attachmentElement: HTMLElement)
    {
        attachmentElement.innerHTML = this.el.innerHTML;
        this.el = attachmentElement;
    }
}