import * as React from 'react';
import {Text, TouchableOpacity, Switch} from 'react-native';
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
      <Container style={styles.container1}>
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
            style={{marginRight: 5}}
            onValueChange={() => {
              setChecked(checked ? false : true);
              return false;
            }}
            value={checked}
          />
          <Text style={styles.favMarkText}>♥ </Text>
          <Text>Favorites</Text>
        </TouchableOpacity>
        <CollectionGallery checked={checked} />
      </Body>
    </Container>
  );
}
