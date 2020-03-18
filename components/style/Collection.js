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
  }
});

export default styles;