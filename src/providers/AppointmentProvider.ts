
export interface Appointment {
    uid: string;
    start: Date
    end: Date
    subject: string;
}

export abstract class AppointmentProvider {

    getCurrentAppointment(appointments: Appointment[]): Appointment | null {
        const currentDate: Date = new Date();

        const apps = appointments.filter(a => currentDate > a.start && currentDate < a.end)

        return apps.length ? apps[0] : null;
    }

    getNextAppointment(appointments: Appointment[]): Appointment | null {
        const currentDate: Date = new Date();

        const apps = appointments
            .sort((a, b) => a.start.getTime() - b.start.getTime())
            .filter(a => a.start > currentDate)

        return apps.length ? apps[0] : null;
    }

    abstract getAppointmentsOfToday(): Promise<Appointment[]>;

    abstract extendCurrentAppointment(durationInMinutes: number): Promise<boolean>;

    abstract terminateCurrentAppointment(): Promise<boolean>;

    abstract createAdHocAppointment(durationInMinutes: number): Promise<boolean>;

    abstract getBackendVersion(): Promise<any>;

    abstract validatePin(pin: string): Promise<boolean>;

    abstract testConfiguration(url: string, apiKey: string, resourceId: string): Promise<boolean>;

}
