import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text, Tag } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";

export default class DriverTab extends Component {
  render() {
    const {
      style,
      image,
      menbreship,
      tag,
      rides,
      styleLeft,
      styleThumb,
      styleRight,
      onPress,
      textFirst,
      point,
      textSecond,
      textThird,
      icon
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.contain, style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={[styles.contentLeft, styleLeft]}>
          <View>
            <Image source={image} style={[styles.thumb, styleThumb]} />
            <View style={styles.point}>
              <Text overline whiteColor semibold>
                {point}
              </Text>
            </View>
          </View>

          <View>
            <Text headline semibold numberOfLines={1}>
              {textFirst}
            </Text>
            {/*
            <Text
              body2
              style={{
                marginTop: 3,
                paddingRight: 10
              }}
              numberOfLines={1}
            >
              {textSecond}
            </Text>
                Promotion */}
            <Text footnote grayColor numberOfLines={1}>
              Rides:{rides}
            </Text>
          </View>
        </View>

        <View style={[styles.contentRight, styleRight]}>
          <Image source={menbreship} style={[styles.menbreship, styleThumb]} />

          <Tag
            icon={
              <Icon
                name={"car-alt"}
                size={12}
                color={BaseColor.accentColor}
                solid
                style={{ marginRight: 5 }}
              />
            }
            chip
            style={{
              marginTop: 10,
              marginRight: 10
            }}
          >
            {tag}
          </Tag>
        </View>
      </TouchableOpacity>
    );
  }
}

DriverTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func
};

DriverTab.defaultProps = {
  image: "",
  textFirst: "",
  textSecond: "",
  icon: true,
  point: "",
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {}
};
