const { widget } = figma
const { useSyncedState, AutoLayout, SVG, Rectangle, Input } = widget

interface TodoProps {
  key: string,
  id: string,
  title: string, 
  done: boolean,
  outOfScope: boolean,
  handleChange: (id: string, changedProp: string, changedPropValue: any) => void,
} 

function Todo(props: TodoProps) {
  const [text, setText] = useSyncedState("text", props.title)
  
  const handleTextChange = (value: string) => {
    if (value === "") {
      deleteTodo(props.id)
    } else {
      props.handleChange(props.id, "title", value)
    }
  }

  return (
    <AutoLayout
      direction={'horizontal'}
      verticalAlignItems={'start'}
      spacing={'auto'}
      width={'fill-parent'}
    >
      <AutoLayout
        direction={'horizontal'}
        verticalAlignItems={'center'}
        spacing={8}
      >
        
        <SVG
          hidden={props.done || props.outOfScope}
          onClick={() => handleChange( props.id, "done",  props.done)}
          src={`
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
            </svg>
          `}
        />
        <SVG 
          hidden={!props.done || props.outOfScope}
          onClick={() => handleChange( props.id, "done",  props.done)}
          src={`
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.3408 8.74741C14.7536 8.28303 14.7118 7.57195 14.2474 7.15916C13.783 6.74638 13.0719 6.78821 12.6592 7.25259L10.6592 9.50259L9.45183 10.8608L7.7955 9.2045C7.35616 8.76516 6.64384 8.76516 6.2045 9.2045C5.76517 9.64384 5.76517 10.3562 6.2045 10.7955L8.7045 13.2955C8.92359 13.5146 9.22334 13.6336 9.53305 13.6245C9.84275 13.6154 10.135 13.479 10.3408 13.2474L12.3408 10.9974L14.3408 8.74741Z" fill="#4AB393"/>
            </svg>
          `}
        />
        <Rectangle 
          hidden={!props.outOfScope}
          fill={'#f2f2f2'}
          width={20}
          height={20}
        />
        <Input 
          value={text} 
          placeholder={'Give your todo a title...'}
          placeholderProps={{ fill: '#999' }}
          fill={ props.outOfScope ?  "#6E6E6E" :  props.done ? "#767676" : "#101010"}
          fontSize={ props.done ||  props.outOfScope ? 13 : 14}
          lineHeight={16}
          width={180}
          inputFrameProps={{ cornerRadius: 6, padding: { vertical: 6, horizontal: 8 } }}
          inputBehavior="wrap"
          onTextEditEnd={e => setText(e.characters)}
        />
      </AutoLayout>
      <AutoLayout
        onClick={() => 
          new Promise((resolve) => {
            const widget = figma.getNodeById(widgetId)
            figma.showUI(__uiFiles__.menu, {height: 85, width: 180, title: 'Menu', position: {y: (widget as WidgetNode).y - 58, x: (widget as WidgetNode).x + (widget as WidgetNode).width + 7}})
            figma.ui.postMessage({ type: 'menu',  id: props.id,  title: props.title,  outOfScope: props.outOfScope, widget })
          })
        }
        fill={props.outOfScope ? "#f2f2f2" : "#fff"}      
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

export default Todo