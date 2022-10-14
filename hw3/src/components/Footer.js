import { useEffect, useState } from "react";

const Footer = props => {
  let [cnt, setCnt] = useState(props.items.filter(item => !item[1]).length); 
  useEffect(() => { 
    setCnt(props.items.filter(item => !item[1]).length);
  }, [props.items]);
  const clearCompleted = () => {
    props.setItems(props.items.filter(item => !item[1]));
  };

  return (
    props.items.length > 0 ?
    <footer id='todo-footer' className='todo-app__footer'>
      <div className='todo-app__total'>
        {cnt} left
      </div>
      <ul className='todo-app__view-buttons'>
        <button className={(props.listFilter === null) ? 'selected' : ''} onClick={() => { props.setListFilter(null); }}>
          All
        </button>
        <button className={(props.listFilter === true) ? 'selected' : ''} onClick={() => { props.setListFilter(true); }}>
          Active
        </button>
        <button className={(props.listFilter === false) ? 'selected' : ''} onClick={() => { props.setListFilter(false); }}>
          Completed
        </button>
      </ul>
        <div className='todo-app__clean'>
          {
            props.items.length - cnt > 0 ?
            <button onClick={clearCompleted}>
              Clear Completed
            </button>
            : <></>
          }
        </div>
      </footer>
      : <></>
  );
}

export default Footer;
