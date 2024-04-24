// import {
//     Elements,
//     PaymentElement,
//   //  useElements,
//     useStripe,
    
//   } from "@stripe/react-stripe-js";
//   import { loadStripe, StripeElements , StripeCardElement } from "@stripe/stripe-js";
//   import { FormEvent, useState } from "react";
//   import toast from "react-hot-toast";
//   import { useDispatch, useSelector } from "react-redux";
//   import { Navigate, useLocation, useNavigate } from "react-router-dom";
//   import { useNewOrderMutation } from "../redux/api/orderAPI";
//   import { resetCart } from "../redux/reducer/cartReducer";
// //   import { RootState } from "../redux/store";
//   import { NewOrderRequest } from "../types/api-types";
//   import { responseToast } from "../utils/features";
// import { CartReducerInitialState, UserReducerInitialState } from "../types/reducer-types";
  
//   const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
 
//   const CheckOutForm = () => {
//     const stripe = useStripe();
//   //  const elements = useElements();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
  
//     const { user } = useSelector((state: {userReducer : UserReducerInitialState}) => state.userReducer);
  
//     const {
//       shippingInfo,
//       cartItems,
//       subtotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//     } = useSelector((state: {cartReducer : CartReducerInitialState}) => state.cartReducer);
  
//     const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
//     const [newOrder] = useNewOrderMutation();
  
//     const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
  
//       if (!stripe ) return;
//       setIsProcessing(true);
  
//       const orderData: NewOrderRequest = {
//         shippingInfo,
//         orderItems: cartItems,
//         subtotal,
//         tax,
//         discount,
//         shippingCharges,
//         total,
//         user: user?._id!,
//       };
//       // interface FormElements extends HTMLFormControlsCollection {
//       //   name: HTMLInputElement;
//       //   address: HTMLInputElement;
//       // }
      
//       // Get form elements
//     //  const form = document.getElementById('payment-form') as HTMLFormElement;
//       const elements = stripe.elements() as StripeElements;
//       const nameInput = document.getElementById('name') as HTMLInputElement;
//       const addressInput = document.getElementById('address') as HTMLInputElement;
//    //   const errorMessage = document.getElementById('error-message') as HTMLDivElement;
      
//       // Create an instance of the card Element
//       const card: StripeCardElement = elements.create('card');
      
//       // Add an instance of the card Element into the `card-element` div
//       card.mount('#card-element');
      
//       const { paymentIntent, error } = await stripe.confirmPayment({
//         elements,
//        confirmParams: { return_url: window.location.origin },
      
//        redirect: "if_required",
//         type: 'card',
//         card: card,
//         billing_details: {
//           name: nameInput.value
//         },
//         shipping: {
//           name: nameInput.value,
//           address: {
//             line1: addressInput.value,
//             country: 'IN' // Set the country code for India
//           }
//         }
      
//       });
  
//       if (error) {
//         setIsProcessing(false);
//         return toast.error(error.message || "Something Went Wrong");
//       }
  
//       if (paymentIntent.status === "succeeded") {
//         const res = await newOrder(orderData);
//         dispatch(resetCart());
//         responseToast(res, navigate, "/orders");
//       }
//       setIsProcessing(false);
//     };
//     return (
//       <div className="checkout-container">
//         <form onSubmit={submitHandler}>
//           <PaymentElement />
//           <button type="submit" disabled={isProcessing}>
//             {isProcessing ? "Processing..." : "Pay"}
//           </button>
//         </form>
//       </div>
//     );
//   };
  
//   const Checkout = () => {
//     const location = useLocation();
  
//     const clientSecret: string | undefined = location.state;
  
//     if (!clientSecret) return <Navigate to={"/shipping"} />;
  
//     return (
//       <Elements
//         options={{
//        //   clientSecret: "pi_3OhvNdSGCVKc9z9u0rv4LKlX_secret_zheu7M1e9MoJ7G14zermx0FYn"
//        clientSecret,
//         }}
//         stripe={stripePromise}
//       >
//         <CheckOutForm />
//       </Elements>
//     );
//   };
  
//   export default Checkout;



// import { Elements, PaymentElement, useStripe } from "@stripe/react-stripe-js";
// import { loadStripe, Stripe, StripeCardElement } from "@stripe/stripe-js";
// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useNewOrderMutation } from "../redux/api/orderAPI";
// import { resetCart } from "../redux/reducer/cartReducer";
// import { NewOrderRequest } from "../types/api-types";
// import { responseToast } from "../utils/features";
// import { CartReducerInitialState, UserReducerInitialState } from "../types/reducer-types";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);
//   const [newOrder] = useNewOrderMutation();
    
//     const {
//       shippingInfo,
//       cartItems,
//       subtotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//     } = useSelector((state: {cartReducer : CartReducerInitialState}) => state.cartReducer);
//   const orderData: NewOrderRequest = {
//             shippingInfo,
//             orderItems: cartItems,
//             subtotal,
//             tax,
//             discount,
//             shippingCharges,
//             total,
//             user: user?._id!,
//           };
//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!stripe) return;
//     setIsProcessing(true);
   

//     try {
//       const { paymentIntent, error } = await stripe.confirmPayment({
//          type: 'card',
//          card: elements.getElement(CardElement),
//         // card: card,
//         billing_details: {
//           name: user,
//         },
//         shipping: {
//           name: user,
//           address: {
//             line1: shippingInfo,
//             country: 'IN'
//         // payment_method: {
//           //  card: elements.getElement(CardElement),
//         //   billing_details: {
//         //     name: user,
//         //   },
//         // },
//           }
//       });

//       if (error) {
//         setIsProcessing(false);
//         return toast.error(error.message || "Something Went Wrong");
//       }

//       if (paymentIntent.status === "succeeded") {
//         const res = await newOrder(orderData);
//         dispatch(resetCart());
//         responseToast(res, navigate, "/orders");
//       }
//     } catch (error) {
//       setIsProcessing(false);
//       return toast.error("Something Went Wrong");
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <form onSubmit={submitHandler}>
//         <PaymentElement />
//         <button type="submit" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const Checkout = () => {
//   const location = useLocation();
//   const clientSecret: string | undefined = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements stripe={stripePromise}>
//       <CheckOutForm />
//     </Elements>
//   );
// };

// export default Checkout;









// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { loadStripe} from "@stripe/stripe-js";
// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useNewOrderMutation } from "../redux/api/orderAPI";
// import { resetCart } from "../redux/reducer/cartReducer";
// import { NewOrderRequest } from "../types/api-types";
// import { responseToast } from "../utils/features";
// import { CartReducerInitialState, UserReducerInitialState } from "../types/reducer-types";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);
//   const [newOrder] = useNewOrderMutation();
//   const {
//     shippingInfo,
//     cartItems,
//     subtotal,
//     tax,
//     discount,
//     shippingCharges,
//     total,
//   } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

//   const orderData: NewOrderRequest = {
//     shippingInfo,
//     orderItems: cartItems,
//     subtotal,
//     tax,
//     discount,
//     shippingCharges,
//     total,
//     user: user?._id!,
//   };
// const clientSecret = "pi_3OhvNdSGCVKc9z9u0rv4LKlX_secret_zheu7M1e9MoJ7G14zermx0FYn";
//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setIsProcessing(true);
//     try {
//      // const cardElement = elements.getElement(CardElement);
//       const { paymentIntent , error} = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
     
//           billing_details: {
//             name: user?.name || "",
//           },
//         },
//         shipping: {
//           name: user?.name || "",
//           address: {
//             line1: shippingInfo.address,
//             country: 'IN'
//           }
//         },
//       });

//       if (error) {
//         setIsProcessing(false);
//         return toast.error(error.message || "Something Went Wrong");
//       }

//       if (paymentIntent?.status === "succeeded") {
//         const res = await newOrder(orderData);
//         dispatch(resetCart());
//         responseToast(res, navigate, "/orders");
//       }
//     } catch (error) {
//       setIsProcessing(false);
//       return toast.error("Something Went Wrong");
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <form onSubmit={submitHandler}>
//         <CardElement />
//         <button type="submit" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const Checkout = () => {
//   const location = useLocation();
//   const clientSecret: string | undefined = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements stripe={stripePromise}>
//       <CheckOutForm />
//     </Elements>
//   );
// };

// export default Checkout;










import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest } from "../types/api-types";
import { responseToast } from "../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;