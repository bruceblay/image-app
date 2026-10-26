import { Html, Head, Main, NextScript } from "next/document";
import { DocumentHeadTags, documentGetInitialProps, type DocumentHeadTagsProps } from "@mui/material-nextjs/v16-pagesRouter";

export default function Document(props: DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
Document.getInitialProps = documentGetInitialProps;
