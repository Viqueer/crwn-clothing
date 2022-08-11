import CollectionItem from "../../components/collection-item/CollectionItem";
import { useSelector } from "react-redux";
import { selectCollection } from "../../redux/shop/shopSelectors";
import { useParams } from "react-router-dom";

function ShopCollection() {
  let p = useParams();
  let collection = useSelector(selectCollection(p.collectionId));
  
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


export default ShopCollection;
