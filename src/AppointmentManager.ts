// TODO import * as ews from 'ews-javascript-api';
import { v4 as uuidv4 } from 'uuid';
//import * as crypto from 'crypto';

export interface Appointment {
    uid: string;
    start: Date
    end: Date
    subject: string;
}

/* TODO
const createEwsService = (): ews.ExchangeService => {
    const service = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
    service.Credentials = new ews.WebCredentials(localStorage.getItem("ext.username") ?? "username", localStorage.getItem("ext.password") ?? "secret");
    service.Url = new ews.Uri(localStorage.getItem("ext.url") ?? "https://localhost:49152/ms-ews-url-not-set");

    return service;
}
 */

const currentFloorDay = (): number => {
    const date = new Date()
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

export const getAppointmentsOfToday = (): Promise<Appointment[]> => {

    const api = localStorage.getItem("ext.api") ?? "demo";

    if (api === "demo") {
        return Promise.resolve([
            {
                uid: uuidv4(),
                start: new Date(currentFloorDay() + 9 * 60 * 60_000),
                end: new Date(currentFloorDay() + 12 * 60 * 60_000),
                subject: "Sprint Planning"
            },
            {
                uid: uuidv4(),
                start: new Date(currentFloorDay() + 12 * 60 * 60_000),
                end: new Date(currentFloorDay() + 12.5 * 60 * 60_000),
                subject: "AdHoc Appointment"
            },
            {
                uid: uuidv4(),
                start: new Date(currentFloorDay() + 15 * 60 * 60_000),
                end: new Date(currentFloorDay() + 16 * 60 * 60_000),
                subject: "Rnd Steering"
            },
            {
                uid: crypto.randomUUID(),
                start: new Date(currentFloorDay() + 17 * 60 * 60_000),
                end: new Date(currentFloorDay() + 17.75 * 60 * 60_000),
                subject: "Afterwork Meeting :-)"
            },
        ])
    } else if ("ews" === api) {
        // Microsoft Exchange Web Services (Retired by Microsoft)
        /* TODO
        const calendarView = new ews.CalendarView(
            ews.DateTime.Now.AddHours(-24),
            ews.DateTime.Now.AddDays(1)
        );

        const service = createEwsService();
        const folderId = new ews.FolderId(ews.WellKnownFolderName.Calendar, new ews.Mailbox(localStorage.getItem("ext.resourceId") ?? "unknown@anywhere.com"));

        return ews.CalendarFolder
            .Bind(service, folderId)
            .then((cf) => cf.FindAppointments(calendarView))
            .then((result: ews.FindItemsResults<ews.Appointment>) =>
                result
                    .Items
                    .map((a) => {
                        return {
                            uid: a.ICalUid,
                            start: new Date(a.Start.Date.TotalMilliSeconds),
                            end: new Date(a.End.Date.TotalMilliSeconds),
                            subject: a.Subject
                        } as Appointment;
                    })
                //do what you want with user availability
            );

         */
    }

    // Implement missing APIs
    return Promise.resolve([]);
}

export const getCurrentAppointment = (appointments: Appointment[]): Appointment | null => {
    const currentDate: Date = new Date();

    const apps = appointments.filter(a => currentDate > a.start && currentDate < a.end)

    return apps.length ? apps[0] : null;
}

export const getNextAppointment = (appointments: Appointment[]): Appointment | null => {
    const currentDate: Date = new Date();

    const apps = appointments
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .filter(a => a.start > currentDate)

    return apps.length ? apps[0] : null;
}

export const terminateCurrentAppointment = (): Promise<boolean> => {
    return getAppointmentsOfToday()
        .then((apps) => getCurrentAppointment(apps))
        .then((app) => {
            if (app == null) {
                return Promise.resolve(true);
            }

            app.end = new Date();

            // TODO Update app in backend

            return false;
        });
}

export const extendCurrentAppointment = (durationInMinutes: number): Promise<boolean> => {
    return getAppointmentsOfToday()
        .then((apps) => getCurrentAppointment(apps))
        .then((app) => {
            if (app == null) {
                return false;
            }

            app.end.setTime(app.end.getTime() + durationInMinutes * 60_000);

            // TODO Update app in backend

            return true;
        });
}

export const createAdHocAppointment = (durationInMinutes: number): Promise<boolean> => {
    return getAppointmentsOfToday()
        .then((apps) => getCurrentAppointment(apps))
        .then((app) => {
            if (app == null) {
                return false;
            }

            const api = localStorage.getItem("ext.api") ?? "demo";

            if ("ews" === api) {
                console.log(durationInMinutes)
                /* TODO
                const service = createEwsService()

                const newApp: ews.Appointment = new ews.Appointment(service);
                newApp.Start = ews.DateTime.Now;
                newApp.End = ews.DateTime.Now.AddMinutes(durationInMinutes);
                newApp.Subject = "AdHoc Appointment";
                newApp.Resources.Add(new ews.Attendee(localStorage.getItem("ext.resourceId") ?? "unknown@anywhere.com"));

                console.log(newApp);

                // Save app in backend ???
                return newApp.Save().then(() => true);

                 */
            }

            return true;
        });
}