import * as React from 'react';
import {Text, View} from 'react-native';
import {Content, Button} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';

import LottieView from 'lottie-react-native';
import utils from '../../utils.js';
import Loading from '../Loading.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../style/Setting';

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
      <Content style={styles.body2}>
        <Text style={styles.text}>No {malType} added.</Text>

        <Image
          source={require('../../assets/others/hand.png')}
          style={styles.hand}
          resizeMode="contain"
        />
      </Content>
    );
  return (
    <Content style={styles.body2}>
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
