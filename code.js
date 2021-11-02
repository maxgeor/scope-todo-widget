const { widget } = figma;
const { useSyncedState, useEffect, AutoLayout, Text, SVG, Rectangle } = widget;
// import { nanoid as createId } from 'nanoid'
// const { v4: createId } = require('uuid');
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', [
        // {
        //   title: 'odjfvkjdbfvkjdbkdf',
        //   done: true,
        //   outOfScope: true,
        // },
        {
            title: 'When you click the checkbox, it changes that todos “Done” state to true',
            done: false,
            outOfScope: false,
        },
        {
            title: 'Find a way to fix the sink without messing it up',
            done: true,
            outOfScope: false,
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
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 'auto', width: 325, overflow: 'visible' },
            figma.widget.h(AutoLayout, { spacing: 8, verticalAlignItems: 'center', direction: 'horizontal', overflow: 'visible' },
                figma.widget.h(AutoLayout, { hidden: props.done || props.outOfScope ? true : false, width: 20, height: 20, verticalAlignItems: 'center', horizontalAlignItems: 'center' },
                    figma.widget.h(Rectangle, { width: 16, height: 16, fill: '#FFF', stroke: '#B2B2B2', strokeWidth: 1, cornerRadius: 4 })),
                figma.widget.h(SVG, { hidden: props.done === false || props.outOfScope ? true : false, src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.2474 8.66436C14.6143 8.25158 14.5771 7.61951 14.1644 7.25259C13.7516 6.88567 13.1195 6.92285 12.7526 7.33564L9.45718 11.043L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.79289 13.2071C8.98764 13.4019 9.25408 13.5077 9.52937 13.4996C9.80467 13.4915 10.0644 13.3702 10.2474 13.1644L14.2474 8.66436Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { width: 20, height: 20, fill: '#f0f0f0', hidden: !props.outOfScope }),
                figma.widget.h(Text, { fill: props.outOfScope ? "#6D6D6D" : props.done ? "#949494" : "#000", fontSize: props.done || props.outOfScope ? 13 : 16, textDecoration: props.done && !props.outOfScope ? 'strikethrough' : 'none' }, props.title)),
            figma.widget.h(SVG, { src: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#AEAEAE">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
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
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#949494">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>` }),
                    figma.widget.h(Text, { fill: '#949494', fontSize: 14, fontWeight: 700 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8, hidden: !doneTodos.length }, doneTodos)),
        figma.widget.h(AutoLayout, { direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#F0F0F0' }, outOfScopeTodos.length === 0 ? figma.widget.h(Rectangle, { width: 325, height: 4, fill: '#F0F0F0' }) : outOfScopeTodos)));
}
widget.register(ScopedTodoCard);
