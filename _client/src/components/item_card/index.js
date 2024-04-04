import React from "react";
import { View, Text, Image } from "react-native";
import { styles, noImageUri } from "./styles";
import { StarsIcon, MessengerIcon } from "../svgs/svgs";

export default function ItemCard({
  itemKey,
  uri,
  producName,
  productDescription,
  productPrice,
}) {
  return (
    <View key={itemKey}  style={styles.mainContainer}>
      <View style={styles.ItemImgContainer}>
        <Image
          source={{ uri: uri ? uri : noImageUri }}
          alt="item_img"
          style={styles.itemImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{producName}</Text>
        <Text style={styles.itemDetail}>{productDescription}</Text>
        <StarsIcon width={50} height={20} />
      </View>
      <View style={styles.priceandCartContainer}>
        <View style={styles.priceBtn}>
          <Text style={styles.priceBtnText}>{productPrice}</Text>
        </View>
        {/* <View style={styles.cartAndMessangerContainer}>
          <View style={styles.messangerBtn}></View>
          {/* <View style={styles.cartBtn}>
            <MessengerIcon width={24} height={24} />
          </View> */}
        {/* </View> */}
      </View>
    </View>
  );
}
