import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Carousel from "../../components/Carousel";
import getImages from "../../utils/cachedImages";
import type { ImageProps } from "../../utils/types";

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
	const router = useRouter();
	const { photoId } = router.query;
	let index = Number(photoId);

	const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/v${currentPhoto.version}/${currentPhoto.public_id}.${currentPhoto.format}`;

	return (
		<>
			<Head>
				<title>Childhood sites and memories </title>
				<meta property="og:image" content={currentPhotoUrl} />
				<meta name="twitter:image" content={currentPhotoUrl} />
			</Head>
			<main className="mx-auto max-w-[1960px] p-4">
				<Carousel currentPhoto={currentPhoto} index={index} />
			</main>
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	const images = await getImages();

	const currentPhoto = images.find(
		(img) => img.id === Number(context.params.photoId),
	);

	return {
		props: {
			currentPhoto: currentPhoto,
		},
	};
};

export async function getStaticPaths() {
	const images = await getImages();

	let fullPaths = [];
	for (let i = 0; i < images.length; i++) {
		fullPaths.push({ params: { photoId: images[i].id.toString() } });
	}

	return {
		paths: fullPaths,
		fallback: false,
	};
}
