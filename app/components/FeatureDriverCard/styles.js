import { StyleSheet } from "react-native";
import * as Utils from "@utils";
import { BaseColor } from "@config";
export default StyleSheet.create({
  imageBanner: {
    height: Utils.scaleWithPixel(120),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  imageMembership: {
    width: 80,
    height: 20,
    marginTop: 10,
    resizeMode: "contain"
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    width: Utils.scaleWithPixel(180)
  }
});
