import * as React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../color';
import FavButton from './FavButton.js';

export default function DetailHeader({waifu}) {
  return (
    <LinearGradient
      colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
      style={{
        width: wp(100),
        paddingTop: 100,
        justifyContent: 'center',
        padding: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{
            borderRadius: 20,
            width: hp('9%'),
            height: hp('9%'),
            position: 'relative',
          }}
          source={{
            uri: waifu.imageUrl,
          }}
        />
        <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
          <Text style={{color: COLORS.textTitle, fontSize: 28}}>
            {waifu.name}
          </Text>
          <Text style={{colors: COLORS.textTitle, fontSize: 20}}>
            {waifu.series.name}
          </Text>
        </View>
        <View style={{height: 100}}>
          <FavButton onPress={() => () => {}} isFavorite={waifu.isFavorite} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
