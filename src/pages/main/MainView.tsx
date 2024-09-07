import { Container } from '@mui/material';
import {useTranslation} from "react-i18next";

export default function MainView() {

    const { t } = useTranslation();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {t('about')} Tescht !!!
        </Container>
    );
}
