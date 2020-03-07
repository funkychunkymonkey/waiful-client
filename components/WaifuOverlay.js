import * as React from 'react';
import {StyleSheet, Text, Animated, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Container} from 'native-base';

export default function(props) {
  const [dialogueSpringAnim] = React.useState(new Animated.Value(500));
  const [dialogueFadeAnim] = React.useState(new Animated.Value(0));
  const [dialogueBobAnim] = React.useState(new Animated.Value(10));
  const [gemSpinAnim] = React.useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = React.useState(props.isVisible);

  const sizeMod = 0.5; // use this to control size of the dialogue box

  React.useEffect(() => {
    if (!isVisible) return;
    Animated.spring(dialogueSpringAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
    Animated.timing(dialogueFadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(dialogueBobAnim, {
          toValue: 15,
          duration: 500,
        }),
        Animated.timing(dialogueBobAnim, {
          toValue: 10,
          duration: 500,
        }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(gemSpinAnim, {
          toValue: 1,
          duration: 250,
        }),
        Animated.timing(gemSpinAnim, {
          toValue: 0,
          duration: 250,
        }),
      ]),
    ).start();
  }, [isVisible]);

  return (
    <View
      style={{
        display: isVisible ? 'flex' : 'none',
        ...styles.overlayWrapper,
      }}
      onStartShouldSetResponder={() => setIsVisible(false)}>
      <View
        style={{
          ...styles.filler,
          justifyContent: 'center',
        }}>
        {props.gems ? (
          <View
            style={{
              backgroundColor: '#0005',
              alignItems: 'center',
              paddingTop: 25,
              paddingBottom: 25,
            }}>
            <Animated.View
              style={{
                marginBottom: 10,
                transform: [{scaleX: gemSpinAnim}],
              }}>
              <Icon name="gem" color={'white'} size={100} />
            </Animated.View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              + {props.gems} Gems
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{height: 350 * sizeMod}}>
        <Container style={styles.overlayRow}>
          <Animated.View
            style={{
              ...styles.dialogue,
              opacity: dialogueFadeAnim,
              top: dialogueSpringAnim,
              height: 350 * sizeMod,
            }}>
            <View style={styles.dialogueRightArrow} />
            <Animated.View
              style={{
                ...styles.dialogueDownArrow,
                bottom: dialogueBobAnim,
              }}
            />
            <Text adjustsFontSizeToFit style={{fontSize: 24}}>
              {props.dialogue}
            </Text>
          </Animated.View>
          <Animated.Image
            style={{
              ...styles.image,
              opacity: dialogueFadeAnim,
            }}
            source={{
              uri: 'https://cdn.myanimelist.net/images/characters/6/275276.jpg',
            }}
            resizeMode="contain"
          />
        </Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // containers
  overlayWrapper: {
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#0005',
    zIndex: 100,
    paddingBottom: 100,
  },
  filler: {
    // this is just an empty View that fills up the rest of the space on the screen
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlayRow: {
    // the horizontal row that places the dialogue box & waifu image
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
  },
  // waifu dialogue
  dialogue: {
    backgroundColor: 'white',
    marginRight: 10,
    padding: 20,
    flex: 1,
    borderRadius: 10,
    position: 'relative',
    zIndex: 1,
  },
  image: {
    width: 225 * 0.5,
    height: 350 * 0.5,
    position: 'relative',
    zIndex: 0,
  },
  dialogueRightArrow: {
    position: 'absolute',
    zIndex: 100,
    right: -20,
    bottom: 50,

    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 30,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'white',
  },
  dialogueDownArrow: {
    position: 'absolute',
    right: 20,
    // arrow
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: '#ddd',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});
