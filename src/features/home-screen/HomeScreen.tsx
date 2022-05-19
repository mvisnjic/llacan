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

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDay = now.getDate();

const checkFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fullName: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  dateOfBirth: Yup.string().required("Min years 12."),
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
            dateOfBirth: "",
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
                        onChangeText={handleChange("dateOfBirth")}
                        onBlur={handleBlur("dateOfBirth")}
                        placeholder="Date of birth..."
                        pointerEvents="none"
                        label="Date of birth"
                        value={values.dateOfBirth}
                        caption={errors.dateOfBirth}
                      />
                    </Pressable>
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date(1930, 1, 1)}
                    maximumDate={
                      new Date(currentYear - 12, currentMonth, currentDay)
                    }
                    onConfirm={(date) => {
                      const _date = dayjs(date).format("DD-MM-YYYY");
                      values.dateOfBirth = _date;
                      setDatePickerVisibility(false);
                    }}
                    onCancel={() => {
                      setDatePickerVisibility(false);
                    }}
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
