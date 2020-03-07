import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import {Container, Header, Left, Body, Right, Title} from 'native-base';
import {Content} from 'native-base';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import utils from '../utils.js';

export default function Gacha(props) {
  const [gems, setGems] = useState(0);
  const [waifu, setWaifu] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  /** FUNCTIONS **/
  const gacha = () => {
    setWaifu(null);
    setLoading(true);
    utils.gacha().then(res => {
      setGems(gems - 1);
      setWaifu(res);
    });
  };

  useFocusEffect(() => {
    if (!isFocused) {
      setWaifu(null);
      setLoading(false);
    }
    utils.getUser().then(data => {
      setGems(data.gems);
    });
  }, []);

  /** COMPONENTS **/
  function GachaWaifu() {
    return (
      <>
        <Image
          style={styles.waifuImage}
          source={{
            uri: waifu.imageUrl,
          }}
          resizeMode="contain"
        />
        <Text>
          {waifu.name} from {waifu.series.name}
        </Text>
        <Text>{gems} gems left</Text>
        <TouchableOpacity style={styles.button} onPress={gacha}>
          <Text style={styles.buttontext}> Roll Again </Text>
        </TouchableOpacity>
      </>
    );
  }

  function GachaPanel() {
    const gachaImages = [
      'https://1.bp.blogspot.com/-sZbaFXJ4y0A/UnyGKAJjwbI/AAAAAAAAacE/RYDWRq73Hsc/s400/gachagacha.png',
      'https://cocoromembers.jp.sharp/contents/wp-content/uploads/2016/08/1.gif',
    ];
    return (
      <>
        <Image
          style={styles.waifuImage}
          source={{
            uri: loading ? gachaImages[1] : gachaImages[0],
          }}
          resizeMode="contain"
        />
        <Text>{gems} Gems</Text>
        <TouchableOpacity style={styles.button} onPress={gacha}>
          <Text style={styles.buttontext}> Touch Here </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <Container>
      <Header
        style={{
          backgroundColor: '#fed14d',
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        }}>
        <Body>
          <Title style={{fontWeight: 'bold', color: 'white'}}>Gacha</Title>
        </Body>
      </Header>
      <Content style={styles.body}>
        {waifu ? (
          <GachaWaifu waifu={waifu} gacha={gacha} gems={gems} />
        ) : (
          <GachaPanel loading={loading} gacha={gacha} gems={gems} />
        )}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  body: {
    backgroundColor: '#fed14dff',
    textAlign: 'center',
  },
  button: {
    margin: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#ffa880ff',
  },
  buttontext: {
    color: '#fed14dff',
    fontSize: 24,
    padding: 10,
  },
  waifuImage: {
    textAlign: 'center',
    width: 450,
    height: 400,
  },
});
