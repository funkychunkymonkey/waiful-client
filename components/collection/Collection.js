import * as React from 'react';
import {Switch} from 'react-native-gesture-handler';
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import {Container, Body} from 'native-base';

import CollectionDetail from './CollectionDetail';
import CollectionGallery from './CollectionGallery';

import {useZ} from '../../zustand';
import styles from '../style/Collection';

export default function Collection({navigation}) {
  const [checked, setChecked] = React.useState(false);
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setChecked(checked ? false : true);
            return false;
          }}
          style={styles.item}>
          <Switch
            value={checked}
            title="Favorites"
            trackColor="black"
            style={{marginRight: 5}}
            onPress={() => false}
          />
          <Text style={{color: 'black'}}>Favorites</Text>
        </TouchableOpacity>
        <CollectionGallery checked={checked} />
      </Body>
    </Container>
  );
}

