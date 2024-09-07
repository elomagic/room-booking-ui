import {Box, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Person} from "@mui/icons-material";

export default  function RoomProperties() {

    const { t } = useTranslation();

    const [capacity] = useState<string>(localStorage.getItem("room.capacity") ?? "0");
    const [name] = useState<string>(localStorage.getItem("room.name") ?? "Room name not configured");

    return (
        <Container sx={{ lineHeight: "normal"}}>
            <Box sx={{ fontSize: "24px", color: "lightgray" }}>
                <Person sx={{ fontSize: "1.7rem", verticalAlign: "text-bottom"}}/> {capacity} {t("persons")}
            </Box>
            <Box sx={{ fontSize: "48px", color: "white"}}>
                {name}
            </Box>
        </Container>
    );

}