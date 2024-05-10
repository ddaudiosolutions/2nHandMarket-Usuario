const CanPastilla = () => {
  const parentDomain = 'www.windymarket.es';
  return (
    <div className='col-ms-3 col-md-4 '>
      <h5 className='text-center'>Can Pastilla</h5>
      <iframe
        src={`https://player.twitch.tv/?channel=pipelinesurfshop&height=600&parent=${parentDomain}&referrer=https%3A%2F%2Fwww.mallorcapipeline.com%2Fwebcam%2F&width=100%25`}
        width='320'
        height='181'
      ></iframe>
    </div>
  );
};

export default CanPastilla;
