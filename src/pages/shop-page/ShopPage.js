import React from "react";
import { Routes, Route } from "react-router-dom";

import CollectionsOverview from "../../components/CollectionsOverview";
import ShopCollection from "../shop-collection/ShopCollection";


class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = { param: "" };
    this.setParam = this.setParam.bind(this);
  }

  setParam(param) {
    this.setState({ param: param });
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route exact path="/" element={<CollectionsOverview />} />
          <Route
            exact
            path="/:collectionId"
            element={<ShopCollection param={this.state.param} setParam={ this.setParam} />}
          />
        </Routes>
      </div>
    );
  }
}

export default ShopPage;
