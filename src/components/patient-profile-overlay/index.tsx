import React from 'react';
import {CircularFloatingButton} from '../buttons';
import {AppRow, AppText} from '../common';
import {
  PatientProfileModalMenuItemType,
  generalPatientProfileModalMenuItems,
} from '@/constants/index';
import VoidFunction from '@/types/voidfunction';
import {EncounterTimelineIcon, HorizontalMoreIcon} from '@/assets/svg';
import {wp} from '@/resources/config';
import Overlay from '../overlay';
import useOverlay from '@/hooks/use-overlay';
import {patientProfileOverlayStyles} from './styles';

/**
 * This Patient profile component is used by the doctor's and nurse's all input screen
 */
export const GeneralPatientProfileMenuModal = () => {
  return (
    <>
      <EncounterTimelineFAB />
      <PatientProfileModalMenu items={generalPatientProfileModalMenuItems} />
    </>
  );
};

const EncounterTimelineFAB = () => {
  return (
    <>
      <CircularFloatingButton
        onPress={() => {}}
        bottom={152}
        right={23.92}
        icon={<EncounterTimelineIcon height={wp(16)} width={wp(16)} />}
      />
    </>
  );
};

const PatientProfileModalMenu = ({
  items,
}: {
  items: PatientProfileModalMenuItemType[];
}) => {
  const {isOpen, onOpen, onClose} = useOverlay();
  const styles = patientProfileOverlayStyles();
  return (
    <>
      <PatientProfileMenuFAB onPress={onOpen} />
      <Overlay
        show={isOpen}
        onOverlayTap={onClose}
        backgroundColor={'overlayVariant2'}
        shouldUserOverlayContentStyles={false}
        containerStyles={styles.overlay}>
        {items.map((item, index) => {
          return <MenuItem key={index} item={item} onClose={onClose} />;
        })}
      </Overlay>
    </>
  );
};

const PatientProfileMenuFAB = ({onPress}: {onPress: VoidFunction}) => {
  return (
    <CircularFloatingButton
      onPress={onPress}
      right={23.92}
      bottom={88}
      icon={<HorizontalMoreIcon height={wp(16)} width={wp(16)} />}
    />
  );
};

const MenuItem = ({
  item,
  onClose,
}: {
  item: PatientProfileModalMenuItemType;
  onClose: VoidFunction;
}) => {
  return (
    <AppRow justifyContent={'flex-end'} alignItems={'center'}>
      <AppText text={item.label} type={'body_1_semibold'} color={'white'} />
      <CircularFloatingButton
        position="relative"
        icon={<item.icon height={wp(16)} width={wp(16)} />}
        onPress={() => {
          onClose();
        }}
      />
    </AppRow>
  );
};
