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
						content="Fifty Years After Graduation From The High School No. 12 In Syktyvkar"
					/>
					<meta
						property="og:description"
						content="Updated photos from the classmates of 1976 graduation."
					/>
					<meta
						property="og:title"
						content="Fifty Years After - Syktyvkar High School No12 Graduates "
					/>
					<meta name="twitter:card" content="summary_site_image" />
					<meta
						name="twitter:title"
						content="Sites Now And Then - School Photos 50 Years Distance"
					/>
					<meta
						name="twitter:description"
						content="Fifty Years After Graduation. Views of Syktyvkar and Around by Graduates. Project in progress."
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
