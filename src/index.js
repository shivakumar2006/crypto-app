import React from 'react'; 
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 


import store from './app/store';
import 'antd/dist/reset.css';
import App from './App'; 

const root = createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)