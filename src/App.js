import './App.css';
import ChatList from './components/ChatList';
import ChatbotName from './components/ChatbotName';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
        <ChatbotName/>
        <ChatList />
        </div>
      </header>
    </div>
  );
}
export default App;
