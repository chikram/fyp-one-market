import React, { useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { styles, iconColor } from "./styles";
import { EditIcon, DeleteIcon } from "../svgs/svgs";

export default function RowItem({
  productName,
  productDescription,
  editIconOnPress,
  deleteIconOnPress,
  deleteBtnloader,
}) {
  return (
      <View style={{ ...styles.borderStyle, ...styles.fullWidth }}>
        <View
          style={{
            ...styles.rowContainers,
            ...styles.productNameContainerWidth,
          }}
        >
          <Text style={styles.productNameText}>Product Name</Text>
        </View>
        <View
          style={{
            ...styles.rowContainers,
            ...styles.productDescriptionContainerWidth,
          }}
        >
          <Text style={styles.productDescriptionText}>
            Product Description
          </Text>
        </View>
        <View
          style={{
            ...styles.rowContainers,
            ...styles.productEditContainerWidth,
          }}
          onPress={editIconOnPress}
        >
          <Text style={styles.productDescriptionText}>
            Update
          </Text>
        </View>
        <View
          style={{
            ...styles.rowContainers,
            ...styles.productEditContainerWidth,
          }}
          onPress={editIconOnPress}
        >
          <Text style={styles.productDescriptionText}>
            Delete
          </Text>
        </View>
      </View>
  );
}
