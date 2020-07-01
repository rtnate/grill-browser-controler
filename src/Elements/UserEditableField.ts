import { SmartElement } from "./SmartElement";
import { EventEmitter } from "./EventEmitter";

export class UserEditableField extends SmartElement
{
    protected events = new EventEmitter<string>();

    protected field: HTMLElement;

    constructor(id: string, label: string)
    {
        super();
        this.el.innerHTML = this.template(id, label);
        let field = this.el.firstChild;
        if (!field) throw new Error("UserEditableField creation failed, template is ill formed");
        this.field = field as HTMLElement;
        let button = this.el.querySelector('button');
        if (!button) throw new Error("UserEditableField template is ill formed");
        button.onclick = () => this.setClicked();
    }

    on(event: string, handler: (arg: string) => void)
    {
        this.events.on(event, handler);
    }

    protected template(id: string, label: string)
    {
        return `
            <div class="user-field-group">
                <label for=${id}>
                    ${label}
                </label>
                <input type="text" id=${id}>
                <button type="button>Set</button>
            </div>
        `;
    }

    protected setClicked()
    {
        let value = '';
        let input = this.el.querySelector('input');
        if (input)
        {
            let value = input.getAttribute('value');
            if (value === null) value = '';
            this.events.emit('change', value);
        }
    }
}
