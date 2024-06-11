import { Helmet } from 'react-helmet';

const MetaTagsDinamicas = ({ title, image, url }) => {
  console.log('datos:', title, image, url);
  return (
    <Helmet>
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
    </Helmet>
  );
};

export default MetaTagsDinamicas;
