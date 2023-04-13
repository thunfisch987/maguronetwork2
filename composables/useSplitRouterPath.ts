import { RouteRecordName } from "vue-router";

export default function (path: RouteRecordName): Array<string>;
export default function (path: RouteRecordName, index: "first"): string;
export default function (path: RouteRecordName, index: "last"): string;

export default function (pathname: RouteRecordName, index?: "first" | "last") {
	if (!index) {
		return pathname.toString().split("-");
	} else {
		switch (index) {
			case "first":
				return pathname.toString().split("-")[0];
			case "last":
				return pathname.toString().split("-")[-1];
			default:
				throw new Error("useSplitRouterPath switch case default");
		}
	}
}
