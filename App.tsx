/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {  } from 'react';
import ErrorBoundary from './src/StoreContext/ErrorBoundries';
import MainPage from './src/Pages/MainPage';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
