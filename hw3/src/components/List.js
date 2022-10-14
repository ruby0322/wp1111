import Item from './Item';
import { v4 as uuidv4 } from 'uuid';

const List = props => {
  return (
    <ul id='todo-list' className='todo-app__list'>
      {
        props.items.map(
          (item, index) => (
            (item[1] !== props.listFilter)
              ? <Item key={uuidv4()} item={item} items={props.items} setItems={props.setItems} index={index} />
              : <></>
          )
        )
      }
    </ul>
  );
}
  
  export default List;
  