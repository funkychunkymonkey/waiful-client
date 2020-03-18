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
    console.log(result);
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
        series.map(item => {
          return (
            <ListItem
              leftAvatar={{source: {uri: item.imageUrl}}}
              key={item.malId}
              title={item.name}
              onPress={() =>
                route.params.stackNavigation.navigate('SeriesCharacters', {
                  series: item,
                  malType: malType,
                })
              }
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
