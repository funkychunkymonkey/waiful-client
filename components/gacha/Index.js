import * as React from 'react';
import {Text, TouchableOpacity, Image, Animated} from 'react-native';

import {Container, Header, View, Body, Title} from 'native-base';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import utils from '../../utils.js';
import COLORS from '../../color';
import {useZ} from '../../zustand';
import styles from '../style/Gacha';

export default function Gacha({route}) {
  const user = useZ(z => z.user);
  const incrementGems = useZ(z => z.incrementGems);
  const popUpWaifu = useZ(z => z.popUpWaifu);
  const waifus = useZ(z => z.waifus);
  const setWaifus = useZ(z => z.setWaifus);
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
        setWaifus([res, ...waifus.filter(x => x.id !== res.id)]);
        buttonRiseAnim.setValue(0);
        buttonSpinAnim.setValue(1);
        buttonFadeAnim.setValue(1);
        incrementGems(-20);
        popUpWaifu({
          gacha: true,
          waifu: res,
          event: 'greet',
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
  }, []);

  function ActiveGachaButton() {
    return (
      <TouchableOpacity onPress={gacha}>
        <LinearGradient
          colors={[COLORS.bgPrimary, COLORS.bgHighlight]}
          start={{x: 1, y: 0.5}}
          end={{x: 0, y: 0.5}}
          style={styles.gachaPanelButton}>
          <Text style={styles.gachaPanelHeaderTitle}>Pull Fortune</Text>
          <Text style={styles.gachaPanelHeaderSubtitle}>20 Ikigai</Text>
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
      require('../../assets/omikuji.png'),
      require('../../assets/omikuji.gif'),
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
                <Icon name="heart" size={60} color="#fff" />
              </Animated.View>
              <Text style={styles.gachaPanelHeaderTitle}>Ikigai</Text>
            </LinearGradient>
            <View style={styles.gachaPanelBody}>
              <Text style={styles.gachaPanelText}>{user.gems}</Text>
            </View>
            {user.gems >= 20 ? <ActiveGachaButton /> : <InactiveGachaButton />}
          </Animated.View>
          <Image
            source={gachaStatus === 'GACHA' ? gachaImages[1] : gachaImages[0]}
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
          <Title style={styles.title}>Omikuji</Title>
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
