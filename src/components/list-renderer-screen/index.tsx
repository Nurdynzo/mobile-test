import React, {Fragment} from 'react';
import {
  FlatListProps,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {FlatList, ViewStyle} from 'react-native';
import {useColors} from '../../hooks/useColors';
import {isIOS} from '../../resources/config';
import {AppScreenProps} from '../app-screen/type';
import {listRendererScreenStyles} from './styles';

type ListRendererScreenProps = AppScreenProps & {
  HeaderComponent?: JSX.Element;
  FooterComponent?: JSX.Element;
  EmptyStateComponent?: JSX.Element;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  loadMore?: boolean;
  contentContainerStyle?: ViewStyle | Array<ViewStyle>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FlatListProps<any>;

const ListRendererScreen = ({
  HeaderComponent,
  FooterComponent,
  EmptyStateComponent,
  onLoadMore,
  contentContainerStyle,
  refreshing,
  disableSafeArea = false,
  onRefresh,
  ...otherFlatListProps
}: ListRendererScreenProps) => {
  const {colors} = useColors();
  const Container = disableSafeArea ? View : SafeAreaView;
  const styles = listRendererScreenStyles({colors});

  return (
    <Fragment>
      <StatusBar backgroundColor={colors?.default400} barStyle="dark-content" />
      <Container style={[styles.flex1, styles.screenBackground]}>
        <View style={[styles.flex1, {overflow: 'hidden'}]}>
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={[styles.flex1]}>
            <FlatList
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[contentContainerStyle, styles.default]}
              ListHeaderComponent={HeaderComponent}
              ListFooterComponent={FooterComponent}
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.1}
              refreshing={refreshing}
              extraData={refreshing}
              onRefresh={onRefresh}
              ListEmptyComponent={EmptyStateComponent}
              ItemSeparatorComponent={() => <View style={styles.gap} />}
              {...otherFlatListProps}
            />
          </KeyboardAvoidingView>
        </View>
      </Container>
    </Fragment>
  );
};

export default ListRendererScreen;
