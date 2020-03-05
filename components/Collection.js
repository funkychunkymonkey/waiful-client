import * as React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import {Content} from 'native-base';

export default function Collection() {
  const [collection, setCollection] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  useEffect(() => {
    //fetch("api/collection").then(setImages(res))
    //test-data
    setCollection([
      'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg',
      'https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__340.jpg',
      'https://cdn.pixabay.com/photo/2015/11/16/22/14/cat-1046544__340.jpg',
      'https://cdn.pixabay.com/photo/2016/09/07/22/38/cat-1652822__340.jpg',
      'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634__340.png',
      'https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg',
      'https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730__340.jpg',
      'https://cdn.pixabay.com/photo/2018/04/13/21/24/lion-3317670__340.jpg',
      'https://cdn.pixabay.com/photo/2017/11/22/08/07/cat-2969932__340.jpg',
      'https://cdn.pixabay.com/photo/2013/05/17/15/54/cat-111793__340.jpg',
      'https://cdn.pixabay.com/photo/2017/11/13/07/14/cat-eyes-2944820__340.jpg',
      'https://cdn.pixabay.com/photo/2017/08/23/08/33/cats-eyes-2671903__340.jpg',
      'https://cdn.pixabay.com/photo/2018/01/28/12/37/cat-3113513__340.jpg',
      'https://cdn.pixabay.com/photo/2016/11/23/14/57/adorable-1853372__340.jpg',
      'https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662__340.jpg',
    ]);
  }, []);
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
