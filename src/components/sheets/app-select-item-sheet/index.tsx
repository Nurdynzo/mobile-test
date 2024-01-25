import {
  CloseIcon,
  RadioBtnEmptyIcon,
  RadioBtnFilledIcon,
  SearchIcon,
} from '@/assets/svg';
import {useColors} from '@/hooks/useColors';
import {SelectItem} from '@/types/selectItemsheet';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AnimatedBubble from '../../animated-bubble';
import {AppAlert} from '../../common';
import AppText from '../../common/app-text';
import {appSelectItemSheetStyle, menuOptionItemStyles} from './styles';
import {AppSelectItemProps, SelectOptionItemProps} from './type';

const AppSelectItemSheet = <T,>({
  sheetRef,
  selectOptions = [],
  selectedValue,
  closeSheet = () => null,
  title,
  HeaderRightContent,
  FooterComponent,
  renderRightIcon = ({isSelected}) =>
    isSelected ? <RadioBtnFilledIcon /> : <RadioBtnEmptyIcon />,
  onSelectItem = () => null,
  showSearchInput,
  searchPlaceholder = 'Search',
  onClose = () => null,
  removeHeader,
  onSearchInputChange = () => null,
  searchValue,
  onOpen = () => null,
  isLoading,
  error,
  flatlistProps,
  AdditionalHeaderContent,
  modalHeight,
  isOptionSelected,
  isMultiSelect,
  adjustToContentHeight = true,
}: AppSelectItemProps<T>) => {
  const {colors} = useColors();
  const [isFocused, setIsFocused] = useState(false);

  const styles = appSelectItemSheetStyle({colors, isFocused});

  return (
    <Portal>
      <Modalize
        panGestureEnabled
        adjustToContentHeight={modalHeight ? false : adjustToContentHeight}
        closeOnOverlayTap={true}
        overlayStyle={styles.overlay}
        keyboardAvoidingOffset={30}
        ref={sheetRef}
        onClose={() => {
          onClose();
          onSearchInputChange('');
          setIsFocused(false);
        }}
        onBackButtonPress={() => {
          closeSheet();
          return true;
        }}
        onOpen={onOpen}
        handleStyle={styles.handle}
        handlePosition="inside"
        modalStyle={styles.modal}
        modalHeight={modalHeight}
        FooterComponent={FooterComponent}
        HeaderComponent={
          removeHeader ? (
            <></>
          ) : (
            <View style={styles.titleContainer}>
              <View style={styles.headerContent}>
                <AppText text={title} type="title_semibold" color="text300" />
                {HeaderRightContent}
              </View>
              {AdditionalHeaderContent}
              {showSearchInput && (
                <View style={styles.searchContainer}>
                  <View style={styles.inputContainer}>
                    <SearchIcon
                      style={styles.searchIcon}
                      stroke={colors.text50}
                    />
                    <TextInput
                      placeholderTextColor={colors.text50}
                      autoCapitalize="none"
                      value={searchValue}
                      onChangeText={text => onSearchInputChange(text)}
                      onFocus={() => {
                        setIsFocused(true);
                      }}
                      onBlur={() => {
                        setIsFocused(false);
                      }}
                      placeholder={searchPlaceholder}
                      style={styles.textInput}
                    />
                  </View>
                </View>
              )}
            </View>
          )
        }
        flatListProps={{
          data: isLoading || error?.value ? [] : selectOptions,
          ListEmptyComponent: (
            <View style={styles.emptyContainer}>
              {isLoading ? (
                <ActivityIndicator color={colors.primary400} />
              ) : error?.value ? (
                <AppAlert
                  title={error?.title ?? 'Oops!'}
                  description={
                    error?.description ??
                    'Something went wrong. Please use the refresh button below to try again'
                  }
                  buttonText="Refresh"
                  onPress={error.onPressRefresh}
                  icon={
                    <AnimatedBubble
                      bgColor="danger25"
                      size={96}
                      Icon={
                        <View style={styles.errorIconContainer}>
                          <CloseIcon
                            fill={colors.danger300}
                            width={36}
                            height={36}
                          />
                        </View>
                      }
                    />
                  }
                />
              ) : (
                <AppText
                  text="Select Options not available"
                  color="text300"
                  align="center"
                />
              )}
            </View>
          ),
          keyExtractor: (item, index) => item?.item?.id.toString() || index,
          contentContainerStyle: [
            styles.listContentContainer,
            {
              ...((!selectOptions?.length || isLoading || error?.value) && {
                flex: 1,
              }),
            },
          ],
          style: {marginTop: removeHeader ? 30 : undefined},
          showsVerticalScrollIndicator: false,
          renderItem: ({item}) => (
            <MenuOptionItem
              renderRightIcon={renderRightIcon}
              onCloseSheet={closeSheet}
              onPressItem={(value: {item: SelectItem<T>}) => {
                onSelectItem(value);
                setIsFocused(false);
              }}
              optionItem={item}
              selectedValue={selectedValue}
              valueTextColor="text400"
              valueOptionTextColor="text300"
              isOptionSelected={isOptionSelected}
              isMultiSelect={isMultiSelect}
            />
          ),
          ...flatlistProps,
        }}
      />
    </Portal>
  );
};

const MenuOptionItem = <T,>({
  onCloseSheet = () => null,
  style,
  renderRightIcon,
  valueOptionTextColor,
  valueTextColor,
  selectedValue,
  optionItem,
  onPressItem = () => null,
  isMultiSelect,
  isOptionSelected = () => false,
}: SelectOptionItemProps<T>) => {
  const {colors} = useColors();
  const styles = menuOptionItemStyles({
    colors,
    isSelected: isMultiSelect
      ? isOptionSelected(optionItem)
      : selectedValue === optionItem.item?.value,
  });

  return (
    <View>
      <TouchableOpacity
        disabled={!!optionItem?.itemOptions}
        onPress={() => {
          if (optionItem?.onPress) {
            optionItem.onPress();
          } else {
            onPressItem({item: optionItem?.item});
          }
          if (!optionItem.disableCloseSheetOnPress) {
            onCloseSheet();
          }
        }}
        style={[styles.option, style]}>
        <View style={styles.value}>
          <AppText text={optionItem?.item?.value} color={valueTextColor} />
        </View>
        {!optionItem.itemOptions && (
          <>
            {optionItem.renderRightIcon
              ? optionItem.renderRightIcon()
              : renderRightIcon &&
                renderRightIcon({
                  isSelected: isMultiSelect
                    ? isOptionSelected(optionItem)
                    : selectedValue === optionItem.item?.value,
                  item: optionItem,
                })}
          </>
        )}
      </TouchableOpacity>
      {optionItem?.itemOptions?.length ? (
        <View style={styles.itemOptionsContainer}>
          {optionItem.itemOptions?.map(itemOption => (
            <MenuOptionItem
              key={itemOption?.item.id}
              optionItem={itemOption}
              valueTextColor={valueOptionTextColor}
              renderRightIcon={renderRightIcon}
              onCloseSheet={onCloseSheet}
              onPressItem={onPressItem}
              selectedValue={selectedValue}
              style={style}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default AppSelectItemSheet;
