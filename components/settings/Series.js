import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Content, Button} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';

import utils from '../../utils.js';
import Loading from '../Loading.js';
import COLORS from '../../color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function({route, navigation}) {
  const [malType] = React.useState(route.params.malType);
  const [series, setSeries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      utils.getSeries(malType).then(data => {
        setLoading(false);
        setSeries(data.filter(x => x.malType === malType));
      });
      return () => {
        setLoading(true);
      };
    }, [malType]),
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
            navigation.navigate('SettingsSeriesAdd', {malType, series});
          }}>
          <Text style={{color: '#000'}}>Add +</Text>
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
        <Text>No {malType} added.</Text>
      </Content>
    );
  return (
    <Content style={styles.body}>
      {series.map(item => (
        <View style={styles.wrapper}>
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
