const CanPastilla = () => {
  const parentDomain = process.env.REACT_APP_PARENT_DOMAIN || 'www.mallorcapipeline.com';
  return (
    <div className='col-3 me-3'>
      <h5>Can Pastilla</h5>
      <iframe
        src={`https://player.twitch.tv/?channel=pipelinesurfshop&height=600&parent=${parentDomain}&referrer=https%3A%2F%2Fwww.mallorcapipeline.com%2Fwebcam%2F&width=100%25`}
        width='320'
        height='181'
      ></iframe>
    </div>
  );
};

export default CanPastilla;
