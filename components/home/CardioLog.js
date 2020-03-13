import * as React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Tooltip} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import utils from '../../utils.js';
import Loading from '../Loading.js';
import {color} from 'react-native-reanimated';
import COLOR from '../../color';

import {LineChart} from 'react-native-chart-kit';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedList, setSelectedList] = React.useState('');

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
    <View>
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
        yAxisInterval={1} // optional, defaults to 1
        yLabelsOffset={1}
        segments={4}
        //configuraion for chart
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
          setSelectedList(dataIndex[data.index]);
        }}
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 20,
        }}
      />
      <ScrollView>
        {logs.map((log, i) => (
          <ListItem
            key={i}
            containerStyle={
              selectedList === i ? {backgroundColor: COLOR.bgHighlight} : {}
            }
            title={log.distance + 'm'}
            rightAvatar={<Text>{moment(log.startedAt).fromNow()}</Text>}
            bottomDivider
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
