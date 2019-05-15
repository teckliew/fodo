import React from 'react';
import {render} from 'react-dom';
import App from './App';

const appElement = (<App />);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

// var recorder = document.getElementById('recorder');
// var player = document.getElementById('player');

// recorder.addEventListener('change', function(e) {
//   var file = e.target.files[0];
//   // Do something with the video file.
//   player.src = URL.createObjectURL(file);
// });

export default appElement;
