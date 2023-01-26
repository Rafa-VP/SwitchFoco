import logo from './logo.svg';
import './App.css';

function App() {

function toggleCheckbox(element) { 
var xhr = new XMLHttpRequest(); 
if(element.checked){ 
xhr.open("GET", "/?relay=on", true); 
}
else { 
xhr.open("GET", "/?relay=off", true); 
} 
xhr.send(); 
}

  return (
    <html>
	<head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body>
  	<h1>ESP Relay Web Server</h1>
	<label class="switch"><input type="checkbox" onChange={(e) => toggleCheckbox(e.target.value)} />
<span class="slider">
  </span>
</label>
</body>
</html>
  );
}

export default App;
