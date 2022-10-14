import { React, useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  let [items, setItems] = useState([]);
  let [listFilter, setListFilter] = useState(null);
  useEffect(() => {
    console.log('use effect');
  }, []); 
  return (
    <div id='main' className='flex'>
      <div className='todo-app__root'>
        <Header />
        <Main key={uuidv4()} items={items} setItems={setItems} listFilter={listFilter} />
        <Footer key={ items } listFilter={listFilter} setListFilter={setListFilter} items={items} setItems={setItems} />
      </div>
    </div>
  );
}

export default App;
