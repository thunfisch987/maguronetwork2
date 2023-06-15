const currentSiteState = useState<
	| 'index'
	| 'Akela'
	| 'EnergyDrinkWiki'
	| 'RandomMemes'
	| 'Vegalou'
	| 'Weebsite'
>('currentSite', () => 'index');

export default function () {
	return useState('currentSite');
}
