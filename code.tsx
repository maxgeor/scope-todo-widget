const { widget } = figma
const { useSyncedState, useEffect, AutoLayout, Text, SVG, Rectangle } = widget

// import { nanoid as createId } from 'nanoid'
// const { v4: createId } = require('uuid');

function ScopedTodoCard() {
  const [todos, setTodos] = useSyncedState('todos', [
    // {
    //   title: 'odjfvkjdbfvkjdbkdf',
    //   done: true,
    //   outOfScope: true,
    // },
    {
      title: 'When you click the checkbox, it changes that todos “Done” state to true',
      done: false,
      outOfScope: false,
    },
    {
      title: 'Find a way to fix the sink without messing it up',
      done: true,
      outOfScope: false,
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
        verticalAlignItems={'center'}
        spacing={'auto'}
        width={325}
        overflow={'visible'}
      >
        <AutoLayout
          spacing={8}
          verticalAlignItems={'center'}
          direction={'horizontal'}
          overflow={'visible'}
        >
          <AutoLayout 
            hidden={props.done || props.outOfScope ? true : false}
            width={20} 
            height={20} 
            verticalAlignItems={'center'} 
            horizontalAlignItems={'center'}
          >
            <Rectangle 
              width={16}
              height={16}
              fill={'#FFF'}
              stroke={'#B2B2B2'}
              strokeWidth={1}
              cornerRadius={4}
            />
          </AutoLayout>
          <SVG 
            hidden={props.done === false || props.outOfScope ? true : false}
            src={`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.2474 8.66436C14.6143 8.25158 14.5771 7.61951 14.1644 7.25259C13.7516 6.88567 13.1195 6.92285 12.7526 7.33564L9.45718 11.043L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.79289 13.2071C8.98764 13.4019 9.25408 13.5077 9.52937 13.4996C9.80467 13.4915 10.0644 13.3702 10.2474 13.1644L14.2474 8.66436Z" fill="#4AB393"/>
              </svg>
            `}
          />
          <Rectangle 
              width={20}
              height={20}
              fill={'#f0f0f0'}
              hidden={!props.outOfScope}
            />
          <Text 
            fill={ props.outOfScope ? "#6D6D6D" : props.done ? "#949494" : "#000"}
            fontSize={props.done || props.outOfScope ? 13 : 16}
            textDecoration={props.done && !props.outOfScope ? 'strikethrough' : 'none'}
            // onClick={() => makeTextEditable(this)}
          >
            {props.title}
          </Text>
        </AutoLayout>
        <SVG
          src={`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#AEAEAE">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          `}
          onClick={() =>
            new Promise((resolve) => {
              figma.showUI(__html__)
            })}
        />
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
    >

      <AutoLayout
        direction={'vertical'}
        spacing={24}
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
            {/* <SVG src={`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H11V7Z" fill="#8F8F8F"/>
              </svg>`}
            /> */}
            <SVG src={`
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#949494">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>`}
            />
            <Text fill={'#828282'} fontSize={14} fontWeight={600}>Add a todo</Text>
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
        direction={'vertical'}
        horizontalAlignItems={'center'}
        spacing={8}
        padding={24}
        fill={'#F0F0F0'}
      >
        {outOfScopeTodos.length === 0 ? <Rectangle width={325} height={4} fill={'#F0F0F0'}></Rectangle> : outOfScopeTodos}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(ScopedTodoCard)
