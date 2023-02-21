export class tabArray<T> extends Array<T> {
	constructor(...items: Array<T>) {
		super(...items);
		Object.setPrototypeOf(this, tabArray.prototype);
	}

	current: number = 0;
	next(): T {
		if (this.current === this.length - 1) {
			this.current = -1;
			return this[++this.current];
		}
		return this[this.current++];
	}
}

let items = new tabArray<string>(
	"/evangelion/asuka_smug.png",
	"/evangelion/cupoftea.PNG",
	"/evangelion/misato_smug.png",
	"/evangelion/misato_toast.PNG"
);

let weebsiteImages = reactive<tabArray<string>>(items);

export default function (): tabArray<string> {
	return weebsiteImages;
}
