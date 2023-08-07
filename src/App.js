import './App.css';
import Header from "./components/Header";
import {Provider} from "react-redux";
import {store} from "./redux/redux";
import Footer from "./components/Footer";
import CrackerConstructor from "./components/CrackerConstructor";

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <CrackerConstructor/>
          <Footer/>
        </div>
      </Provider>
  );
}

export default App;
