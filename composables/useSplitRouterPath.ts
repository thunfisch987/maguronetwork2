export default function (path: string): Array<string>;
export default function (path: string, type: "first"): string;
export default function (path: string, type: "last"): string;

export default function (path: string, type?: "first" | "last") {
	if (!type) {
		return path.split("-");
	} else {
		switch (type) {
			case "first":
				return path.split("-")[0];
			case "last":
				return path.split("-")[-1];
			default:
				throw new Error("useSplitRouterPath switch case default");
		}
	}
}
