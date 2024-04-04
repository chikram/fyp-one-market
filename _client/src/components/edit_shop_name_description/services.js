import axiosBase from '../../../axios'
import { Alert } from "react-native";

export async function updateShopNameAndDesciption(
    docId,
    shopNameValue,
    shopDescriptionValue,
    setEditShopNameAndDescriptionScreen,
    setShopUpate,
    setLoading
) {
    setLoading(true)
    const data = {
        docId,
        shopNameValue,
        shopDescriptionValue,
    }
    try {
        await axiosBase.post('/get-shops-details/update', data);
        setLoading(false)
        setShopUpate(prev => !prev)
        setEditShopNameAndDescriptionScreen(false);   
    } catch (e) {
        console.error("message: ", e)
        setLoading(false)
        setEditShopNameAndDescriptionScreen(false)
        Alert("Unable to update!")
    }
}