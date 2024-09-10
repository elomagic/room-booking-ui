import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import '../../../src/i18n/config';
import MainView from "../../../src/pages/main/MainView";
import i18n from "i18next";

test('should render MainView', async () => {
    await i18n.init();

    // Controls failed
    expect(render(<MainView />)).toBeTruthy();
});
