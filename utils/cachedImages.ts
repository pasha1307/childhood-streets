import cloudinary from "./cloudinary";
import getBase64ImageUrl from "./generateBlurPlaceholder";
import type { ImageProps } from "./types";

let cachedImages: ImageProps[] | null = null;

export default async function getImages(): Promise<ImageProps[]> {
	if (cachedImages) return cachedImages;

	const fetchFolder = async (folder: string, idOffset: number) => {
		try {
			const results = await cloudinary.v2.search
				.expression(`folder:${folder}/*`)
				.sort_by("public_id", "desc")
				.max_results(400)
				.execute();

			const resources = results.resources;
			const mapped: ImageProps[] = [];
			for (let i = 0; i < resources.length; i++) {
				mapped.push({
					id: idOffset + i,
					height: resources[i].height,
					width: resources[i].width,
					public_id: resources[i].public_id,
					format: resources[i].format,
					version: resources[i].version,
				});
			}
			return mapped;
		} catch (e) {
			console.error(`Error fetching folder ${folder}:`, e);
			return [];
		}
	};

	const childhood = await fetchFolder(
		process.env.CLOUDINARY_FOLDER || "childhood",
		0,
	);
	const oldPhotos = await fetchFolder("old_photos", 1000);

	const allImages = [...childhood, ...oldPhotos];

	const blurImagePromises = allImages.map((image) => {
		return getBase64ImageUrl(image);
	});
	const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

	for (let i = 0; i < allImages.length; i++) {
		allImages[i].blurDataUrl = imagesWithBlurDataUrls[i];
	}

	cachedImages = allImages;

	return cachedImages;
}
