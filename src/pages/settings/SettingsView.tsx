import {
    Button, Checkbox,
    Container,
    FormControl, FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent, Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import i18n from "i18next";

export default function SettingsView() {

    const { t } = useTranslation();

    const [language, setLanguage] = useState<string>(localStorage.getItem("language") ?? "en");
    const [name, setName] = useState<string>(localStorage.getItem("room.name") ?? "");
    const [capacity, setCapacity] = useState<string>(localStorage.getItem("room.capacity") ?? "0");
    const [microphoneSupport, setMicrophoneSupport] = useState<boolean>("true" === (localStorage.getItem("room.microphoneSupport") ?? "false"));
    const [screenCastSupport, setScreenCastSupport] = useState<boolean>("true" === (localStorage.getItem("room.screenCastSupport") ?? "false"));
    const [webCameraSupport, setWebCameraSupport] = useState<boolean>("true" === (localStorage.getItem("room.webCameraSupport") ?? "false"));

    const [url, setUrl] = useState<string>(localStorage.getItem("ext.url") ?? "");
    const [resourceId, setResourceId] = useState<string>(localStorage.getItem("ext.resourceId") ?? "");

    const handleChange = (event: SelectChangeEvent) => {
        const l = event.target.value
        setLanguage(l);

        i18n.changeLanguage(l)
            .then(() => dayjs.locale(l));
    };

    const handleSaveClick = () => {
        localStorage.setItem("room.name", name);
        localStorage.setItem("room.capacity", capacity);
        localStorage.setItem("room.screenCastSupport", screenCastSupport ? "true" : "false");
        localStorage.setItem("room.microphoneSupport", microphoneSupport ? "true" : "false");
        localStorage.setItem("room.webCameraSupport", webCameraSupport ? "true" : "false");
        localStorage.setItem("language", language);

        localStorage.setItem("ext.url", url);
        localStorage.setItem("ext.resourceId", resourceId);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ mb: 3, p: 2 }}>
                <h2>{t("display")}</h2>

                <Stack direction="column" spacing={2}>
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
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="language-label-id">{t("language")}</InputLabel>
                        <Select
                            labelId="anguage-label-id"
                            label={t("language")}
                            color="primary"
                            value={language}
                            onChange={handleChange}
                            variant="outlined">
                            <MenuItem value="en" className="LanguageSelector Item">English (American)</MenuItem>
                            <MenuItem value="de" className="LanguageSelector Item">German</MenuItem>
                        </Select>
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

                    <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                </Stack>
            </Paper>

            <Paper sx={{mb: 3, p: 2}}>
                <h2>{t("integration")}</h2>

                <Stack direction="column" spacing={2}>
                    <FormControl fullWidth>
                        <TextField
                            label={t("url")}
                            value={url}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setUrl(event.target.value);
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            label={t("resource-id")}
                            value={url}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setResourceId(event.target.value);
                            }}
                        />
                    </FormControl>

                    <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                </Stack>
                // TODO Calendar integration Google / Outlook / Exchange (OnPrem) / CalDav???
            </Paper>
        </Container>
    );
}