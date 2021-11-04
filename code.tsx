const { widget } = figma
const { useSyncedState, useEffect, AutoLayout, Text, SVG, Rectangle } = widget

// import { nanoid as createId } from 'nanoid'
// const { v4: createId } = require('uuid');

function ScopedTodoCard() {
  const [todos, setTodos] = useSyncedState('todos', [
    {
      title: 'Open menue with edit, delete, and move options',
      done: false,
      outOfScope: false,
    },
    {
      title: 'When clicking edit option, you can change the text',
      done: false,
      outOfScope: false,
    },
    {
      title: 'Clicking delte will remove the todo',
      done: false,
      outOfScope: false,
    },
    {
      title: 'Wrap text on overflow',
      done: true,
      outOfScope: false,
    },
    {
      title: 'Remove big space below notDoneTodos seciton when there aren’t hany completed todos',
      done: true,
      outOfScope: false,
    },
    {
      title: 'When you click the checkbox, it changes that todos “Done” state',
      done: true,
      outOfScope: false,
    },
    {
      title: "Paste text to create todos",
      done: true,
      outOfScope: true,
    },
    {
      title: "Paste text to create todos",
      done: true,
      outOfScope: true,
    },
  ])

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === 'showToast') {
        figma.notify('Hello widget')
      }
      if (msg.type === 'close') {
        figma.closePlugin()
      }
    }
  })

  const Todo = (props) => {
    return (
      <AutoLayout
        direction={'horizontal'}
        verticalAlignItems={'start'}
        spacing={'auto'}
        width={320}
      >
        <AutoLayout
          direction={'horizontal'}
          verticalAlignItems={'start'}
          spacing={8}
        >
          <SVG
            hidden={props.done || props.outOfScope ? true : false}
            src={`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" stroke="#b2b2b2"/>
              </svg>
            `}
          />
          <SVG 
            hidden={props.done === false || props.outOfScope ? true : false}
            src={`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            `}
          />
          <Rectangle 
            hidden={!props.outOfScope}
            fill={'#f2f2f2'}
            width={24}
            height={24}
          />
          <Text 
            fill={props.outOfScope ? "#6E6E6E" : props.done ? "#767676" : "#000"}
            textDecoration={ props.done && !props.outOfScope ? "strikethrough" : "none"}
            fontSize={props.done || props.outOfScope ? 14 : 15}
            lineHeight={24}
            width={220}
          >
            {props.title}
          </Text>
        </AutoLayout>
        <SVG
          src={`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#919191" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="4" height="4" rx="2" />
              <rect x="10" y="10" width="4" height="4" rx="2" />
              <rect x="16" y="10" width="4" height="4" rx="2" />
            </svg>
          `}
          onClick={() =>
            new Promise((resolve) => {
              figma.showUI(__html__)
            })}
        />
        {/* <SVG
          src={`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#AEAEAE">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          `}
          onClick={() =>
            new Promise((resolve) => {
              figma.showUI(__html__)
            })}
        /> */}
        {/* <AutoLayout
          direction={"vertical"}
        >
          <AutoLayout
            direction={'horizontal'}
            verticalAlignItems={'center'}
            spacing={8}
          >
            <SVG
              src={`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H15V8ZM9 6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H9V6Z" fill="#8F8F8F"/>
                  <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5H13ZM12 17L11.2929 17.7071C11.6834 18.0976 12.3166 18.0976 12.7071 17.7071L12 17ZM9.70711 13.2929C9.31658 12.9024 8.68342 12.9024 8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071L9.70711 13.2929ZM15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929C15.3166 12.9024 14.6834 12.9024 14.2929 13.2929L15.7071 14.7071ZM11 5V17H13V5H11ZM12.7071 16.2929L9.70711 13.2929L8.29289 14.7071L11.2929 17.7071L12.7071 16.2929ZM12.7071 17.7071L15.7071 14.7071L14.2929 13.2929L11.2929 16.2929L12.7071 17.7071Z" fill="#8F8F8F"/>
                </svg>
              `}
            />
            <Text>Move out of scope</Text>
          </AutoLayout>
          <AutoLayout
            direction={'horizontal'}
            verticalAlignItems={'center'}
            spacing={8}
          >
            <SVG
              src={`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 15.5H4C3.44772 15.5 3 15.9477 3 16.5C3 17.0523 3.44772 17.5 4 17.5L9 17.5V15.5ZM15 17.5H20C20.5523 17.5 21 17.0523 21 16.5C21 15.9477 20.5523 15.5 20 15.5H15V17.5Z" fill="#8F8F8F"/>
                  <path d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19H11ZM12 7L12.7071 6.29289C12.3166 5.90237 11.6834 5.90237 11.2929 6.29289L12 7ZM14.2929 10.7071C14.6834 11.0976 15.3166 11.0976 15.7071 10.7071C16.0976 10.3166 16.0976 9.68342 15.7071 9.29289L14.2929 10.7071ZM8.29289 9.29289C7.90237 9.68342 7.90237 10.3166 8.29289 10.7071C8.68342 11.0976 9.31658 11.0976 9.70711 10.7071L8.29289 9.29289ZM13 19L13 7H11L11 19H13ZM11.2929 7.70711L14.2929 10.7071L15.7071 9.29289L12.7071 6.29289L11.2929 7.70711ZM11.2929 6.29289L8.29289 9.29289L9.70711 10.7071L12.7071 7.70711L11.2929 6.29289Z" fill="#8F8F8F"/>
                </svg>
              `}
            />
            <Text>Move back in scope</Text>
          </AutoLayout>
        </AutoLayout> */}
      </AutoLayout>
    )
  }

  const notDoneTodos = 
    todos.filter(todo => !todo.done && !todo.outOfScope)
      .map(todo => {
        return <Todo 
          // key={todo.id}
          // id={todo.id}
          title={todo.title}
          done={todo.done}
          outOfScope={todo.outOfScope}
        />
      })
  
  const doneTodos = 
    todos.filter(todo => todo.done && !todo.outOfScope)
      .map(todo => {
        return <Todo 
          // key={todo.id}
          // id={todo.id}
          title={todo.title}
          done={todo.done}
          outOfScope={todo.outOfScope}
        />
      })
  
  const outOfScopeTodos = 
    todos.filter(todo => todo.outOfScope)
      .map(todo => {
        return <Todo 
          // key={todo.id}
          // id={todo.id}
          title={todo.title}
          done={todo.done}
          outOfScope={todo.outOfScope}
        />
      })

  return (
    <AutoLayout
      direction={'vertical'}
      cornerRadius={8}
      fill={'#fff'}
      stroke={'#E5E5E5'}
      strokeWidth={1}
      width={364}
    >
      <AutoLayout
        direction={'vertical'}
        spacing={32}
        padding={24}
      >
        <AutoLayout
          direction={'vertical'}
          spacing={8}
        >
          {notDoneTodos.length > 0 && notDoneTodos}
          <AutoLayout 
            direction={'horizontal'}
            verticalAlignItems={'center'}
            spacing={8}
            onClick={() => setTodos([
              ...todos,
              {
                // id: createId(),
                title: "New todo",
                done: false,
                outOfScope: false
              }
            ])}
          >
            <SVG
              src={`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.4602 7 12.8333 7.3731 12.8333 7.83333V11.1667H16.1667C16.6269 11.1667 17 11.5398 17 12C17 12.4602 16.6269 12.8333 16.1667 12.8333H12.8333V16.1667C12.8333 16.6269 12.4602 17 12 17C11.5398 17 11.1667 16.6269 11.1667 16.1667V12.8333H7.83333C7.3731 12.8333 7 12.4602 7 12C7 11.5398 7.3731 11.1667 7.83333 11.1667H11.1667V7.83333C11.1667 7.3731 11.5398 7 12 7Z" fill="#949494"/>
              </svg>
              `}
            />
            <Text fill={'#767676'} fontSize={14} fontWeight={600}>Add a todo</Text>
          </AutoLayout>
        </AutoLayout>
        <AutoLayout
          direction={'vertical'}
          spacing={8}
          hidden={!doneTodos.length}
        >
          {doneTodos}
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        hidden={outOfScopeTodos.length === 0}
        direction={'vertical'}
        horizontalAlignItems={'center'}
        spacing={8}
        padding={24}
        fill={'#f2f2f2'}
      >
        {outOfScopeTodos.length === 0 ? <Rectangle width={320} height={4} fill={'#f2f2f2'}></Rectangle> : outOfScopeTodos}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(ScopedTodoCard)
