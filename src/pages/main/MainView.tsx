import "./MainView.css"
//import reactLogo from '../../assets/react.svg'
import DigitalClock from "./DigitalClock.tsx";
import Timeline from "./Timeline.tsx";
import RoomProperties from "./RoomProperties.tsx";
import BookingStatus from "./BookingStatus.tsx";
import Controls from "./Controls.tsx";
import {useEffect, useState} from "react";
import {Settings} from "@mui/icons-material";
import {Alert, Fab, Snackbar, Stack} from "@mui/material";
import {createProvider} from "../../AppointmentManager.ts";
import {Appointment} from "../../providers/AppointmentProvider.ts";
import {Link, useNavigate} from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog.tsx";
import {useTranslation} from "react-i18next";

export default function MainView() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [appointmentsToday, setAppointmentsToday] = useState<Appointment[]>([]);
    const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
    const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
    const [showTerminateButton] = useState<boolean>(localStorage.getItem("rb.room.showTerminateButton") === "true");
    const [snackbarText, setSnackbarText] = useState<string|null>(null);

    const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

    const refreshUI = () => {
        const provider = createProvider();

        provider.getAppointmentsOfToday()
            .then((apps) => {
                setAppointmentsToday(apps)
                setCurrentAppointment(provider.getCurrentAppointment(apps));
                setNextAppointment(provider.getNextAppointment(apps));
            }, (err) => setSnackbarText(err.message));
    };

    const handleSnackbarClose = () => {
        setSnackbarText(null);
    }

    const handleOpenSettingsClick = (okClick: boolean) => {
        if (okClick) {
            navigate("/settings#123456");
        }

        setOpenSettingsDialog(false);
    }

    useEffect(() => {
        if (localStorage.getItem("rb.productiveMode") == null) {
            setOpenSettingsDialog(true);
        }

        const interval = setInterval(() => {
            refreshUI();
        }, 5000);

        refreshUI();

        return () => clearInterval(interval);
    }, []);

    return (
        <Stack direction="row" sx={{ height: "calc(100vh - 2em)", width: "calc(100% - 2em)"}} spacing={2} className={"Border " + (currentAppointment ? "Booked" : "Bookable")}>
            <Stack direction="column" width="75%" paddingRight="0.9em" sx={{ backgroundColor: "#171717", "borderRadius": "2em 0 0 2em" }}>
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

                <Controls bookable={!currentAppointment} showTerminate={showTerminateButton} />
            </Stack>
            <Stack direction="column" width="33%">
                <Timeline appointments={appointmentsToday}/>
            </Stack>

            <Link to="/settings">
                <Fab sx={{ position: "absolute", right: "1em", bottom: "1em" }}>
                   <Settings />
                </Fab>
            </Link>

            <Snackbar open={snackbarText != null} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {snackbarText}
                </Alert>
            </Snackbar>

            <ConfirmationDialog
                open={openSettingsDialog}
                text={t('first-open-settings')}
                okText={t('setup')}
                cancelText={t('no')}
                onClick={handleOpenSettingsClick}
            />
        </Stack>
    );
}
