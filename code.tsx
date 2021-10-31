const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG, Rectangle } = widget

function ScopedTodoCard() {
  const [todos, setTodos] = useSyncedState('todos', [
    {
      title: 'findinddbnvifnv',
      done: true,
      outOfScope: false
    }
  ])

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
            <Text fill={'#7C7C7C'} fontWeight={600} fontSize={15}>Add a todo</Text>
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
