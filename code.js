const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle } = widget;
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', [
        {
            title: "Get Groceries",
            done: true,
            outOfScope: false,
        },
        {
            title: "Find a taco",
            done: false,
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
    ]);
    usePropertyMenu([
        {
            tooltip: "Add a todo",
            propertyName: "Add a todo",
            itemType: "action"
        },
    ], (e) => {
        console.log(e.propertyName);
    });
    const Todo = ({ title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', spacing: 'auto', width: 375 },
            figma.widget.h(AutoLayout, { spacing: 8 },
                figma.widget.h(AutoLayout, { hidden: done || outOfScope ? true : false, width: 20, height: 20, verticalAlignItems: 'center', horizontalAlignItems: 'center' },
                    figma.widget.h(Rectangle, { width: 16, height: 16, fill: '#FFF', stroke: '#BABABA', strokeWidth: 1, cornerRadius: 4 })),
                figma.widget.h(SVG, { hidden: done === false || outOfScope ? true : false, src: `
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#01A65F">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>  
            ` }),
                figma.widget.h(Text, { fill: done || outOfScope ? "#727272" : "#101010", fontSize: done ? 13 : 16, textDecoration: done ? 'strikethrough' : 'none' }, title)),
            figma.widget.h(SVG, { src: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#AEAEAE">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          ` })));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fafafa', stroke: '#E5E5E5', strokeWidth: 1 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 16, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 }, todos
                .filter(todo => !todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { title: todo.title, done: todo.done, outOfScope: todo.outOfScope }))),
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8, padding: 24, fill: '#ebebeb' }, todos
            .filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(ScopedTodoCard);
