// import {  useEffect, useState } from "react";
// import { VscError } from "react-icons/vsc";
// import CartItem from "../components/cart-item";
// import { useSelector } from "react-redux";
// import { CartReducerInitialState } from "../types/reducer-types";


// const Cart = () => {

//   const { cartItems, subtotal, tax, total, shippingCharges, discount } =
//   useSelector((state: 
//     {cartReducer : CartReducerInitialState}) => state.cartReducer);
// const [couponCode, setCouponCode] = useState<string>("");
// // const [isValidCouponCode, setisValidCouponCode] = useState<string>(false);

// // useEffect(() => {
// //   const timeout = setTimeout(() => {
// // if(Math.random() > 0.5) setisValidCouponCode(true);
// // else setisValidCouponCode(false);
// //   },1000);
// //   return () => {
// // clearTimeout(timeout);
// // setisValidCouponCode(false);
// //   };
// // },

// // [couponCode]);



//   return (
//     <div className="cart">
//       <main>
//         {cartItems.map((i,idx) => (
//           <CartItem key={idx} cartItem={i}/>
//         )

//         )}
//         </main>
//         <aside>
//           <p> Subtotal : {subtotal}</p>
//           <p> ShippingCharges : {shippingCharges}</p>
//           <p> Tax : {tax}</p>
//           <p>
//             Discount : <em> - {discount}</em>
//           </p>
//           <p>
//             Total : <b>{total}</b>
//           </p>
//           <input 
//           type ="text"
//           placeholder="Coupon code"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//         />
//              {/* {couponCode &&
//           (isValidCouponCode ? ( */}
//             <span className="green">
//               ₹{discount} off using the <code>{couponCode}</code>
//             </span>
//           {/* ) */}
//            : (
//             <span className="red">
//               Invalid Coupon <VscError />
//             </span>
//           )
//           {/* )}  */}
//         </aside>
      
//     </div>
//   )
// }

// export default Cart


import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
//import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import { CartReducerInitialState } from "../types/reducer-types";
import { server } from "../redux/store";

const Cart = () => {
  // const { cartItems, subtotal, tax, total, shippingCharges, discount } =
  //   useSelector((state: RootState) => state.cartReducer);
    
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
  useSelector((state: 
    {cartReducer : CartReducerInitialState}) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;