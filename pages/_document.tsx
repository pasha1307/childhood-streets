import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See photos of sites in and around former hometown Syktyvkar"
          />
          <meta property="og:site_name" content="nextjsconf-pics.vercel.app" />
          <meta
            property="og:description"
            content="Pictures from Komi old and current sites in progress."
          />
          <meta property="og:title" content="Childhood Sites Years After" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Childhood Sites" />
          <meta
            name="twitter:description"
            content="Ongoing photography of sites around Syktyvkar."
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
