import * as React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Tooltip} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import utils from '../../utils.js';
import Loading from '../Loading.js';
import Accordion from 'react-native-collapsible/Accordion';
import MapView from 'react-native-maps';
import {color} from 'react-native-reanimated';
import COLOR from '../../color';

import {LineChart} from 'react-native-chart-kit';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeSections, setActiveSections] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      utils.getRuns().then(data => {
        setLoading(false);
        setLogs(data);
      });
      return () => {
        setLoading(true);
      };
    }, []),
  );

  if (loading) return <Loading />;
  if (logs.length === 0)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No runs found.</Text>
      </View>
    );
  return (
    <ScrollView>
      <LineChart
        data={{
          labels: logs
            .map(log => log.startedAt)
            .map(
              startedAt => startedAt.slice(5, 7) + '/' + startedAt.slice(8, 10),
            )
            .reverse()
            .splice(-7), // get latest data from the end of an array
          datasets: [
            {
              data: logs
                .map(log => log.distance)
                .reverse()
                .splice(-7), // get latest data from the end of an array
            },
          ],
        }}
        width={Dimensions.get('window').width - 10} // from react-native
        height={250}
        fromZero={true}
        yAxisSuffix="m"
        yAxisInterval={1}
        yLabelsOffset={1}
        segments={4}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 20,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        onDataPointClick={data => {
          const dataIndex = {
            0: 6,
            1: 5,
            2: 4,
            3: 3,
            4: 2,
            5: 1,
            6: 0,
          };
          setActiveSections([dataIndex[data.index]]);
        }}
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 20,
        }}
      />
      <Accordion
        style={{}}
        sections={logs.filter(x => x.distance > 0)}
        activeSections={activeSections}
        renderHeader={log => {
          const time = moment(log.startedAt);
          const day = time.format('dddd');
          const timeOfTheDay = utils.getGreetingTime(time);
          return (
            <View>
              <ListItem
                leftAvatar={<Text>🏃</Text>}
                title={`${day} ${timeOfTheDay} run!`}
                subtitle={`${log.distance}m`}
                rightAvatar={<Text>{time.fromNow()}</Text>}
                bottomDivider
              />
            </View>
          );
        }}
        renderContent={(log, _, isActive) => {
          if (!isActive) return <></>;
          const data = JSON.parse(log.data);
          if (data.length <= 0)
            return <Text style={{padding: 10}}>No data logged.</Text>;
          return (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: data[0][0],
                  longitude: data[0][1],
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.005,
                }}>
                <MapView.Polyline
                  coordinates={data.map(x => ({
                    latitude: x[0],
                    longitude: x[1],
                  }))}
                  strokeColor={'#f00'}
                  strokeWidth={4}
                />
                <MapView.Marker
                  coordinate={{latitude: data[0][0], longitude: data[0][1]}}
                  title="Start"
                />
                <MapView.Marker
                  coordinate={{
                    latitude: data[data.length - 1][0],
                    longitude: data[data.length - 1][1],
                  }}
                  title="End"
                />
              </MapView>
            </View>
          );
        }}
        onChange={activeSections => setActiveSections(activeSections)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: wp('100%'),
    height: hp('40%'),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
