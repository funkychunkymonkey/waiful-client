import * as React from 'react';
import {Text, Image, View, TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../color';

import {useZ, useCollectionZ} from '../../zustand';
import styles from '../style/Collection';

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
