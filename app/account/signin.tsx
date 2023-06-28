import {  StyleSheet } from 'react-native';

import { Icon, IconElement, Input, Layout, Text, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { PropsWithChildren, useContext, useState } from 'react';
import { InstanceType } from '@models/InstanceType';
import { AuthContext } from '@context/AuthContext';
import { AuthService } from '@services/AuthService';

const AlertIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='alert-circle-outline'
  />
);

export default function SigninScreen() {
  const [domain, setDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { setAccount } = useContext(AuthContext);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );
  
  const login = async () => {
    const account = await AuthService.login(domain, username, password, InstanceType.LEMMY);
    setAccount(account);
  }

    return (
    <Layout>
      <Text>Sign in</Text>
      <Input
        value={domain}
        label='Server Instance Domain'
        placeholder='lemmy.ml'
        autoCapitalize='none'
        onChangeText={nextValue => setDomain(nextValue)}
      />
      <Input
        value={username}
        label='Username'
        placeholder='Username'
        autoCapitalize='none'
        onChangeText={nextValue => setUsername(nextValue)}
      />
      <Input
        value={password}
        label='Password'
        placeholder='Password'
        autoCapitalize='none'
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Button onPress={login}>Login</Button>
    </Layout>

  );
}

