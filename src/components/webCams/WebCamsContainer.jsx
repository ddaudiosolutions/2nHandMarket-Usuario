import AlcudiaWebCam from './AlcudiaWebCam';
import CanPastilla from './CanPastilla';

const WebCamsContainer = () => {
  return (
    <>
      <h2 className='text-center'>Webcams en Vivo</h2>
      <div className='d-flex justify-content-center'>
        <AlcudiaWebCam />
        <CanPastilla />
      </div>
    </>
  );
};

export default WebCamsContainer;
