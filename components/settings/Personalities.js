import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
    <Content>
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        style={{padding: 10, alignItems: 'center'}}>
        <Icon name="gem" size={60} color={COLORS.textTitle} />
        <Text style={{color: COLORS.textSecondary, fontSize: 20}}>
          {user.gems} Gems
        </Text>
      </LinearGradient>
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
      {PERSONALITIES.map((personality, i) => (
        <DialogueSet
          key={i}
          personality={personality}
          isOwned={user.personalities.some(x => x.id === personality.id)}
          buy={buy}
        />
      ))}
    </Content>
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
        rightAvatar={<Text>Buy for 200 Gems</Text>}
        onPress={() => {
          buy(personality.id);
        }}
        bottomDivider
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  body: {
    backgroundColor: COLORS.textSecondary,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  item: {flex: 7},
  trashcan: {
    flex: 3,
    paddingRight: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
