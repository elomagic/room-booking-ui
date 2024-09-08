import Grid from '@mui/material/Grid2';
import "./MainView.css"
//import reactLogo from '../../assets/react.svg'
//import viteLogo from '/vite.svg'
import DigitalClock from "./DigitalClock.tsx";
import Timeline from "./Timeline.tsx";
import RoomProperties from "./RoomProperties.tsx";
import BookingStatus from "./BookingStatus.tsx";
import Controls from "./Controls.tsx";
import {useEffect, useState} from "react";
import {Settings} from "@mui/icons-material";
import {Fab} from "@mui/material";
import {Appointment, getAppointmentsOfToday, getCurrentAppointment} from "../../AppointmentManager.ts";

export default function MainView() {

    const [appointmentsToday, setAppointmentsToday] = useState<Appointment[]>([]);
    const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);

    const refreshUI = () => {
        const apps = getAppointmentsOfToday();
        setAppointmentsToday(apps)
        setCurrentAppointment(getCurrentAppointment(apps));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshUI();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Grid container sx={{ height: "100vh", width: "100%"}} spacing={2} className={"Border " + (currentAppointment ? "Booked" : "Bookable")}>
            <Grid size={8}>
                <DigitalClock />
                <RoomProperties />
                <BookingStatus appointment={currentAppointment}/>

                {/*
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                */}

                <Controls bookable={!currentAppointment} />
            </Grid>
            <Grid size={4}>
                <Timeline appointments={appointmentsToday}/>
            </Grid>

            <Fab sx={{ position: "absolute", right: "1em", bottom: "1em" }} href="/settings">
                <Settings />
            </Fab>
        </Grid>
    );
}
