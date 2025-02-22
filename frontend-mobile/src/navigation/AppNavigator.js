import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from '../context/GlobalContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import RegisterDoctorScreen from '../screens/RegisterDoctorScreen';
import RegisterPatientScreen from '../screens/RegisterPatientScreen';
import MyAppointmentScreen from '../screens/MyAppointmentsScreen';
import PatientProfileScreen from '../screens/PatientProfileScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import DoctorHomeScreen from '../screens/DoctorHomeScreen';
import DoctorAppointmentsScreen from '../screens/DoctorAppointmentsScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';
import DoctorDocumentsScreen from '../screens/DoctorDocumentsScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="RegisterPatient" component={RegisterPatientScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterDoctor" component={RegisterDoctorScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MyAppointments" component={MyAppointmentScreen} options={{ headerShown: false}} />
          <Stack.Screen name="PatientProfile" component={PatientProfileScreen} options={{ headerShown: false}} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ headerShown: false}} />
          <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} options={{ headerShown: false}} />
          <Stack.Screen name="DoctorAppointments" component={DoctorAppointmentsScreen} options={{ headerShown: false}} />
          <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} options={{ headerShown: false}} />
          <Stack.Screen name="DoctorDocuments" component={DoctorDocumentsScreen} options={{ headerShown: false}} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
