import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import AppScreen from '@/components/app-screen';
import {KeyIcon, PencilIcon, PIcon, RightCaretIcon} from '@/assets/svg';
import {AppText} from '@/components/common';
import {useColors} from '@/hooks/useColors';
import {recordStyles} from '../../../front-desk/bottom-tabs/records/styles';
import {TabButton} from '@/components/tab-button';
import {AppButton} from '@/components/buttons';
import dayjs from 'dayjs';
import AppSpacer from '@/components/spacer/AppSpacer';
import {AppToggleSwitch} from '@/components/inputs';
import {profileStyles} from '../../stack-screens/patients/styles';
import {wp} from '@/resources/config';

type TabButtonComponentProps = {
  label: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type ProfileInfoComponentProps = {
  title: string;
  value: string;
};

export function Profile() {
  const [activeTab, setActiveTab] = useState<
    'Personal information' | 'Job information' | 'Settings' | string
  >('Personal information');
  const {colors} = useColors();
  const styles = recordStyles({colors});
  const profile = profileStyles({colors});

  const TabButtonComponent: React.FC<TabButtonComponentProps> = ({
    label,
    activeTab,
    setActiveTab,
  }) => {
    return (
      <TabButton
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        width="auto"
        otherStyles={profile.tabStyles}
        activeBgColor="default300"
        inActiveBgColor="neutral100"
        inActiveTextColor="text400"
      />
    );
  };

  const ProfileInfoComponent: React.FC<ProfileInfoComponentProps> = ({
    title,
    value,
  }) => {
    return (
      <View>
        <AppText type="body_1_semibold" color="text300" text={title} />
        <AppText type="body_1_semibold" color="text400" text={value} />
        <AppSpacer size={16} direction="bottom" marginOrPadding="margin" />
      </View>
    );
  };

  const PersonalInformation: React.FC = () => {
    return (
      <>
        <AppButton
          text="Edit personal information"
          buttonColor="white"
          borderColor="primary400"
          textColor="primary400"
          textType="body_1_semibold"
          LeftContent={<PencilIcon fill={colors.primary400} width={wp(20)} />}
        />
        <ScrollView style={profile.cardWrapper}>
          <ProfileInfoComponent
            title="Full name"
            value="Oluwaseunfunmi Joseph Akinola"
          />
          <ProfileInfoComponent title="Gender" value="Male" />
          <ProfileInfoComponent
            title="Date of Birth"
            value={dayjs().format('DD MMM YYYY')}
          />
          <ProfileInfoComponent title="Phone number" value="0701 234 5678" />
          <ProfileInfoComponent
            title="Primary email address"
            value="someone@xyzmedicals.com"
          />
          <ProfileInfoComponent
            title="Secondary email address"
            value="o.akinola@gmail.com"
          />
          <ProfileInfoComponent
            title="Government issued ID"
            value="National ID | 03265478950"
          />
        </ScrollView>
      </>
    );
  };

  const JobInformation: React.FC = () => {
    return (
      <ScrollView style={profile.cardWrapper}>
        <View style={profile.wrapper}>
          <AppText
            style={profile.text}
            type="body_1_bold"
            color="text400"
            text={'Primary job'}
          />
          <View style={profile.line} />
        </View>
        <ProfileInfoComponent title="Level" value="Consultant" />
        <ProfileInfoComponent title="Team role" value="Basic user" />
        <ProfileInfoComponent title="Department" value="Internal Medicine" />
        <ProfileInfoComponent title="Phone number" value="0701 234 5678" />
        <ProfileInfoComponent title="Unit" value="Neurology" />
        <ProfileInfoComponent title="Ward" value="All wards" />
      </ScrollView>
    );
  };

  const Settings: React.FC = () => {
    const [isPushNotificationEnabled, setPushNotificationEnabled] =
      useState(false);
    const [isEmailNotificationEnabled, setEmailNotificationEnabled] =
      useState(false);
    const [isSmsNotificationEnabled, setSmsNotificationEnabled] =
      useState(false);

    return (
      <>
        <ScrollView style={profile.cardWrapper}>
          <View style={profile.wrapper}>
            <AppText
              style={profile.text}
              type="body_1_bold"
              color="text400"
              text={'Notifications'}
            />
          </View>

          <View>
            <AppToggleSwitch
              label="Push notifications in app"
              labelPosition="right"
              labelStyle={{
                marginLeft: 12,
              }}
              labelColor="text400"
              isOn={isPushNotificationEnabled}
              onToggle={value => setPushNotificationEnabled(value)}
            />
          </View>
          <AppSpacer size={16} direction="bottom" marginOrPadding="margin" />

          <View>
            <AppToggleSwitch
              label="Notifications via email"
              labelPosition="right"
              labelStyle={{
                marginLeft: 12,
              }}
              labelColor="text400"
              isOn={isEmailNotificationEnabled}
              onToggle={value => setEmailNotificationEnabled(value)}
            />
          </View>
          <AppSpacer size={16} direction="bottom" marginOrPadding="margin" />

          <View>
            <AppToggleSwitch
              label="Notifications via SMS"
              labelPosition="right"
              labelStyle={{
                marginLeft: 12,
              }}
              labelColor="text400"
              isOn={isSmsNotificationEnabled}
              onToggle={value => setSmsNotificationEnabled(value)}
            />
          </View>
          <AppSpacer size={16} direction="bottom" marginOrPadding="margin" />
        </ScrollView>
        <TouchableOpacity style={profile.buttonContainer} onPress={() => null}>
          <View
            style={[
              profile.iconContainer,
              {
                backgroundColor: colors.default300,
              },
            ]}>
            <KeyIcon width={24} fill={colors.primary400} />
          </View>
          <AppText
            style={[profile.text, profile.buttonTextBolder]}
            type="body_1_bold"
            color="text400"
            text={'Change password'}
          />
          <RightCaretIcon />
        </TouchableOpacity>
      </>
    );
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'Personal information':
        return <PersonalInformation />;
      case 'Job information':
        return <JobInformation />;
      case 'Settings':
        return <Settings />;
    }
  };

  return (
    <AppScreen
      contentContainerStyle={{marginTop: wp(15.67), ...styles.container}}>
      <View style={profile.navContainer}>
        <PIcon />
        <View style={profile.navCenteredText}>
          <AppText type="title_semibold" color="text400" text="Profile" />
        </View>
      </View>
      <AppSpacer size={16} direction="bottom" marginOrPadding="margin" />
      <View>
        <View style={profile.container}>
          <View>
            <Image
              source={{uri: 'https://picsum.photos/id/64/4326/2884'}}
              style={profile.avatar}
            />
          </View>
          <View>
            <View>
              <AppText
                type="body_1_semibold"
                color={'text400'}
                text="Dr Oluwaseunfunmi Akinola"
                numberOfLines={1}
              />
            </View>
            <View style={profile.userInfo}>
              <AppText color="text300" type="caption_medium" text="Doctor" />
              <TouchableOpacity style={profile.primaryButton}>
                <Text style={profile.buttonText}>Primary</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TabButtonComponent
          label="Personal information"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButtonComponent
          label="Job information"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButtonComponent
          label="Settings"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ScrollView>

      {renderActiveComponent()}
    </AppScreen>
  );
}
