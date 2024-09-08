import {useTranslation} from "react-i18next";
import {Box, Fab, Stack} from "@mui/material";
import {Cancel, MoreTime} from "@mui/icons-material";
import {useState} from "react";
import ConformationDialog from "./ConformationDialog.tsx";
import {
    createAdHocAppointment,
    extendCurrentAppointment,
    getAppointmentsOfToday,
    getCurrentAppointment,
    terminateCurrentAppointment
} from "../../AppointmentManager.ts";
import DurationDialog from "./DurationDialog.tsx";

interface ControlsProps {
    bookable: boolean;
}

export default  function Controls(props: Readonly<ControlsProps>) {

    const { t } = useTranslation();

    const [openTerminateDialog, setOpenTerminateDialog] = useState(false);
    const [openDurationDialog, setOpenDurationDialog] = useState(false);

    const handleDurationClick = (okClicked: boolean, duration: number) => {
        setOpenDurationDialog(false);

        if (!okClicked || duration < 30) {
            return;
        }

        const app = getCurrentAppointment(getAppointmentsOfToday());
        if (app === null) {
            // TODO Show error if failed
            createAdHocAppointment(duration);
        } else {
            // TODO Show error if failed
            extendCurrentAppointment(duration);
        }
    };

    const handleTerminateClick = (yesClicked: boolean) => {
        setOpenTerminateDialog(false);

        if (!yesClicked) {
            return;
        }

        // TODO Show error if failed
        terminateCurrentAppointment();
    }

    return (
        <Stack direction="row" spacing={2} margin={3}>
            <Fab color="info" variant="extended"><Stack direction="row" spacing={1} onClick={() => setOpenDurationDialog(true)}><MoreTime/><Box>{t(props.bookable ? "occupy" : "extend")}</Box></Stack></Fab>
            {!props.bookable && <Fab color="info" variant="extended"><Stack direction="row" spacing={1} onClick={() => setOpenTerminateDialog(true)}><Cancel/><Box>{t("terminate")}</Box></Stack></Fab>}

            <ConformationDialog
                open={openTerminateDialog}
                title={t("terminate-booking")}
                text={t('terminate-booking-text')}
                onClick={handleTerminateClick}
            />
            <DurationDialog
                open={openDurationDialog}
                onClick={handleDurationClick}
            />
        </Stack>
    );

}