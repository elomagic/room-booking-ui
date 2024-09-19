import {AppointmentProvider} from "./providers/AppointmentProvider.ts";
import {DemoProvider} from "./providers/DemoProvider.ts";
import {EwsProxyProvider} from "./providers/EwsProxyProvider.ts";

export const createProviderApi = (productiveMode: boolean): AppointmentProvider => {

    return productiveMode ? new EwsProxyProvider() : new DemoProvider();

}

export const createProvider = (): AppointmentProvider => {

    const productiveMode = "true" === (localStorage.getItem("rb.productiveMode") ?? "false");

    return createProviderApi(productiveMode);

}
