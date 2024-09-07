import {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

export default function DigitalClock() {

    const { t } = useTranslation();

    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container sx={{lineHeight: "normal", marginBottom: "36px"}}>
            <Box sx={{ fontSize: "120px", fontWeight: "700", color: "white" }}>
                {dayjs(date).format(t("time-format-short"))}
            </Box>
            <Box sx={{ fontSize: "24px", color: "darkgray" }}>
                {dayjs(date).format(t("date-format-weekday"))}
            </Box>
        </Container>
    );

}