import { Service } from "typedi";

import useCommand from "./command.hook";
import useEvent from "./event.hook";
import useQuery from "./query.hook";

// export the hooks
export default {
    Service,
    useCommand,
    useEvent,
    useQuery
};
