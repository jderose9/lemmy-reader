import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Account } from '@models/Account';
import { useContext, useEffect, useState } from 'react';
import { Community } from '@models/Community';
import { AuthApi } from '@api/AuthApi';
import { CommunityApiFactory } from '@api/CommunityApiFactory';
import { Query, QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { InstanceType } from '@models/InstanceType';
import { AuthContext } from '@context/AuthContext';
import { Spinner } from '@ui-kitten/components';

export default function CommunitiesScreen() {
  const { account } = useContext(AuthContext);

  const { isLoading, error, data, isFetching } = useQuery<Community[], Error>({ 
    queryKey: [account?.localId, 'communities'], 
    queryFn: async () => {
      return account ? CommunityApiFactory.construct(account!).list() : [];
    }
  });

  if(!account || isLoading)
    return (<View  style={styles.container}><Spinner /></View>);

  if(error)
    return (<Text>An error has occurred: {error.message}</Text>);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Communities</Text>
      {
        (data || []).map(community => <Button key={community.id} title={community.name}></Button>)
      } 
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
