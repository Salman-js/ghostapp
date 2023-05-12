import { NavigationContainer } from '@react-navigation/native';
import tw from 'twrnc';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthStack from './src/Screens/authStack';
import 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer style={tw`bg-white`}>
          <PaperProvider>
            <ToastProvider>
              <QueryClientProvider client={queryClient}>
                <AuthStack />
              </QueryClientProvider>
            </ToastProvider>
          </PaperProvider>
          <StatusBar
            animated={true}
            translucent
            backgroundColor='transparent'
            barStyle='light-content'
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
