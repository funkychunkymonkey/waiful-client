import * as React from 'react';
import {Text} from 'react-native';
import {Picker} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import COLORS from '../../color';
import styles from '../style/Collection';

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
      style={styles.dPersonality1}>
      <Text style={styles.dPText}>Dialogue Set</Text>
      <Picker
        note
        mode="dropdown"
        style={styles.dPersonality2}
        selectedValue={waifu.personalityId ? waifu.personalityId : 1}
        onValueChange={val => setPersonality(val)}>
        {user.personalities.map(x => (
          <Picker.Item label={x.name} value={x.id} />
        ))}
      </Picker>
      <Icon name="angle-down" style={styles.dPIcon} />
    </LinearGradient>
  );
}
