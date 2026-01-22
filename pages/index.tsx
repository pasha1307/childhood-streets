import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Station from "../components/Icons/Station";
import Modal from "../components/Modal";
import getImages from "../utils/cachedImages";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
	const router = useRouter();
	const { photoId } = router.query;
	const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
	const [currentTab, setCurrentTab] = useState<"childhood" | "old_photos">(
		"childhood",
	);

	const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		// This effect keeps track of the last viewed photo in the modal to keep the index page in sync with back button
		if (lastViewedPhoto && !photoId) {
			lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
			setLastViewedPhoto(null);
		}
	}, [photoId, lastViewedPhoto, setLastViewedPhoto]);

	useEffect(() => {
		if (photoId) {
			const id = Number(photoId);
			if (id >= 1000) {
				setCurrentTab("old_photos");
			} else {
				setCurrentTab("childhood");
			}
		}
	}, [photoId]);

	const displayedImages = images.filter((img) =>
		currentTab === "childhood" ? img.id < 1000 : img.id >= 1000,
	);

	return (
		<>
			<Head>
				<title>Close and Distant Memories</title>
				<meta property="og:image" content="Sysktyvkar City and Around" />
				<meta name="twitter:image" content="Peter Banasyak" />
			</Head>
			<main className="mx-auto max-w-[1960px] p-4">
				{photoId && (
					<Modal
						images={displayedImages}
						onClose={() => {
							setLastViewedPhoto(photoId);
						}}
					/>
				)}

				<div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
					<div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-between gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
						<div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20 opacity-20">
							<span className="flex max-h-full max-w-full items-center justify-center">
								<Station />
							</span>
							<span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
						</div>
						<div className="relative z-10 flex h-full w-full flex-col items-center justify-end pb-4">
							<h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
								current views of neighborhoods and countryside ...
							</h1>
							<p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
								Bur Ryt, Dona Yortyas, .., Mian Kar, Dona Kar ...Lebalei
								Samolyotyasen!
							</p>
							<div className="mt-8 flex justify-center gap-8 text-sm font-bold uppercase tracking-widest text-white/80">
								<button
									onClick={() => setCurrentTab("childhood")}
									className={`border-b-2 pb-2 transition-colors ${
										currentTab === "childhood"
											? "border-white text-white"
											: "border-transparent hover:text-white"
									}`}
								>
									Now
								</button>
								<button
									onClick={() => setCurrentTab("old_photos")}
									className={`border-b-2 pb-2 transition-colors ${
										currentTab === "old_photos"
											? "border-white text-white"
											: "border-transparent hover:text-white"
									}`}
								>
									Then
								</button>
							</div>
						</div>
					</div>
					{displayedImages.map(
						({ id, public_id, format, blurDataUrl, version }) => (
							<Link
								key={id}
								href={`/?photoId=${id}`}
								as={`/p/${id}`}
								ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
								shallow
								className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
							>
								<Image
									alt="est"
									className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
									style={{ transform: "translate3d(0, 0, 0)" }}
									placeholder="blur"
									blurDataURL={blurDataUrl}
									src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/v${version}/${public_id}.${format}`}
									width={720}
									height={480}
									sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
								/>
							</Link>
						),
					)}
				</div>
			</main>
			<footer className="p-6 text-center text-white/80 sm:p-12">
				<small>@PAB-PPK-ABK</small>
			</footer>
		</>
	);
};

export default Home;

export async function getStaticProps() {
	const images = await getImages();
	return {
		props: {
			images,
		},
	};
}
