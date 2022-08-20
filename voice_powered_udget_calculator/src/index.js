import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from './contexts/context';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
    <SpeechProvider appId='f737590d-d0ab-42b1-8526-7a71c84cce5c' language='en-US'>
    <Provider>
    <App />
    </Provider>
    </SpeechProvider>
    , document.getElementById('root'));


