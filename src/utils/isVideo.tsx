import _ from "lodash";
import { Platform } from "react-native";

const supportedExtensions = Platform.select({
  ios: ["mp4", "3gp", "mov", "m4v"],
  default: ["mp4", "3gp", "webm", "mov"],
});

export function isVideo(media: string) {
  if (typeof media !== "string") return false;

  const ext = _.last(media.split(".")) ?? "";

  if (supportedExtensions.includes(ext.toLowerCase())) return true;

  return false;
}
