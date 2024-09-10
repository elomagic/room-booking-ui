import "./MainView.css"
//import reactLogo from '../../assets/react.svg'
import DigitalClock from "./DigitalClock.tsx";
import Timeline from "./Timeline.tsx";
import RoomProperties from "./RoomProperties.tsx";
import BookingStatus from "./BookingStatus.tsx";
import Controls from "./Controls.tsx";
import {useEffect, useState} from "react";
import {Settings} from "@mui/icons-material";
import {Fab, Stack} from "@mui/material";
import {createProvider} from "../../AppointmentManager.ts";
import {Appointment} from "../../providers/AppointmentProvider.ts";

export default function MainView() {

    const [appointmentsToday, setAppointmentsToday] = useState<Appointment[]>([]);
    const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
    const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);

    const refreshUI = () => {
        const provider = createProvider();

        provider.getAppointmentsOfToday()
            .then((apps) => {
                setAppointmentsToday(apps)
                setCurrentAppointment(provider.getCurrentAppointment(apps));
                setNextAppointment(provider.getNextAppointment(apps));
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshUI();
        }, 5000);

        refreshUI();

        return () => clearInterval(interval);
    }, []);

    return (
        <Stack direction="row" sx={{ height: "calc(100vh - 2em)", width: "calc(100% - 2em)"}} spacing={2} className={"Border " + (currentAppointment ? "Booked" : "Bookable")}>
            <Stack direction="column" width="66%" paddingRight="0.9em" sx={{ backgroundColor: "#171717", "borderRadius": "2em 0 0 2em" }}>
                <DigitalClock />
                <RoomProperties />
                <BookingStatus
                    appointment={currentAppointment}
                    nextAppointment={nextAppointment}
                />

                {/*
                <div>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                */}

                <Controls bookable={!currentAppointment} />
            </Stack>
            <Stack direction="column" width="33%">
                <Timeline appointments={appointmentsToday}/>
            </Stack>

            <Fab sx={{ position: "absolute", right: "1em", bottom: "1em" }} href="/settings">
                <Settings />
            </Fab>
        </Stack>
    );
}
