import CustomButton from "./CustomButton";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { selectCartItems } from "../redux/cart/cartSelectors";
import {toggleCartDropdown} from "../redux/cart/cartActions.js";




function CartDropdown({hidden, cartItems, dispatch}) {
  return !hidden && (
    <div className="cart-dropdown">
      <div className="cart-items" >
        {cartItems.length ? (
          cartItems.map((item) => {
           return <CartItem key={item.id} item={item} />
        })
        ): <span className="empty-message">Your Cart is empty</span>}
      </div>
      <CustomButton onClick={() => {
        dispatch(toggleCartDropdown())
      }} href="/checkout">GO TO CHECKOUT</CustomButton>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
});


export default connect(mapStateToProps)(CartDropdown);
