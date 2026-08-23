import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";
// @ts-expect-error -- Next.js handles global CSS side-effect imports
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<SpeedInsights />
		</>
	);
}
