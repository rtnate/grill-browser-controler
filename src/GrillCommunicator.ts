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

    setFanOnOff(speed: number, onTime: number, offTime: number)
    {
        if (!this.connectionActive) return Promise.reject('No Active Connection');
        return this.reqFanSpeedOnOff(speed, onTime, offTime);
    }

    async getGrillStatus()
    {
        if (!this.successfulConnection) return Promise.reject("Grill communcation not established");

        let attemptsToMake = 5;

        while(attemptsToMake)
        {
            let result = await this.attemptUpdateStatus();
            if (result.success == true)
            {
                let res = result.response ?? {};
                return res;
            }
            else 
            {
                console.warn("Comms Failed: ", result.error);
                attemptsToMake--;
            }
        }
        this.commsFailed(this.ip);
        throw new Error("Unable to communicate with grill");
    }

    protected async attemptUpdateStatus(): 
        Promise<{success: boolean, response?: any, error?: any}>
    {
        try 
        {
            let response = await this.reqGrillStatus();
            let result = 
            {
                success: true,
                response: response
            };
            return result;
        }
        catch(err)
        {
            let result = 
            {
                success: false,
                error: err
            }
            return result;
        }
    
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

    protected async reqFanSpeedOnOff(speed: number, onTime: number, offTime: number)
    {
        let body = {
            speed: speed,
            on_time: onTime,
            off_time: offTime
        };
        try 
        {
            console.log("Make Request Test");
            let res = this.makeRequest('fan', 'POST', body);
            return res;
        } 
        catch(err)
        {
            console.error("Fan Tx Failed: ", err);
        }
    }

    protected async reqGrillStatus()
    {
        let response = await this.makeRequest('status');
        return response?.json() ?? {};
    }

    public setIP(ip: string)
    {
        this.ip = ip;
        this.testRequest().then(
            () => this.commsSuccessful(ip)
        ).catch(
            () => this.commsFailed(ip)
        );
    }

    public getIP(){ return this.ip; };

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
        return response?.status ?? null;
    }

    async makeRequest(endpoint: string, method: string|null = null, body: any = null)
    {
        let opts: RequestInit = {};
        if (body) opts.body = JSON.stringify(body);
        if (method) opts.method = method;
        if (endpoint === '/') endpoint = '';
        let url = `http://${this.ip}/${endpoint}`;
        try 
        {
            return await fetch(url, opts);
        }
        catch(err)
        {
            console.log("Failed");
            console.log(err);
            return null;
        }
        //return fetch(url, opts);
    }
}