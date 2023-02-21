export default function () {
	const weebsiteImages = useWeebsiteImages();
	return () => {
		weebsiteImages.next();
	};
}
