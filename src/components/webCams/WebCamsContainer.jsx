import AlcudiaWebCam from './AlcudiaWebCam';
import CanPastilla from './CanPastilla';

const WebCamsContainer = () => {
  return (
    <div className='mt-4'>
      <h2 className='text-center'>Webcams en Vivo</h2>
      <div className='container'>
        <div className='row justify-content-center text-center mx-auto'>
          <AlcudiaWebCam />
          <CanPastilla />
        </div>
      </div>
    </div>
  );
};

export default WebCamsContainer;
