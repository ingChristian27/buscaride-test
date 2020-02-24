import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image, Text, Tag, Icon } from "@components";
import { Images, BaseColor } from "@config";

export default class FeatureDriverCard extends Component {
  render() {
    const {
      style,
      title,
      location,
      time,
      image,
      onPress,
      menbreship,
      rides,
      rating,
      tag
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.content, style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={image} style={styles.imageBanner} />
        <View
          style={{
            padding: 10,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }}>
            <Text body2 semibold numberOfLines={1} style={{ flex: 1 }}>
              {title}
            </Text>
            <Text overline grayColor style={{ marginVertical: 5 }}>
              Rides:{rides}
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: 100 }}>
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

              <View style={{ width: 100 }}>
                <Image source={menbreship} style={styles.imageMembership} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

FeatureDriverCard.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  onPress: PropTypes.func
};

FeatureDriverCard.defaultProps = {
  image: Images.profile2,
  title: "BBC Music Introducing",
  time: "Thu, Oct 31, 9:00am",
  location: "Tobacco Dock, London",
  style: {},
  onPress: () => {}
};
