import PayPal from 'react-paypal-button-v2';

const PayPalButton = () => {
  const paypalOptions = {
    clientId: 'YOUR_PAYPAL_CLIENT_ID',
    currency: 'USD',
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // Handle successful payment
    });
  };

  return (
    <div className='paypal-button'>
      <h3>PayPal Payment</h3>
      <PayPal options={paypalOptions} amount='10.00' onApprove={handleApprove} />
    </div>
  );
};

export default PayPalButton;
