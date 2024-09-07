import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";
import dayjs from "dayjs";

interface TimelineUnitProps {
    hour: number;
}

export default  function TimelineUnit(props: Readonly<TimelineUnitProps>) {

    const { t } = useTranslation();

    return (
        <Box sx={{
            borderBottom: "2px solid",
            borderColor: "gray",
            padding: "4px",
            height: "110px",
        }}>
            {dayjs(new Date(2024, 0, 1, props.hour, 0, 0)).format(t("time-hour-short"))}
        </Box>
    );

}