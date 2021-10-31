const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG, Rectangle } = widget

function ScopedTodoCard() {
  const [todos, setTodos] = useSyncedState('todos', [
    {
      title: "Get Groceries",
      done: true,
      outOfScope: false,
    },
    {
      title: "Get kfnvldkfnvlkdf",
      done: true,
      outOfScope: false,
    },
    {
      title: "Finish the second part",
      done: false,
      outOfScope: false,
    },
    {
      title: "Work with the API",
      done: false,
      outOfScope: true,
    }
  ])

  const Todo = ({title, done, outOfScope}) => {
    return (
      <AutoLayout
        direction={'horizontal'}
        spacing={'auto'}
        width={375}
      >
        <AutoLayout
          spacing={8}
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
          spacing={12}
        >
          {todos
            .filter(todo => !todo.done && !todo.outOfScope)
            .map(todo =>
              <Todo 
                title={todo.title}
                done={todo.done}
                outOfScope={todo.outOfScope}
              />
            )
          }
        </AutoLayout>
        <AutoLayout
          direction={'vertical'}
          spacing={12}
        >
          {todos
            .filter(todo => todo.done && !todo.outOfScope)
            .map(todo =>
              <Todo 
                title={todo.title}
                done={todo.done}
                outOfScope={todo.outOfScope}
              />
            )
          }
        </AutoLayout>
        <AutoLayout 
          fill={'#fff'} 
          stroke={'#ddd'} 
          strokeWidth={1} 
          height={32} 
          width={100} 
          cornerRadius={20} 
          verticalAlignItems={'center'} 
          horizontalAlignItems={'center'}
          // onClick={}
        > 
          <Text fontSize={13}>Add a todo</Text>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        direction={'vertical'}
        spacing={12}
        padding={24}
        fill={'#ebebeb'}
      >
        {todos
          .filter(todo => todo.outOfScope)
          .map(todo =>
            <Todo 
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

widget.register(ScopedTodoCard)
