const { widget } = figma;
const { useSyncedState, useEffect, AutoLayout, Text, SVG, Rectangle } = widget;
// import { nanoid as createId } from 'nanoid'
// const { v4: createId } = require('uuid');
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', [
        {
            title: 'Open menue with edit, delete, and move options',
            done: false,
            outOfScope: false,
        },
        {
            title: 'When clicking edit option, you can change the text',
            done: false,
            outOfScope: false,
        },
        {
            title: 'Clicking delte will remove the todo',
            done: false,
            outOfScope: false,
        },
        {
            title: 'Wrap text on overflow',
            done: true,
            outOfScope: false,
        },
        {
            title: 'Remove big space below notDoneTodos seciton when there aren’t hany completed todos',
            done: true,
            outOfScope: false,
        },
        {
            title: 'When you click the checkbox, it changes that todos “Done” state',
            done: true,
            outOfScope: false,
        },
        {
            title: "Paste text to create todos",
            done: true,
            outOfScope: true,
        },
        {
            title: "Paste text to create todos",
            done: true,
            outOfScope: true,
        },
    ]);
    useEffect(() => {
        figma.ui.onmessage = (msg) => {
            if (msg.type === 'showToast') {
                figma.notify('Hello widget');
            }
            if (msg.type === 'close') {
                figma.closePlugin();
            }
        };
    });
    const Todo = (props) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 320 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: props.done || props.outOfScope ? true : false, src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" stroke="#b2b2b2"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: props.done === false || props.outOfScope ? true : false, src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !props.outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(Text, { fill: props.outOfScope ? "#6E6E6E" : props.done ? "#767676" : "#000", textDecoration: props.done && !props.outOfScope ? "strikethrough" : "none", fontSize: props.done || props.outOfScope ? 14 : 15, lineHeight: 24, width: 220 }, props.title)),
            figma.widget.h(SVG, { src: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#919191" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="4" height="4" rx="2" />
              <rect x="10" y="10" width="4" height="4" rx="2" />
              <rect x="16" y="10" width="4" height="4" rx="2" />
            </svg>
          `, onClick: () => new Promise((resolve) => {
                    figma.showUI(__html__);
                }) })));
    };
    const notDoneTodos = todos.filter(todo => !todo.done && !todo.outOfScope)
        .map(todo => {
        return figma.widget.h(Todo
        // key={todo.id}
        // id={todo.id}
        , { 
            // key={todo.id}
            // id={todo.id}
            title: todo.title, done: todo.done, outOfScope: todo.outOfScope });
    });
    const doneTodos = todos.filter(todo => todo.done && !todo.outOfScope)
        .map(todo => {
        return figma.widget.h(Todo
        // key={todo.id}
        // id={todo.id}
        , { 
            // key={todo.id}
            // id={todo.id}
            title: todo.title, done: todo.done, outOfScope: todo.outOfScope });
    });
    const outOfScopeTodos = todos.filter(todo => todo.outOfScope)
        .map(todo => {
        return figma.widget.h(Todo
        // key={todo.id}
        // id={todo.id}
        , { 
            // key={todo.id}
            // id={todo.id}
            title: todo.title, done: todo.done, outOfScope: todo.outOfScope });
    });
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 364 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 32, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                notDoneTodos.length > 0 && notDoneTodos,
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, onClick: () => setTodos([
                        ...todos,
                        {
                            // id: createId(),
                            title: "New todo",
                            done: false,
                            outOfScope: false
                        }
                    ]) },
                    figma.widget.h(SVG, { src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.4602 7 12.8333 7.3731 12.8333 7.83333V11.1667H16.1667C16.6269 11.1667 17 11.5398 17 12C17 12.4602 16.6269 12.8333 16.1667 12.8333H12.8333V16.1667C12.8333 16.6269 12.4602 17 12 17C11.5398 17 11.1667 16.6269 11.1667 16.1667V12.8333H7.83333C7.3731 12.8333 7 12.4602 7 12C7 11.5398 7.3731 11.1667 7.83333 11.1667H11.1667V7.83333C11.1667 7.3731 11.5398 7 12 7Z" fill="#949494"/>
              </svg>
              ` }),
                    figma.widget.h(Text, { fill: '#767676', fontSize: 14, fontWeight: 600 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8, hidden: !doneTodos.length }, doneTodos)),
        figma.widget.h(AutoLayout, { hidden: outOfScopeTodos.length === 0, direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, outOfScopeTodos.length === 0 ? figma.widget.h(Rectangle, { width: 320, height: 4, fill: '#f2f2f2' }) : outOfScopeTodos)));
}
widget.register(ScopedTodoCard);
