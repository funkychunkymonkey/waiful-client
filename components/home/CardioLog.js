import * as React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
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

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedLog, setSelectedLog] = React.useState(-1);
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
      <Accordion
        style={{}}
        sections={logs}
        activeSections={activeSections}
        renderHeader={log => (
          <View>
            <ListItem
              title={'🏃 ' + log.distance + 'm'}
              rightAvatar={<Text>{moment(log.createdAt).format('LLL')}</Text>}
              bottomDivider
            />
          </View>
        )}
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
