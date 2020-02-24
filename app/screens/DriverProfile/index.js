import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { UserData, HelpBlockData } from "@data";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileGroup,
  DriverProfilePerformance,
  Tag,
  Image,
  Button,
  EventCard,
  FeatureDriverCard
} from "@components";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Utils from "@utils";
import styles from "./styles";

export default class DriverProfile extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      heightHeader: Utils.heightHeader(),
      region: {
        latitude: 1.352083,
        longitude: 103.819839,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004
      },
      facilities: [
        { id: "1", icon: "wifi", name: "Free Wifi", checked: true },
        { id: "2", icon: "bath", name: "Shower" },
        { id: "3", icon: "paw", name: "Pet Allowed" },
        { id: "4", icon: "bus", name: "Shuttle Bus" },
        { id: "5", icon: "cart-plus", name: "Supper Market" },
        { id: "6", icon: "clock", name: "Open 24/7" }
      ],
      services: [
        { icon: "user", name: "5 seats" },
        { icon: "history", name: "Pay at Pick-Up  " },
        { icon: "snowflake", name: "AC" },
        { icon: "paw", name: "Pet Allowed" },
        { icon: "wifi", name: "Free Wifi" }
      ],
      relate: [
        {
          id: "0",
          image: Images.car1,
          menbreship: Images.platinum,
          rating: 8.7,
          rides: 100,
          title: "Julian Arango",
          tag: "Tourist",
          time: "Thu, Oct 31, 9:00am",
          location: "Tobacco Dock, London"
        },
        {
          id: "1",
          image: Images.car2,
          menbreship: Images.platinum,
          rides: 54,
          rating: 9.5,
          title: "Esteban Ayala",
          tag: "Driver",
          time: "Thu, Oct 31, 9:00am",
          location: "Tobacco Dock, London"
        },
        {
          id: "2",
          image: Images.car3,
          menbreship: Images.platinum,
          rides: 75,
          rating: 8.2,
          title: "Nairo Quintana",
          tag: "Delivery",
          time: "Thu, Oct 31, 9:00am",
          location: "Tobacco Dock, London"
        }
      ],
      userData: UserData[0]
    };
    this._deltaY = new Animated.Value(0);
  }

  render() {
    const { navigation } = this.props;
    const {
      heightHeader,
      region,
      facilities,
      services,
      relate,
      userData
    } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(250, 1);
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            styles.imgBanner,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(140),
                  Utils.scaleWithPixel(140)
                ],
                outputRange: [heightImageBanner, heightHeader, heightHeader]
              })
            }
          ]}
        >
          <Image source={Images.car1} style={{ flex: 1 }} />
          <Animated.View
            style={{
              position: "absolute",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingHorizontal: 20,
              width: "100%",
              bottom: 15,
              opacity: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(140),
                  Utils.scaleWithPixel(140)
                ],
                outputRange: [1, 0, 0]
              })
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Image source={Images.profile2} style={styles.userIcon} />
              <View>
                <Text headline semibold whiteColor>
                  Steve Garrett
                </Text>
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
                    marginTop: 5,
                    marginRight: 5
                  }}
                >
                  Driver
                </Tag>
                {/* <Image source={menbreship} style={[styles.menbreship, styleThumb]} /> 
                <Text footnote whiteColor>
                  5 hours ago | 100k views
                </Text>
                */}
              </View>
            </View>
            <Tag rateSmall>Favorite</Tag>
          </Animated.View>
        </Animated.View>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          {/* Header */}
          <Header
            title=""
            renderLeft={() => {
              return (
                <Icon
                  name="arrow-left"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              );
            }}
            renderRight={() => {
              return (
                <Icon name="images" size={20} color={BaseColor.whiteColor} />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => {
              navigation.navigate("PreviewImage");
            }}
          />
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() => {
              this.setState({
                heightHeader: Utils.heightHeader()
              });
            }}
            scrollEventThrottle={8}
          >
            <View style={{ height: 255 - heightHeader }} />
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 20
              }}
            >
              <DriverProfilePerformance
                type="medium"
                style={{ backgroundColor: "white" }}
                data={userData.performance}
              />
              <View style={styles.line} />
              <Text
                body2
                grayColor
                lineHeight={20}
                style={{ marginTop: 20, marginBottom: 10, textAlign: "center" }}
              >
                Desertscene, in association with X-Ray Touring, proudly
                presents: The return of TRUCKFIGHETERS Playing 'Gravity X' from
                finish to start. Plus special guests Swan Valley Heights
              </Text>

              <Text
                title3
                semibold
                style={{
                  paddingTop: 10
                }}
              >
                Features
              </Text>
              <View style={styles.wrapContent}>
                {services.map(item => {
                  return (
                    <Tag
                      icon={
                        <Icon
                          name={item.icon}
                          size={12}
                          color={BaseColor.accentColor}
                          solid
                          style={{ marginRight: 5 }}
                        />
                      }
                      chip
                      key={item.id}
                      style={{
                        marginTop: 10,
                        marginRight: 10
                      }}
                    >
                      {item.name}
                    </Tag>
                  );
                })}
              </View>
            </View>

            <Text
              title3
              semibold
              style={{
                marginLeft: 20,
                marginBottom: 20
              }}
            >
              You May Also Like
            </Text>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20
              }}
              horizontal={true}
              data={relate}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <FeatureDriverCard
                  image={item.image}
                  tag={item.tag}
                  menbreship={item.menbreship}
                  rides={item.rides}
                  rating={item.rating}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  onPress={() => navigation.navigate("DriverProfile")}
                  style={{ marginLeft: 20 }}
                />
              )}
            />
          </ScrollView>
          {/* Pricing & Booking Process */}
          <View style={styles.contentButtonBottom}>
            <View></View>
            <Button
              style={{ height: 46 }}
              onPress={() => navigation.navigate("EventPreviewBooking")}
            >
              Book Now
            </Button>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
