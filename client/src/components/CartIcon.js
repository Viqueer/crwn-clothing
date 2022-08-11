import { ReactComponent as ShoppingIcon } from "../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartDropdown } from "../redux/cart/cartActions";

import {selectCartItemsCount} from "../redux/cart/cartSelectors";

function CartIcon({toggleCartDropdown, itemCount}) {
  return (
    <div className="cart-icon" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount }</span>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleCartDropdown: () => dispatch(toggleCartDropdown()),
})

const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
