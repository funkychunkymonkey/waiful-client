import * as React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import {Content} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {Image, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import utils from '../../utils.js';
import Loading from '../Loading.js';
import COLORS from '../../color';

export default function({route, navigation}) {
  const [malType] = React.useState(route.params.malType);
  const [search, setSearch] = React.useState('');
  const [series, setSeries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  async function updateSeries() {
    let result = [];
    setLoading(true);
    if (search === '') {
      result = (await utils.getSeries(malType)).filter(
        x => x.malType === malType,
      );
    }
    if (result.length === 0) {
      result = await utils.getTopSeries(malType, search);
    }
    setSeries(result);
    setLoading(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      updateSeries();
      return () => {
        setLoading(true);
        setSearch('');
        if (searchTimeout) {
          clearTimeout(searchTimeout);
          setSearchTimeout(null);
        }
      };
    }, [malType]),
  );

  function updateSearch(text) {
    if (searchTimeout) clearTimeout(searchTimeout);
    setLoading(true);
    setSearch(text);
    setSearchTimeout(setTimeout(updateSeries, 1000));
  }

  let body = <Loading />;
  if (!loading)
    body =
      series.length === 0 ? (
        <Content style={styles.body}>
          <Text>No {malType} found.</Text>
        </Content>
      ) : (
        series.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SeriesCharacters', {series: item, malType})
              }
              key={i}>
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
                }}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{width: 100}}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{padding: 10, flex: 1}}>
                  <Text style={{fontSize: 18}}>{item.name}</Text>
                  <Text>
                    {item.startedAt}
                    {item.startedAt ? ' - ' : ''}
                    {item.endedAt ? item.endedAt : 'Ongoing'}
                  </Text>
                  {item.description ? (
                    <Text style={{fontSize: 12}}>
                      {item.description.length > 100
                        ? item.description.substr(0, 100) + '...'
                        : item.description}
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={{padding: 10, alignItems: 'center'}}>
                  <Icon name="star" size={20} />
                  <Text>{item.score}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      );
  return (
    <Content style={styles.body}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      {body}
    </Content>
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
