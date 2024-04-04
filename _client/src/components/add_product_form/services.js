import axiosBase from "../../../axios";
import { Alert } from "react-native"

export async function addNewProduct(
  token,
  productName,
  productDescription,
  productPrice,
  base,
  setCreateProductScreen,
  setLoader,
  setAddProduct
) {
  setLoader(true)
  const { uri } = base.image;
  const splitURI = base?.image.uri.split('.');
  const type = splitURI[splitURI.length - 1]
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    name: `photo_${uri}`,
    type: `image/${type}`,
  });
  await axiosBase.post(
    '/upload_image',
    formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }
  )
    .then(async function (response) {
      const { url, } = response.data;
      const itemData = {
        _primary_id: token,
        item_name: productName,
        item_discription: productDescription,
        item_image: url,
        cloudinary_id: response.data['public_id'],
        item_price: productPrice
      }
      await axiosBase.post(`/shop/create-item`, itemData)
      setLoader(false);
      setCreateProductScreen(false);
      setAddProduct((prev) => prev + 1)
      console.log("product added!")
    })
    .catch(function (err) {
      setLoader(false)
      Alert("cannot create product!")
      console.log("cannot add product")
    });
}









// import { db } from "../../../firebase_config/config";
// import { collection, addDoc, updateDoc, setDoc, doc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// async function uploadImageToStorage(
//   token,
//   image,
//   docId,
//   setCreateProductScreen,
//   setLoader,
//   productName,
//   productDescription,
//   productPrice
// ) {
//   console.log("uploadimg to storage trig!");
//   const response = await fetch(image);
//   const blob = await response.blob();
//   const storage = getStorage();
//   var storageeRef = ref(storage, `imagesCollection/${token}/items/${docId}`);
//   await uploadBytes(storageeRef, blob);
//   await getDataFromStorage(
//     token,
//     docId,
//     setCreateProductScreen,
//     setLoader,
//     productName,
//     productDescription,
//     productPrice
//   );
// }
//  async function itemsCollection(
//   productName,
//   productDescription,
//   productPrice,
//   token,
//   docId,
//   uri
// ) {
//   const collectionReference = collection(db, "items");
//   const docReference = doc(collectionReference, docId);
//   try {
//     await setDoc(docReference, {
//       productName,
//       productDescription,
//       productPrice,
//       token,
//       docId,
//       uri,
//     });
//     console.log("items collection sucessfullly worked!");
//   } catch (e) {
//     console.log("can not create items in item collection!");
//   }
// }

// async function getDataFromStorage(
//   token,
//   docId,
//   setCreateProductScreen,
//   setLoader,
//   productName,
//   productDescription,
//   productPrice
// ) {
//   console.log("get storage triggered!");
//   console.log("docId: ", docId);
//   const storage = getStorage();
//   const storageRef = ref(storage, `imagesCollection/${token}/items/${docId}`);
//   const url = await getDownloadURL(storageRef);
//   try {
//     if (url) {
//       console.log("url: ", url);
//       updateProductUrl(token, docId, url);
//       await itemsCollection(
//         productName,
//         productDescription,
//         productPrice,
//         token,
//         docId,
//         url
//       );
//       setLoader(false);
//       setCreateProductScreen(false);
//     }
//   } catch (e) {
//     console.log("error in getting url!");
//   }
// }

// async function updateProductUrl(token, docId, uri) {
//   console.log("updateDoc triggered");
//   const collectionReference = collection(db, "shops", token, "shop-items");
//   const docReference = doc(collectionReference, docId);
//   try {
//     await updateDoc(docReference, {
//       docId,
//       uri: uri,
//     });
//     console.log("updated doc!");
//   } catch (e) {
//     console.log("failed to update: ", e);
//   }
// }

// export async function addNewProduct(
//   token,
//   productName,
//   productDescription,
//   productPrice,
//   image,
//   setCreateProductScreen,
//   setLoader
// ) {
//   console.log("triggered");
//   if (token) {
//     setLoader(true);
//     const collectionReference = collection(db, "shops", token, "shop-items");
//     try {
//       let doc = await addDoc(collectionReference, {
//         productName,
//         productDescription,
//         productPrice,
//         token,
//         docId: "",
//         uri: "",
//       });
//       let docId = doc?.id;
//       console.log("storage function!");
//       if (docId) {
//         console.log("storage func trig!");
//         await uploadImageToStorage(
//           token,
//           image,
//           docId,
//           setCreateProductScreen,
//           setLoader,
//           productName,
//           productDescription,
//           productPrice
//         );
//         console.log("uploaded sucessfully!");
//       }
//     } catch (e) {
//       console.log("error in adding product!: ", e);
//     }
//   } else {
//     console.log("token not found!");
//   }
// }
