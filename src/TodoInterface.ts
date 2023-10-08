
interface Todo {
  id: string,
  title: string, 
  done: boolean,
  outOfScope: boolean
} 

interface TodoProps {
  key: string,
  id: string,
  title: string, 
  done: boolean,
  outOfScope: boolean,
  handleChange: (id: string, changedProp: string, changedPropValue: any) => void,
} 

export default TodoProps;