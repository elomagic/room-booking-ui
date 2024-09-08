import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow} from "@mui/material";

interface ConformationDialogProps {
    uid?: string | undefined;
    open: boolean;
    title?: string|null;
    text: string;
    okText?: string|null;
    cancelText?: string;
    errorText?: string;
    onClick: (okClick: boolean, uid?: string|undefined) => void;
}

export default function ConformationDialog(props: Readonly<ConformationDialogProps>) {

    const { t } = useTranslation();
    const [open, setOpen] = useState(props.open);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        setOpen(props.open);
    }, [props]);

    const handleNoClick = () => {
        props.onClick && props.onClick(false, props.uid);
    };

    const handleYesClick = () => {
        setError(null);
        props.onClick && props.onClick(true, props.uid);
    }

    return (
        <Dialog open={open} onClose={handleNoClick}>
            <DialogTitle>
                {props.title && <div>{props.title}</div>}
                {!props.title && t('conformation')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{props.text}</DialogContentText>
                <div hidden={!error}>
                    <Grow
                        in={error != null}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(error != null ? { timeout: 1000 } : {})}
                    >
                        <Alert variant="filled" severity="error">{error}</Alert>
                    </Grow>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={handleYesClick}>
                    {props.okText && <div>{props.okText}</div>}
                    {!props.okText && t('ok')}
                </Button>
                <Button variant='contained' onClick={handleNoClick}>
                    {props.cancelText && <div>{props.cancelText}</div>}
                    {!props.cancelText && t('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}