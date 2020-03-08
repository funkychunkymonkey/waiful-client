import * as React from 'react';
import {useRef, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function FavButton(props) {
  const {isFavorite, waifuIdx, onPress} = props;
  const prevIsFavorite = usePrevious(isFavorite);
  const prevWaifuIdx = usePrevious(waifuIdx);

  if (
    prevWaifuIdx === waifuIdx &&
    prevIsFavorite === false &&
    isFavorite === true
  ) {
    return (
      <TouchableOpacity style={styles.favTouchArea} onPress={onPress} key="1">
        <LottieView
          style={styles.fav}
          source={require('../src/2415-twitter-heart.json')}
          autoPlay={true}
          loop={false}
          progress={0.3}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.favTouchArea} onPress={onPress} key="2">
        <LottieView
          style={styles.fav}
          source={require('../src/2415-twitter-heart.json')}
          progress={isFavorite ? 1 : 0}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  favTouchArea: {
    width: 300,
    top: -200,
    left: -100,
    position: 'relative',
    zIndex: 1,
  },
  fav: {
    width: 300,
    position: 'relative',
    zIndex: 2,
  },
});