import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import {Content} from 'native-base';

export default function Collection() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Collection</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.body}>
        <ScrollView>
          <Text>aaa</Text>
        </ScrollView>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 50,
  },
});
