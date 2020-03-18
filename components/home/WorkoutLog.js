import * as React from 'react';
import {Text, View, Dimensions, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import moment from 'moment';

import utils from '../../utils.js';
import Loading from '../Loading.js';

import COLOR from '../../color';
import {LineChart} from 'react-native-chart-kit';
import styles from '../style/Workout';

export default function WorkoutLog({navigation}) {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeSections, setActiveSections] = React.useState('');
  const [listPositions, setListPositions] = React.useState({});
  const scrollElement = React.useRef();
  const listElement = React.useRef();

  const changeListPlace = listPosition => {
    console.log(listPosition);
    if (listPosition >= 0) {
      scrollElement.current.scrollTo({
        x: 0,
        y: listPosition,
        animated: true,
      });
    }
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
      <View style={styles.none}>
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
          const dataIndex = Object.keys(listPositions).length - data.index - 1;
          setActiveSections(dataIndex);
          changeListPlace(listPositions[dataIndex]);
        }}
        style={styles.log}
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
              const newListPositions = listPositions;
              newListPositions[i] = nativeEvent.layout.y;
              setListPositions(newListPositions);
              console.log(listPositions);
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
