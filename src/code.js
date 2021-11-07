const { widget } = figma;
const { useSyncedState, useWidgetId, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;
import { nanoid as createId } from 'nanoid/non-secure';
figma.ui.onmessage = msg => {
    if (msg.type === 'delete-todo') {
        // delete the todo
        figma.closePlugin();
    }
    else if (msg.type === 'update-title') {
        // handleChange()
        figma.closePlugin();
    }
};
function TodoWidget() {
    const widgetId = useWidgetId();
    const [todos, setTodos] = useSyncedState('todos', []);
    function handleAdd() {
        const id = createId();
        setTodos([
            ...todos,
            {
                key: id, id: id, title: "This is a really long todo with a lot of conditions and other stuff", done: false, outOfScope: false
            }
        ]);
        figma.showUI(__html__);
    }
    function handleChange(id, changedPropName, changedPropValue) {
        const targetTodo = todos.find(todo => todo.id === id);
        if (changedPropName === "title") {
            targetTodo.title = !changedPropValue;
        }
        else if (changedPropName === "done") {
            targetTodo.done = !changedPropValue;
        }
        else if (changedPropName === "outOfScope") {
            targetTodo.done = false;
            targetTodo.outOfScope = !changedPropValue;
        }
        setTodos([...todos.filter(todo => todo.id !== id), targetTodo]);
    }
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 320 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#4AB393" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.4343 10.8305C16.8929 10.3145 16.8464 9.52439 16.3305 9.06574C15.8145 8.60709 15.0244 8.65357 14.5657 9.16955L11.4465 12.6787L9.88388 11.1161C9.39573 10.628 8.60427 10.628 8.11612 11.1161C7.62796 11.6043 7.62796 12.3957 8.11612 12.8839L10.6161 15.3839C10.8595 15.6273 11.1926 15.7596 11.5367 15.7495C11.8808 15.7393 12.2055 15.5878 12.4343 15.3305L16.4343 10.8305Z"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#000", fontSize: done || outOfScope ? 14 : 15, lineHeight: 24, width: 220, onClick: () => figma.showUI(__html__) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => handleChange(id, "outOfScope", outOfScope), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="9.75" width="4.5" height="4.5" rx="2.25" />
                <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="2.25" />
                <rect x="16.5" y="9.75" width="4.5" height="4.5" rx="2.25" />
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 364 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                todos
                    .filter(todo => !todo.done && !todo.outOfScope)
                    .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })),
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, fill: '#fff', onClick: handleAdd },
                    figma.widget.h(SVG, { src: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.25 8C13.25 7.30964 12.6904 6.75 12 6.75C11.3096 6.75 10.75 7.30964 10.75 8V10.75H8C7.30964 10.75 6.75 11.3096 6.75 12C6.75 12.6904 7.30964 13.25 8 13.25H10.75V16C10.75 16.6904 11.3096 17.25 12 17.25C12.6904 17.25 13.25 16.6904 13.25 16V13.25H16C16.6904 13.25 17.25 12.6904 17.25 12C17.25 11.3096 16.6904 10.75 16 10.75H13.25V8Z"/>
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#949494', fontSize: 14, fontWeight: 700 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.done && !todo.outOfScope).length, direction: 'vertical', spacing: 8 }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.outOfScope).length, direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(TodoWidget);
