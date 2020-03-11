import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Content} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem, SearchBar} from 'react-native-elements';

import utils from '../../utils.js';
import Loading from '../Loading.js';
import COLORS from '../../color';

export default function({route, navigation}) {
  const [malType] = React.useState(route.params.malType);
  const [favorites, setFavorites] = React.useState(route.params.series);
  const [search, setSearch] = React.useState('');
  const [series, setSeries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      updateSearch();
      return () => {
        setLoading(true);
        if (searchTimeout) {
          clearTimeout(searchTimeout);
          setSearch('');
          setSearchTimeout(null);
        }
      };
    }, [malType]),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Add ${malType}`,
    });
  }, [navigation, malType]);

  function updateSeries() {
    utils.getTopSeries(malType, search).then(data => {
      setLoading(false);
      setSeries(data);
    });
  }

  function addSeries(series) {
    utils.addSeries(malType, series.malId);
    setFavorites([...favorites, series]);
  }
  function removeSeries(series) {
    utils.removeSeries(malType, series.malId);
    setFavorites(favorites.filter(x => x.malId != series.malId));
  }

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
        series.map(item => {
          const isFavorite = !!favorites.find(x => x.malId === item.malId);
          return (
            <ListItem
              leftAvatar={{source: {uri: item.imageUrl}}}
              key={item.malId}
              title={item.name}
              checkmark={isFavorite}
              onPress={() => {
                isFavorite ? removeSeries(item) : addSeries(item);
              }}
              bottomDivider
            />
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
