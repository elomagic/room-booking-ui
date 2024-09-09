import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab,
    Stack
} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";

interface DurationDialogProps {
    open: boolean;
    title?: string|null;
    onClick: (okClick: boolean, duration: number) => void;
}

export default function DurationDialog(props: Readonly<DurationDialogProps>) {

    const { t } = useTranslation();
    const [open, setOpen] = useState(props.open);
    const [duration, setDuration] = useState<number>(30);

    useEffect(() => {
        setOpen(props.open);
    }, [props]);

    const handleIncreaseClick = () => {
        setDuration(duration + 30);

    }

    const handleDecreaseClick = () => {
        if (duration > 30) {
            setDuration(duration - 30);
        }
    }

    const handleCancelClick = () => {
        props.onClick && props.onClick(false, duration);
    };

    const handleOkClick = () => {
        props.onClick && props.onClick(true, duration);
    }

    return (
        <Dialog open={open} onClose={handleCancelClick}>
            <DialogTitle>
                {props.title && <div>{props.title}</div>}
                {!props.title && t('duration')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Fab onClick={handleDecreaseClick}><Remove/></Fab>
                        <Chip label={duration + " " + t("minutes")} sx={{ fontSize: "1.5rem", padding: "1em" }}/>
                        <Fab onClick={handleIncreaseClick}><Add/></Fab>
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleCancelClick}>
                    {t('cancel')}
                </Button>
                <Button color='error' onClick={handleOkClick}>
                    {t('ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}