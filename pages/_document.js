import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          /> */}
          <link rel="stylesheet" href="/static/css/styles.css" />
          {/* BASE CSS */}
          <link href="/static/css/bootstrap.min.css" rel="stylesheet"/> 
          <link href="/static/css/style.css" rel="stylesheet"/>
          <link href="/static/css/menu.css" rel="stylesheet"/>
          <link href="/static/css/vendors.css" rel="stylesheet"/>
          <link href="/static/css/icon_fonts/css/all_icons_min.css" rel="stylesheet"/>

          {/* <!-- COMMON SCRIPTS --> */}
          <script src="/static/js/jquery-2.2.4.min.js"></script>
          <script src="/static/js/common_scripts.min.js"></script>
          <script src="/static/js/functions.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
