const { widget } = figma
const { useSyncedState, useWidgetId, usePropertyMenu, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget
import { nanoid as createId } from 'nanoid/non-secure'

function TodoWidget() {
  const widgetId = useWidgetId()
  const [todos, setTodos] = useSyncedState('todos', [])

  useEffect(() => {
    figma.ui.onmessage = msg => {
      if (msg.type === 'update-title') {
        handleChange(msg.id, 'title', msg.title)
      }
      else if (msg.type === 'delete-todo') {
        deleteTodo(msg.id)
        figma.closePlugin()
      }
      else if (msg.type === 'close-plugin') {
        figma.closePlugin()
      }
    }
  })
  
  function deleteTodo(id: string) {
    setTodos([...todos.filter(todo => todo.id !== id)])
  }

  function createTodo(id: string) {
    setTodos([
      ...todos,
      {
        key: id, id, title: '', done: false, outOfScope: false
      }
    ])
  }

  function handleChange (id: string, changedProp: string, changedPropValue: any) {
    const getUpdatedTodo = (todo: {title: string, done: boolean, outOfScope: boolean}) => {
      if (changedProp === "title") {
        todo.title = changedPropValue
      } else if (changedProp === "done") {
        todo.done = !changedPropValue
      } else if (changedProp === "outOfScope") {
        todo.done = false
        todo.outOfScope = !changedPropValue
      }
      return todo
    }
    const freshTodos = todos.map(todo => {
      if(todo.id === id) {
        return getUpdatedTodo(todo)
      } else {
        return todo
      }
    })
    setTodos(freshTodos)
  }
  
  usePropertyMenu(
    [
      {
        tooltip: "Clear all",
        propertyName: "clear-all",
        itemType: "action"
      },
    ],
    (e) => {
      setTodos([])
    }
  )

  const Todo = ({ key, id, title, done, outOfScope }) => {
    return (
      <AutoLayout
        direction={'horizontal'}
        verticalAlignItems={'start'}
        spacing={'auto'}
        width={'fill-parent'}
      >
        <AutoLayout
          direction={'horizontal'}
          verticalAlignItems={'start'}
          spacing={8}
        >
          <SVG
            hidden={done || outOfScope}
            onClick={() => handleChange(id, "done", done)}
            src={`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            `}
          />
          <SVG 
            hidden={!done || outOfScope}
            onClick={() => handleChange(id, "done", done)}
            src={`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.3408 8.74741C14.7536 8.28303 14.7118 7.57195 14.2474 7.15916C13.783 6.74638 13.0719 6.78821 12.6592 7.25259L10.6592 9.50259L9.45183 10.8608L7.7955 9.2045C7.35616 8.76516 6.64384 8.76516 6.2045 9.2045C5.76517 9.64384 5.76517 10.3562 6.2045 10.7955L8.7045 13.2955C8.92359 13.5146 9.22334 13.6336 9.53305 13.6245C9.84275 13.6154 10.135 13.479 10.3408 13.2474L12.3408 10.9974L14.3408 8.74741Z" fill="#4AB393"/>
              </svg>
            `}
          />
          <Rectangle 
            hidden={!outOfScope}
            fill={'#f2f2f2'}
            width={20}
            height={20}
          />
          <TextBlock 
            fill={outOfScope || done ? "#6E6E6E" : "#101010"}
            fontSize={done || outOfScope ? 13 : 14}
            lineHeight={20}
            width={180}
            onClick={() => 
              new Promise((resolve) => {
                const widget = figma.getNodeById(widgetId)
                figma.showUI(__html__, {height: 56, title: 'Edit your todo', position: {y: 0, x: 0}})
                figma.ui.postMessage({ type: 'edit', id, title, widget })
              })
            }
          >
            {title}
          </TextBlock>
        </AutoLayout>
        <AutoLayout
          onClick={() => handleChange(id, "outOfScope", outOfScope)}
          fill={outOfScope ? "#f2f2f2" : "#fff"}      
        >
          <SVG
            src={`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6" y="8" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="8" y="8" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="14.4" y="8" width="4" height="4" rx="2" fill="#949494"/>
              </svg>
            `}
          />
        </AutoLayout>
      </AutoLayout>
    )
  }

  return (
    <AutoLayout
      direction={'vertical'}
      cornerRadius={8}
      fill={'#fff'}
      width={320}
      stroke={'#E9E9E9'}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.12 },
        offset: { x: 0, y: 4 },
        blur: 8,
        spread: -32,
      }}
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
                key={todo.key} 
                id={todo.id} 
                title={todo.title} 
                done={todo.done} 
                outOfScope={todo.outOfScope} 
              />
            )
          }
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
                figma.showUI(__html__)
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
            <TextBlock fill={'#949494'} fontSize={14} lineHeight={20} fontWeight={700} letterSpacing={'-0.8%'}>Add a todo</TextBlock>
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
                key={todo.key} 
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
              key={todo.key} 
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
