import * as React from 'react';
import {Text, View} from 'react-native';
import {Content} from 'native-base';
import {ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useZ} from '../../zustand';
import utils from '../../utils';

import COLORS from '../../color';
const PERSONALITIES = require('../../assets/personalities');

export default function({route, navigation}) {
  const user = useZ(z => z.user);
  const reloadUser = useZ(z => z.reloadUser);

  function buy(personalityId) {
    utils.buyPersonality(personalityId).then(() => {
      reloadUser();
    });
  }

  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: COLORS.textSecondary,
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{color: COLORS.textTitle}}>
            Purchase dialogue sets to customise your collection with!
          </Text>
        </View>
      </View>
      <Content>
        {PERSONALITIES.map((personality, i) => (
          <DialogueSet
            key={i}
            personality={personality}
            isOwned={user.personalities.some(x => x.id === personality.id)}
            buy={buy}
          />
        ))}
      </Content>
    </>
  );
}

function DialogueSet({personality, isOwned, buy}) {
  if (personality.id === 1) {
    return <ListItem title={personality.name} bottomDivider />;
  } else if (isOwned) {
    return (
      <ListItem
        title={personality.name}
        rightAvatar={<Text>Purchased</Text>}
        bottomDivider
      />
    );
  } else {
    return (
      <ListItem
        title={personality.name}
        rightAvatar={
          <View style={{alignItems: 'center'}}>
            <Icon name="heart" size={20} />
            <Text>200</Text>
          </View>
        }
        onPress={() => {
          buy(personality.id);
        }}
        bottomDivider
      />
    );
  }
}
