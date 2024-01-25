import {
  AnalyticIcon,
  ArrowDownFilled,
  CalenderIcon,
  DownCaretIcon,
  RadioBtnEmptyIcon,
  RadioBtnFilledIcon,
  RightCaretIcon,
  SearchIcon,
  SortDown,
} from '@/assets/svg';
import AppScreen from '@/components/app-screen';
import AppointmentDateRangerPicker from '@/components/appointment-date-range-picker';
import {
  AppButton,
  AppIconButton,
  AppLink,
  AppTouchButton,
} from '@/components/buttons';
import RecordCard from '@/components/cards/record-card';
import {AppRow, AppText} from '@/components/common';
import {WelcomeHeader} from '@/components/headers';
import ListRendererScreen from '@/components/list-renderer-screen';
import Overlay from '@/components/overlay';
import SearchPatientResultContainer from '@/components/search-patient-result-container';
import {AppMenuSheet} from '@/components/sheets';
import AppSelectItemSheet from '@/components/sheets/app-select-item-sheet';
import {useGetAllClinics} from '@/hooks/clinics/useGetAllClinics';
import {useColors} from '@/hooks/useColors';
import {routesNames} from '@/navigation/routes';
import {AppointmentListResponse} from '@/state/services/appointmentApi';
import {MenuOptionsProp} from '@/types/menusheet';
import {GlobalScreenTypes} from '@/types/screen';
import {EMPTY_STRING, NOT_AVAILABLE} from '@/utils/constants';
import {
  convertToReadableDate,
  convertToReadableTime,
} from '@/utils/helpers/convertDateTime';
import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {recordStyles} from './styles';
import {useRecords} from './useRecords';

const Records = ({navigation}: GlobalScreenTypes) => {
  const menuOptions: MenuOptionsProp = [
    {
      value: 'Add new patient',
      onPress: () => {
        navigation.navigate(routesNames.FRONT_DESK.FD_ADD_NEW_PATIENT);
      },
    },
    {
      value: 'Create appointment',
      onPress: () => {
        navigation.navigate(routesNames.FRONT_DESK.FD_ADD_NEW_APPOINTMENT);
      },
    },
  ];

  const {
    isLoadingAllClinics,
    setQueryForClinics,
    handleAllClinics,
    selectedClinic,
    setSelectedClinic,
  } = useGetAllClinics();

  const {
    isSearching,
    isFetching,
    openSheet,
    closeClinicSheet,
    sortByOptions,
    menuSheet,
    closeSheet,
    clinicSheet,
    openClinicSheet,
    sortSheet,
    openSortBySheet,
    selectedSort,
    showCalenderRange,
    setShowCalenderRange,
    showSearch,
    setShowSearch,
    handleLoadMoreAppointments,
    isLoading,
    handleDateRangeChanged,
    handleSelectedPatientFromSearchResult,
    refreshing,
    handleRefresh,
    handleSelectedSort,
    filterAppointments,
  } = useRecords({
    attendingClinic: selectedClinic,
  });

  const {colors} = useColors();

  const styles = recordStyles({colors});

  const handleRenderHeader = () => {
    return (
      <>
        <View style={styles.container}>
          <WelcomeHeader />
          <View style={styles.content}>
            <AppRow>
              <AppButton
                onPress={openSheet}
                RightContent={<ArrowDownFilled />}
                text="Patient activities"
                width={170}
              />
              <AppIconButton
                onPress={() => setShowSearch(true)}
                icon={<SearchIcon stroke={colors.primary400} />}
              />
            </AppRow>
            <AppRow>
              <AppTouchButton
                onPress={openClinicSheet}
                text="All clinics"
                color="text400"
                rightIcon={<DownCaretIcon stroke={colors.text400} />}
              />
              <AppTouchButton
                onPress={openSortBySheet}
                text="Sort by"
                rightIcon={<DownCaretIcon stroke={colors.text400} />}
                leftIcon={<SortDown />}
              />
              <TouchableOpacity onPress={() => setShowCalenderRange(true)}>
                <CalenderIcon fill={colors.primary400} />
              </TouchableOpacity>
            </AppRow>
          </View>
        </View>
      </>
    );
  };

  const handleHiddenContent = () => {
    return (
      <>
        <AppButton
          text="Analytics"
          containerStyle={styles.floatingBtn}
          LeftContent={<AnalyticIcon />}
        />
        <AppMenuSheet
          closeSheet={closeSheet}
          title="Patient activities"
          menuOptions={menuOptions}
          sheetRef={menuSheet}
          renderRightIcon={() => <RightCaretIcon stroke={colors.text400} />}
        />

        <AppSelectItemSheet
          title="Clinic"
          sheetRef={clinicSheet}
          isLoading={isLoadingAllClinics}
          selectOptions={handleAllClinics()}
          selectedValue={`${selectedClinic}`}
          renderRightIcon={({isSelected}) =>
            isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
          }
          showSearchInput
          onSelectItem={({item}) => {
            setSelectedClinic(item.value);
            closeClinicSheet();
          }}
          onSearchInputChange={text => setQueryForClinics(text)}
        />

        <AppMenuSheet
          title="Sort by"
          sheetRef={sortSheet}
          HeaderRightContent={<AppLink text="Reset" />}
          renderRightIcon={({isSelected}) =>
            isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />
          }
          selectedValue={`${selectedSort}`}
          menuOptions={sortByOptions}
          onSelectItem={({item}) => {
            // TODO(Zucci): Kindly fix
            handleSelectedSort(item);
          }}
        />
        <AppointmentDateRangerPicker
          mode={'date'}
          onCancel={() => setShowCalenderRange(false)}
          onDone={handleDateRangeChanged}
          onOverlayTap={() => setShowCalenderRange(false)}
          show={showCalenderRange}
        />

        <Overlay
          offset={170}
          onOverlayTap={() => setShowSearch(false)}
          show={showSearch}
          shouldUserOverlayContentStyles={false}>
          <SearchPatientResultContainer
            autoFocus
            getSelectedPatient={handleSelectedPatientFromSearchResult}
          />
        </Overlay>
      </>
    );
  };

  const handleRenderListOfRecords = (item: AppointmentListResponse) => {
    const {appointmentPatient} = item;
    return (
      <RecordCard
        appointmentId={item?.id || 0}
        appointmentType={item?.type ?? NOT_AVAILABLE}
        patient={appointmentPatient ?? {}}
        appButtonText={EMPTY_STRING}
        status={item?.status ?? NOT_AVAILABLE}
        appointmentTitle={item.title ?? EMPTY_STRING}
        clinicName={item?.attendingClinic?.displayName ?? NOT_AVAILABLE}
        appointmentScanStatus={item?.scanningStatus}
        appointmentDate={
          item?.startTime
            ? convertToReadableDate(item?.startTime)
            : NOT_AVAILABLE
        }
        appointmentTime={
          item?.startTime
            ? convertToReadableTime(item?.startTime)
            : NOT_AVAILABLE
        }
      />
    );
  };

  return (
    <AppScreen
      isScrollable={false}
      paddingHorizontal={24}
      ScreenHeader={<>{handleRenderHeader()}</>}>
      <ListRendererScreen
        data={filterAppointments()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({item}) => handleRenderListOfRecords(item)}
        keyExtractor={(_, index) => `${index}`}
        onLoadMore={handleLoadMoreAppointments}
        children={undefined}
        FooterComponent={
          isLoading || isSearching || isFetching ? (
            <ActivityIndicator color={colors.black} />
          ) : (
            <></>
          )
        }
        ListEmptyComponent={
          !isLoading && !isSearching && !isFetching && !refreshing ? (
            <AppText text="No appointments today" align="center" />
          ) : (
            <></>
          )
        }
      />
      {handleHiddenContent()}
    </AppScreen>
  );
};

export default Records;
