import {
    Button,
    Container,
    FormControl,
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

    const [name, setName] = useState<string>(localStorage.getItem("room.name") ?? "");
    const [language, setLanguage] = useState<string>(localStorage.getItem("language") ?? "en");
    const [capacity, setCapacity] = useState<string>(localStorage.getItem("room.capacity") ?? "0");

    const handleChange = (event: SelectChangeEvent) => {
        let l = event.target.value
        setLanguage(l);
        dayjs.locale(l)
        i18n.changeLanguage(l);
        // TODO localStorage.setItem("language", l);
    };

    const handleSaveClick = () => {
        localStorage.setItem("room.name", name);
        localStorage.setItem("room.capacity", capacity);
        localStorage.setItem("language", language);
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

                    <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                </Stack>
            </Paper>

            <Paper sx={{mb: 3, p: 2}}>
                <h2>{t("integration")}</h2>
                // TODO Calendar integration Google / Outlook / Exchange (OnPrem) / CalDav???
            </Paper>
        </Container>
    );
}