import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {Container, Content, View} from 'native-base';

import DetailHeader from './DetailHeader.js';
import DetailLevel from './DetailLevel.js';
import DetailGallery from './DetailGallery.js';
import DetailPersonality from './DetailPersonality.js';
import DetailFooter from './DetailFooter.js';

import {useZ, useCollectionZ} from '../../zustand';
import styles from '../style/Collection';

export default function Datail({navigation}) {
  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const waifus = useZ(z => z.waifus);
  const waifu = waifus[selectedIndex];

  if (!waifu) return <></>;
  return (
    <Container>
      <View style={styles.bodyDetail}>
        <DetailHeader />
      </View>
      <Content style={styles.bodyDetail}>
        <DetailLevel waifu={waifu} />
        <DetailGallery waifu={waifu} />
        <DetailPersonality waifu={waifu} />
        <Text style={styles.dText}>
          {waifu.description.replace(/\\n/g, '\n')}
        </Text>
        <DetailFooter navigation={navigation} />
      </Content>
    </Container>
  );
}
