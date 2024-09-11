import {AppointmentProvider} from "./providers/AppointmentProvider.ts";
import {DemoProvider} from "./providers/DemoProvider.ts";
import {EwsProxyProvider} from "./providers/EwsProxyProvider.ts";

export const createProvider = (): AppointmentProvider => {

    const api = localStorage.getItem("rb.ext.api") ?? "demo"

    if ("ews-proxy" === api) {
        return new EwsProxyProvider();
    }

    return new DemoProvider();

}
