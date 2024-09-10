import {Appointment, AppointmentProvider} from "./AppointmentProvider.ts";

export class EwsProxyProvider extends AppointmentProvider {

    createHeaders(): Headers {
        // Since this request will send JSON data in the body,
        // we need to set the `Content-Type` header to `application/json`
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        // We also need to set the `Accept` header to `application/json`
        // to tell the server that we expect JSON in response
        headers.set('Accept', 'application/json')
        headers.set('rb-client-uid', localStorage.getItem("rb.uid") ?? "0")

        return headers;
    }

    createAdHocAppointment(durationInMinutes: number): Promise<boolean> {
        const request: RequestInfo = new Request('/rest/appointment', {
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
        const request: RequestInfo = new Request('/rest/appointment', {
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
        const request: RequestInfo = new Request('/rest/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'GET',
            headers: this.createHeaders()
        })

        return fetch(request)
            .then((response) => response.json());
    }

    terminateCurrentAppointment(): Promise<boolean> {
        const request: RequestInfo = new Request('/rest/appointment', {
            // We need to set the `method` to `POST` and assign the headers
            method: 'PUT',
            headers: this.createHeaders()
        })

        // Send the request and print the response
        return fetch(request)
            .then(res => res.status >= 200 && res.status < 300);
    }

}