import {
    Alert, AlertColor, Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Snackbar,
    Stack,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import i18n from "i18next";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {createProvider, createProviderApi} from "../../AppointmentManager.ts";
import PinDialog from "./PinDialog.tsx";
import p from "../../../package.json"
import LicenseList from "./LicenseList.tsx";

export default function SettingsView() {

    const { t } = useTranslation();
    const passwordPlaceholder = "do_ya_think_i_am_a_stupid_dev???";

    const navigate = useNavigate();
    const location = useLocation();

    const [backendVersion, setBackendVersion] = useState<string>("?");
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [pinError, setPinError] = useState<boolean>(false);

    const [language, setLanguage] = useState<string>(localStorage.getItem("rb.language") ?? "en");
    const [name, setName] = useState<string>(localStorage.getItem("rb.room.name") ?? "");
    const [capacity, setCapacity] = useState<string>(localStorage.getItem("rb.room.capacity") ?? "0");
    const [showTerminateButton, setShowTerminateButton] = useState<boolean>("true" === (localStorage.getItem("rb.room.showTerminateButton") ?? "false"));
    const [microphoneSupport, setMicrophoneSupport] = useState<boolean>("true" === (localStorage.getItem("rb.room.microphoneSupport") ?? "false"));
    const [screenCastSupport, setScreenCastSupport] = useState<boolean>("true" === (localStorage.getItem("rb.room.screenCastSupport") ?? "false"));
    const [webCameraSupport, setWebCameraSupport] = useState<boolean>("true" === (localStorage.getItem("rb.room.webCameraSupport") ?? "false"));

    const [api, setApi] = useState<string>(localStorage.getItem("rb.ext.api") ?? "demo");
    const [apiKey, setApiKey] = useState<string>(passwordPlaceholder);
    const [resourceId, setResourceId] = useState<string>(localStorage.getItem("rb.ext.resourceId") ?? "");

    const [snackbarText, setSnackbarText] = useState<string|null>(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("error");

    const handleChange = (event: SelectChangeEvent) => {
        const l = event.target.value
        setLanguage(l);

        i18n.changeLanguage(l)
            .then(() => dayjs.locale(l));
    };

    const handlePinClick = (okClick: boolean, pin: string | null) => {
        if (okClick && pin !== null) {
            createProvider()
                .validatePin(pin)
                .then(auth => {
                    setAuthorized(auth);
                    setPinError(!auth);
                }, () => {
                    setAuthorized(false)
                    setPinError(true);
                });
        } else {
            navigate("/");
        }
    }

    const handleTestClick = () => {
        setSnackbarText(null);
        createProviderApi(api)
            .testConfiguration(passwordPlaceholder == apiKey ? localStorage.getItem("rb.ext.apiKey") ?? "demo" : apiKey, resourceId)
            .then(() => {
                setSnackbarSeverity("success")
                setSnackbarText(t("successful"));
            }, (err) => {
                setSnackbarSeverity("error")
                setSnackbarText(err.message);
            })
    }

    const handleSnackbarClose = () => {
        setSnackbarText(null);
    }

    useEffect(() => {

        if (location.hash != null) {
            handlePinClick(true, location.hash.substring(1));
        } else {
            setSnackbarText(null);
            createProvider()
                .getBackendVersion()
                .then((dto) => {
                    setBackendVersion(dto.version);
                }, (err) => {
                    setSnackbarSeverity("error")
                    setSnackbarText(err.message);
                });
        }
    }, []);

    const handleSaveClick = () => {
        localStorage.setItem("rb.room.name", name);
        localStorage.setItem("rb.room.capacity", capacity);
        localStorage.setItem("rb.room.showTerminateButton", showTerminateButton ? "true" : "false");
        localStorage.setItem("rb.room.screenCastSupport", screenCastSupport ? "true" : "false");
        localStorage.setItem("rb.room.microphoneSupport", microphoneSupport ? "true" : "false");
        localStorage.setItem("rb.room.webCameraSupport", webCameraSupport ? "true" : "false");
        localStorage.setItem("rb.language", language);

        localStorage.setItem("rb.ext.api", api);
        if (passwordPlaceholder !== apiKey) {
            localStorage.setItem("rb.ext.apiKey", apiKey);
            setApiKey(passwordPlaceholder);
        }
        localStorage.setItem("rb.ext.resourceId", resourceId);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {authorized && (<React.Fragment>
                <Stack direction="row" spacing={2} margin={"1em 0 "} justifyContent="center">
                    <Button variant="contained" onClick={handleSaveClick}>{t("save")}</Button>
                    <Link to="/"><Button variant="contained">{t("back")}</Button></Link>
                </Stack>

                <Paper sx={{mb: 3, p: 2}}>
                    <h2>{t("integration")}</h2>

                    <Stack direction="column" spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id="language-label-id">{t("api")}</InputLabel>
                            <Select
                                labelId="anguage-label-id"
                                label={t("api")}
                                color="primary"
                                value={api}
                                onChange={(event: SelectChangeEvent) => setApi(event.target.value)}
                                variant="outlined">
                                <MenuItem value="demo">{t("demo-mode")}</MenuItem>
                                <MenuItem value="ews-proxy">Microsoft EWS</MenuItem>
                            </Select>
                        </FormControl>

                        {api == "ews-proxy" && (
                            <React.Fragment>
                                <FormControl fullWidth>
                                    <TextField
                                        label={t("resource-id")}
                                        value={resourceId}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setResourceId(event.target.value)}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label={t("apiKey")}
                                        value={apiKey}
                                        type="password"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value)}
                                    />
                                </FormControl>

                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={handleTestClick}>{t("test")}</Button>
                                </Stack>
                           </React.Fragment>
                        )}
                    </Stack>
                </Paper>

                <Paper sx={{ mb: 3, p: 2 }}>
                    <h2>{t("display")}</h2>

                    <Stack direction="column" spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id="language-label-id">{t("language")}</InputLabel>
                            <Select
                                labelId="anguage-label-id"
                                label={t("language")}
                                color="primary"
                                value={language}
                                onChange={handleChange}
                                variant="outlined">
                                <MenuItem value="en">English (American)</MenuItem>
                                <MenuItem value="de">German</MenuItem>
                                {/*<MenuItem value="fr">French</MenuItem>*/}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                label={t("name")}
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                label={t("capacity")}
                                value={capacity}
                                type="number"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCapacity(event.target.value)}
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                    },
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </FormControl>

                        <FormControlLabel control={
                            <Checkbox checked={showTerminateButton} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setShowTerminateButton(event.target.checked);
                            }} />} label={t("show-terminate-button")}
                        />

                        <FormControlLabel control={
                            <Checkbox checked={microphoneSupport} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setMicrophoneSupport(event.target.checked);
                            }} />} label={t("microphone-support")}
                        />

                        <FormControlLabel control={
                            <Checkbox checked={screenCastSupport} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setScreenCastSupport(event.target.checked);
                            }} />} label={t("screencast-support")}
                        />

                        <FormControlLabel control={
                            <Checkbox checked={webCameraSupport} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setWebCameraSupport(event.target.checked);
                            }} />} label= {t("webCamera-support")}
                        />
                    </Stack>
                </Paper>

                <Stack direction="row" spacing={2} margin={"1em 0"} justifyContent="center">
                    <Button variant="contained" onClick={handleSaveClick}>{t("save")}</Button>
                    <Link to="/"><Button variant="contained">{t("back")}</Button></Link>
                </Stack>

                <Paper sx={{mb: 3, p: 2}}>
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{flexGrow: 1}}
                        alignItems="center"
                    >
                        <Stack direction="row" spacing={2}>
                            {t("frontend-version")}: {p.version}
                            &nbsp;&bull;&nbsp;
                            {t("backend-version")}: {backendVersion}
                        </Stack>

                        <Divider sx={{width: "100%"}}/>

                        <Stack direction="row" spacing={2}>
                            {t('developed_by')}
                            &nbsp;&bull;&nbsp;
                            <a href='https://github.com/elomagic/room-booking-backend' target="_blank">GitHub</a>
                        </Stack>

                        <Divider sx={{width: "100%"}}/>

                        <Box textAlign="center">
                            {t('powered_by_oss')}

                            <LicenseList/>
                        </Box>
                    </Stack>
                </Paper>
            </React.Fragment>)}

            <PinDialog open={!authorized} error={pinError} onClick={handlePinClick}/>

            <Snackbar open={snackbarText != null} autoHideDuration={2000} onClose={handleSnackbarClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "center" }} >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </Container>
    );
}