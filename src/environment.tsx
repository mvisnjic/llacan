import Config from "react-native-config";
import * as yup from "yup";

const { BASE_URL, PERSIST_NAVIGATION_STATE } = Config;

export const envValidationSchema = yup.object({
  BASE_URL: yup.string().required(),
  PERSIST_NAVIGATION_STATE: yup.boolean().default(false),
});

export const environmentValues = {
  BASE_URL,
  PERSIST_NAVIGATION_STATE,
};

function validateEnvironment() {
  try {
    return envValidationSchema.validateSync(environmentValues);
  } catch (error: any) {
    throw new Error(
      ".env file missing or invalid. Do you have a `.env` file in the root of" +
        "your project? You can copy a config from .env.example and save into .env" +
        ", then rebuild your app with `yarn android` or `yarn ios`/through Xcode\n\nError: " +
        (error?.message ?? error)
    );
  }
}

export const environment = validateEnvironment();
