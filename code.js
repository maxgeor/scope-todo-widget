const { widget } = figma;
const { useSyncedState, AutoLayout, Text, SVG, Rectangle } = widget;
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', []);
    const Todo = ({ title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 'auto', width: 350 },
            figma.widget.h(AutoLayout, { spacing: 8, verticalAlignItems: 'center', direction: 'horizontal' },
                figma.widget.h(AutoLayout, { hidden: done || outOfScope ? true : false, width: 20, height: 20, verticalAlignItems: 'center', horizontalAlignItems: 'center' },
                    figma.widget.h(Rectangle, { width: 16, height: 16, fill: '#FFF', stroke: '#BABABA', strokeWidth: 1, cornerRadius: 4 })),
                figma.widget.h(SVG, { hidden: done === false || outOfScope ? true : false, src: `
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#00A354">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>  
            ` }),
                figma.widget.h(Rectangle, { width: 20, height: 20, fill: '#ebebeb', hidden: !outOfScope }),
                figma.widget.h(Text, { fill: done || outOfScope ? "#727272" : "#101010", fontSize: done || outOfScope ? 13 : 16, textDecoration: done && !outOfScope ? 'strikethrough' : 'none' }, title)),
            figma.widget.h(SVG, { src: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#AEAEAE">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          ` })));
    };
    const notDoneTodos = todos.filter(todo => !todo.done && !todo.outOfScope)
        .map(todo => figma.widget.h(Todo, { title: todo.title, done: todo.done, outOfScope: todo.outOfScope }));
    const doneTodos = todos.filter(todo => todo.done && !todo.outOfScope)
        .map(todo => figma.widget.h(Todo, { title: todo.title, done: todo.done, outOfScope: todo.outOfScope }));
    const outOfScopeTodos = todos.filter(todo => todo.outOfScope)
        .map(todo => figma.widget.h(Todo, { title: todo.title, done: todo.done, outOfScope: todo.outOfScope }));
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fafafa', stroke: '#E5E5E5', strokeWidth: 1 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                notDoneTodos.length > 0 && notDoneTodos,
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, onClick: () => setTodos([
                        ...todos,
                        {
                            title: "New todo",
                            done: false,
                            outOfScope: false
                        }
                    ]) },
                    figma.widget.h(SVG, { src: `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#8f8f8f">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>` }),
                    figma.widget.h(Text, { fill: '#727272', fontWeight: 600, fontSize: 14 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8, hidden: !doneTodos.length }, doneTodos)),
        figma.widget.h(AutoLayout, { direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#ebebeb' }, outOfScopeTodos.length === 0 ? figma.widget.h(Rectangle, { width: 350, height: 4, fill: '#ebebeb' }) : outOfScopeTodos)));
}
widget.register(ScopedTodoCard);
