import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../../color';

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.textSecondary,
    width: '100%',
  },
  bodyDetail: {
    backgroundColor: COLORS.bgSecondary,
    width: '100%',
  },
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 2,
    paddingRight: 5,
    zIndex: 10,
    top: Dimensions.get('window').height * 0.5,
    left: 10,
    position: 'absolute',
    borderRadius: 15,
  },
  favMarkText: {color: COLORS.favHeart},
  //Detail
  dText: {
    padding: 20,
    fontSize: 20,
  },
  dFText: {
    color: '#fff',
    marginLeft: 10,
  },
  //CollectionDetail
  showView: {
    height: hp('52%'),
  },
  waifuImageWrapper: {
    height: hp('52%'),
    alignItems: 'center',
  },
  waifuImage: {
    marginTop: hp('1%'),
    height: hp('37%'),
    width: wp('100%'),
  },
  info: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('14%'),
  },
  infoText: {
    height: '100%',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
  },
  waifuNemeText: {
    color: COLORS.textTitle,
    textAlign: 'center',
    fontSize: hp('3%'),
  },
  waifuSeriesText: {
    color: COLORS.textTitle,
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
  gallery: {
    backgroundColor: COLORS.textSecondary,
    paddingTop: hp('3%'),
  },
  collection: {
    borderRadius: 20,
    width: hp('9%'),
    height: hp('9%'),
    marginLeft: wp('3%'),
    position: 'relative',
  },
  isFavMarkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -20,
  },
  isFavMarkHeart: {
    top: -4,
    right: -10,
    fontSize: 22,
    color: COLORS.favHeart,
  },
  trashIcon: {
    justifyContent: 'center',
    width: wp('20%'),
    height: '100%',
    padding: 10,
  },
  //CollectionGallery
  content1: {
    position: 'relative',
    zIndex: 10,
  },
  header: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    backgroundColor: COLORS.favHeart,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //DetailGallery
  imageContainer: {
    width: wp(100),
    justifyContent: 'center',
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageSize: {
    width: 225,
    height: 350,
  },
  imageThumbnail: {
    borderRadius: 10,
    width: hp('8%'),
    height: hp('8%'),
    alignSelf: 'center',
  },
  //DetailHeader
  headerContainer: {
    width: wp(100),
    justifyContent: 'center',
    padding: 10,
  },
  headerImage: {
    borderRadius: 20,
    width: hp('9%'),
    height: hp('9%'),
    position: 'relative',
  },
  detailHeader1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailHeader2: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  text1: {
    color: COLORS.textTitle,
    fontSize: 28,
  },
  text2: {
    color: COLORS.textTitle,
    fontSize: 20,
  },
  //DetailLevel
  detailLevel1: {
    width: wp(100),
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.textSecondary,
  },
  detailLevel2: {
    backgroundColor: COLORS.textTitle,
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    marginTop: 5,
  },
  detailLevel3: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  detailLevel4: {
    backgroundColor: COLORS.bgSecondary,
    width: '100%',
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: COLORS.bgHighlight,
    borderWidth: 1,
    marginBottom: 10,
  },
  detailLevel5: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLevelText1: {
    color: COLORS.textHighlight,
    fontSize: 18,
    position: 'absolute',
    top: 8,
  },
  detailLevelText2: {
    color: COLORS.textSecondary,
    fontSize: 48,
  },
  detailLevelText3: {
    color: COLORS.textHighlight,
    position: 'absolute',
    bottom: 10,
  },
  detailLevelText4: {
    color: COLORS.textSecondary,
    fontSize: 20,
  },
  //DetailPersonality
  dPersonality1: {
    width: wp(100),
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dPersonality2: {
    backgroundColor: COLORS.bgSecondary,
    width: wp(50),
  },
  dPText: {
    color: COLORS.textSecondary,
    marginRight: 10,
    fontSize: 18,
  },
  dPIcon: {
    position: 'relative',
    right: -10,
  },
  //FavButton
  favTouchArea: {
    width: wp('22%'),
    height: '100%',
    justifyContent: 'center',
  },
  fav: {
    position: 'relative',
    width: 300,
    height: 300,
    left: -wp('8%'),
  },
});

export default styles;
