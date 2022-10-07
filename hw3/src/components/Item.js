const Item = props => {
  const handleRemove = () => {
    props.setItems(props.items.filter((item, index) => index !== props.index));
  }
  const toggleStatus = () => {
    let newItems = [...props.items];
    newItems[props.index][1] = !newItems[props.index][1];
    props.setItems(newItems);
  }
  return (
    <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input id={props.index} type='checkbox'></input>
        <label for={props.index} className={props.item[1] ? 'green' : 'grey'} onClick={toggleStatus}></label>
      </div>
      <h1 className={`todo-app__item-detail ${props.item[1] ? 'crossed' : ''}`}>
        { props.item[0] }
      </h1>
      <img alt='x' onClick={handleRemove} className='todo-app__item-x' src='https://media.discordapp.net/attachments/893439505988743178/1027514306440470588/x.png' />
    </li>
  );
}
  
  export default Item;
  