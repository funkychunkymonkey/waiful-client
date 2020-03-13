import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Body} from 'native-base';
import COLORS from '../../color';

import CollectionDetail from './CollectionDetail';
import CollectionGallery from './CollectionGallery';

import {useZ} from '../../zustand';

export default function Collection({navigation}) {
  const waifus = useZ(z => z.waifus);
  if (waifus.length === 0) {
    return (
      <Container style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>Your collection's empty!</Text>
      </Container>
    );
  }
  return (
    <Container>
      <Body style={styles.body}>
        <CollectionDetail navigation={navigation} />
        <CollectionGallery />
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.textSecondary,
    width: '100%',
  },
});
