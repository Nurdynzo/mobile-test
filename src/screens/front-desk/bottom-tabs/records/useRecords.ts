import {useCallback, useEffect, useState} from 'react';
import {useSheet} from '@/hooks/useSheet';
import {
  AppointmentListResponse,
  useApiServicesAppAppointmentGetappointmentlistfortodayGetQuery,
} from '@/state/services/appointmentApi';
import {SearchPatientOutput} from '@/state/services/patientApi';
import {MenuOptionsProp} from '@/types/menusheet';
import {removeDuplicates} from '@/utils/helpers/unique';
import {sortAppointmentData} from '@/utils/helpers/sorts';
import {showToast} from '@/components/app-toast';
import {EMPTY_STRING} from '@/utils/constants';
import DateRange from '@/types/dateRange';

// TODO(Zucci): sometimes, searchby attendingClinic returns []

const clinicOptions: MenuOptionsProp = [
  {value: 'Accident & Emergency'},
  {value: 'Neurology'},
  {value: 'Cardiology'},
  {value: 'Respiratory Medicine'},
  {value: 'Gastroenterology & Hepatology'},
  {value: 'Infectious Disease Unit'},
];

export type sortTypes =
  | 'fullName asc'
  | 'fullName desc'
  | 'patientCode asc'
  | 'patientCode desc'
  | 'male'
  | 'female'
  | 'other'
  | 'other'
  | 'dateOfBirth asc'
  | 'dateOfBirth desc'
  | 'dateTime asc'
  | 'dateTime desc'
  | 'appointmentStatus asc'
  | 'appointmentStatus desc'
  | '';

export const sortByOptions = [
  {
    value: 'fullName asc',
    label: 'Patient name: A-Z',
  },
  {
    value: 'fullName desc',
    label: 'Patient name: Z-A',
  },
  {
    value: 'patientCode asc',
    label: 'Patient No: Ascending',
  },
  {
    value: 'patientCode desc',
    label: 'Patient No: Descending',
  },
  {
    value: 'male',
    label: 'Gender: Male',
  },
  {
    value: 'female',
    label: 'Gender: Female',
  },
  {
    value: 'other',
    label: 'Gender: Other',
  },
  {
    value: 'dateOfBirth desc',
    label: 'Age: Youngest',
  },
  {
    value: 'dateOfBirth asc',
    label: 'Age: Oldest',
  },
];

// TODO(Philip): This hooks needs to be improved by properly grooming concerns.
export const useRecords = ({attendingClinic}: {attendingClinic?: string}) => {
  const {sheetRef: menuSheet, openSheet, closeSheet} = useSheet();
  const {
    sheetRef: clinicSheet,
    openSheet: openClinicSheet,
    closeSheet: closeClinicSheet,
  } = useSheet();
  const {
    sheetRef: sortSheet,
    openSheet: openSortBySheet,
    closeSheet: closeSortSheet,
  } = useSheet();

  const [refreshing, setRefreshing] = useState(false);

  const [selectedSort, setSelectedSort] = useState<sortTypes>(EMPTY_STRING);

  const [showCalenderRange, setShowCalenderRange] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  //for date range
  const [dateRange, setDateRange] = useState<DateRange>({
    to: EMPTY_STRING,
    from: EMPTY_STRING,
  });
  //pagination and filters.
  const [loadingMore, setLoadingMore] = useState(false);
  const [skipCount, setSkipCount] = useState(0);
  const [previousSkipCount, setPrevousSkipCount] = useState(0);
  const [maxResultCount] = useState(50);
  const [totalPage, setTotalPage] = useState(2);
  const [appointments, setAppointments] = useState<
    Array<AppointmentListResponse>
  >([]);

  //for search
  const [currentlySearchedPatient, setCurrentlySearchedPatient] =
    useState<SearchPatientOutput | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const {
    currentData: pagedAppointmentList,
    isLoading,
    isFetching,
    refetch,
    isError,
    error: searchAppointmentError,
  } = useApiServicesAppAppointmentGetappointmentlistfortodayGetQuery(
    {
      startTime:
        dateRange.from instanceof Date
          ? dateRange.from.toLocaleDateString()
          : undefined,
      endTime:
        dateRange.to instanceof Date
          ? dateRange.to?.toLocaleDateString()
          : undefined,
      skipCount: 0, //TODO(Zucci): Bug
      maxResultCount,
      attendingClinic,
      patientCode: currentlySearchedPatient?.patientCode ?? undefined,
      sorting: selectedSort,
    },
    {
      skip: false,
    },
  );

  const handleSelectedSort = (item: sortTypes) => {
    setSelectedSort(item);
    closeSortSheet();
  };

  const handleRefresh = () => {
    reset();
    setRefreshing(true);
  };

  const reset = () => {
    setAppointments([]);
    setSkipCount(0);
    setShowSearch(false);
    setIsSearching(false);
    setSelectedSort(EMPTY_STRING);
    setDateRange({});
  };

  const handleLoadMoreAppointments = () => {
    if (totalPage > skipCount && !loadingMore) {
      setLoadingMore(true);
      setSkipCount(skipCount + 1);
    } else {
      //TODO(Zucci): Show finished message here.
    }
  };

  const handleSetAppointments = useCallback(() => {
    setRefreshing(false);
    if (pagedAppointmentList) {
      const totalNumberOfPages =
        pagedAppointmentList.totalCount ?? 0 / maxResultCount;
      setTotalPage(totalNumberOfPages);

      if (skipCount === 0) {
        setAppointments(pagedAppointmentList?.items ?? []);
      } else {
        if (previousSkipCount !== skipCount) {
          // Concatenate the new data with the existing appointments
          setAppointments((prevAppointments: AppointmentListResponse[]) => {
            const newAppointments = [
              ...prevAppointments,
              ...(pagedAppointmentList?.items ?? []),
            ];
            // Remove duplicates
            const uniqueAppointments = removeDuplicates(newAppointments, 'id');
            return uniqueAppointments;
          });
        }
        setPrevousSkipCount(skipCount);
      }
    }
    setLoadingMore(false); // Set loadingMore to false after appointments are set
    setIsSearching(false);
  }, [pagedAppointmentList, maxResultCount, previousSkipCount, skipCount]);

  const handleDateRangeChanged = (result: DateRange) => {
    setShowCalenderRange(false);
    setDateRange({...result});
    setAppointments([]);
    setSkipCount(0);
  };

  //--search patient related
  const handleSelectedPatientFromSearchResult = async (
    item: SearchPatientOutput,
  ) => {
    // set the item (selectedPatient) to the state (incase no results) we can just display a regular info using the record card.
    setCurrentlySearchedPatient(item);
  };
  //---
  const handleCheckIfSelectedPatientHasAnAppointment = useCallback(async () => {
    try {
      reset();

      // Make the request with the patientCode already in the currentlySearchedPatient object
      const {data, isSuccess} = await refetch();

      if (isSuccess) {
        if (data?.items && data.items.length > 0) {
          // Replace the appointments array with the retrieved data
          setAppointments(data.items);
        } else {
          setSkipCount(0);
          // Set the appointment array to only the selected patient, preparing the data for the record card.
          setAppointments([
            {
              title: EMPTY_STRING,
              appointmentPatient: {
                dateOfBirth:
                  currentlySearchedPatient?.dateOfBirth || EMPTY_STRING,
                fullName: currentlySearchedPatient?.fullname || EMPTY_STRING,
                genderType: currentlySearchedPatient?.genderType,
                patientCode:
                  currentlySearchedPatient?.patientCode || EMPTY_STRING,
                pictureUrl: currentlySearchedPatient?.pictureUrl, //Todo:(Zucci) Get this from B.E
                id: currentlySearchedPatient?.id,
              },
            },
          ]);
        }
      } else {
        throw new Error(
          searchAppointmentError?.data?.error?.message ??
            'Failed to get information',
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast('ERROR', {title: 'Request Failed!', message: error.message});
      } else {
        showToast('ERROR', {
          title: 'Request Failed!',
          message: 'An unknown error occurred',
        });
      }
    } finally {
      setIsSearching(false);
    }
  }, [
    currentlySearchedPatient,
    refetch,
    searchAppointmentError?.data?.error?.message,
  ]);

  const handleSortFilterChanged = () => {
    const filteredData = sortAppointmentData(appointments, {
      value: selectedSort,
    });
    setAppointments(filteredData);
  };

  const handleFilterChanged = useCallback(async () => {
    reset();
    try {
      const {isSuccess, data} = await refetch();

      if (isSuccess) {
        // Clear the list.
        const sortedData = sortAppointmentData(data.items ?? [], {
          value: selectedSort,
        });
        //TODO(Zucci): Debug this data or paged appointments here returns empty array
        setAppointments(sortedData ?? []);
      } else {
        throw new Error();
      }
    } catch (error) {
      showToast('ERROR', {
        title: 'Request Failed',
        message: 'ERROR GETTING APPOINTMENTS FROM THE CLINIC ',
      });
    }
  }, [refetch, selectedSort]);

  const filterAppointments = () => {
    if (selectedSort === EMPTY_STRING) {
      return appointments;
    }
    if (
      selectedSort === 'male' ||
      selectedSort === 'female' ||
      selectedSort === 'other'
    ) {
      return appointments.filter(appointment => {
        return (
          appointment.appointmentPatient?.genderType?.toLowerCase() ===
          selectedSort.toLowerCase()
        );
      });
    }
    if (selectedSort === 'fullName asc' || selectedSort === 'fullName desc') {
      return [...appointments].sort(
        (a: AppointmentListResponse, b: AppointmentListResponse) =>
          selectedSort === 'fullName asc'
            ? `${a.appointmentPatient?.fullName}`.localeCompare(
                `${b.appointmentPatient?.fullName}`,
              )
            : `${b.appointmentPatient?.fullName}`.localeCompare(
                `${a.appointmentPatient?.fullName}`,
              ),
      );
    }
    if (
      selectedSort === 'patientCode asc' ||
      selectedSort === 'patientCode desc'
    ) {
      return [...appointments].sort((a, b) =>
        selectedSort === 'patientCode asc'
          ? `${a.appointmentPatient?.patientCode}`.localeCompare(
              `${b.appointmentPatient?.patientCode}`,
            )
          : `${b.appointmentPatient?.patientCode}`.localeCompare(
              `${a.appointmentPatient?.patientCode}`,
            ),
      );
    }
    if (
      selectedSort === 'dateOfBirth asc' ||
      selectedSort === 'dateOfBirth desc'
    ) {
      return [...appointments].sort((a, b) =>
        selectedSort === 'dateOfBirth asc'
          ? new Date(`${a.appointmentPatient?.dateOfBirth}`).getTime() -
            new Date(`${b.appointmentPatient?.dateOfBirth}`).getTime()
          : new Date(`${b.appointmentPatient?.dateOfBirth}`).getTime() -
            new Date(`${a.appointmentPatient?.dateOfBirth}`).getTime(),
      );
    }
  };

  useEffect(() => {
    handleSetAppointments();
  }, [pagedAppointmentList, handleSetAppointments]);

  useEffect(() => {
    if (attendingClinic) {
      handleFilterChanged();
    }
  }, [attendingClinic, refetch, handleFilterChanged]);

  useEffect(() => {
    if (currentlySearchedPatient) {
      handleCheckIfSelectedPatientHasAnAppointment();
    }
  }, [currentlySearchedPatient, handleCheckIfSelectedPatientHasAnAppointment]);

  return {
    appointments,
    totalPage,
    isLoading,
    refetch,
    openSheet,
    clinicOptions,
    sortByOptions,
    menuSheet,
    closeSheet,
    clinicSheet,
    handleSelectedSort,
    openClinicSheet,
    sortSheet,
    openSortBySheet,
    selectedSort,
    setSelectedSort,
    showCalenderRange,
    setShowCalenderRange,
    showSearch,
    handleSortFilterChanged,
    setShowSearch,
    dateRange,
    setDateRange,
    handleLoadMoreAppointments,
    isError,
    handleDateRangeChanged,
    handleSelectedPatientFromSearchResult,
    isSearching,
    isFetching,
    closeClinicSheet,
    closeSortSheet,
    handleRefresh,
    refreshing,
    filterAppointments,
  };
};
