import ShopActionTypes from "./shopActionTypes";
import { collection, getDocs } from "firebase/firestore";
import{db, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => (dispatch) => {
  const collectionRef = collection(db, "collections");//collectionRef is a reference to the collection in firestore
  dispatch(fetchCollectionsStart());
  const collectionSnap = getDocs(collectionRef);//collectionSnap is snapshot of the firestore collection

  collectionSnap.then((snapshot) => {
    const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    dispatch(fetchCollectionsSuccess(collectionMap));
  }).catch((error) => {
    dispatch(fetchCollectionsFailure(error.message));
  }
  );
};
