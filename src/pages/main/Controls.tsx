import {useTranslation} from "react-i18next";
import {Box, Fab, Stack} from "@mui/material";
import {Cancel, MoreTime} from "@mui/icons-material";
import {useState} from "react";
import ConfirmationDialog from "./ConfirmationDialog.tsx";
import {createProvider} from "../../AppointmentManager.ts";
import DurationDialog from "./DurationDialog.tsx";

interface ControlsProps {
    bookable: boolean;
    showTerminate: boolean;
}

export default function Controls(props: Readonly<ControlsProps>) {

    const { t } = useTranslation();

    const [openTerminateDialog, setOpenTerminateDialog] = useState(false);
    const [openDurationDialog, setOpenDurationDialog] = useState(false);

    const handleDurationClick = (okClicked: boolean, duration: number) => {
        setOpenDurationDialog(false);

        if (!okClicked || duration < 30) {
            return;
        }

        const provider = createProvider();

        provider.getAppointmentsOfToday()
            .then((apps) => provider.getCurrentAppointment(apps))
            .then((app) => app == null ? provider.createAdHocAppointment(duration) : provider.extendCurrentAppointment(duration))
            .then(() => {
                // TODO Show success or error if failed
            });
    };

    const handleTerminateClick = (yesClicked: boolean) => {
        setOpenTerminateDialog(false);

        if (!yesClicked) {
            return;
        }

        // TODO Show success or error if failed
        createProvider().terminateCurrentAppointment();
    }

    return (
        <Stack direction="row" spacing={2} margin={3} flexGrow={1} alignItems="end">
            {/* TODO Show only when user has right to extend or terminate booking */}
            <Fab color="info" variant="extended"><Stack direction="row" spacing={1} onClick={() => setOpenDurationDialog(true)}><MoreTime/><Box>{t(props.bookable ? "occupy" : "extend")}</Box></Stack></Fab>
            {!props.bookable && props.showTerminate && <Fab color="info" variant="extended"><Stack direction="row" spacing={1} onClick={() => setOpenTerminateDialog(true)}><Cancel/><Box>{t("terminate")}</Box></Stack></Fab>}

            <ConfirmationDialog
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