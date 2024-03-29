function Footer() {
  return (
    <>
      <div className='footer flex_middle'>
        <div className='text cursor_pointer'>
          <span style={{ marginBottom: '0.5em', fontSize: '0.4em' }}>
            {String.fromCodePoint('0X00A9')}
          </span>{' '}
          <a
            style={{ marginBottom: '0.4em', fontSize: '0.4em' }}
            href='https://aunsh.com'
            target={'_blank'}
            rel='noreferrer nofollow'
          >
            aunsh.
          </a>
          <span style={{ fontSize: '0.2em', fontWeight: '400' }}> 2022</span>
        </div>
      </div>
    </>
  );
}

export default Footer;
