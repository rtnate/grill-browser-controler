import { SetButtonClickedEvent } from "./GrillController";
import { GrillStatus } from "./GrillStatus";

export class GrillCommunicator
{
    protected ip = "";
    protected successfulConnection = false;
    protected hasConnected = false;
    protected failCount = 0;

    constructor()
    {

    }

    onSetButtonClick(event: SetButtonClickedEvent)
    {
        let id = event.id;
        if (id == 'StatusGrillIPSelection') this.setIP(event.value);
    }

    get connectionActive(): boolean
    {
        return this.successfulConnection;
    }

    setFan(speed: number, duty: number = 100, cycle_rate: number = 60)
    {
        if (!this.connectionActive) return Promise.reject('No Active Connection');
        return this.reqFanSpeed(speed, duty, cycle_rate);
        // return new Promise((resolve, reject) => {
        //     rthis.reqFanSpeed(speed);
        // });
    }
    getGrillStatus()
    {
        if (!this.successfulConnection) return Promise.reject("Grill communcation not established");
        return new Promise( (resolve, reject) => 
        {
            this.reqGrillStatus().then(
                (data) => {
                    resolve(data);
                }
            ).catch(
                (error) => {
                    this.failCount++;
                    if (this.failCount > 5)
                    {
                        console.error("Status Update Failed: ", error);
                        this.commsFailed(this.ip);
                        reject(error);
                    }
                    else resolve(null);
                }
            )
        });
    }

    protected async reqFanSpeed(speed: number, duty: number = 100, cycle_rate: number = 60)
    {
        let body = {
            speed: speed,
            duty_cycle: duty,
            cycle_rate: cycle_rate
        };
        return this.makeRequest('fan', 'POST', body);
    }
    protected async reqGrillStatus()
    {
        let response = await this.makeRequest('status');
        return response.json();
    }

    protected setIP(ip: string)
    {
        this.ip = ip;
        this.testRequest().then(
            () => this.commsSuccessful(ip)
        ).catch(
            () => this.commsFailed(ip)
        );
    }

    protected updateMessage(message: string)
    {
        let el = document.getElementById('StatusGrillConnection');
        if (!el) return;
        if (this.successfulConnection)
        {
            el.classList.remove("connection-failed");
            el.classList.add("connection-successful");
        }
        else 
        {
            el.classList.remove("connection-failed");
            el.classList.add("connection-successful");
        }
        el.innerHTML = message;
    }

    protected updateStatus(message: string)
    {
        let el = document.getElementById('StatusGrillConnectionState');
        if (!el) return;
        let ip = el as HTMLInputElement;
        ip.value = message;
        if (message == 'CONNECTED')
        {
            ip.classList.add('text-success');
            ip.classList.remove('text-danger');
        }
        else if (message == 'DISCONNECTED')
        {
            ip.classList.remove('text-success');
            ip.classList.remove('text-danger');
        }
        else 
        {
            ip.classList.remove('text-success');
            ip.classList.add('text-danger');
        }
    }

    protected commsSuccessful(ip: string)
    {
        this.failCount = 0;
        this.successfulConnection = true;
        if (!this.hasConnected) this.hasConnected = true;
        this.updateMessage(("Grill Connected at " + ip));
        this.updateStatus('CONNECTED');
    }

    protected commsFailed(ip: string)
    {
        this.successfulConnection = false;
        if (this.hasConnected)
        {
            this.updateMessage('Grill Connection to' + ip + 'lost!');
            this.updateStatus('LOST');
        }
        else 
        {
            this.updateMessage(("Grill failed to connect at " + ip));
            this.updateStatus('DISCONNECTED');
        }
    }

    async testRequest()
    {
        let response = await this.makeRequest('');
        return response.status;
    }

    async makeRequest(endpoint: string, method: string|null = null, body: any = null)
    {
        let opts: RequestInit = {};
        if (body) opts.body = JSON.stringify(body);
        if (method) opts.method = method;
        if (endpoint === '/') endpoint = '';
        let url = `http://${this.ip}/${endpoint}`;
        return fetch(url, opts);
    }
}