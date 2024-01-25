import {AppTouchButton} from '@/components/buttons';
import {MostRecentBillCard} from '@/components/cards';
import {AppRow, AppText} from '@/components/common';
import ListRendererScreen from '@/components/list-renderer-screen';
import AppTabSwitcher from '@/components/tabs/tabs-switcher';
import {useColors} from '@/hooks/useColors';
import {routesNames} from '@/navigation/routes';
import {fs, wp} from '@/resources/config';
import {getTodaysDate} from '@/utils/helpers/convertDateTime';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {PaymentConfirmationStyles} from '../../styles';
import DateFilter from '../date-filter';
import PaymentConfirmationHeader from '../header';
import Sort from '../sort';
import VoidFunction from '@/types/voidfunction';

const RecieptOrInvoiceCard = ({onPress}: {onPress?: VoidFunction}) => {
  const {colors} = useColors();

  const styles = PaymentConfirmationStyles({colors});
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.recieptCard}>
        <View style={{gap: wp(10)}}>
          <MostRecentBillCard
            total={4343}
            customContent={
              <View>
                <AppText
                  style={{fontSize: fs(14)}}
                  color="text300"
                  type="body_1_semibold"
                  text={'Receipt No.'}
                />
                <AppText
                  style={{fontSize: fs(14)}}
                  color="text400"
                  type="body_1_semibold"
                  text={'980089-890'}
                />
              </View>
            }
            paymentStatus="Partial paid"
            totalDiscount={4444}
            paymentDetails={{
              date: getTodaysDate(),
              fullname: 'Zucci Daniel',
              status: 'Paid',
              imageUri: '',
            }}
            items={[
              {
                discountName: '',
                name: 'HMIS fee',
                price: '₦4,750',
                quality: '1',
              },
              {
                discountName: '(Category: 5%)',
                name: 'Consultation: Neurology',
                price: '₦4,750',
                quality: '1',
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const InvoiceTab = () => {
  const navigation = useNavigation();
  return (
    <>
      <RecieptOrInvoiceCard
        onPress={() =>
          navigation.navigate(routesNames.FRONT_DESK.FD_PAY_INVOICE)
        }
      />
      <RecieptOrInvoiceCard
        onPress={() =>
          navigation.navigate(routesNames.FRONT_DESK.FD_PAY_INVOICE)
        }
      />
      <RecieptOrInvoiceCard
        onPress={() =>
          navigation.navigate(routesNames.FRONT_DESK.FD_PAY_INVOICE)
        }
      />
      <RecieptOrInvoiceCard
        onPress={() =>
          navigation.navigate(routesNames.FRONT_DESK.FD_PAY_INVOICE)
        }
      />
    </>
  );
};
const RecieptTab = () => {
  const navigation = useNavigation();

  return (
    <>
      <RecieptOrInvoiceCard
        onPress={() =>
          navigation.navigate(routesNames.FRONT_DESK.FD_PAY_INVOICE)
        }
      />
      <RecieptOrInvoiceCard
        onPress={() =>
          navigation.navigate(routesNames.FRONT_DESK.FD_PAY_INVOICE)
        }
      />
    </>
  );
};

const InvoiceAndReciept = () => {
  const {colors} = useColors();

  const styles = PaymentConfirmationStyles({colors});
  const [currentTab, setCurrentTab] = useState(0);

  const renderContent = () => {
    return (
      <>
        <View style={styles.invoiceContainer}>
          <AppRow>
            <AppTabSwitcher
              hasFlex={false}
              onChangeTab={setCurrentTab}
              selectedIndex={currentTab}
              tabs={[{name: 'Invoices'}, {name: 'Receipts'}]}
            />
            <DateFilter
              // eslint-disable-next-line react-native/no-inline-styles
              extraRecordRowStyles={{
                flex: 0,
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              extraCardRowStyles={{
                flex: 0,
              }}
            />
          </AppRow>
          {currentTab === 0 && <InvoiceTab />}
          {currentTab === 1 && <RecieptTab />}
        </View>
      </>
    );
  };
  return (
    <>
      <PaymentConfirmationHeader
        topContent1={
          <AppRow extraStyles={{marginVertical: wp(16)}}>
            <AppTouchButton
              color="white"
              text="Create invoice"
              bg="primary400"
              extraStyles={styles.createInvoiceBtn}
            />
            <Sort />
          </AppRow>
        }
      />

      <ListRendererScreen
        bounces={false}
        isScrollable
        children={undefined}
        keyExtractor={(_, index) => `${index}`}
        data={['1']}
        renderItem={() => renderContent()}
      />
    </>
  );
};

export default InvoiceAndReciept;
