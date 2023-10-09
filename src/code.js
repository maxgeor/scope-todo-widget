import { nanoid as createId } from "nanoid/non-secure";
const { widget } = figma;
const { useSyncedState, useWidgetId, usePropertyMenu, useEffect, AutoLayout, Input, Text: TextBlock, SVG, Rectangle, } = widget;
function TodoWidget() {
    const widgetId = useWidgetId();
    const [todos, setTodos] = useSyncedState("todos", []);
    const [title, setTitle] = useSyncedState("title", "");
    const [hasTitle, setHasTitle] = useSyncedState("hasTitle", false);
    useEffect(() => {
        figma.ui.onmessage = (msg) => {
            switch (msg.type) {
                case "update-title":
                    handleChange(msg.id, "title", msg.title);
                    break;
                case "flip-todo-scope":
                    handleChange(msg.id, "outOfScope", msg.outOfScope);
                    break;
                case "delete-todo":
                    deleteTodo(msg.id);
                    break;
                default:
                    figma.closePlugin();
                    break;
            }
        };
    });
    const deleteTodo = (id) => setTodos([...todos.filter((todo) => todo.id !== id)]);
    const createTodo = (id) => setTodos([
        ...todos,
        {
            id,
            title: "",
            done: false,
            outOfScope: false,
        },
    ]);
    function handleChange({ id, changedProp, changedPropValue }) {
        const updatedTodo = (todo) => {
            switch (changedProp) {
                case "title":
                    return Object.assign(Object.assign({}, todo), { title: changedPropValue });
                case "done":
                    return Object.assign(Object.assign({}, todo), { done: !changedPropValue });
                case "outOfScope":
                    return Object.assign(Object.assign({}, todo), { outOfScope: changedPropValue });
                default:
                    return todo;
            }
        };
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo(todo) : todo)));
    }
    const titleActionItem = title
        ? {
            tooltip: "Remove Title",
            propertyName: "remove-title",
            itemType: "action",
        }
        : {
            tooltip: "Add Title",
            propertyName: "add-title",
            itemType: "action",
        };
    const propertyMenuItems = todos.length > 4
        ? [
            titleActionItem,
            {
                itemType: "separator",
            },
            {
                tooltip: "Clear All",
                propertyName: "clear-all",
                itemType: "action",
            },
        ]
        : [titleActionItem];
    usePropertyMenu(propertyMenuItems, ({ propertyName }) => {
        if (propertyName === "clear-all") {
            setTodos([]);
        }
        else if (propertyName === "add-title") {
            setHasTitle(true);
        }
        else if (propertyName === "remove-title") {
            setHasTitle(false);
        }
    });
    const Todo = ({ id, done, title, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { key: id, direction: "horizontal", verticalAlignItems: "start", spacing: "auto", width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "start", spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.3408 8.74741C14.7536 8.28303 14.7118 7.57195 14.2474 7.15916C13.783 6.74638 13.0719 6.78821 12.6592 7.25259L10.6592 9.50259L9.45183 10.8608L7.7955 9.2045C7.35616 8.76516 6.64384 8.76516 6.2045 9.2045C5.76517 9.64384 5.76517 10.3562 6.2045 10.7955L8.7045 13.2955C8.92359 13.5146 9.22334 13.6336 9.53305 13.6245C9.84275 13.6154 10.135 13.479 10.3408 13.2474L12.3408 10.9974L14.3408 8.74741Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: "#f2f2f2", width: 20, height: 20 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#101010", fontSize: done || outOfScope ? 13 : 14, lineHeight: 20, width: 180, onClick: () => new Promise((resolve) => {
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__uiFiles__.ui, {
                            height: 56,
                            title: "Edit your todo",
                            position: {
                                y: widget.y - 150,
                                x: widget.x,
                            },
                        });
                        figma.ui.postMessage({
                            type: "edit",
                            id: id,
                            title: title,
                            widget,
                        });
                    }) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => new Promise((resolve) => {
                    const widget = figma.getNodeById(widgetId);
                    figma.showUI(__uiFiles__.menu, {
                        height: 85,
                        width: 180,
                        title: "Menu",
                        position: {
                            y: widget.y - 58,
                            x: widget.x + widget.width + 7,
                        },
                    });
                    figma.ui.postMessage({
                        type: "menu",
                        id: id,
                        title: title,
                        outOfScope: outOfScope,
                        widget,
                    });
                }), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6" y="8" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="8" y="8" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="14.4" y="8" width="4" height="4" rx="2" fill="#949494"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: "vertical", cornerRadius: 8, fill: "#fff", width: 360, stroke: "#e7e7e7" },
        hasTitle && (figma.widget.h(Input, { value: title, placeholder: "Add a title...", inputBehavior: "multiline", fontWeight: 700, fontSize: 17, onTextEditEnd: (e) => setTitle(e.characters) })),
        figma.widget.h(AutoLayout, { direction: "vertical", spacing: 24, padding: 24, width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, width: "fill-parent" },
                todos
                    .filter(({ done, outOfScope }) => !done && !outOfScope)
                    .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))),
                figma.widget.h(AutoLayout, { width: "fill-parent" },
                    figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "center", spacing: 8, fill: "#fff", onClick: () => new Promise((resolve) => {
                            const id = createId();
                            const widget = figma.getNodeById(widgetId);
                            createTodo(id);
                            figma.showUI(__uiFiles__.ui, {
                                height: 56,
                                title: "Add a todo",
                                position: {
                                    y: widget.y - 150,
                                    x: widget.x,
                                },
                            });
                            figma.ui.postMessage({ type: "add", id, widget });
                        }) },
                        figma.widget.h(SVG, { src: `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 5C10.7463 5 11.25 5.44772 11.25 6V14C11.25 14.5523 10.7463 15 10.125 15C9.50368 15 9 14.5523 9 14V6C9 5.44772 9.50368 5 10.125 5Z" fill="#949494"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875C5 9.25368 5.44772 8.75 6 8.75L14 8.75C14.5523 8.75 15 9.25368 15 9.875C15 10.4963 14.5523 11 14 11L6 11C5.44772 11 5 10.4963 5 9.875Z" fill="#949494"/>
                </svg>
                ` }),
                        figma.widget.h(TextBlock, { fill: "#949494", fontSize: 14, lineHeight: 20, fontWeight: 700, letterSpacing: "-0.75%" }, "Add a todo")))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(({ done, outOfScope }) => done && !outOfScope).length, direction: "vertical", spacing: 8, width: "fill-parent" }, todos
                .filter(({ done, outOfScope }) => done && !outOfScope)
                .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))))),
        figma.widget.h(AutoLayout, { hidden: todos.filter(({ outOfScope }) => outOfScope).length === 0, width: "fill-parent", height: !todos.filter(({ outOfScope }) => outOfScope).length
                ? 40
                : "hug-contents", direction: "vertical", horizontalAlignItems: "center", spacing: 8, padding: 24, fill: "#f2f2f2" }, todos
            .filter(({ outOfScope }) => outOfScope)
            .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))))));
}
widget.register(TodoWidget);
