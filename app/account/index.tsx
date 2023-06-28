import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { Link, useRouter } from 'expo-router';
import { Button, Icon } from '@ui-kitten/components';


export default function AccountListScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      
      <Button accessoryLeft={<Icon name='person'/>} onPress={() => {
          router.push("/account/signin");
        }}>Login to Lemmy</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
