import AppDivider from '@/components/app-divider';
import {useColors} from '@/hooks/useColors';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import AllInputsClosedPanelButton from '../all-inputs-closed-panel-button';
import {allInputsCollapsibleContentStyles} from './styles';

const AllInputCollapsibleContent = ({
  title = 'title',
  children,
  shouldOpen = false,
  onToggle = () => {},
}: {
  title?: string;
  children?: ReactNode;
  shouldOpen?: boolean;
  onToggle?: () => void;
}) => {
  const {colors} = useColors();
  const styles = allInputsCollapsibleContentStyles({colors});
  return (
    <View style={shouldOpen && styles.container}>
      <>
        <AllInputsClosedPanelButton
          marginTop={0}
          text={title}
          onPress={onToggle}
        />
        {shouldOpen && (
          <>
            <AppDivider />
            <View style={styles.childrenContainer}>{children}</View>
          </>
        )}
      </>
    </View>
  );
};
export default AllInputCollapsibleContent;
