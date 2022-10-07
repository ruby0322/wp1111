import { useRef } from 'react';
const Input = props => {
  const inputRef = useRef(null);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputRef.current.value) {
        props.setItems([...props.items, [inputRef.current.value, false]]);
        inputRef.current.value = '';
      }
    }
  }
  return (
  <input ref={inputRef} onKeyDown={handleKeyDown} id='input' className='todo-app__input' placeholder='What needs to be done? 🖋'>
  </input>
  );
}
  
  export default Input;
  