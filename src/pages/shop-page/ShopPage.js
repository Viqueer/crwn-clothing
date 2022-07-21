import React from "react";
import { Routes, Route } from "react-router-dom";

import CollectionsOverview from "../../components/CollectionsOverview";
import ShopCollection from "../shop-collection/ShopCollection";
import WithSpinner from "../../components/with-spinner/WithSpinner";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shopActions";

import { db, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore"

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const ShopCollectionWithSpinner = WithSpinner(ShopCollection);

class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = { param: "", loading: true };
    this.setParam = this.setParam.bind(this);
  }

  setParam(param) {
    this.setState({ param: param });
  }

  unsubcribeFromSnapshot = null;

  componentDidMount() {
    const{updateCollections}=this.props;
    const collectionRef = collection(db, "collections");

    this.unsubcribeFromSnapshot = onSnapshot(collectionRef, async snapshot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionMap);
      this.setState({ loading: false });    })
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route exact path="/" element={<CollectionsOverviewWithSpinner isLoading={this.state.loading} />} />
          <Route
            exact
            path="/:collectionId"
            element={ 
              <ShopCollectionWithSpinner
                param={this.state.param}
                setParam={this.setParam}
                isLoading={this.state.loading}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);
