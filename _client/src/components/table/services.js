
import axiosBase from "../../../axios";



async function deleteProduct(id, setAddProduct) {
  try{
    await axiosBase.get(`/shop/delete-item:${id}`);
    console.log("deleted!")
    setAddProduct((prev) => prev - 1)
  }  catch(e){
    console.error("error: ", e)
    setAddProduct((prev) => prev - 1)
  }
}


export {  deleteProduct };





// setDeleteBtnloader(true);
// const docReference = doc(db, "shops", token, "shop-items", docId);
// const itemssDocReference = doc(db, "items", docId);
// try {
//   await deleteDoc(itemssDocReference);
//   await deleteDoc(docReference);
//   deleteDataFromStorage(token, docId)
//   setDeleteBtnloader(false);
// } catch (e) {
//   console.log("can not delete product!");
// }?