import * as ImagePicker from "expo-image-picker";
import axiosBase from "../../../axios";
import { Alert } from "react-native";

const pickImage = async (
  docId,
  upload,
  setShopUpate,
  setLoader,
) => {
     setLoader(true)
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
        await upload(result, docId, setLoader, setShopUpate)  
    } else {
      setLoader(false)
    }
};

async function uploadDp(result, docId, setLoader, setShopUpate) {
  const { uri } = result;
  const splitURI = uri.split('.');
  const type = splitURI[splitURI.length - 1]
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    name: `photo_${uri}`,
    type: `image/${type}`,
  });
  axiosBase.post(
    '/upload_image',
    formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }
  )
    .then(async function (response) {
      const { url , } = response.data;
      const itemData = {
        docId,
        url
    }
    try{
      await axiosBase.post('/get-shops-details/update_dp', itemData)
      console.log("update!")     
      setLoader(false)
      setShopUpate(prev => prev + 1)
    } catch(e){
      console.error({message: "connot update dp!"})
      setLoader(false)
    } 
    })
    .catch(function (response) {
      Alert("cannot create product!")
      setLoader(false)
    });
}



async function uploadCover(result, docId, setLoader, setShopUpate) {
  const { uri } = result;
  const splitURI = uri.split('.');
  const type = splitURI[splitURI.length - 1]
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    name: `photo_${uri}`,
    type: `image/${type}`,
  });
  axiosBase.post(
    '/upload_image',
    formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }
  )
    .then(async function (response) {
      const { url } = response.data;
      const itemData = {
        docId,
        url
    }
    try{
      await axiosBase.post('/get-shops-details/update_cover', itemData)
      console.log("update!") 
      setLoader(false)
      setShopUpate(prev => prev - 1)
    } catch(e) {
      console.error({message: "cannor update cover!"});
      setLoader(false)
    }      
    })
    .catch(function (response) {
      Alert("cannot create product!")
      setLoader(false)
    });
}



// async function uploadImageToStorage(
//   token,
//   docId,
//   image,
//   updateDocInStore,
//   category,
//   setLoader
// ) {
 
//   setLoader(true);
//   const response = await fetch(image);
//   const blob = await response.blob();
//   const storage = getStorage();
//   var storageeRef = ref(
//     storage,
//     `imagesCollection/${token}/shop-details/${docId}/${category}`
//   );
//   await uploadBytes(storageeRef, blob);
//   await getDataFromStorage(
//       token,
//       docId,
//       updateDocInStore,
//       category,
//       setLoader
//     );
// }

// async function getDataFromStorage(
//   token,
//   docId,
//   updateDocInStore,
//   category,
//   setLoader
// ) {
//   const storage = getStorage();
//   const storageRef = ref(
//     storage,
//     `imagesCollection/${token}/shop-details/${docId}/${category}`
//   );
//   const url = await getDownloadURL(storageRef);
//   try {
//     if (url) {
//       await updateDocInStore(token, docId, url);
//       setLoader(false);
//     }
//   } catch (e) {
//     console.log("error in getting url: ", error);
//   }
// }

// async function updateProfilePictureInDoc(token, docId, url) {
//   const collectionReference = collection(db, "shops", token, "shop-details");
//   const docReference = doc(collectionReference, docId);
//   const shopDocReference = doc(db, "shop", token);
//   try {
//     await updateDoc(shopDocReference, {
//       shop_profile_picture: url,
//     })
//     await updateDoc(docReference, {
//       shop_profile_picture: url,
//     });
//     console.log("updated doc!");
//   } catch (e) {
//     console.log("failed to update: ", e);
//   }
// }

// async function updateCoverPictureInDoc(token, docId, url) {
//   const collectionReference = collection(db, "shops", token, "shop-details");
//   const docReference = doc(collectionReference, docId);
//   const shopDocReference = doc(db, "shop", token);
//   try {
//     await updateDoc(shopDocReference, {
//       shop_cover_picture: url,
//     });
//     await updateDoc(docReference, {
//       shop_cover_picture: url,
//     });
//     console.log("updated doc!");
//   } catch (e) {
//     console.log("failed to update: ", e);
//   }
// }

// async function updateShopNameAndDesciption(
//   token,
//   docId,
//   shopNameValue,
//   shopDescriptionValue,
//   setEditShopNameAndDescriptionScreen,
//   setLoading
// ) {
//   setLoading(true);
//   const collectionReference = collection(db, "shops", token, "shop-details");
//   const docReference = doc(collectionReference, docId);
//   const shopDocReference = doc(db, "shop", token);
//   try {
//     await updateDoc(shopDocReference, {
//       shop_name: shopNameValue,
//       shop_description: shopDescriptionValue,
//     });
//     await updateDoc(docReference, {
//       shop_name: shopNameValue,
//       shop_description: shopDescriptionValue,
//     });
//     console.log("updated doc!");
//     setLoading(false);
//     setEditShopNameAndDescriptionScreen(false);
//   } catch (e) {
//     console.log("failed to update: ", e);

export {
  pickImage,
  uploadDp,
  uploadCover
}
