import * as React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import utils from '../../utils.js';
import Loading from '../Loading.js';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
            .reverse(),
          datasets: [
            {
              data: logs.map(log => log.distance).reverse(),
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
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
        style={{
          marginVertical: 20,
          borderRadius: 20,
        }}
      />
      {logs.map((log, i) => (
        <ListItem
          key={i}
          style={{}}
          title={log.distance + 'm'}
          rightAvatar={<Text>{moment(log.startedAt).fromNow()}</Text>}
          bottomDivider
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
