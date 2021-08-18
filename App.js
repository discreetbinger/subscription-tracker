import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigation/Navigator';
import { withAuthenticator } from 'aws-amplify-react-native'

const App = () => {
    return (
        <Navigator />
    );
}

export default withAuthenticator(App);