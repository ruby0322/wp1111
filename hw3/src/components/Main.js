import Input from './Input';
import List from './List';
import { v4 as uuidv4 } from 'uuid';

const Main = props => {
    return (
      <section className='todo-app__main'>
        <Input items={props.items} setItems={props.setItems} />
        <List key={uuidv4()} listFilter={props.listFilter} items={props.items} setItems={props.setItems}/>
      </section>
    );
  }

export default Main;
