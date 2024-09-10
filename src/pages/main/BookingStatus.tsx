import {useTranslation} from "react-i18next";
import {Box, Container, Stack} from "@mui/material";
import dayjs from "dayjs";
import {Appointment} from "../../providers/AppointmentProvider.ts";

interface BookingStatusProps {
    appointment: Appointment | null;
    nextAppointment: Appointment | null;
}

export default  function BookingStatus(props: Readonly<BookingStatusProps>) {

    const { t } = useTranslation();

    return (
        <Container sx={{ margin: "3em 0"}} className={"BorderStatus " + (props.appointment ? "Booked" : "Bookable")}>
            <Box sx={{ fontSize: "84px", fontWeight: "700", color: "white" }}>
                {t(props.appointment ? "occupied" : "bookable")}
            </Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ color: "lightgrey" }} paddingBottom={3}>
                {props.appointment &&
                    <>
                        <Box sx={{ fontSize: "36px" }}>
                            {dayjs(props.appointment.start).format(t("time-format-short"))}-{dayjs(props.appointment.end).format(t("time-format-short"))}
                        </Box>
                    <Box sx={{ fontSize: "32px" }}>{props.appointment.subject ?? "No Subject"}</Box>
                    </>
                }
                {!props.appointment &&
                    <Box sx={{ fontSize: "36px" }}>
                        {props.nextAppointment && t("next-booking-at", { val: dayjs(props.nextAppointment.start).format(t("time-format-short")) })}
                        {!props.nextAppointment && t("no-more-bookings-today")}
                    </Box>
                }
            </Stack>
        </Container>
    );

}