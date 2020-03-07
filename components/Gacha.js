import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

import {Container, Header, View, Body, Title} from 'native-base';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import utils from '../utils.js';

export default function Gacha({route}) {
  const [gems, setGems] = React.useState(0);
  const [gachaStatus, setGachaStatus] = React.useState('WAITING'); // can be WAITING, GACHA or RESULTS

  const [buttonRiseAnim] = React.useState(new Animated.Value(0));
  const [buttonFadeAnim] = React.useState(new Animated.Value(1));
  const [buttonSpinAnim] = React.useState(new Animated.Value(1));

  const [fadeScreenAnim] = React.useState(new Animated.Value(0));

  const isFocused = useIsFocused();

  /** FUNCTIONS **/
  const gacha = () => {
    setGachaStatus('GACHA');
    // animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonSpinAnim, {
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(buttonSpinAnim, {
          toValue: 1,
          duration: 100,
        }),
      ]),
    ).start();
    Animated.spring(buttonFadeAnim, {
      toValue: 0,
      duration: 2000,
    }).start();
    Animated.timing(buttonRiseAnim, {
      toValue: 100,
      duration: 2000,
    }).start();

    utils.gacha().then(res => {
      Animated.timing(fadeScreenAnim, {
        toValue: 1,
        duration: 1000,
      }).start(() => {
        setGachaStatus('RESULTS');
        route.params.reloadWaifus();
        buttonRiseAnim.setValue(0);
        buttonSpinAnim.setValue(1);
        buttonFadeAnim.setValue(1);
        setGems(gems - 1);
        route.params.popUpWaifu({
          gacha: res,
          dialogue: 'Hewwo',
          onClose: () => {
            Animated.timing(fadeScreenAnim, {
              toValue: 0,
              duration: 1000,
            }).start(() => {
              setGachaStatus('WAITING');
            });
          },
        });
      });
    });
  };

  useFocusEffect(() => {
    if (!isFocused) setGachaStatus('WAITING');
    utils.getUser().then(data => {
      setGems(data.gems);
    });
  }, []);

  function GachaPanel() {
    const gachaImages = [
      'https://1.bp.blogspot.com/-sZbaFXJ4y0A/UnyGKAJjwbI/AAAAAAAAacE/RYDWRq73Hsc/s400/gachagacha.png',
      'https://cocoromembers.jp.sharp/contents/wp-content/uploads/2016/08/1.gif',
    ];
    return (
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: gachaStatus === 'GACHA' ? gachaImages[1] : gachaImages[0],
          }}
          style={styles.gachaImage}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={gacha} style={styles.button}>
          <Animated.View
            style={{
              opacity: buttonFadeAnim,
              bottom: buttonRiseAnim,
            }}>
            <LinearGradient
              colors={['#ffa880dd', '#fc7349ee']}
              style={styles.buttonGradient}>
              <Animated.View
                style={{
                  transform: [{scaleX: buttonSpinAnim}],
                  bottom: buttonRiseAnim,
                }}>
                <Icon name="gem" size={60} color="#fff" />
              </Animated.View>
              <Text style={styles.buttonText}> {gems} Gems </Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Container style={styles.content}>
      <Header style={styles.header}>
        <Body>
          <Title style={styles.title}>Gacha</Title>
        </Body>
      </Header>
      <Animated.View
        style={{
          display: gachaStatus === 'WAITING' ? 'none' : 'flex',
          opacity: fadeScreenAnim,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />
      <GachaPanel />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fed14d',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    backgroundColor: '#fed14d',
  },
  contentContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    left: 50,
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 24,
  },
  gachaImage: {
    width: '100%',
    height: 400,
    left: 80,
  },
  waifuImage: {
    textAlign: 'center',
    width: 275,
    height: 350,
  },
});
