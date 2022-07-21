import CollectionItem from "../../components/collection-item/CollectionItem";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shopSelectors";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function ShopCollection({ setParam, collection }) {
  let p = useParams();

  useEffect(() => setParam(p.collectionId), [p.collectionId, setParam]);
  
  return (
    <div className="collection-page ">
      <h2 className="title">{collection && collection.title}</h2>
      <div className="items">
        {collection &&
          collection.items.map((item) => {
            return <CollectionItem key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.param)(state),
});

export default connect(mapStateToProps)(ShopCollection);
