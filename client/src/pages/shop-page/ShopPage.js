import React from "react";
import { Routes, Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import ShopCollection from "../shop-collection/ShopCollection";
import WithSpinner from "../../components/with-spinner/WithSpinner";

import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shopActions";

import { selectIsCollectionFetching } from "../../redux/shop/shopSelectors";

import CollectionsOverviewContainer from "../../components/collections-overview/collectionsOverviewContainer";
const ShopCollectionWithSpinner = WithSpinner(ShopCollection);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { isCollectionFetching } = this.props;

    return (
      <div className="shop-page">
        <Routes>
          <Route exact path="/" element={<CollectionsOverviewContainer />} />
          <Route
            exact
            path="/:collectionId"
            element={
              <ShopCollectionWithSpinner isLoading={isCollectionFetching} />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
