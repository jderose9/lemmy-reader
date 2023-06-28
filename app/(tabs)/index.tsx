import { ImageBackground, ImageStyle, ListRenderItemInfo, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@context/AuthContext';
import { Avatar, Spinner, Text, Button, Icon, Card, Layout, List, IconElement } from '@ui-kitten/components';
import { PostApiFactory } from '@api/PostApiFactory';
import { useRouter } from 'expo-router';
import { Post } from '@models/Post';

export default function HomeScreen() {
  const { account } = useContext(AuthContext);

  const { isLoading, error, data, isFetching } = useQuery<Post[], Error>({ 
    queryKey: [account?.localId, 'posts'], 
    queryFn: async () => {
      return account ? PostApiFactory.construct(account!).list() : [];
    }
  });
  
  const router = useRouter();

  if(!account || isLoading)
    return (<View  style={styles.container}><Spinner /></View>);

  if(error)
    return (<Text>An error has occurred: {error.message}</Text>);

  const onItemPress = (postId: string): void => {
    router && router.push('Article1');
  };

  const renderItemHeader = (post: ListRenderItemInfo<Post>): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      source={{uri: post.item.thumbnailUrl}}
    />
  );


  const renderItemFooter = (post: ListRenderItemInfo<Post>): React.ReactElement => (
    <View style={styles.itemFooter}>
      <View style={styles.itemActionBar}>
        <Avatar source={{uri: post.item.creatorAvatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmabEGH9BS9OZLNUVF3Ai_WQLSdHPusyrHWA&usqp=CAU' }}/>
        <View style={styles.buttonGroup}>
          <Button
            style={styles.iconButton}
            appearance='ghost'
            status='basic'
            accessoryLeft={<Icon name='arrow-upward'/>}>
            {`${post.item.upvoteCount}`}
          </Button>
          <Button
            style={styles.iconButton}
            appearance='ghost'
            status='basic'
            accessoryLeft={<Icon name='arrow-downward'/>}>
            {`${post.item.downvoteCount}`}
          </Button>
          <Button
            style={styles.iconButton}
            appearance='ghost'
            status='basic'
            accessoryLeft={<Icon name='message-circle-outline'/>}>
            {`${post.item.commentCount}`}
          </Button>
        </View>
      </View>
      <View>
        <View style={styles.itemAuthoringContainer}>
          <Text
            category='s2'>
            {post.item.creatorName}
          </Text>
          <Text
            appearance='hint'
            category='c1'>
            @lemmy.world
          </Text>
        </View>
      </View>
    </View>
  );

  const renderItem = (post: ListRenderItemInfo<Post>): React.ReactElement => (
    <Card
      style={styles.item}
      header={post.item.creatorAvatar ? () => renderItemHeader(post) : undefined}
      footer={() => renderItemFooter(post)}
      onPress={() => onItemPress(post.item.id)}>
      <Text category='h5'>
        {post.item.name}
      </Text>
      { post.item.body &&
        <Text
        style={styles.itemContent}
        appearance='hint'
        category='s1'>
        {`${(post.item.body || '').substring(0, 82)}...`}
      </Text>
      }
    </Card>
  );

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
  },
  itemFooter: {
    margin: 8,
  },
  itemActionBar: {
    flexDirection: 'row',
  },
  buttonGroup: {
    marginLeft: 'auto',
    flexDirection: 'row'
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
  
  