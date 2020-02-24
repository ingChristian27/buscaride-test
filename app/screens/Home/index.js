import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  FavoriteHome,
  Button,
  ProfileDetail,
  SafeAreaView,
  FeatureDriverCard,
  DriverTab
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

// Load sample data
import { PromotionData, TourData, driverFavorites, DriversTab } from "@data";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      icons: [
        {
          icon: "bus",
          name: "Delivery",
          route: "Hotel"
        },
        {
          icon: "map-marker-alt",
          name: "Driver",
          route: "Tour"
        },
        {
          icon: "car-alt",
          name: "tourist driver",
          route: "OverViewCar"
        },
        /*{
          icon: "plane",
          name: "Flight",
          route: "FlightSearch"
        },
        {
          icon: "ship",
          name: "Cruise",
          route: "CruiseSearch"
        },
        {
          icon: "bus",
          name: "Bus",
          route: "BusSearch"
        },
        {
          icon: "star",
          name: "Event",
          route: "DashboardEvent"
        },*/
        {
          icon: "ellipsis-h",
          name: "More",
          route: "More"
        }
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
      promotion: PromotionData,
      tours: TourData,
      favorites: driverFavorites,
      users: DriversTab,
      heightHeader: Utils.heightHeader()
    };
    this._deltaY = new Animated.Value(0);
  }

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  renderIconService() {
    const { navigation } = this.props;
    const { icons } = this.state;

    return (
      <FlatList
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}
            >
              <View style={styles.iconContent}>
                <Icon
                  name={item.icon}
                  size={18}
                  color={BaseColor.primaryColor}
                  solid
                />
              </View>
              <Text footnote grayColor>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const {
      promotion,
      tours,
      favorites,
      users,
      relate,
      heightHeader
    } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(140);
    const marginTopBanner = heightImageBanner - heightHeader;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.Image
          source={Images.brBackground1}
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(100),
                  Utils.scaleWithPixel(100)
                ],
                outputRange: [heightImageBanner, heightHeader, 0]
              })
            }
          ]}
        />
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() =>
              this.setState({
                heightHeader: Utils.heightHeader()
              })
            }
            scrollEventThrottle={8}
          >
            <View style={{ alignItems: "center" }}>
              <View style={[styles.searchForm, { marginTop: marginTopBanner }]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Search")}
                  activeOpacity={0.9}
                >
                  <View style={BaseStyle.textInput}>
                    <Text body1 grayColor>
                      What're you looking for ?
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.renderIconService()}
              </View>
            </View>

            {/* Hiking */}

            <View>
              <View style={styles.contentHiking}>
                <Text title3 semibold>
                  My Favorite Drivers
                </Text>
              </View>

              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={favorites}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <FavoriteHome
                    style={[
                      styles.driverFavoritesHome,
                      index == 0
                        ? { marginHorizontal: 20 }
                        : { marginRight: 20 }
                    ]}
                    image={item.image}
                    onPress={() => navigation.navigate("DriverProfile")}
                  >
                    <Text headline light style={{ fontSize: 14.5 }}>
                      {item.name}
                    </Text>
                  </FavoriteHome>
                )}
              />
            </View>

            {/* Event*/}
            <Text title3 semibold style={{ padding: 20 }}>
              Featured Drivers
            </Text>
            <View>
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
            </View>
            {/* Promotion */}

            <View
              style={{
                padding: 20
              }}
            >
              <FlatList
                data={users}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <DriverTab
                    image={item.image}
                    menbreship={item.menbreship}
                    tag={item.tag}
                    rides={item.rides}
                    textFirst={item.name}
                    point={item.point}
                    textSecond={item.address}
                    textThird={item.id}
                    style={BaseStyle.paddingBottom}
                    onPress={() => navigation.navigate("DriverProfile")}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
