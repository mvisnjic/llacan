import dayjs from "dayjs";
import { Formik } from "formik";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Yup from "yup";
import { Button } from "~/components/Button";
import { RadioButton } from "~/components/RadioButton";
import { RadioGroup } from "~/components/RadioGroup";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInputFormikYup";
import { View } from "~/components/View";

const checkFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fullName: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  dateOfBirth: Yup.string().test(
    "is-older-than-12",
    "Min years 12.",
    async (value, context) => {
      /**
        BITNO je znat da postoji i ovaj context i ako ga console.logas 
        vidjet ces da unutra se nalaze vrijednosti od ostalih fieldova.
        Tako na primjer možes npr. napravit logiku da ako ti je full name 
        "Ante" da nije bitno koliko imas godina
      */

      // console.log({context});
      const fullName = context.parent.fullName;
      // ako je fullName "Ante" onda ovaj yup.test vraca true
      if (fullName === "Ante") {
        return true;
      }

      const dayJsDate = dayjs(value);
      return dayJsDate.isBefore(dayjs().subtract(12, "years"));
    }
  ),
});

export const HomeScreen = observer(function HomeScreen() {
  // const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  return (
    <Screen>
      <View paddingMedium>
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            dateOfBirth: undefined,
            sex: "",
          }}
          validationSchema={checkFormSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            dirty,
          }) => {
            console.log(values);

            return (
              <View>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  label="Email"
                  caption={errors.email}
                  placeholder="Email..."
                  keyboardType="email-address"
                />

                <TextInput
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  label="Full name"
                  caption={errors.fullName}
                  placeholder="Full name..."
                />
                <View>
                  <Pressable
                    onPress={() => {
                      setDatePickerVisibility(true);
                    }}
                  >
                    <Pressable pointerEvents="none">
                      <TextInput
                        placeholder="Date of birth..."
                        pointerEvents="none"
                        label="Date of birth"
                        value={
                          values.dateOfBirth
                            ? dayjs(values.dateOfBirth).format("DD-MM-YYYY")
                            : ""
                        }
                        caption={errors.dateOfBirth}
                      />
                    </Pressable>
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date(1930, 1, 1)}
                    onConfirm={(date) => {
                      const _date = dayjs(date).format("YYYY-MM-DD");
                      handleChange("dateOfBirth")(_date);
                      setDatePickerVisibility(false);
                    }}
                    onCancel={() => {
                      setDatePickerVisibility(false);
                    }}
                    date={
                      values.dateOfBirth
                        ? new Date(values.dateOfBirth)
                        : undefined
                    }
                  />
                </View>

                <RadioGroup
                  onChange={handleChange("sex")}
                  selectedValue={values.sex}
                >
                  <View flexDirectionRow>
                    <RadioButton value="male" />
                    <Text>Male</Text>
                    <Spacer large />
                    <RadioButton value="female" />
                    <Text>Female</Text>
                  </View>
                </RadioGroup>

                <Spacer large />
                <Button
                  title="Submit"
                  disabled={!isValid || !dirty}
                  // onPress={() => navigation.navigate("DropdownExample")}
                  onPress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
        <Spacer />
      </View>
    </Screen>
  );
});
