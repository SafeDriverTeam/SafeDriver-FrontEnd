import logo from './logo.svg';
import './CSS/App.css';
import ClientReportsList from './components/ClientReportsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          SILVERWOLF
          <ClientReportsList />
        </a>
      </header>
    </div>
  );
}

export default App;
