import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Content, Button} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';

import Loading from '../Loading.js';

import COLORS from '../../color';
import utils from '../../utils.js';
import {useSettingsZ} from '../../zustand.js';

export default function({route, navigation}) {
  const malType = useSettingsZ(z => z.malType);
  const setMalType = useSettingsZ(z => z.setMalType);
  const series = useSettingsZ(z => z.series);
  const setSeries = useSettingsZ(z => z.setSeries);

  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      utils.getSeries(route.params.malType).then(data => {
        setLoading(false);
        setMalType(route.params.malType);
        setSeries(data.filter(x => x.malType === route.params.malType));
      });
      return () => {
        setLoading(true);
      };
    }, []),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `My ${malType}`,
      headerRight: () => (
        <Button
          style={{
            backgroundColor: 'transparent',
            paddingRight: 20,
            paddingLeft: 10,
          }}
          onPress={() => {
            navigation.navigate('SettingsSeriesAdd');
          }}>
          <Text style={{color: '#000'}}>Add +</Text>
          {series.length === 0 && (
            <LottieView
              style={styles.add}
              autoPlay={true}
              loop={true}
              source={require('../../assets/lottie/click.json')}
              speed={1.5}
              progress={0.9}
            />
          )}
        </Button>
      ),
    });
  }, [navigation, malType, series]);

  function removeSeries(s) {
    utils.removeSeries(malType, s.malId);
    setSeries(series.filter(x => x.malId != s.malId));
  }

  if (loading) return <Loading />;
  if (series.length === 0)
    return (
      <Content style={styles.body}>
        <Text style={styles.text}>No {malType} added.</Text>

        <Image
          source={require('../../assets/others/hand.png')}
          style={styles.hand}
          resizeMode="contain"
        />
      </Content>
    );
  return (
    <Content style={styles.body}>
      {series.map((item, i) => (
        <View style={styles.wrapper} key={i}>
          <ListItem
            style={styles.item}
            leftAvatar={{source: {uri: item.imageUrl}}}
            key={item.malId}
            title={item.name}
            bottomDivider
          />

          <TouchableOpacity
            style={styles.trashcan}
            onPress={() => {
              removeSeries(item);
            }}>
            <Icon name="trash" color={'black'} size={22} />
          </TouchableOpacity>
        </View>
      ))}
    </Content>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.bgSecondary,
    width: '100%',
    position: 'relative',
  },
  text: {
    fontSize: 20,
    padding: 20,
  },
  add: {
    width: 70,
    position: 'absolute',
    right: 2,
  },
  hand: {
    right: 0,
    top: -170,
    width: 90,
    position: 'absolute',
    transform: [{rotate: '20 deg'}],
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
