import * as React from 'react';
import {StyleSheet, Text} from 'react-native';

import {Container, Header, Left, Body, Right, Title, Button} from 'native-base';
import {Content, List, ListItem, Icon, Switch} from 'native-base';

export default function SettingsScreen() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Settings</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.body}>
        <List>
          <ListItem first>
            <Left>
              <Text>Accessory:none</Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Accessory:Disclosure Indicator</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Accessory:Checkmark</Text>
            </Left>
            <Right>
              <Icon
                type="Octicons"
                name="check"
                style={{fontSize: 20, color: 'blue'}}
              />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Icon</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem last>
            <Left>
              <Text>Last</Text>
            </Left>
          </ListItem>
        </List>
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
    backgroundColor: '#fff',
  },
});
