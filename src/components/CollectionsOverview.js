import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../redux/shop/shopSelectors";
import CollectionPreview from "./CollectionPreview";

import { useLocation } from "react-router-dom";


function CollectionsOverview({ collections }) {
  let location = useLocation();
  console.log(location);
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(CollectionsOverview);
