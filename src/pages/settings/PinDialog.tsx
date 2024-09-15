import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

interface PinDialogProps {
    open: boolean;
    error: boolean;
    onClick: (okClick: boolean, pin: string | null) => void;
}

export default function PinDialog(props: Readonly<PinDialogProps>) {

    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);
    const [pin, setPin] = useState<string|null>(null);

    useEffect(() => {
        setError(props.error);
    }, [props]);

    const handlePinChangeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setPin(event.target.value);
    }

    const handleCancelClick = () => {
        props.onClick(false, null);
    };

    const handleOkClick = () => {
        props.onClick && props.onClick(true, pin);
    }

    return (
        <Dialog open={props.open} onClose={handleCancelClick}>
            <DialogTitle>{t("enter-pin")}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            error={error}
                            value={pin}
                            type="password"
                            helperText={error && t("incorrect_pin")}
                            onChange={handlePinChangeClick}
                        />
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleCancelClick}>
                    {t('cancel')}
                </Button>
                <Button variant='contained' onClick={handleOkClick}>
                    {t('ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}