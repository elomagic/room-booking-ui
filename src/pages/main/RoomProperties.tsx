import {Box, Container, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Cast, Mic, Person, Videocam} from "@mui/icons-material";

export default  function RoomProperties() {

    const { t } = useTranslation();

    const [capacity] = useState<string>(localStorage.getItem("room.capacity") ?? "0");
    const [name] = useState<string>(localStorage.getItem("room.name") ?? "Room name not configured");
    const [microphoneSupport] = useState<boolean>("true" === (localStorage.getItem("room.microphoneSupport") ?? "false"));
    const [screenCastSupport] = useState<boolean>("true" === (localStorage.getItem("room.screenCastSupport") ?? "false"));
    const [webCameraSupport] = useState<boolean>("true" === (localStorage.getItem("room.webCameraSupport") ?? "false"));

    return (
        <Container sx={{ lineHeight: "normal"}}>
            <Box sx={{ fontSize: "48px", color: "white"}}>
                {name}
            </Box>
            <Stack direction="row" spacing={1} sx={{ fontSize: "24px", color: "lightgray" }}>
                <Person sx={{ fontSize: "1.7rem", verticalAlign: "text-bottom"}}/> {capacity} {t("persons")}
                {screenCastSupport && <Cast sx={{ fontSize: "1.7rem", verticalAlign: "text-bottom"}}/>}
                {webCameraSupport && <Videocam sx={{ fontSize: "1.7rem", verticalAlign: "text-bottom"}}/>}
                {microphoneSupport && <Mic sx={{ fontSize: "1.7rem", verticalAlign: "text-bottom"}}/>}
            </Stack>
        </Container>
    );

}