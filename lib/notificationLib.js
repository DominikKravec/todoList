import * as Notifications from 'expo-notifications';

export async function schedulePushNotification() {

    const trigger = new Date()

    trigger.setMinutes(59)
    trigger.setHours(19)
    trigger.setSeconds(0)
    
    await Notifications.scheduleNotificationAsync({
        content: {
        title: "its been a minute",
        body: 'like actually a minute brother 5 seconds have passed',
        data: { data: 'goes here', test: { test1: 'more data' } },
        },
        trigger
    });
}

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            throw new Error('Project ID not found');
        }
        token = (
            await Notifications.getExpoPushTokenAsync({
            projectId,
            })
        ).data;
        console.log(token);
        } catch (e) {
        token = `${e}`;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}