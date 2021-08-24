//import {useEffect} from 'react';
const SubirFoto = ({ handlePhoto }) => {
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dhe1gcno9",
      uploadPreset: "market2",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(result.info.url);
        handlePhoto(result.info.url);
      }
    }
  );
  const pulsar = () => {
    myWidget.open();
  };

  return (
    <button id="upload_widget" onClick={pulsar} class="cloudinary-button">
      Upload files
    </button>
  );
};

export default SubirFoto;
