import axiosBase from '../../../axios';
import { getToken } from '../../../store/features/shopToken';
import { Alert } from "react-native";

export async function signIn(
  email,
  password,
  { setEmailError, setPasswordError, setPasswordLengthError },
  dispatch,
  navigation,
  setLoading
) {
  setLoading(true);
  if (email.length === 0) {
    setEmailError(true);
  }
  if (password.length === 0) {
    setPasswordError(true);
  }
  if (password.length < 6) {
    setPasswordLengthError(true);
  }
  if (email.length <= 0 || password.length <= 0 || password.length < 6) {
    setLoading(false);
    return;

  }  
  const data = {
    email,
    password
  };
  try {
    const response = await axiosBase.post('/sign-in', data);
    if (response.data) {
      dispatch(getToken(response.data.token))
      navigation.navigate("customize-shop");
      console.log('Log_in successful!');
    } else {
      console.error('data not found!')
    }
    setLoading(false);
  } catch (e) {
    Alert.alert("Wrong credentials user not found!");
    setLoading(false)
  }
}