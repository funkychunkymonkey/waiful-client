import * as React from 'react';
import {StyleSheet, Text, Image, View, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Badge} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../color';

import {useZ, useCollectionZ} from '../../zustand';

export default function CollectionDetail({navigation}) {
  const waifus = useZ(z => z.waifus);
  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const waifu = waifus[selectedIndex];

  return (
    <TouchableHighlight
      style={styles.showView}
      onPress={() => navigation.navigate('Detail')}>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        style={styles.waifuImageWrapper}>
        <Image
          style={styles.waifuImage}
          source={{
            uri: waifu.imageUrl,
          }}
          resizeMode="contain"
        />
        <View
          style={{
            ...styles.info,
          }}>
          <View style={styles.infoText}>
            <Text style={styles.waifuNemeText}>
              {waifu.name.replace(/&#(\d+);/g, function(m, n) {
                return String.fromCharCode(n);
              })}
            </Text>
            <Text style={styles.waifuSeriesText}>{waifu.series.name}</Text>
            <Text style={styles.waifuSeriesText}>Level {waifu.level}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  showView: {
    height: hp('52%'),
  },
  waifuImageWrapper: {
    height: hp('52%'),
    alignItems: 'center',
  },
  waifuImage: {
    marginTop: hp('1%'),
    height: hp('37%'),
    width: wp('100%'),
  },
  info: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('14%'),
  },
  infoText: {
    height: '100%',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
  },
  waifuNemeText: {
    color: COLORS.textTitle,
    textAlign: 'center',
    fontSize: hp('3%'),
  },
  waifuSeriesText: {
    color: COLORS.textTitle,
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
  gallery: {
    backgroundColor: COLORS.textSecondary,
    paddingTop: hp('3%'),
  },
  collection: {
    borderRadius: 20,
    width: hp('9%'),
    height: hp('9%'),
    marginLeft: wp('3%'),
    position: 'relative',
  },
  isFavMarkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -20,
  },
  isFavMarkHeart: {
    top: -4,
    right: -10,
    fontSize: 22,
    color: COLORS.favHeart,
  },
  trashIcon: {
    justifyContent: 'center',
    width: wp('20%'),
    height: '100%',
    padding: 10,
  },
});
