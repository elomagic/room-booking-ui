import {Provider} from "./providers/AppointmentProvider.ts";
import {EwsProvider} from "./providers/EwsProvider.ts";
import {DemoProvider} from "./providers/DemoProvider.ts";
import {EwsProxyProvider} from "./providers/EwsProxy.ts";

export const createProvider = (): Provider => {

    const api = localStorage.getItem("ext.api") ?? "demo"
    if ("ews" === api) {
        return new EwsProvider();
    } else if ("ews-proxy" === api) {
        return new EwsProxyProvider();
    }

    return new DemoProvider();

}
