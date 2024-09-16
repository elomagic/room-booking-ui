import {Appointment, AppointmentProvider} from "./AppointmentProvider.ts";

export class EwsProxyProvider extends AppointmentProvider {

    baseUrl = localStorage.getItem("rb.ext.url") ?? "https://localhost";
    apiKey = localStorage.getItem("rb.ext.apiKey") ?? "demo";
    resourceId = localStorage.getItem("rb.ext.resourceId") ?? "0";

    createHeaders(): Headers {
        // Since this request will send JSON data in the body,
        // we need to set the `Content-Type` header to `application/json`
        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        // We also need to set the `Accept` header to `application/json`
        // to tell the server that we expect JSON in response
        headers.set('Accept', 'application/json');
        headers.set('RB-ApiKey', this.apiKey);
        headers.set('RB-Resource-ID', this.resourceId);

        return headers;
    }

    createAdHocAppointment(durationInMinutes: number): Promise<boolean> {
        const request: RequestInfo = new Request(this.baseUrl + '/api/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'POST',
            headers: this.createHeaders(),
            // Convert the user object to JSON and pass it as the body
            body: JSON.stringify({
                duration: durationInMinutes
            })
        });

        // Send the request and print the response
        return fetch(request)
            .then((res: Response) => res.status >= 200 && res.status < 300);
    }

    extendCurrentAppointment(durationInMinutes: number): Promise<boolean> {
        const request: RequestInfo = new Request(this.baseUrl + '/api/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'PUT',
            headers: this.createHeaders(),
            // Convert the user object to JSON and pass it as the body
            body: JSON.stringify({
                duration: durationInMinutes
            })
        });

        // Send the request and print the response
        return fetch(request)
            .then((res: Response) => res.status >= 200 && res.status < 300);
    }

    getAppointmentsOfToday(): Promise<Appointment[]> {
        const request: RequestInfo = new Request(this.baseUrl + '/api/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'GET',
            headers: this.createHeaders()
        });

        return fetch(request)
            .then((response: Response) => response.json())
            // We have to map the date strings into Date objects
            .then((apps: any[]) => {
                return apps.map((app: any) => {
                    return {
                        uid: app.uid,
                        start: new Date(app.start),
                        end: new Date(app.end),
                        subject: app.subject
                    }
                })
            });
    }

    terminateCurrentAppointment(): Promise<boolean> {
        const request: RequestInfo = new Request(this.baseUrl + '/api/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'PUT',
            headers: this.createHeaders()
        });

        // Send the request and print the response
        return fetch(request)
            .then((res: Response) => res.status >= 200 && res.status < 300);
    }

    getBackendVersion(): Promise<any> {
        return fetch(this.baseUrl + '/api/version', {
            method: 'GET',
            headers: this.createHeaders()
        })
            // TODO We have to map the date strings into Date objects
            .then((response: Response) => response.json());
    }

    validatePin(pin: string): Promise<boolean> {
        const request: RequestInfo = new Request(this.baseUrl +  '/api/validate', {
            method: 'POST',
            headers: this.createHeaders(),
            // Convert the user object to JSON and pass it as the body
            body: JSON.stringify({
                pin: pin
            })
        });

        return fetch(request)
            .then((res: Response) => res.status == 200);
    }

    testConfiguration(baseUrl: string, apiKey: string, resourceId: string): Promise<boolean> {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.resourceId = resourceId;

        return this.getAppointmentsOfToday().then(() => true);
    }

}