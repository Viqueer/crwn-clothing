import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shopSelectors";
import WithSpinner from "../with-spinner/WithSpinner";
import CollectionsOverview from "./CollectionsOverview";
import { compose } from "redux";


const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview)); alternative way to write the same code

export default CollectionsOverviewContainer;