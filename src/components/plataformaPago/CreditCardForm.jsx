import { CardElement } from '@stripe/react-stripe-js';

const CreditCardForm = () => {
  return (
    <div className='credit-card-form'>
      <h3>Credit Card Payment</h3>
      <CardElement />
    </div>
  );
};

export default CreditCardForm;
