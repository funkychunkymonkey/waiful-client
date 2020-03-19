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
import styles from '../style/Shop';

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

  function buy(character) {
    if (user.gems < character.price) {
      popUpWaifu({
        event: 'gems:insufficient',
      });
    }
    utils
      .buyWaifu(
        route.params.malType,
        route.params.series.malId,
        character.malId,
        character.price,
      )
      .then(res => {
        if (!res) return;
        setWaifus([res, ...waifus.filter(x => x.id !== res.id)]);
        incrementGems(-1 * character.price);
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
          style={styles.content1}>
          <Icon name="heart" size={60} color={COLORS.textTitle} />
          <Text style={styles.text1}>{user.gems} Ikigai</Text>
        </LinearGradient>
      </View>
      <Content>
        {characters.map((character, i) => (
          <TouchableOpacity key={i} onPress={() => buy(character)}>
            <View style={{...styles.row, ...styles.characterRow}}>
              <Image
                source={{uri: character.imageUrl}}
                style={styles.characterRowImage}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>{character.name}</Text>
              </View>
              <View style={styles.rowRight}>
                <Icon name="heart" size={20} />
                <Text>{character.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Content>
    </>
  );
}
