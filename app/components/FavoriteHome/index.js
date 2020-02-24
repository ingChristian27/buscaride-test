import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image } from "@components";
import { Images } from "@config";

export default class FavoriteHome extends Component {
  render() {
    const { style, children, styleContent, image, onPress } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.9}>
        <Image source={image} style={styles.thumb} />
        <View style={styleContent}>{children}</View>
      </TouchableOpacity>
    );
  }
}

FavoriteHome.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContent: PropTypes.object,

  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  onPress: PropTypes.func
};

FavoriteHome.defaultProps = {
  image: Images.profile2,
  style: {},
  styleContent: {
    position: "absolute",
    bottom: 0,
    padding: 10
  },
  onPress: () => {}
};
