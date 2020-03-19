import * as React from 'react';
//import {Switch} from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import {Container, Body} from 'native-base';
import COLORS from '../../color';

import CollectionDetail from './CollectionDetail';
import CollectionGallery from './CollectionGallery';

import {useZ} from '../../zustand';

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
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 2,
            paddingRight: 5,
            zIndex: 10,
            top: Dimensions.get('window').height * 0.5,
            left: 10,
            position: 'absolute',
            borderRadius: 15,
          }}>
          <Switch
            style={{marginRight: 5}}
            onValueChange={() => {
              setChecked(checked ? false : true);
              return false;
            }}
            value={checked}
          />
          <Text style={{color: COLORS.favHeart}}>♥ </Text>
          <Text style={{color: 'black'}}>Favorites</Text>
        </TouchableOpacity>
        <CollectionGallery checked={checked} />
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
