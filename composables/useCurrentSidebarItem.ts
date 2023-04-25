import { RouteLocationNormalized } from 'vue-router';
import { BaseSidebarItem } from './useSidebarItems';

export type CurrentSidebarItem = {
	itemname: string;
	item: BaseSidebarItem;
};

function setCurrentSidebarItem(to: RouteLocationNormalized) {
	const currentSidebarItemState =
		useState<CurrentSidebarItem>('currentSidebarItem');
	const sidebarItems = useSidebarItems();
	for (const [itemname, item] of Object.entries(sidebarItems.value)) {
		if (to.name && item.to === useSplitRouterPath(to.name, 'first')) {
			item.active = true;
			currentSidebarItemState.value.itemname = itemname;
			currentSidebarItemState.value.item = item;
			useHead({
				title: itemname,
			});
		} else {
			item.active = false;
		}
	}
	return currentSidebarItemState;
}

export default function (
	to?: RouteLocationNormalized
): globalThis.Ref<CurrentSidebarItem> {
	const currentSidebarItemState = useState<CurrentSidebarItem>(
		'currentSidebarItem',
		() => {
			return {
				itemname: 'MaguroNetwork',
				item: {},
			};
		}
	);
	if (to === undefined) {
		return currentSidebarItemState;
	} else {
		return setCurrentSidebarItem(to);
	}
}
