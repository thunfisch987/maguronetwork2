export default function () {
	return useState<string>('currentSite', () => 'index');
}
