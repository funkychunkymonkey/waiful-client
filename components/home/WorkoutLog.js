import * as React from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import moment from 'moment';

import utils from '../../utils.js';
import Loading from '../Loading.js';

import COLOR from '../../color';
import {LineChart} from 'react-native-chart-kit';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeSections, setActiveSections] = React.useState('');
  const [listPositions, setListPositions] = React.useState([]);
  const scrollElement = React.useRef();
  const listElement = React.useRef();

  const changeListPlace = listPosition => {
    console.log(listPosition);
    scrollElement.current.scrollTo({
      x: 0,
      y: listPosition[0].place,
      animated: true,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      utils.getWorkouts().then(data => {
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
        <Text>No workouts found.</Text>
      </View>
    );
  return (
    <View style={{flex: 1}}>
      <LineChart
        data={{
          labels: logs
            .map(log => log.createdAt)
            .map(
              createdAt => createdAt.slice(5, 7) + '/' + createdAt.slice(8, 10),
            )
            .reverse()
            .splice(-7), // get latest data from the end of an array
          datasets: [
            {
              data: logs
                .map(log => log.reps)
                .reverse()
                .splice(-7), // get latest data from the end of an array
            },
          ],
        }}
        width={Dimensions.get('window').width - 10} // from react-native
        height={250}
        fromZero={true}
        yAxisSuffix="reps"
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
          setActiveSections(dataIndex[data.index]);
          changeListPlace(
            listPositions.filter(
              listPosition => listPosition.key === dataIndex[data.index],
            ),
          );
        }}
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 20,
        }}
      />
      <ScrollView ref={scrollElement}>
        {logs.map((log, i) => (
          <ListItem
            ref={listElement}
            key={i}
            containerStyle={
              activeSections === i ? {backgroundColor: COLOR.bgPrimary} : {}
            }
            onLayout={({nativeEvent}) => {
              // activeSections === i
              setListPositions([
                ...listPositions,
                {key: i, place: nativeEvent.layout.y},
              ]);
            }}
            title={log.exercise.name}
            subtitle={log.reps + ' reps'}
            rightAvatar={<Text>{moment(log.createdAt).format('LLLL')}</Text>}
            bottomDivider
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
