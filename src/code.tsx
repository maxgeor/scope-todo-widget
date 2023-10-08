const { widget } = figma
const { useSyncedState, useWidgetId, usePropertyMenu, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle, Input } = widget
import Todo from './Todo'
import { nanoid as createId } from 'nanoid/non-secure'

interface Todo {
  id: string
  title: string
  done: boolean
  outOfScope: boolean
}

function TodoWidget() {
  const widgetId = useWidgetId()
  // const [todos, setTodos] = useSyncedState<any[]>('todos', [])
  const [uncompletedTodos, setUncompletedTodos] = useSyncedState<Todo[]>('uncompletedTodos', [])
  const [completedTodos, setcompletedTodos] = useSyncedState<Todo[]>('completedTodos', [])
  const [outOfScopeTodos, setOutOfScopeTodos] = useSyncedState<Todo[]>('outOfScopeTodos', [])

  useEffect(() => {
    figma.ui.onmessage = msg => {
      if (msg.type === 'update-title') {
        handleChange(msg.id, 'title', msg.title)
      } else if (msg.type === 'delete-todo') {
        deleteTodo(msg.id)
        figma.closePlugin()
      } else if (msg.type === 'flip-todo-scope') {
        handleChange(msg.id, 'outOfScope', msg.outOfScope)
      } else if (msg.type === 'close-plugin') {
        figma.closePlugin()
      }
    }
  })
  
  function findTodoPile(todo) {
    if (todo.outOfScope) {
      return [outOfScopeTodos, setOutOfScopeTodos]
    } else if (todo.done) {
      return [completedTodos, setcompletedTodos]
    } else {
      return [uncompletedTodos, setUncompletedTodos]
    }
  }

  function deleteTodo(id: string) {
    setTodos([...todos.filter(todo => todo.id !== id)])
  }

  function createTodo(id: string) {
    setUncompletedTodos([
      ...uncompletedTodos,
      {
        id, title: '', done: false, outOfScope: false
      }
    ])
  }

  function handleChange (id: string, changedProp: string, changedPropValue: any) {
    const updateTodo = (todo: {title: string, done: boolean, outOfScope: boolean}) => {
      switch(changedProp) {
        case 'title':
          return {...todo, title: changedPropValue}
        case 'done':
          return {...todo, done: !changedPropValue}
        case 'outOfScope':
          return {...todo, outOfScope: changedPropValue}
        default:
          return todo
      }
    }

    const 

    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return updateTodo(todo)
      } else {
        return todo
      }
    }));
  }

  if (todos.length > 4) {
    usePropertyMenu(
      [
        {
          tooltip: "Clear All",
          propertyName: "clear-all",
          itemType: "action"
        },
      ],
      () => setTodos([])
    )
  }

  return (
    <AutoLayout
      direction={'vertical'}
      cornerRadius={8}
      fill={'#fff'}
      width={360}
      stroke={'#e7e7e7'}
    >
      <AutoLayout
        direction={'vertical'}
        spacing={24}
        padding={24}
        width={'fill-parent'}
      >
        <AutoLayout
          direction={'vertical'}
          spacing={8}
          width={'fill-parent'}
          >
          {todos
            .filter(todo => !todo.done && !todo.outOfScope)
            .map(todo => 
              <Todo 
                key={todo.id} 
                id={todo.id} 
                title={todo.title} 
                done={todo.done} 
                outOfScope={todo.outOfScope} 
                handleChange={handleChange}
              />
            )
          }
          <AutoLayout
            width={'fill-parent'}
          >
            <AutoLayout
              direction={'horizontal'}
              verticalAlignItems={'center'}
              spacing={8}
              fill={'#fff'}
              onClick={() =>
                new Promise((resolve) => {
                  const id = createId()
                  createTodo(id)
                  const widget = figma.getNodeById(widgetId)
                  figma.showUI(__uiFiles__.ui, {height: 56, title: 'Add a todo', position: {y: (widget as WidgetNode).y - 150, x: (widget as WidgetNode).x}})
                  figma.ui.postMessage({ type: 'add', id, widget })
                })
              }
              >
              <SVG
                src={`
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 5C10.7463 5 11.25 5.44772 11.25 6V14C11.25 14.5523 10.7463 15 10.125 15C9.50368 15 9 14.5523 9 14V6C9 5.44772 9.50368 5 10.125 5Z" fill="#949494"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875C5 9.25368 5.44772 8.75 6 8.75L14 8.75C14.5523 8.75 15 9.25368 15 9.875C15 10.4963 14.5523 11 14 11L6 11C5.44772 11 5 10.4963 5 9.875Z" fill="#949494"/>
                </svg>
                `}
                />
              <TextBlock fill={'#949494'} fontSize={14} lineHeight={20} fontWeight={700} letterSpacing={'-0.75%'}>Add a todo</TextBlock>
            </AutoLayout>
          </AutoLayout>
        </AutoLayout>
        <AutoLayout
          hidden={!todos.filter(todo => todo.done && !todo.outOfScope).length}
          direction={'vertical'}
          spacing={8}
          width={'fill-parent'}
        >
          {todos
            .filter(todo => todo.done && !todo.outOfScope)
            .map(todo => 
              <Todo 
                key={todo.id} 
                id={todo.id} 
                title={todo.title} 
                done={todo.done} 
                outOfScope={todo.outOfScope} 
              />
            )
          }
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        hidden={todos.filter(todo => todo.outOfScope).length === 0}
        width={'fill-parent'}
        height={!todos.filter(todo => todo.outOfScope).length ? 40 : 'hug-contents'}
        direction={'vertical'}
        horizontalAlignItems={'center'}
        spacing={8}
        padding={24}
        fill={'#f2f2f2'}
      >
        {todos.filter(todo => todo.outOfScope)
          .map(todo => 
            <Todo 
              key={todo.id} 
              id={todo.id} 
              title={todo.title} 
              done={todo.done} 
              outOfScope={todo.outOfScope} 
            />
          )
        }
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(TodoWidget)
