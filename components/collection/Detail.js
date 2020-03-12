import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, Text} from 'react-native';
import {Container, Body} from 'native-base';

import COLORS from '../../color';

import DetailHeader from './DetailHeader.js';
import DetailLevel from './DetailLevel.js';
import DetailGallery from './DetailGallery.js';
import DetailFooter from './DetailFooter.js';

import {useZ, useCollectionZ} from '../../zustand';

export default function Collection({navigation}) {
  const selectedIndex = useCollectionZ(z => z.selectedIndex);
  const waifus = useZ(z => z.waifus);
  const waifu = waifus[selectedIndex];

  if (!waifu) return <></>;
  return (
    <Container>
      <Body style={styles.body}>
        <ScrollView>
          <DetailHeader />
          <DetailLevel waifu={waifu} />
          <DetailGallery waifu={waifu} />
          <Text style={{padding: 20, fontSize: 20}}>
            {waifu.description.replace(/\\n/g, '\n')}
          </Text>
          <DetailFooter navigation={navigation} />
        </ScrollView>
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.bgSecondary,
    width: '100%',
  },
});
