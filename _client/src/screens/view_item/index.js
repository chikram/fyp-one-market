import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import ViewCard from "../../components/view_card";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../../components/item_card";
import { navigateToViewItem } from "../home/services";

export default function Item({ navigation }) {
  const cardData = useSelector((state) => state.viewCardData.data);
  const allItemsdata = useSelector((state) => state.allItems.data);
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <View>
        <ViewCard uri={cardData['item_image']} price={cardData['item_price']} productName={cardData['item_name']} />
        <ScrollView style={{ height: 320, marginTop: 10 }}>
          <View>
            {allItemsdata?.map((i) => (
              <TouchableOpacity key={i['_id']}
                onPress={() => navigateToViewItem(dispatch, i, navigation)}
              >
                <ItemCard
                  uri={i['item_image']}
                  producName={i['item_name']}
                  productDescription={i['item_discription']}
                  productPrice={i['item_price']}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}