import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import i18n from "i18next";
import {encryptString} from "../../stringcrypt.ts";

export default function SettingsView() {

    const { t } = useTranslation();
    const passwordPlaceholder = "do_ya_think_i_am_a_stupid_dev???";

    const [language, setLanguage] = useState<string>(localStorage.getItem("rb.language") ?? "en");
    const [name, setName] = useState<string>(localStorage.getItem("rb.room.name") ?? "");
    const [capacity, setCapacity] = useState<string>(localStorage.getItem("rb.room.capacity") ?? "0");
    const [microphoneSupport, setMicrophoneSupport] = useState<boolean>("true" === (localStorage.getItem("rb.room.microphoneSupport") ?? "false"));
    const [screenCastSupport, setScreenCastSupport] = useState<boolean>("true" === (localStorage.getItem("rb.room.screenCastSupport") ?? "false"));
    const [webCameraSupport, setWebCameraSupport] = useState<boolean>("true" === (localStorage.getItem("rb.room.webCameraSupport") ?? "false"));

    const [api, setApi] = useState<string>(localStorage.getItem("rb.ext.api") ?? "demo");
    const [url, setUrl] = useState<string>(localStorage.getItem("rb.ext.url") ?? "");
    const [username, setUsername] = useState<string>(localStorage.getItem("rb.ext.username") ?? "");
    const [password, setPassword] = useState<string>(passwordPlaceholder);
    const [resourceId, setResourceId] = useState<string>(localStorage.getItem("rb.ext.resourceId") ?? "");

    const handleChange = (event: SelectChangeEvent) => {
        const l = event.target.value
        setLanguage(l);

        i18n.changeLanguage(l)
            .then(() => dayjs.locale(l));
    };

    const handleSaveClick = () => {
        localStorage.setItem("rb.room.name", name);
        localStorage.setItem("rb.room.capacity", capacity);
        localStorage.setItem("rb.room.screenCastSupport", screenCastSupport ? "true" : "false");
        localStorage.setItem("rb.room.microphoneSupport", microphoneSupport ? "true" : "false");
        localStorage.setItem("rb.room.webCameraSupport", webCameraSupport ? "true" : "false");
        localStorage.setItem("rb.language", language);

        localStorage.setItem("rb.ext.api", api);
        localStorage.setItem("rb.ext.url", url);
        localStorage.setItem("rb.ext.username", username);
        if (passwordPlaceholder !== password) {
            localStorage.setItem("rb.ext.password", encryptString(password));
            setPassword(passwordPlaceholder);
        }
        localStorage.setItem("rb.ext.resourceId", resourceId);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack direction="row" spacing={2} margin={"1em 0 "} justifyContent="center">
                <Button variant="contained" onClick={handleSaveClick}>{t("save")}</Button>
                <Button variant="contained" href="/">{t("back")}</Button>
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
                            <MenuItem value="proxy-ews">Microsoft EWS Local Proxy</MenuItem>
                            <MenuItem value="ews">Microsoft EWS (e.g. On-Premises) (Retired by Microsoft)</MenuItem>
                            <MenuItem value="o365">Office 365 (not implemented yet)</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("url")}
                            value={url}
                            type="url"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setUrl(event.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("resource-id")}
                            value={resourceId}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setResourceId(event.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("username")}
                            value={username}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setUsername(event.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("password")}
                            value={password}
                            type="password"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </FormControl>
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
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("name")}
                            value={name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("capacity")}
                            value={capacity}
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCapacity(event.target.value);
                            }}
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
                        <Checkbox checked={microphoneSupport} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setMicrophoneSupport(event.target.checked);
                        }} />} label={t("microphone-support")} />

                    <FormControlLabel control={
                        <Checkbox checked={screenCastSupport} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setScreenCastSupport(event.target.checked);
                        }} />} label={t("screencast-support")} />

                    <FormControlLabel control={
                        <Checkbox checked={webCameraSupport} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setWebCameraSupport(event.target.checked);
                        }} />} label= {t("webCamera-support")} />
                </Stack>
            </Paper>

            <Stack direction="row" spacing={2} margin={"1em 0 "} justifyContent="center">
                <Button variant="contained" onClick={handleSaveClick}>{t("save")}</Button>
                <Button variant="contained" href="/">{t("back")}</Button>
            </Stack>
        </Container>
    );
}