import { RouteLocationNormalized } from "vue-router";
import { RouteRecordName } from "vue-router";

export default function (path: RouteRecordName): Array<string>;
export default function (path: RouteRecordName, type: "first"): string;
export default function (path: RouteRecordName, type: "last"): string;

export default function (pathname: RouteRecordName, type?: "first" | "last") {
	if (!type) {
		return pathname.toString().split("-");
	} else {
		switch (type) {
			case "first":
				return pathname.toString().split("-")[0];
			case "last":
				return pathname.toString().split("-")[-1];
			default:
				throw new Error("useSplitRouterPath switch case default");
		}
	}
}
