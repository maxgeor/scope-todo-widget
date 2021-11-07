const { widget } = figma;
const { useSyncedState, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;
import { nanoid as createId } from 'nanoid/non-secure';
// figma.showUI(__html__)
// figma.ui.onmessage = msg => {
//   if (msg.type === 'create-rectangles') {
//     const nodes = []
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle()
//       rect.x = i * 150
//       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}]
//       figma.currentPage.appendChild(rect)
//       nodes.push(rect)
//     }
//     figma.currentPage.selection = nodes
//     figma.viewport.scrollAndZoomIntoView(nodes)
//   }
//   figma.closePlugin()
// }
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', []);
    function handleMove(id, outOfScope) {
        const targetTodo = todos.find(todo => todo.id === id);
        targetTodo.outOfScope = !outOfScope;
        setTodos([...todos.filter(todo => todo.id !== id), targetTodo]);
    }
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 320 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, 
                    // onClick={() => handleCheck(key, id, title, outOfScope)}
                    src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" stroke="#b2b2b2"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, 
                    // onClick={() => handleCheck(key, id, title, outOfScope)}
                    src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#000", textDecoration: done && !outOfScope ? "strikethrough" : "none", fontSize: done || outOfScope ? 14 : 15, lineHeight: 24, width: 220 }, title)),
            figma.widget.h(SVG, { onClick: () => handleMove(id, outOfScope), src: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="4" height="4" rx="2" />
              <rect x="10" y="10" width="4" height="4" rx="2" />
              <rect x="16" y="10" width="4" height="4" rx="2" />
            </svg>
          ` })));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 364 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                todos
                    .filter(todo => !todo.done && !todo.outOfScope)
                    .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })),
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, onClick: () => {
                        const id = createId();
                        setTodos([
                            ...todos,
                            {
                                key: id,
                                id: id,
                                title: "New todo",
                                done: false,
                                outOfScope: false
                            }
                        ]);
                    } },
                    figma.widget.h(SVG, { src: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#949494" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11L16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13L8 13C7.44772 13 7 12.5523 7 12Z" />
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#767676', fontSize: 14, fontWeight: 600 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.done && !todo.outOfScope).length, direction: 'vertical', spacing: 8 }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        !todos.filter(todo => todo.outOfScope).length ?
            figma.widget.h(Rectangle, { width: 364, height: 48, fill: '#f2f2f2' }) :
            figma.widget.h(AutoLayout, { direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(ScopedTodoCard);
