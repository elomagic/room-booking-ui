import {Appointment, Provider} from "./AppointmentProvider.ts";

export class EwsProxyProvider extends Provider {

    createAdHocAppointment(_durationInMinutes: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    extendCurrentAppointment(_durationInMinutes: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    getAppointmentsOfToday(): Promise<Appointment[]> {
        return Promise.resolve([]);
    }

    terminateCurrentAppointment(): Promise<boolean> {
        return Promise.resolve(false);
    }

}