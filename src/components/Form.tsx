import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Col, Container, Input, Row, Button} from "reactstrap";
import BraintreeDropIn from "./BraintreeDropIn";
import "./Form.css";

export interface IPaymentInput {
    customerName: string;
    currency: string;
    totalAmount: number;
}

export const PaymentForm: React.FC = () => {
    const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
    const [ paymentData, setPaymentData ] = useState<IPaymentInput>({
        currency:'',
        customerName:'',
        totalAmount: 0
    });
  const {
    register,
    handleSubmit,
  } = useForm<IPaymentInput>();

  const onSubmit = (data: IPaymentInput) => {
    console.log(data);
    setPaymentData(data);
    setShowBraintreeDropIn(true);
  };

  return (
    <Container>
            <Col>
                <Row>
                    <Col
                        xs={12}
                        className={"productInfoColumnCenter"}
                    >
                        <label>Customer Name</label>
                        <input
                            {...register("customerName")} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={12}
                        className={"productInfoColumnCenter"}
                    >
                        <label>Currency</label>
                        <input
                            {...register("currency")} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={12}
                        className={"productInfoColumnCenter"}
                    >
                        <label>Total Amount</label>
                        <input
                            {...register("totalAmount")} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={12}
                        className={"productInfoColumnCenter"}
                    >
                        <Button
                            onClick={() => {setShowBraintreeDropIn(true)}}
                            disabled={showBraintreeDropIn}
                        >
                            {
                                "Go to Checkout"
                            }
                        </Button>
                    </Col>
                </Row>
            </Col>
            <BraintreeDropIn
                show={showBraintreeDropIn}
                payment={paymentData}
                onPaymentCompleted={() => {
                    setShowBraintreeDropIn(false);
                }}
            />
        </Container>

    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <label>Customer Name</label>
    //   <input {...register("customerName")} />

    //   <label>Currency</label>
    //   <input {...register("currency")} />

    //   <div className="input-group">
    //     <div className="input-field">
    //       <label>Total Amount</label>
    //       <input {...register("totalAmount")} />
    //     </div>
    //     <div className="input-field">
    //       <label>Card Type</label>
    //       <input {...register("cardType")} />
    //     </div>
    //   </div>

    //   <input type="submit" />
    //   <BraintreeDropIn
    //         show={showBraintreeDropIn}
    //         onPaymentCompleted={() => {
    //             setShowBraintreeDropIn(false);
    //         }}
    //     />
    // </form>
  );
};