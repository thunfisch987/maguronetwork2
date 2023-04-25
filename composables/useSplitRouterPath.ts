import type { RouteRecordName } from 'vue-router'

export default function (pathname: RouteRecordName): Array<string>
export default function (pathname: RouteRecordName, index: 'first'): string
export default function (pathname: RouteRecordName, index: 'last'): string

export default function (
	pathname: RouteRecordName,
	index?: 'first' | 'last',
): Array<string> | string {
	if (!index) {
		return pathname.toString().split('-')
	} else {
		switch (index) {
			case 'first':
				return pathname.toString().split('-')[0]
			case 'last':
				return pathname.toString().split('-')[-1]
			default:
				throw new Error('useSplitRouterPath switch case default')
		}
	}
}
