import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Content, View} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import utils from '../../utils.js';
import Loading from '../Loading.js';
import COLORS from '../../color';
import {useZ} from '../../zustand';

export default function({route, navigation}) {
  const [loading, setLoading] = React.useState(true);
  const [characters, setCharacters] = React.useState([]);

  const user = useZ(z => z.user);
  const incrementGems = useZ(z => z.incrementGems);
  const popUpWaifu = useZ(z => z.popUpWaifu);
  const waifus = useZ(z => z.waifus);
  const setWaifus = useZ(z => z.setWaifus);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Shop`,
    });
  }, [navigation]);
  React.useEffect(() => {
    utils
      .getFirstSeries(route.params.malType, route.params.series.malId)
      .then(data => {
        setCharacters(data.waifus);
        setLoading(false);
      });
  }, []);

  function buy(malId) {
    if (user.gems < 100) {
      popUpWaifu({
        event: 'gems:insufficient',
      });
    }
    utils
      .buyWaifu(route.params.malType, route.params.series.malId, malId)
      .then(res => {
        if (!res) return;
        setWaifus([res, ...waifus.filter(x => x.id !== res.id)]);
        incrementGems(-100);
        popUpWaifu({
          gacha: true,
          waifu: res,
          event: 'greet',
        });
      });
  }

  if (loading) return <Loading />;
  return (
    <>
      <View style={styles.body}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          style={{padding: 10, alignItems: 'center'}}>
          <Icon name="heart" size={60} color={COLORS.textTitle} />
          <Text style={{color: COLORS.textTitle, fontSize: 20, marginTop: 10}}>
            {user.gems} Ikigai
          </Text>
        </LinearGradient>
      </View>
      <Content>
        {characters.map(character => (
          <ListItem
            leftAvatar={{source: {uri: character.imageUrl}}}
            title={character.name}
            rightAvatar={<Text>Buy for 100 Ikigai</Text>}
            onPress={() => buy(character.malId)}
            bottomDivider
          />
        ))}
      </Content>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
  },
  body: {
    backgroundColor: COLORS.bgSecondary,
  },
});
