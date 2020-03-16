import * as React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Dimensions,
  Linking,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Container} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../color';

let closeTimeout = null;

export default function({options, onClose, isVisible, rerender}) {
  let overlayBody = <></>,
    overlayFooter = <></>;
  const [overlayFadeAnim] = React.useState(new Animated.Value(0));
  const [dialogueSpringAnim] = React.useState(new Animated.Value(500));
  const [dialogueFadeAnim] = React.useState(new Animated.Value(0));

  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }

  // fade out
  function close() {
    Animated.timing(dialogueSpringAnim, {
      toValue: 500,
      duration: 1000,
    }).start();
    Animated.timing(dialogueFadeAnim, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      Animated.timing(overlayFadeAnim, {
        toValue: 0,
        duration: 200,
      }).start(() => {
        onClose();
        if (options.onClose) options.onClose();
      });
    });
  }

  // fade in
  Animated.timing(overlayFadeAnim, {
    toValue: 1,
    duration: 200,
  }).start();

  // if auto option has been set we want to auto-close the dialogue after 2 seconds
  if (options.auto && isVisible) {
    closeTimeout = setTimeout(close, 1500);
  }

  // display gem gain if provided
  if (options.gems) overlayBody = <GemOverlay gems={options.gems} />;

  // display gacha panel if provided
  if (options.gacha) {
    overlayBody = <GachaOverlay waifu={options.waifu} />;
  }

  // display waifu & dialogue if provided
  if (options.waifu) {
    overlayFooter = (
      <DialogueOverlay
        waifu={options.waifu}
        dialogue={options.dialogue}
        fadeAnim={dialogueFadeAnim}
        springAnim={dialogueSpringAnim}
      />
    );
  }

  return (
    <Animated.View
      style={{
        display: isVisible ? 'flex' : 'none',
        opacity: overlayFadeAnim,
        ...styles.overlayWrapper,
      }}
      pointerEvents={options.auto ? 'none' : 'auto'}
      onStartShouldSetResponder={close}>
      <LinearGradient
        colors={options.auto ? ['#0000', '#0005'] : ['#0005', '#000f']}
        style={{
          backgroundColor: 'transparent',
          ...styles.overlayWrapperBackground,
        }}>
        <View style={styles.filler}>{overlayBody}</View>
        {overlayFooter}
      </LinearGradient>
    </Animated.View>
  );
}

function DialogueOverlay({waifu, dialogue, springAnim, fadeAnim}) {
  const [bobAnim] = React.useState(new Animated.Value(10));
  const sizeMod = 0.5; // use this to control size of the dialogue box

  // handle animating the dialogue in
  springAnim.setValue(500);
  fadeAnim.setValue(0);
  bobAnim.setValue(10);
  Animated.spring(springAnim, {
    toValue: 0,
    duration: 1000,
  }).start();
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
  }).start();
  Animated.loop(
    Animated.sequence([
      Animated.timing(bobAnim, {
        toValue: 15,
        duration: 500,
      }),
      Animated.timing(bobAnim, {
        toValue: 10,
        duration: 500,
      }),
    ]),
  ).start();

  return (
    <View style={{height: 350 * sizeMod}}>
      <Container style={styles.overlayRow}>
        <Animated.View
          style={{
            ...styles.dialogue,
            opacity: fadeAnim,
            top: springAnim,
            height: 350 * sizeMod,
          }}>
          <View style={styles.dialogueRightArrow} />
          <Animated.View
            style={{
              ...styles.dialogueDownArrow,
              bottom: bobAnim,
            }}
          />
          <Text adjustsFontSizeToFit style={styles.dialogueName}>
            {waifu.name}
          </Text>
          <Text adjustsFontSizeToFit style={styles.dialogueText}>
            {dialogue}
          </Text>
        </Animated.View>
        <Animated.Image
          style={{
            ...styles.image,
            opacity: fadeAnim,
          }}
          source={{
            uri: waifu.imageUrl,
          }}
          resizeMode="contain"
        />
      </Container>
    </View>
  );
}

function GemOverlay({gems}) {
  const [gemSpinAnim] = React.useState(new Animated.Value(0));

  // spinning gem
  React.useEffect(() => {
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
  }, []);

  return (
    <View style={styles.overlayBody}>
      <Animated.View
        style={{
          marginBottom: 10,
          transform: [{scaleX: gemSpinAnim}],
        }}>
        <Icon name="gem" color={'white'} size={100} />
      </Animated.View>
      <Text style={styles.overlayBodyText}>+ {gems} Gems</Text>
    </View>
  );
}

function GachaOverlay({waifu}) {
  return (
    <View style={styles.overlayBody}>
      <Text style={styles.overlayBodyText}>You got</Text>
      <Text style={styles.overlayBodyTitle}>{waifu.name}</Text>
      <View>
        <Text style={styles.overlayBodySubtitle}>{waifu.series.name} </Text>
        <Button
          icon={
            <Icon
              name="twitter"
              color="#fff"
              size={20}
              style={{marginRight: 10}}
            />
          }
          titleStyle={{color: '#fff'}}
          raised
          onPress={() => {
            Linking.openURL(
              `https://twitter.com/intent/tweet?text=${encodeURI(
                `I just got ${waifu.name} in Waiful! Check it out!`,
              )}&hashtags=WAIFUL&url=${encodeURI(
                'https://github.com/funkychunkymonkey/waiful-client/',
              )}`,
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // containers
  overlayWrapper: {
    position: 'absolute',
    zIndex: 100,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  overlayWrapperBackground: {
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 84,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  filler: {
    // this is just an empty View that fills up the rest of the space on the screen
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  overlayRow: {
    // the horizontal row that places the dialogue box & waifu image
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
  },
  overlayBody: {
    backgroundColor: '#0005',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25,
  },
  overlayBodyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  overlayBodyTitle: {
    color: COLORS.textPrimary,
    fontSize: 60,
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: 'center',
  },
  overlayBodySubtitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
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
  dialogueName: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: COLORS.textHighlight,
  },
  dialogueText: {
    fontSize: 24,
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
