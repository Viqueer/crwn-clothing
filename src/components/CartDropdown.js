import CustomButton from "./CustomButton";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { cartActionTypes } from "../redux/cart/cartTypes";



function CartDropdown({hidden, cartItems}) {
  return !hidden && (
    <div className="cart-dropdown">
      <div className="cart-items" >
        {cartItems.length ? (
          cartItems.map((item) => {
           return <CartItem key={item.id} item={item} />
        })
        ): null}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

const mapStateToProps = ({cart: {cartItems}}) => ({
  cartItems
});


export default connect(mapStateToProps)(CartDropdown);
