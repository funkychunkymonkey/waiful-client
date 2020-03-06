import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList, View} from 'react-native';
import {Container, Header, Left, Body, Right, Title, Button} from 'native-base';
import {Content, Icon, Switch} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {Overlay, Image} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import Loading from './Loading.js';

export default function({waifu, dialogue}) {
  return (
    <Overlay
      isVisible={true}
      onBackdropPress={() => {}}
      fullScreen={true}
      overlayStyle={{
        backgroundColor: '#00000055',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
      containerStyle={{
        backgroundColor: 'transparent',
      }}>
      <View style={{flex: 1}}></View>
      <View style={{height: 350 * 0.5 + 100}}>
        <Container
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <Container
            style={{
              backgroundColor: 'white',
              marginRight: 10,
              height: 350 * 0.5,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text adjustsFontSizeToFit style={{fontSize: 24}}>
              asdf back!
            </Text>
          </Container>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn.myanimelist.net/images/characters/6/275276.jpg',
            }}
            resizeMode="contain"
          />
        </Container>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 225 * 0.5,
    height: 350 * 0.5,
  },
});
