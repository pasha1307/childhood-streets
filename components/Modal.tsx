import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import useKeypress from "react-use-keypress";
import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";

export default function Modal({
	images,
	onClose,
}: {
	images: ImageProps[];
	onClose?: () => void;
}) {
	let overlayRef = useRef();
	const router = useRouter();

	const { photoId } = router.query;
	const index = images.findIndex((img) => img.id === Number(photoId));

	const [direction, setDirection] = useState(0);
	const [curIndex, setCurIndex] = useState(index);

	useEffect(() => {
		if (index !== -1 && index !== curIndex) {
			setDirection(index > curIndex ? 1 : -1);
			setCurIndex(index);
		}
	}, [index, curIndex]);

	function handleClose() {
		router.push("/", undefined, { shallow: true });
		onClose();
	}

	function changePhotoId(newVal: number) {
		const newIndex = images.findIndex((img) => img.id === newVal);
		if (newIndex > curIndex) {
			setDirection(1);
		} else {
			setDirection(-1);
		}
		setCurIndex(newIndex);
		router.push(
			{
				query: { photoId: newVal },
			},
			`/p/${newVal}`,
			{ shallow: true },
		);
	}

	useKeypress("ArrowRight", () => {
		if (curIndex + 1 < images.length) {
			changePhotoId(images[curIndex + 1].id);
		}
	});

	useKeypress("ArrowLeft", () => {
		if (curIndex > 0) {
			changePhotoId(images[curIndex - 1].id);
		}
	});

	return (
		<Dialog
			static
			open={true}
			onClose={handleClose}
			initialFocus={overlayRef}
			className="fixed inset-0 z-10 flex items-center justify-center"
		>
			<Dialog.Overlay
				ref={overlayRef}
				as={motion.div}
				key="backdrop"
				className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			/>
			<SharedModal
				index={curIndex}
				direction={direction}
				images={images}
				changePhotoId={changePhotoId}
				closeModal={handleClose}
				navigation={true}
			/>
		</Dialog>
	);
}
