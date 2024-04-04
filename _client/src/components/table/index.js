import React, { useState } from "react";
import { styles, rowCellSizes } from "./styles";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row, Cell, TableWrapper } from "react-native-table-component";
import RowItem from "./custom-row";
import RowHeader from "./cutom-header";
import { deleteProduct } from "./services";

const HeadTable = ["Product", "Product Name", "Update", "Delete"];

export default function TableComp({ products, setAddProduct }) {
  const [deleteBtnloader, setDeleteBtnloader] = useState(false);
  return (
    <View style={styles.container}>
      <Table style={{ height: "100%" }} borderStyle={styles.borderStyle}>
        <RowHeader/>
        <ScrollView
          style={{ ...styles.scrollViewHeight, ...styles.fullWidth }}>
          {products?.map(
            ({ _id, item_name, item_discription, item_image, cloudinary_id, item_price }) => (
              <TouchableOpacity key={_id}>
                <RowItem
                  productName={item_name}
                  productDescription={item_discription}
                  deleteIconOnPress={() =>
                    deleteProduct(_id, setAddProduct)
                  }
                  deleteBtnloader={deleteBtnloader}
                />
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </Table>
    </View>
  );
}
