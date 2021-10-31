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
        width={375}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#01A65F">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>  
            `}
          />
          <Text 
            fill={done || outOfScope ? "#727272" : "#101010"}
            fontSize={done ? 13 : 16}
            textDecoration={done ? 'strikethrough' : 'none'}
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
        spacing={16}
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#8f8f8f" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H11V7Z"/>
              </svg>`}
            />
            <Text fill={'#646464'}>Add a todo</Text>
          </AutoLayout>
        </AutoLayout>
        <AutoLayout
          direction={'vertical'}
          spacing={8}
          height={!doneTodos.length && 32}
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
        {outOfScopeTodos.length === 0 ? <Rectangle width={375} height={16} fill={'#ebebeb'}></Rectangle> : outOfScopeTodos}
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(ScopedTodoCard)
