import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<meta
						name="description"
						content="See photos of NOW and THEN sites of home town Syktyvkar"
					/>

					<meta
						property="og:site_name"
						content="Fifty Years After Graduation From High School No 12 In Syktyvkar"
					/>
					<meta
						property="og:description"
						content="Updated pictures from Komi old and current sites in progress."
					/>
					<meta
						property="og:title"
						content="Fifty Years Of Graduation From High School No 12 In Syktyvkar"
					/>
					<meta name="twitter:card" content="summary_site_image" />
					<meta
						name="twitter:title"
						content="Syktyvar Sites Now And 50 Years Before"
					/>
					<meta
						name="twitter:description"
						content="IFifty Years Of Graduation From High School No 12 In Syktyvkar."
					/>
				</Head>
				<body className="bg-black antialiased">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
