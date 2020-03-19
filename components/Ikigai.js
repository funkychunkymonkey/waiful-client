import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useZ} from '../zustand.js';

import COLORS from '../color';

export default function({navigation}) {
  const user = useZ(z => z.user);
  return (
    <LinearGradient
      colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
      style={{padding: 10, alignItems: 'center'}}>
      <Icon name="heart" size={60} color={COLORS.textTitle} />
      <Text style={{color: COLORS.textTitle, fontSize: 20, marginTop: 10}}>
        {user.gems} Ikigai
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
