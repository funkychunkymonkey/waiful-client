import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Content, View} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image} from 'react-native-elements';

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
  }, [route.params.malType, route.params.series.malId]);

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
        {characters.map((character, i) => (
          <TouchableOpacity onPress={() => buy(character.malId)} key={i}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                shadowColor: '#000000ff',
                shadowOpacity: 0.8,
                shadowOffset: {width: 0, height: 2},
                elevation: 1,
                shadowRadius: 2,
                margin: 5,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ddd',
                overflow: 'hidden',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: character.imageUrl}}
                style={{width: 80, height: 80}}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <View style={{padding: 10, flex: 1}}>
                <Text style={{fontSize: 18}}>{character.name}</Text>
              </View>
              <View style={{padding: 10, alignItems: 'center'}}>
                <Icon name="heart" size={20} />
                <Text>100</Text>
              </View>
            </View>
          </TouchableOpacity>
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
