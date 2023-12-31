import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StarRatings } from './components/StarRatings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StarRatings maxRatings={10} />
    <StarRatings maxRatings={5} color='red' size='24' defaultRating={3} /> */}
    <App />
  </React.StrictMode>
);