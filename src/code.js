const { widget } = figma;
const { useSyncedState, useWidgetId, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;
import { nanoid as createId } from 'nanoid/non-secure';
function TodoWidget() {
    const widgetId = useWidgetId();
    const [todos, setTodos] = useSyncedState('todos', []);
    useEffect(() => {
        figma.ui.onmessage = msg => {
            if (msg.type === 'update-title') {
                handleChange(msg.id, 'title', msg.title);
            }
            else if (msg.type === 'delete-todo') {
                deleteTodo(msg.id);
                figma.closePlugin();
            }
            else if (msg.type === 'close-plugin') {
                figma.closePlugin();
            }
        };
    });
    function deleteTodo(id) {
        setTodos([...todos.filter(todo => todo.id !== id)]);
    }
    function createTodo(id) {
        setTodos([
            ...todos,
            {
                key: id, id, title: '', done: false, outOfScope: false
            }
        ]);
    }
    function handleChange(id, changedProp, changedPropValue) {
        const targetTodo = todos.find(todo => todo.id === id);
        if (changedProp === "title") {
            targetTodo.title = changedPropValue;
        }
        else if (changedProp === "done") {
            targetTodo.done = !changedPropValue;
        }
        else if (changedProp === "outOfScope") {
            targetTodo.done = false;
            targetTodo.outOfScope = !changedPropValue;
        }
        setTodos([...todos.filter(todo => todo.id !== id), targetTodo]);
    }
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 290 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.4343 8.83045C14.8929 8.31448 14.8464 7.52439 14.3305 7.06574C13.8145 6.60709 13.0244 6.65357 12.5657 7.16955L9.44648 10.6787L7.88388 9.11612C7.39573 8.62796 6.60427 8.62796 6.11612 9.11612C5.62796 9.60427 5.62796 10.3957 6.11612 10.8839L8.61612 13.3839C8.85955 13.6273 9.1926 13.7596 9.53672 13.7495C9.88083 13.7393 10.2055 13.5878 10.4343 13.3305L14.4343 8.83045Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 20, height: 20 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#000", fontSize: 14, lineHeight: 20, width: 200, onClick: () => new Promise((resolve) => {
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__html__);
                        figma.ui.postMessage({ type: 'edit', id, title, widget });
                    }) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => handleChange(id, "outOfScope", outOfScope), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="22" height="22" viewBox="0 0 22 22" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="9" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="9" y="9" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="15" y="9" width="4" height="4" rx="2" fill="#949494"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 344 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                todos
                    .filter(todo => !todo.done && !todo.outOfScope)
                    .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })),
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, fill: '#fff', onClick: () => new Promise((resolve) => {
                        const id = createId();
                        createTodo(id);
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__html__);
                        figma.ui.postMessage({ type: 'add', id, widget });
                    }) },
                    figma.widget.h(SVG, { src: `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 6C11.25 5.30964 10.6904 4.75 10 4.75C9.30964 4.75 8.75 5.30964 8.75 6V8.75H6C5.30964 8.75 4.75 9.30964 4.75 10C4.75 10.6904 5.30964 11.25 6 11.25H8.75V14C8.75 14.6904 9.30964 15.25 10 15.25C10.6904 15.25 11.25 14.6904 11.25 14V11.25H14C14.6904 11.25 15.25 10.6904 15.25 10C15.25 9.30964 14.6904 8.75 14 8.75H11.25V6Z"/>
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#949494', fontSize: 14, lineHeight: 20, fontWeight: 700 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.done && !todo.outOfScope).length, direction: 'vertical', spacing: 8 }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        figma.widget.h(AutoLayout, { width: 'fill-parent', height: !todos.filter(todo => todo.outOfScope).length ? 48 : 'hug-contents', direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(TodoWidget);
