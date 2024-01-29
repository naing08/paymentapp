import React, { useEffect, useState } from 'react';
import './DropIn.css';
import dropin, { Dropin } from 'braintree-web-drop-in';
import { Button } from 'reactstrap';
import { IPaymentInput } from './Form';

interface BraintreeDropInProps {
  show: boolean;
  payment: IPaymentInput;
  onPaymentCompleted: () => void;
}

function BraintreeDropIn(props: BraintreeDropInProps): JSX.Element {
  const { show, onPaymentCompleted, payment } = props;
  const { customerName, currency, totalAmount } = payment;
  const [ instance, setInstance] = useState(false);
  const [ token, setToken] = useState('');

  const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>(undefined);

  useEffect(() => {
    if (show) {
        if (!token){
            fetch('http://localhost:3030/payment/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                const clientToken = data.clientToken;
                setToken(clientToken);
            });
        }
      const initializeBraintree = () => {
            dropin.create(
                {
                  authorization: token,
                  container: '#braintree-drop-in-div',
                },
                function (error, instance) {
                    setInstance(true);
                    if (error) console.error(error);
                    else setBraintreeInstance(instance);
                }
            );
    }

      if (!instance) {
        if (braintreeInstance)
            braintreeInstance.teardown().then(() => {
                if (token !== '') initializeBraintree();
            });
        else if (token !== '') initializeBraintree();
      }
    }
  }, [show, braintreeInstance, token]);

  return (
    <div style={{ display: `${show ? 'block' : 'none'}` }}>
      <div id={'braintree-drop-in-div'} />
      <Button
        className={'braintreePayButton'}
        disabled={!braintreeInstance}
        onClick={() => {
          if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod((error, payload) => {
              if (error) {
                console.error(error);
              } else {
                const paymentMethodNonce = payload.nonce;
                console.log('payment method nonce', payload.nonce);
                
                const data ={
                    customerName,
                    totalAmount,
                    currency,
                    nonce: payload.nonce
                };

                fetch('http://localhost:3030/payment/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    
                });
                alert(`Payment completed with nonce=${paymentMethodNonce}`);

                onPaymentCompleted();
              }
            });
          }
        }}
      >
        {'Pay'}
      </Button>
    </div>
  );
}

export default BraintreeDropIn;