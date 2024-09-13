import {Appointment, AppointmentProvider} from "./AppointmentProvider.ts";

export class EwsProxyProvider extends AppointmentProvider {

    baseUrl = localStorage.getItem("rb.ext.url") ?? "https://localhost";

    createHeaders(): Headers {
        // Since this request will send JSON data in the body,
        // we need to set the `Content-Type` header to `application/json`
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        // We also need to set the `Accept` header to `application/json`
        // to tell the server that we expect JSON in response
        headers.set('Accept', 'application/json')
        headers.set('RB-ApiKey', localStorage.getItem("rb.ext.apiKey") ?? "demo")
        headers.set('RB-Resource-ID', localStorage.getItem("rb.ext.resourceId") ?? "0")

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
        })

        // Send the request and print the response
        return fetch(request)
            .then(res => res.status >= 200 && res.status < 300);
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
        })

        // Send the request and print the response
        return fetch(request)
            .then(res => res.status >= 200 && res.status < 300);
    }

    getAppointmentsOfToday(): Promise<Appointment[]> {
        const request: RequestInfo = new Request(this.baseUrl + '/api/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'GET',
            headers: this.createHeaders()
        })

        return fetch(request)
            // TODO We have to map the date strings into Date objects
            .then((response: Response) => response.json());
    }

    terminateCurrentAppointment(): Promise<boolean> {
        const request: RequestInfo = new Request(this.baseUrl + '/api/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'PUT',
            headers: this.createHeaders()
        })

        // Send the request and print the response
        return fetch(request)
            .then(res => res.status >= 200 && res.status < 300);
    }

    getBackendVersion(): Promise<any> {
        return fetch(this.baseUrl + '/api/version', {
            method: 'GET',
            headers: this.createHeaders()
        })
            .then((response: Response) => {
                if (response.status >= 300) {
                    throw new Error("Error: " + response.status);
                }
                return response;
            })
            // TODO We have to map the date strings into Date objects
            .then((response) => response.json());
    }

}