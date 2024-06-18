import { Helmet } from 'react-helmet';

const MetaTagsDinamicas = ({ title, image, url, description }) => {
  console.log('datos:', title, image, description);
  return (
    <Helmet>
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
    </Helmet>
  );
};

export default MetaTagsDinamicas;
