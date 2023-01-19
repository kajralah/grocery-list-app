import { StyleSheet } from 'react-native';

export default globalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    width: '50%',
    right: 0,
    backgroundColor: '#cecece'
  },
  stickyContainer: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
  }
})