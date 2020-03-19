import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Picker} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import COLORS from '../../color';

import {useZ} from '../../zustand';
import utils from '../../utils';

export default function DetailPersonality({waifu}) {
  const user = useZ(z => z.user);
  const setWaifus = useZ(z => z.setWaifus);
  const popUpWaifu = useZ(z => z.popUpWaifu);

  function setPersonality(personalityId) {
    waifu.personalityId = personalityId;
    setWaifus([...user.waifus]);
    utils.setPersonality(waifu.id, personalityId);
    popUpWaifu({
      waifu: waifu,
      event: 'greet',
    });
  }
  return (
    <LinearGradient
      colors={[COLORS.bgHighlight, COLORS.bgPrimary]}
      style={{
        width: wp(100),
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{color: COLORS.textSecondary, marginRight: 10, fontSize: 18}}>
        Dialogue Set
      </Text>
      <Picker
        note
        mode="dropdown"
        style={{
          backgroundColor: COLORS.bgSecondary,
          width: wp(50),
        }}
        selectedValue={waifu.personalityId ? waifu.personalityId : 1}
        onValueChange={val => setPersonality(val)}>
        {user.personalities.map(x => (
          <Picker.Item label={x.name} value={x.id} key={x.i} />
        ))}
      </Picker>
      <Icon name="angle-down" style={{position: 'relative', right: -10}} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
