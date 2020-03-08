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
import COLORS from '../color';

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

  function ActiveGachaButton() {
    return (
      <TouchableOpacity onPress={gacha}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          start={{x: 1, y: 0.5}}
          end={{x: 0, y: 0.5}}
          style={styles.gachaPanelButton}>
          <Text style={styles.gachaPanelHeaderTitle}>Gacha</Text>
          <Text style={styles.gachaPanelHeaderSubtitle}>20 Gems</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  function InactiveGachaButton() {
    return (
      <LinearGradient
        colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
        start={{x: 1, y: 0.5}}
        end={{x: 0, y: 0.5}}
        style={{
          ...styles.gachaPanelButton,
          ...styles.gachaPanelButtonInactive,
        }}>
        <Text style={styles.gachaPanelHeaderTitle}>20 Required</Text>
      </LinearGradient>
    );
  }

  function GachaPanel() {
    const gachaImages = [
      'https://1.bp.blogspot.com/-sZbaFXJ4y0A/UnyGKAJjwbI/AAAAAAAAacE/RYDWRq73Hsc/s400/gachagacha.png',
      'https://cocoromembers.jp.sharp/contents/wp-content/uploads/2016/08/1.gif',
    ];
    return (
      <View style={styles.columnContainer}>
        <View style={styles.rowContainer}>
          <Animated.View
            style={{
              opacity: buttonFadeAnim,
              bottom: buttonRiseAnim,
              ...styles.gachaPanel,
            }}>
            <LinearGradient
              colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
              start={{x: 1, y: 0.5}}
              end={{x: 0, y: 0.5}}
              style={styles.gachaPanelHeader}>
              <Animated.View
                style={{
                  transform: [{scaleX: buttonSpinAnim}],
                  bottom: buttonRiseAnim,
                }}>
                <Icon name="gem" size={60} color="#fff" />
              </Animated.View>
              <Text style={styles.gachaPanelHeaderTitle}>Gems</Text>
            </LinearGradient>
            <View style={styles.gachaPanelBody}>
              <Text style={styles.gachaPanelText}>{gems}</Text>
            </View>
            {gems >= 20 ? <ActiveGachaButton /> : <InactiveGachaButton />}
          </Animated.View>
          <Image
            source={{
              uri: gachaStatus === 'GACHA' ? gachaImages[1] : gachaImages[0],
            }}
            style={styles.gachaImage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  return (
    <Container style={styles.wrapper}>
      <Header style={styles.header}>
        <Body>
          <Title style={styles.title}>Gacha</Title>
        </Body>
      </Header>
      <Animated.View
        style={{
          display: gachaStatus === 'WAITING' ? 'none' : 'flex',
          opacity: fadeScreenAnim,
          ...styles.screen,
        }}
      />
      <GachaPanel />
    </Container>
  );
}

const styles = StyleSheet.create({
  // top bar & screen
  header: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  wrapper: {
    backgroundColor: COLORS.bgPrimary,
  },
  screen: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  // content positioners
  columnContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  // gacha panel
  gachaPanel: {
    position: 'relative',
    zIndex: 10,
    padding: 10,
    alignSelf: 'center',
    width: 300,
  },
  gachaPanelHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  gachaPanelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  gachaPanelButtonInactive: {
    padding: 20,
    opacity: 0.9,
  },
  gachaPanelBody: {
    backgroundColor: '#fffe',
    padding: 10,
    alignItems: 'center',
  },
  gachaPanelText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: 'center',
  },
  gachaPanelHeaderTitle: {
    color: COLORS.textTitle,
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  gachaPanelHeaderSubtitle: {
    color: COLORS.textTitle,
    fontSize: 18,
    textAlign: 'center',
  },
  // gacha image
  gachaImage: {
    width: '100%',
    height: 400,
    position: 'absolute',
    top: -100,
    left: 80,
  },
});
