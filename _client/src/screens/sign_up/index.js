import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import KeyboardAvoidingViewWrapper from "../../components/keyboard_avoiding_wrappper";
import {
  ArrowIcon,
  PersonIcon,
  PhoneIcon,
  LockIcon,
} from "../../components/svgs/svgs";
import { styles, iconColor, personIconHeight } from "./styles";
import { registerNewAccount } from "./services";
import { heightSubtractThirty } from "./styles";
import { navigationRef as navigation } from "../../source_services/root=navigation";
import Loader from "../../components/app_loader";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorHandlers = {
    setFirstNameError,
    setLastNameError,
    setPhoneNumberError,
    setEmailError,
    setPasswordError,
    setPasswordLengthError,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstName.length !== 0) {
      setFirstNameError(false);
    }
    if (lastName.length !== 0) {
      setLastNameError(false);
    }
    if (phoneNumber.length !== 0) {
      setPhoneNumberError(false);
    }
    if (email.length !== 0) {
      setEmailError(false);
    }
    if (password.length !== 0) {
      setPasswordError(false);
    }
    if (password.length >= 6) {
      setPasswordLengthError(false);
    }
  }, [firstName, lastName, phoneNumber, email, password]);
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => navigation.navigate("sign-in")}
          >
            <ArrowIcon />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingViewWrapper scrollHeight={heightSubtractThirty}>
          <View style={styles.wrapperContainer}>
            <View style={styles.flexContainer}>
              <View style={styles.smPadding}>
                <Text style={styles.headingText}>
                  Profile <Text style={styles.DetailsText}>Details</Text>
                </Text>

                <View style={styles.inputMainContainer}>
                  {firstNameError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>
                        Please enter your first name
                      </Text>
                    </View>
                  )}
                  <View style={styles.inputContainer}>
                    <View style={styles.personIconContainer}>
                      <PersonIcon height={personIconHeight} color={iconColor} />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                  {lastNameError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>
                        Please enter your last name
                      </Text>
                    </View>
                  )}
                  <View style={styles.inputContainer}>
                    <View style={styles.personIconContainer}>
                      <PersonIcon height={personIconHeight} color={iconColor} />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>
                <View style={styles.lgPadding}>
                  <Text style={styles.headingText}>
                    Account <Text style={styles.DetailsText}>Details</Text>
                  </Text>
                  <View style={styles.inputMainContainer}>
                    {phoneNumberError && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                          Please enter your phone number
                        </Text>
                      </View>
                    )}
                    <View style={styles.inputContainer}>
                      <View style={styles.personIconContainer}>
                        <PhoneIcon />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                      />
                    </View>
                    {emailError && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                          Please enter your email
                        </Text>
                      </View>
                    )}

                    <View style={styles.inputContainer}>
                      <View style={styles.personIconContainer}>
                        <PersonIcon height={personIconHeight} color={iconColor} />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                    {passwordError && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                          Please enter your password
                        </Text>
                      </View>
                    )}
                    {passwordLengthError && !passwordError ? (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                          Minimum 6 letters or digits require
                        </Text>
                      </View>
                    ) : (
                      ""
                    )}
                    <View style={styles.inputContainer}>
                      <View style={styles.lockIconContainer}>
                        <LockIcon />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                      />
                    </View>
                    <View style={styles.registrationBtnContainer}>
                      <TouchableOpacity
                        style={styles.registrationBtn}
                        onPress={() =>
                          registerNewAccount(
                            firstName,
                            lastName,
                            phoneNumber,
                            email,
                            password,
                            errorHandlers,
                            dispatch,
                            navigation,     
                            setLoading,
                          )
                        }
                      >
                        <View style={styles.registrationBtn}>
                          <Text style={styles.registrationBtnText}>Register</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingViewWrapper>
      </View>
      {loading && <Loader />}
    </>
  )
}
