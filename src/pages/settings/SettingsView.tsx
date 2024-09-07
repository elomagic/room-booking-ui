import { Container, Paper } from "@mui/material";

export default function SettingsView() {

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ mb: 3, p: 2 }}>
                Pager 1
            </Paper>

            <Paper sx={{ mb: 3, p: 2 }}>
                Pager 2
            </Paper>
        </Container>
    );
}