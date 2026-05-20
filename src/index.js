import React from 'react';
import ReactDOM from 'react-dom/client';
// This import will now successfully resolve to the file we create in the next step
import App from './components/App';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}