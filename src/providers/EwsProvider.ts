import * as ews from 'ews-javascript-api';
import {Appointment, AppointmentProvider} from "./AppointmentProvider.ts";

export class EwsProvider extends AppointmentProvider {

    service: ews.ExchangeService = this.createEwsService();

    createEwsService(): ews.ExchangeService {
        const service = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
        service.Credentials = new ews.WebCredentials(localStorage.getItem("rb.ext.username") ?? "username", localStorage.getItem("rb.ext.password") ?? "secret");
        service.Url = new ews.Uri(localStorage.getItem("rb.ext.url") ?? "https://localhost:49152/ms-ews-url-not-set");
        return service;
    }

    createAdHocAppointment(durationInMinutes: number): Promise<boolean> {
        const newApp: ews.Appointment = new ews.Appointment(this.service);
        newApp.Start = ews.DateTime.Now;
        newApp.End = ews.DateTime.Now.AddMinutes(durationInMinutes);
        newApp.Subject = "AdHoc Appointment";
        newApp.Resources.Add(new ews.Attendee(localStorage.getItem("ext.resourceId") ?? "unknown@anywhere.com"));

        console.log(newApp);

        // Save app in backend ???
        return newApp.Save().then(() => true);
    }

    extendCurrentAppointment(durationInMinutes: number): Promise<boolean> {
        return this.getAppointmentsOfToday()
            .then((apps) => this.getCurrentAppointment(apps))
            .then((app) => {
                if (app == null) {
                    return false;
                }

                app.end.setTime(app.end.getTime() + durationInMinutes * 60_000);

                // TODO Update app in backend

                return true;
            });
    }

    getAppointmentsOfToday(): Promise<Appointment[]> {
        const calendarView = new ews.CalendarView(
            ews.DateTime.Now.AddHours(-24),
            ews.DateTime.Now.AddDays(1)
        );

        const folderId = new ews.FolderId(ews.WellKnownFolderName.Calendar, new ews.Mailbox(localStorage.getItem("ext.resourceId") ?? "unknown@anywhere.com"));

        return ews.CalendarFolder
            .Bind(this.service, folderId)
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
    }

    terminateCurrentAppointment(): Promise<boolean> {
        return this.getAppointmentsOfToday()
            .then((apps) => this.getCurrentAppointment(apps))
            .then((app) => {
                if (app == null) {
                    return Promise.resolve(true);
                }

                app.end = new Date();

                // TODO Update app in backend

                return false;
            });
    }

}