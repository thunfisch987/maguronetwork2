export default function () {
	return useState<boolean>("sidebarEnabled", () => false);
}
