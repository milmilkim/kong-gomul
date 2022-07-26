import { memo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = memo((props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charset="utf-8" />
        <title>{props.title}</title>

        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        {/* <meta property="og:image" content={props.image} /> */}
        <meta property="og:url" content={props.url} />
        {/* <link rel="shortcut icon" href={props.image} type="image/png" />
        <link rel="icon" href={props.image} type="image/png" /> */}
      </Helmet>
    </HelmetProvider>
  );
});

Meta.defaultProps = {
  title: "콩고물",
  description: "React.js로 만든 프로젝트",
  keywords: "React, Redux, Node.js",
  author: "misoriu",
  //   image: reactjs,
  url: window.location.href,
};

export default Meta;
