import React from 'react';
import {ActivityIndicator} from 'react-native';
import {FlatList, View} from 'react-native';
import {SearchIcon} from '@/assets/svg';
import {SearchResultCard} from '../cards';
import {AppTextInput} from '../inputs';
import {searchPatientResultContainerStyles} from './styles';
import {NOT_AVAILABLE} from '@/utils/index';
import {useColors} from '@/hooks/useColors';
import {useDoctorSearchPatient} from '@/hooks/doctor-patients/useDoctorSearchPatient';
import {GetPatientLandingListOuptDto} from '@/state/services/patientApi';

// TODO(Michael): This is now deprecated
const SearchDoctorPatientResultContainer = ({
  getSelectedPatient = (item: GetPatientLandingListOuptDto) => item,
  autoFocus = false,
}: {
  getSelectedPatient?: (item: GetPatientLandingListOuptDto) => void;
  autoFocus?: boolean;
}) => {
  const {colors} = useColors();
  const searchText = '';
  const {searchResult, searchingForPatient} = useDoctorSearchPatient({
    searchText,
  });

  const styles = searchPatientResultContainerStyles({
    colors,
    hasResults: [...(searchResult?.items || [])]?.length > 0,
  });

  const renderItem = ({
    item,
  }: {
    item: {name: string | undefined; id: number | undefined};
  }) => (
    <SearchResultCard
      name={item?.name ?? NOT_AVAILABLE}
      id={String(item?.id) ?? NOT_AVAILABLE}
      onPress={() => getSelectedPatient(item)}
    />
  );

  return (
    <View style={styles.gap}>
      <AppTextInput
        autoFocus={autoFocus}
        LeftContent={<SearchIcon stroke={colors.text50} />}
        placeholder="Find Patient"
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResult?.items}
          keyExtractor={item => `${item?.id}`}
          renderItem={renderItem}
          ListFooterComponent={
            searchingForPatient ? <ActivityIndicator /> : null
          }
          getItemLayout={(data, index) => ({
            length: 200,
            offset: 200 * index,
            index,
          })}
          initialNumToRender={30}
          maxToRenderPerBatch={30}
        />
      </View>
    </View>
  );
};

export default SearchDoctorPatientResultContainer;
