import React from "react";
import { Text, View, Image } from "react-native";
import { styles, noImageUri } from "./styles";
import { MessengerIcon, StarsIcon, CartIcon } from "../svgs/svgs";

export default function ViewCard({
  uri = noImageUri,
  price = "Not Found!",
  productName = "Not Found!",
  shopName = "Not Fonud!",
}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: uri }} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTxt}>{`Rs. ${price}`}</Text>
          <View style={styles.cartIconContainer}>
            <CartIcon />
          </View>
        </View>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.shopName}>{shopName}</Text>
        <View style={styles.quesMainContainer}>
          <View style={styles.quesContainer}>
            <Text style={styles.questionTxt}>Have any question?</Text>
            <MessengerIcon />
          </View>
          <StarsIcon width={50} height={20} />
        </View>
      </View>
    </View>
  );
}
