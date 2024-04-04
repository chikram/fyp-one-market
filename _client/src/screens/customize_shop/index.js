import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./styles";
import DpCover from "../../components/dp_cover";
import TableComp from "../../components/table";
import { SearchIcon } from "../../components/svgs/svgs";
import { getShopItems, getShopsDetails } from "./services";
import AddProductForm from "../../components/add_product_form";
import Loader from "../../components/app_loader";

export default function CustomizeShop({ signOutLoading, ip }) {
  const [inputValue, setInputValue] = useState('');
  const [shopInfo, setShopInfo] = useState([]);
  const [createProductScreen, setCreateProductScreen] = useState(false);
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(0);
  const [shopUpdate, setShopUpate] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.data);
  console.log("token: ", token)
  const filterShop = shopInfo?.filter((i) => i['primary_id'] === token);
  const filterProducts = products?.filter((i) => i['primary_id'] === token);
  const searchFilter = filterProducts?.length > 0 && filterProducts?.filter((i) => {
    if(inputValue.length > 0){
      return i['item_name'].toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    }
  });
  
  useEffect(() => {
    getShopItems(setProducts, dispatch)
  }, [addProduct]);

  useEffect(() => {
    getShopsDetails(setShopInfo, dispatch)
  }, [shopUpdate])

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.wrapperContainer}>
          <View>
            <View style={styles.dpCoverMainContainer}>
              <DpCover shopInfo={filterShop} setShopUpate={setShopUpate} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.searchIconContainer}>
                <SearchIcon color={"#404040"} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Name of shop(Optional)"
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                setCreateProductScreen(true)
              }
              style={styles.addProductBtnContainer}
            >
              <Text style={styles.addProductBtnText}>Add Product</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.addProductTableContainer}> */}
            <TableComp products={searchFilter?.length > 0 ? searchFilter : filterProducts} setAddProduct={setAddProduct} />
          {/* </View> */}
        </View>
        {createProductScreen && (
          <AddProductForm setCreateProductScreen={setCreateProductScreen} token={token} setAddProduct={setAddProduct} /> 
        )}
      </View>
      {signOutLoading && <Loader />}
    </>
  );
}
