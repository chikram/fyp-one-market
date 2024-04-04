import React from "react";
import { Text, View, TextInput } from "react-native";
import {
  styles,
  locationDdsize,
  marketDdsize,
  categoryDdsize,
  locationDdListsize,
  marketDdListsize,
  categoryDdListsize,
} from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { DownArrow, SearchIcon } from "../svgs/svgs";

const countries = ["Islamabad", "Rawalpindi"];
const market = ["Islamabad", "Rawalpindi"];

export default function FindShopCard() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.mainHeading}>FINDSHOP</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.flexContainer}>
          <View style={styles.dropDownContainer}>
            <SelectDropdown
              defaultButtonText="Location"
              buttonStyle={{ ...styles.dropDownbtn, ...locationDdsize }}
              dropdownStyle={{ ...styles.dropDown, ...locationDdListsize }}
              rowStyle={styles.dropDownrow}
              rowTextStyle={styles.dropDownbtnTextTransform}
              buttonTextStyle={styles.dropDownbtnText}
              sty
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <View style={styles.transformIcon}>
              <DownArrow width={16} height={16} color="#000000" />
            </View>
          </View>
          <View style={styles.dropDownContainer}>
            <SelectDropdown
              // dropdownStyle={}
              defaultButtonText="Market"
              buttonStyle={{ ...styles.dropDownbtn, ...marketDdsize }}
              dropdownStyle={{ ...styles.dropDown, ...marketDdListsize }}
              rowStyle={styles.dropDownrow}
              rowTextStyle={styles.dropDownrowText}
              buttonTextStyle={styles.dropDownbtnText}
              sty
              data={market}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <View style={styles.transformIcon}>
              <DownArrow width={16} height={16} color="#000000" />
            </View>
          </View>
        </View>
        {/* <View style={styles.dropDownContainerNoMargin}>
          <SelectDropdown
            // dropdownStyle={}
            defaultButtonText="Categories"
            buttonStyle={{ ...styles.dropDownbtn, ...categoryDdsize }}
            dropdownStyle={{ ...styles.dropDown, ...categoryDdListsize }}
            rowStyle={styles.dropDownrow}
            rowTextStyle={styles.dropDownrowText}
            buttonTextStyle={styles.dropDownbtnText}
            sty
            data={market}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          <View style={styles.transformIcon}>
            <DownArrow width={16} height={16} color="#000000" />
          </View>
        </View> */}

        {/* <View style={styles.inputContainer}>
          <View style={styles.searchIconContainer}>
            <SearchIcon color={"#404040"} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name of shop(Optional)"
          />
        </View> */}
        <View style={styles.registrationBtnContainer}>
          {/* <TouchableOpacity
            
            // onPress={() => navigation.navigate("register")}
          > */}
          <View style={styles.registrationBtn}>
            <Text style={styles.registrationBtnText}>Search now</Text>
          </View>

          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}
