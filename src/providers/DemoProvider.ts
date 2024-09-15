import {Appointment, AppointmentProvider} from "./AppointmentProvider.ts";
import {v4 as uuidv4} from "uuid";

const currentFloorDay = (): number => {
    const date = new Date()
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

export class DemoProvider extends AppointmentProvider {

    createAdHocAppointment(_durationInMinutes: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    extendCurrentAppointment(_durationInMinutes: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    getAppointmentsOfToday(): Promise<Appointment[]> {
        return Promise.resolve([
            {
                uid: uuidv4(),
                start: new Date(currentFloorDay() + 9 * 60 * 60_000),
                end: new Date(currentFloorDay() + 12 * 60 * 60_000),
                subject: "Sprint Planning"
            }, {
                uid: uuidv4(),
                start: new Date(currentFloorDay() + 12 * 60 * 60_000),
                end: new Date(currentFloorDay() + 12.5 * 60 * 60_000),
                subject: "AdHoc Appointment"
            }, {
                uid: uuidv4(),
                start: new Date(currentFloorDay() + 15 * 60 * 60_000),
                end: new Date(currentFloorDay() + 16 * 60 * 60_000),
                subject: "Rnd Steering"
            }, {
                uid: crypto.randomUUID(),
                start: new Date(currentFloorDay() + 17 * 60 * 60_000),
                end: new Date(currentFloorDay() + 17.75 * 60 * 60_000),
                subject: "Afterwork Meeting :-)"
            },
        ]);
    }

    terminateCurrentAppointment(): Promise<boolean> {
        return Promise.resolve(false);
    }

    getBackendVersion(): Promise<any> {
        return Promise.resolve({ version: "No backend in use" });
    }

    validatePin(pin: string): Promise<boolean> {
        return Promise.resolve(pin === "123456");
    }

}