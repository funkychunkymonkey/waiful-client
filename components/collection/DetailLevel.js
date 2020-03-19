import * as React from 'react';
import {Text, View} from 'react-native';

import COLORS from '../../color';
import styles from '../style/Collection';

export default function DetailLevel({waifu}) {
  const maxLevel =
    waifu.waifuImages.length > 1 ? (waifu.waifuImages.length - 1) * 10 : 1;
  const completion = Math.floor((waifu.level / maxLevel) * 100);
  return (
    <View style={styles.detailLevel1}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.detailLevel2}>
          <Text style={styles.detailLevelText1}>LEVEL</Text>
          <Text style={styles.detailLevelText2}>{waifu.level}</Text>
          <Text style={styles.detailLevelText3}>/ {maxLevel}</Text>
        </View>
      </View>
      <View style={styles.detailLevel3}>
        <View style={styles.detailLevel4}>
          <View
            style={{
              backgroundColor: COLORS.bgPrimary,
              height: '100%',
              width: `${completion}%`,
            }}
          />
          <View style={styles.detailLevel5}>
            <Text style={styles.detailLevelText4}>
              {completion}% completion
            </Text>
          </View>
        </View>
        <Text style={{color: COLORS.textTitle}}>
          Collect duplicates for levels and art!
        </Text>
      </View>
    </View>
  );
}
