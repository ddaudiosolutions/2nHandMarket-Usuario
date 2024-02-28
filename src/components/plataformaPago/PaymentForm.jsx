import CreditCardForm from './CreditCardForm';
import PayPalButton from './PayPalButton';

const PaymentForm = () => {
  return (
    <div className='payment-form'>
      <CreditCardForm />
      <PayPalButton />
    </div>
  );
};

export default PaymentForm;
