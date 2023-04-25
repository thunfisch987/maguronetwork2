import sidebarJson from '@/assets/json/sidebarItems.json'

export type BaseSidebarItem = {
	readonly icon?: string;
	active?: boolean;
	readonly href?: string;
	readonly to?: string;
	readonly image?: string;
	readonly images?: boolean;
	readonly friendlyName?: string;
};

export type SidebarItems = {
	[key: string]: BaseSidebarItem;
};

export default function () {
	return useState<SidebarItems>('sidebarItems', () => sidebarJson);
}
