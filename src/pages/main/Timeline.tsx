import {Box} from "@mui/material";
import TimelineUnit from "./TimelineUnit.tsx";
import {Appointment} from "../../AppointmentManager.ts";
import {useEffect, useRef} from "react";

interface TimelineProps {
    appointments: Appointment[];
}

const calcTop = (start: Date): number => {
    const date = new Date(start)
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return (start.getTime()-date.getTime())/30_000;
}
const calcHeight = (app : Appointment): number => {
    return (app.end.getTime()-app.start.getTime())/30_000 - 10;
}

export default function Timeline(props: Readonly<TimelineProps>) {

    const timeline = useRef<HTMLDivElement>(null);

    const panels = []
    for (let i = 0; i < 24; i++) {
        panels.push(<TimelineUnit key={"unit" + i} hour={i}/>)
    }

    const scrollToCurrent = () => {
        if (timeline.current !== null) {
            const date = new Date(Date.now() - 2 * 60 * 60 * 1000);
            timeline.current.scrollTop = calcTop(date);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            scrollToCurrent();
        }, 60000);

        scrollToCurrent();

        return () => clearInterval(interval);
    }, []);

    return (
        <Box overflow="scroll" maxHeight="98vh" position="relative" ref={timeline}>
            {panels}

            {props.appointments.map((a) => (
                <Box
                    key={a.start.getTime() + a.end.getTime()}
                    sx={{
                        padding: 0.4,
                        position: "absolute",
                        top: calcTop(a.start) + "px",
                        height: calcHeight(a) + "px",
                        width: "calc(100% - 70px)",
                        right: "8px",
                        backgroundColor: "#535bf2",
                        borderRadius: "4px",
                        zIndex: 5,
                        opacity: 0.8
                    }}
                >
                    {a.subject}
                </Box>
            ))}
        </Box>
    );

}