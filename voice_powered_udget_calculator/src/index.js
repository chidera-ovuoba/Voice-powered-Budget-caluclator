import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from './contexts/context';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
    <SpeechProvider appId='ec49935a-1a05-40f8-b2eb-505a77816151' language='en-US'>
    <Provider>
    <App />
    </Provider>
    </SpeechProvider>
    , document.getElementById('root'));


