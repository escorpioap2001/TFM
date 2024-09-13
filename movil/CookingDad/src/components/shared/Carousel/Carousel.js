import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { Carousel as BasicCarousel} from 'react-native-basic-carousel';
import { size } from "lodash";
import { styles } from "./Carousel.styles";

export function Carousel(props) {
  const { arrayImages, width, height} = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  

  return (
    <View style={styles.content}>
      <BasicCarousel 
        data={arrayImages} 
        renderItem={renderItem}
        onSnapItem={(item) => console.log(item)}
        pagination
        autoplay
      />
    </View>
  );

}

