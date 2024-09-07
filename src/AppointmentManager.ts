export interface Appointment {
    start: Date
    end: Date
    subject: string;
}

const currentFloorDay = (): number => {
    const date = new Date()
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

export const getAppointmentsOfToday = (): Appointment[] => {
    return [
        {
            start: new Date(currentFloorDay() + 9 * 60 * 60_000),
            end: new Date(currentFloorDay() + 12 * 60 * 60_000),
            subject: "Sprint Planning"
        },
        {
            start: new Date(currentFloorDay() + 12 * 60 * 60_000),
            end: new Date(currentFloorDay() + 12.5 * 60 * 60_000),
            subject: "AdHoc Appointment"
        },
        {
            start: new Date(currentFloorDay() + 15 * 60 * 60_000),
            end: new Date(currentFloorDay() + 16 * 60 * 60_000),
            subject: "Rnd Steering"
        },
        {
            start: new Date(currentFloorDay() + 17 * 60 * 60_000),
            end: new Date(currentFloorDay() + 17.75 * 60 * 60_000),
            subject: "Afterwork Meeting :-)"
        },
    ];
}

export const getCurrentAppointment = (appointments: Appointment[]): Appointment | null => {
    const currentDate: Date = new Date();

    const apps = appointments.filter(a => {
        return currentDate > a.start && currentDate < a.end;
    })

    return apps.length ? apps[0] : null;
}

export const terminateCurrentAppointment = (): boolean => {
    const app = getCurrentAppointment(getAppointmentsOfToday());

    if (app == null) {
        return true;
    }

    app.end = new Date();

    // TODO Update app in backend

    return false;
}

export const extendCurrentAppointment = (durationInMinutes: number): boolean => {
    const app = getCurrentAppointment(getAppointmentsOfToday());

    if (app == null) {
        return false;
    }

    app.end.setTime(app.end.getTime() + durationInMinutes * 60_000);

    // TODO Update app in backend

    return true;
}

export const createAdHocAppointment = (durationInMinutes: number): boolean => {
    const app = getCurrentAppointment(getAppointmentsOfToday());

    if (app == null) {
        return false;
    }

    const newApp: Appointment = {
        start: new Date(),
        end: new Date(Date.now() + durationInMinutes * 60_000),
        subject: "AdHoc Appointment"
    }

    // TODO Save app in backend

    return true;
}
