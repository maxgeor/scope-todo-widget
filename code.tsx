const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG, Rectangle } = widget

function ScopedTodoCard() {
  const [todos, setTodos] = useSyncedState('todos', [])

  const Todo = ({title, done, outOfScope}) => {
    return (
      <AutoLayout
        direction={'horizontal'}
        verticalAlignItems={'center'}
        spacing={'auto'}
        width={350}
        >
        <AutoLayout
          spacing={8}
          verticalAlignItems={'center'}
          direction={'horizontal'}
        >
          <AutoLayout 
            hidden={done || outOfScope ? true : false}
            width={20} 
            height={20} 
            verticalAlignItems={'center'} 
            horizontalAlignItems={'center'}
          >
            <Rectangle 
              width={16}
              height={16}
              fill={'#FFF'}
              stroke={'#BABABA'}
              strokeWidth={1}
              cornerRadius={4}
            />
          </AutoLayout>
          <SVG 
            hidden={done === false || outOfScope ? true : false}
            src={`
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#00A354">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>  
            `}
          />
          <Rectangle 
              width={20}
              height={20}
              fill={'#ebebeb'}
              hidden={!outOfScope}
            />
          <Text 
            fill={done || outOfScope ? "#727272" : "#101010"}
            fontSize={done || outOfScope ? 13 : 16}
            textDecoration={done && !outOfScope ? 'strikethrough' : 'none'}
            // onClick={() => makeTextEditable(this)}
          >
            {title}
          </Text>
        </AutoLayout>
        <SVG
          src={`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#AEAEAE">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          `}
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
         .map(todo =>
           <Todo 
             title={todo.title}
             done={todo.done}
             outOfScope={todo.outOfScope}
           />
         )
  
  const doneTodos = 
    todos.filter(todo => todo.done && !todo.outOfScope)
         .map(todo =>
           <Todo 
             title={todo.title}
             done={todo.done}
             outOfScope={todo.outOfScope}
           />
         )
  
  const outOfScopeTodos = 
    todos.filter(todo => todo.outOfScope)
         .map(todo =>
           <Todo 
             title={todo.title}
             done={todo.done}
             outOfScope={todo.outOfScope}
           />
         )

  return (
    <AutoLayout
      direction={'vertical'}
      cornerRadius={8}
      fill={'#fafafa'}
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
                title: "New todo",
                done: false,
                outOfScope: false
              }
            ])}
          >
            <SVG src={`
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#8f8f8f">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>`}
            />
            <Text fill={'#727272'} fontWeight={600} fontSize={14}>Add a todo</Text>
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
        fill={'#ebebeb'}
      >
        {outOfScopeTodos.length === 0 ? <Rectangle width={350} height={4} fill={'#ebebeb'}></Rectangle> : outOfScopeTodos}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(ScopedTodoCard)
