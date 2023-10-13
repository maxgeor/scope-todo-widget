/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/nanoid/non-secure/index.js":
/*!*************************************************!*\
  !*** ./node_modules/nanoid/non-secure/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customAlphabet: () => (/* binding */ customAlphabet),
/* harmony export */   nanoid: () => (/* binding */ nanoid)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = ''
    let i = size
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0]
    }
    return id
  }
}
let nanoid = (size = 21) => {
  let id = ''
  let i = size
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/code.tsx ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid/non-secure */ "./node_modules/nanoid/non-secure/index.js");
const { widget } = figma;
const { useSyncedState, useWidgetNodeId, usePropertyMenu, useEffect, AutoLayout, Input, Text: TextBlock, SVG, Rectangle, } = widget;

function TodoWidget() {
    const widgetId = useWidgetNodeId();
    const [todos, setTodos] = useSyncedState("todos", []);
    const [title, setTitle] = useSyncedState("title", "");
    const [hasTitle, setHasTitle] = useSyncedState("hasTitle", false);
    const [size, setSize] = useSyncedState("size", 1);
    useEffect(() => {
        figma.ui.onmessage = ({ type, id, title }) => {
            switch (type) {
                case "update-title":
                    updateTodo({ id, field: "title", value: title });
                    break;
                case "flip-todo-scope":
                    updateTodo({ id, field: "outOfScope" });
                    break;
                case "delete-todo":
                    deleteTodo(id);
                    figma.closePlugin();
                    break;
                default:
                    figma.closePlugin();
                    break;
            }
        };
    });
    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
    const createTodo = (id) => setTodos([
        ...todos,
        {
            id,
            title: "",
            done: false,
            outOfScope: false,
        },
    ]);
    function updateTodo(editedTodo) {
        if (editedTodo.field === "title" && "value" in editedTodo) {
            return setTodos(todos.map((todo) => todo.id === editedTodo.id
                ? Object.assign(Object.assign({}, todo), { title: editedTodo.value }) : todo));
        }
        const todo = todos.find((todo) => todo.id === editedTodo.id);
        const rest = todos.filter((todo) => todo.id !== editedTodo.id);
        if (!todo)
            return;
        if (editedTodo.field === "outOfScope") {
            setTodos([...rest, Object.assign(Object.assign({}, todo), { outOfScope: !todo.outOfScope })]);
        }
        else if (editedTodo.field === "done") {
            setTodos([...rest, Object.assign(Object.assign({}, todo), { done: !todo.done })]);
        }
    }
    const titleActionItem = hasTitle
        ? {
            tooltip: "Remove Title",
            propertyName: "remove-title",
            itemType: "action",
            icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L11.9291 2.36383C11.9159 2.32246 11.897 2.28368 11.8732 2.24845C11.7923 2.12875 11.6554 2.05005 11.5001 2.05005H3.50005C3.29909 2.05005 3.1289 2.18178 3.07111 2.3636C3.05743 2.40665 3.05005 2.45249 3.05005 2.50007V4.50001C3.05005 4.74854 3.25152 4.95001 3.50005 4.95001C3.74858 4.95001 3.95005 4.74854 3.95005 4.50001V2.95005H6.95006V7.34284L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L6.95006 8.75705V12.0501H5.7544C5.50587 12.0501 5.3044 12.2515 5.3044 12.5001C5.3044 12.7486 5.50587 12.9501 5.7544 12.9501H9.2544C9.50293 12.9501 9.7044 12.7486 9.7044 12.5001C9.7044 12.2515 9.50293 12.0501 9.2544 12.0501H8.05006V7.65705L13.3536 2.35355ZM8.05006 6.24284L11.0501 3.24283V2.95005H8.05006V6.24284Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        }
        : {
            tooltip: "Add a Title",
            propertyName: "add-title",
            itemType: "action",
            icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94993 2.95002L3.94993 4.49998C3.94993 4.74851 3.74845 4.94998 3.49993 4.94998C3.2514 4.94998 3.04993 4.74851 3.04993 4.49998V2.50004C3.04993 2.45246 3.05731 2.40661 3.07099 2.36357C3.12878 2.18175 3.29897 2.05002 3.49993 2.05002H11.4999C11.6553 2.05002 11.7922 2.12872 11.8731 2.24842C11.9216 2.32024 11.9499 2.40682 11.9499 2.50002L11.9499 2.50004V4.49998C11.9499 4.74851 11.7485 4.94998 11.4999 4.94998C11.2514 4.94998 11.0499 4.74851 11.0499 4.49998V2.95002H8.04993V12.05H9.25428C9.50281 12.05 9.70428 12.2515 9.70428 12.5C9.70428 12.7486 9.50281 12.95 9.25428 12.95H5.75428C5.50575 12.95 5.30428 12.7486 5.30428 12.5C5.30428 12.2515 5.50575 12.05 5.75428 12.05H6.94993V2.95002H3.94993Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        };
    const propertyMenuItems = [
        titleActionItem,
        {
            itemType: "separator",
        },
        {
            tooltip: "Make it smaller",
            propertyName: "shrink",
            itemType: "action",
            icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        },
        {
            tooltip: "Make it bigger",
            propertyName: "grow",
            itemType: "action",
            icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        },
        {
            itemType: "separator",
        },
        {
            tooltip: "Clear everything",
            propertyName: "clear-all",
            itemType: "action",
            icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.60913 0.0634287C4.39082 0.0088505 4.16575 0.12393 4.08218 0.332867L3.1538 2.6538L0.832866 3.58218C0.702884 3.63417 0.604504 3.7437 0.566705 3.87849C0.528906 4.01329 0.555994 4.158 0.639992 4.26999L2.01148 6.09864L1.06343 9.89085C1.00944 10.1068 1.12145 10.3298 1.32691 10.4154L4.20115 11.613L5.62557 13.7496C5.73412 13.9124 5.93545 13.9864 6.12362 13.9327L9.62362 12.9327C9.62988 12.9309 9.63611 12.929 9.64229 12.9269L12.6423 11.9269C12.7923 11.8769 12.905 11.7519 12.9393 11.5976L13.9393 7.09761C13.9776 6.92506 13.9114 6.74605 13.77 6.63999L11.95 5.27499V2.99999C11.95 2.82955 11.8537 2.67373 11.7012 2.5975L8.70124 1.0975C8.67187 1.08282 8.64098 1.07139 8.60913 1.06343L4.60913 0.0634287ZM11.4323 6.01173L12.7748 7.01858L10.2119 9.15429C10.1476 9.20786 10.0995 9.2783 10.0731 9.35769L9.25382 11.8155L7.73849 10.8684C7.52774 10.7367 7.25011 10.8007 7.11839 11.0115C6.98667 11.2222 7.05074 11.4999 7.26149 11.6316L8.40341 12.3453L6.19221 12.9771L4.87441 11.0004C4.82513 10.9265 4.75508 10.8688 4.67307 10.8346L2.03046 9.73352L2.85134 6.44999H4.99999C5.24852 6.44999 5.44999 6.24852 5.44999 5.99999C5.44999 5.75146 5.24852 5.54999 4.99999 5.54999H2.72499L1.7123 4.19974L3.51407 3.47903L6.35769 4.4269C6.53655 4.48652 6.73361 4.42832 6.85138 4.28111L8.62413 2.06518L11.05 3.27811V5.19533L8.83287 6.08218C8.70996 6.13134 8.61494 6.23212 8.57308 6.35769L8.07308 7.85769C7.99449 8.09346 8.12191 8.34831 8.35769 8.4269C8.59346 8.50549 8.84831 8.37807 8.9269 8.14229L9.3609 6.84029L11.4323 6.01173ZM7.71052 1.76648L6.34462 3.47386L4.09505 2.724L4.77192 1.03183L7.71052 1.76648ZM10.2115 11.7885L12.116 11.1537L12.7745 8.19034L10.8864 9.76374L10.2115 11.7885Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        },
    ];
    usePropertyMenu(propertyMenuItems, ({ propertyName }) => {
        if (propertyName === 'grow' || propertyName === 'shrink') {
            const newSize = propertyName === "grow" ? size * 1.3 : size / 1.3;
            return setSize(newSize);
        }
        switch (propertyName) {
            case "clear-all":
                setTodos([]);
                setHasTitle(false);
                setTitle("");
                break;
            case "add-title":
                setHasTitle(true);
                break;
            case "remove-title":
                setHasTitle(false);
                break;
        }
    });
    const Todo = (todo) => {
        const { id, done, title, outOfScope } = todo;
        return (figma.widget.h(AutoLayout, { key: id, direction: "horizontal", verticalAlignItems: "start", spacing: "auto", width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "start", spacing: 8 * size },
                figma.widget.h(AutoLayout, { hidden: done || outOfScope, height: 20 * size, width: 20 * size, verticalAlignItems: "center", horizontalAlignItems: "center", padding: 4 * size, onClick: () => updateTodo({ id, field: "done" }) },
                    figma.widget.h(Rectangle, { fill: "#fff", stroke: "#aeaeae", strokeWidth: 1 * size, strokeAlign: "inside", height: 16 * size, width: 16 * size, cornerRadius: 4 * size })),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => updateTodo({ id, field: "done" }), height: 20 * size, width: 20 * size, src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.3408 8.74741C14.7536 8.28303 14.7118 7.57195 14.2474 7.15916C13.783 6.74638 13.0719 6.78821 12.6592 7.25259L10.6592 9.50259L9.45183 10.8608L7.7955 9.2045C7.35616 8.76516 6.64384 8.76516 6.2045 9.2045C5.76517 9.64384 5.76517 10.3562 6.2045 10.7955L8.7045 13.2955C8.92359 13.5146 9.22334 13.6336 9.53305 13.6245C9.84275 13.6154 10.135 13.479 10.3408 13.2474L12.3408 10.9974L14.3408 8.74741Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: "#f2f2f2", width: 20 * size, height: 20 * size }),
                figma.widget.h(Input, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#101010", fontSize: (done || outOfScope ? 13 : 14) * size, lineHeight: 20 * size, width: 240 * size, value: title, placeholder: "I need to...", placeholderProps: {
                        fill: "#b7b7b7",
                        opacity: 1,
                        letterSpacing: -0.15,
                    }, onTextEditEnd: (e) => {
                        e.characters === ""
                            ? deleteTodo(id)
                            : updateTodo({ id, field: "title", value: e.characters });
                    } })),
            figma.widget.h(AutoLayout, { fill: outOfScope ? "#f2f2f2" : "#fff", onClick: () => new Promise(() => {
                    const widget = figma.getNodeById(widgetId);
                    figma.showUI(__html__, {
                        height: 76,
                        width: 220,
                        title,
                        position: {
                            y: widget.y - 58,
                            x: widget.x + widget.width + 7,
                        },
                    });
                    figma.ui.postMessage({ type: "ui", id, title, outOfScope });
                }) },
                figma.widget.h(SVG, { height: 20 * size, width: 20 * size, src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6" y="8" width="4" height="4" rx="2" fill="#AAAAAA"/>
                <rect x="8" y="8" width="4" height="4" rx="2" fill="#AAAAAA"/>
                <rect x="14.4" y="8" width="4" height="4" rx="2" fill="#AAAAAA"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: "vertical", cornerRadius: 8 * size, fill: "#fff", width: 380 * size, stroke: "#e7e7e7", strokeWidth: 1 * size },
        hasTitle && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", verticalAlignItems: "center", horizontalAlignItems: "center" },
            figma.widget.h(Input, { value: title, placeholder: "Add a title...", fill: "#2A2A2A", fontWeight: 700, fontSize: 19.8 * size, lineHeight: 24 * size, horizontalAlignText: "center", width: 290 * size, letterSpacing: -0.15 * size, inputFrameProps: {
                    fill: "#FFFFFF",
                    horizontalAlignItems: "center",
                    padding: { top: 24 * size },
                    verticalAlignItems: "center",
                }, onTextEditEnd: (e) => setTitle(e.characters) }))),
        figma.widget.h(AutoLayout, { direction: "vertical", spacing: 24 * size, padding: 24 * size, width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8 * size, width: "fill-parent" },
                todos
                    .filter(({ done, outOfScope }) => !done && !outOfScope)
                    .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))),
                figma.widget.h(AutoLayout, { width: "fill-parent" },
                    figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "center", spacing: 8 * size, fill: "#fff", onClick: () => createTodo((0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)()) },
                        figma.widget.h(SVG, { height: 20 * size, width: 20 * size, src: `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 5C10.7463 5 11.25 5.44772 11.25 6V14C11.25 14.5523 10.7463 15 10.125 15C9.50368 15 9 14.5523 9 14V6C9 5.44772 9.50368 5 10.125 5Z" fill="#979797"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875C5 9.25368 5.44772 8.75 6 8.75L14 8.75C14.5523 8.75 15 9.25368 15 9.875C15 10.4963 14.5523 11 14 11L6 11C5.44772 11 5 10.4963 5 9.875Z" fill="#979797"/>
                </svg>
                ` }),
                        figma.widget.h(TextBlock, { fill: "#949494", fontSize: 14 * size, lineHeight: 20 * size, fontWeight: 700, letterSpacing: "-0.75%" }, "Add a todo")))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(({ done, outOfScope }) => done && !outOfScope).length, direction: "vertical", spacing: 8 * size, width: "fill-parent" }, todos
                .filter(({ done, outOfScope }) => done && !outOfScope)
                .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))))),
        figma.widget.h(AutoLayout, { hidden: todos.filter(({ outOfScope }) => outOfScope).length === 0, width: "fill-parent", height: !todos.filter(({ outOfScope }) => outOfScope).length
                ? 40 * size
                : "hug-contents", direction: "vertical", horizontalAlignItems: "center", spacing: 8 * size, padding: 24 * size, fill: "#f2f2f2" }, todos
            .filter(({ outOfScope }) => outOfScope)
            .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))))));
}
widget.register(TodoWidget);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTZCLDZCQUE2QixtRUFBbUU7QUFDekosNkNBQTZDLHNCQUFzQjtBQUNuRSxpREFBaUQsa0hBQWtILHlEQUFRLEtBQUs7QUFDaEwsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLG9EQUFvRCx1R0FBdUc7QUFDM0oseUNBQXlDLHlCQUF5QixrQkFBa0Isa0dBQWtHO0FBQ3RMLDJCQUEyQixrQkFBa0I7QUFDN0Msd0JBQXdCLDZCQUE2Qiw2QkFBNkIsbUVBQW1FO0FBQ3JKLHFDQUFxQyx3QkFBd0IsWUFBWSw4RUFBOEUsWUFBWTtBQUNuSztBQUNBLGlKQUFpSjtBQUNqSix1QkFBdUIsWUFBWTtBQUNuQyxvQkFBb0IsNkJBQTZCLDZCQUE2QixtRUFBbUU7QUFDako7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Njb3BlLXRvLWRvLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9ub24tc2VjdXJlL2luZGV4LmpzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9zcmMvY29kZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIGRlZmF1bHRTaXplID0gMjEpID0+IHtcbiAgcmV0dXJuIChzaXplID0gZGVmYXVsdFNpemUpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIGxldCBpID0gc2l6ZVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlkICs9IGFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKSB8IDBdXG4gICAgfVxuICAgIHJldHVybiBpZFxuICB9XG59XG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgaSA9IHNpemVcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogNjQpIHwgMF1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCB7IHdpZGdldCB9ID0gZmlnbWE7XG5jb25zdCB7IHVzZVN5bmNlZFN0YXRlLCB1c2VXaWRnZXROb2RlSWQsIHVzZVByb3BlcnR5TWVudSwgdXNlRWZmZWN0LCBBdXRvTGF5b3V0LCBJbnB1dCwgVGV4dDogVGV4dEJsb2NrLCBTVkcsIFJlY3RhbmdsZSwgfSA9IHdpZGdldDtcbmltcG9ydCB7IG5hbm9pZCBhcyBjcmVhdGVJZCB9IGZyb20gXCJuYW5vaWQvbm9uLXNlY3VyZVwiO1xuZnVuY3Rpb24gVG9kb1dpZGdldCgpIHtcbiAgICBjb25zdCB3aWRnZXRJZCA9IHVzZVdpZGdldE5vZGVJZCgpO1xuICAgIGNvbnN0IFt0b2Rvcywgc2V0VG9kb3NdID0gdXNlU3luY2VkU3RhdGUoXCJ0b2Rvc1wiLCBbXSk7XG4gICAgY29uc3QgW3RpdGxlLCBzZXRUaXRsZV0gPSB1c2VTeW5jZWRTdGF0ZShcInRpdGxlXCIsIFwiXCIpO1xuICAgIGNvbnN0IFtoYXNUaXRsZSwgc2V0SGFzVGl0bGVdID0gdXNlU3luY2VkU3RhdGUoXCJoYXNUaXRsZVwiLCBmYWxzZSk7XG4gICAgY29uc3QgW3NpemUsIHNldFNpemVdID0gdXNlU3luY2VkU3RhdGUoXCJzaXplXCIsIDEpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9ICh7IHR5cGUsIGlkLCB0aXRsZSB9KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidXBkYXRlLXRpdGxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwidGl0bGVcIiwgdmFsdWU6IHRpdGxlIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmxpcC10b2RvLXNjb3BlXCI6XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwib3V0T2ZTY29wZVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGVsZXRlLXRvZG9cIjpcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlVG9kbyhpZCk7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAoaWQpID0+IHNldFRvZG9zKHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5pZCAhPT0gaWQpKTtcbiAgICBjb25zdCBjcmVhdGVUb2RvID0gKGlkKSA9PiBzZXRUb2RvcyhbXG4gICAgICAgIC4uLnRvZG9zLFxuICAgICAgICB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICBvdXRPZlNjb3BlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICBdKTtcbiAgICBmdW5jdGlvbiB1cGRhdGVUb2RvKGVkaXRlZFRvZG8pIHtcbiAgICAgICAgaWYgKGVkaXRlZFRvZG8uZmllbGQgPT09IFwidGl0bGVcIiAmJiBcInZhbHVlXCIgaW4gZWRpdGVkVG9kbykge1xuICAgICAgICAgICAgcmV0dXJuIHNldFRvZG9zKHRvZG9zLm1hcCgodG9kbykgPT4gdG9kby5pZCA9PT0gZWRpdGVkVG9kby5pZFxuICAgICAgICAgICAgICAgID8gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0b2RvKSwgeyB0aXRsZTogZWRpdGVkVG9kby52YWx1ZSB9KSA6IHRvZG8pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0b2RvID0gdG9kb3MuZmluZCgodG9kbykgPT4gdG9kby5pZCA9PT0gZWRpdGVkVG9kby5pZCk7XG4gICAgICAgIGNvbnN0IHJlc3QgPSB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8uaWQgIT09IGVkaXRlZFRvZG8uaWQpO1xuICAgICAgICBpZiAoIXRvZG8pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChlZGl0ZWRUb2RvLmZpZWxkID09PSBcIm91dE9mU2NvcGVcIikge1xuICAgICAgICAgICAgc2V0VG9kb3MoWy4uLnJlc3QsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdG9kbyksIHsgb3V0T2ZTY29wZTogIXRvZG8ub3V0T2ZTY29wZSB9KV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVkaXRlZFRvZG8uZmllbGQgPT09IFwiZG9uZVwiKSB7XG4gICAgICAgICAgICBzZXRUb2RvcyhbLi4ucmVzdCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0b2RvKSwgeyBkb25lOiAhdG9kby5kb25lIH0pXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGl0bGVBY3Rpb25JdGVtID0gaGFzVGl0bGVcbiAgICAgICAgPyB7XG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlbW92ZSBUaXRsZVwiLFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBcInJlbW92ZS10aXRsZVwiLFxuICAgICAgICAgICAgaXRlbVR5cGU6IFwiYWN0aW9uXCIsXG4gICAgICAgICAgICBpY29uOiBgPHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDE1IDE1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xMy4zNTM2IDIuMzUzNTVDMTMuNTQ4OCAyLjE1ODI5IDEzLjU0ODggMS44NDE3MSAxMy4zNTM2IDEuNjQ2NDVDMTMuMTU4MyAxLjQ1MTE4IDEyLjg0MTcgMS40NTExOCAxMi42NDY0IDEuNjQ2NDVMMTEuOTI5MSAyLjM2MzgzQzExLjkxNTkgMi4zMjI0NiAxMS44OTcgMi4yODM2OCAxMS44NzMyIDIuMjQ4NDVDMTEuNzkyMyAyLjEyODc1IDExLjY1NTQgMi4wNTAwNSAxMS41MDAxIDIuMDUwMDVIMy41MDAwNUMzLjI5OTA5IDIuMDUwMDUgMy4xMjg5IDIuMTgxNzggMy4wNzExMSAyLjM2MzZDMy4wNTc0MyAyLjQwNjY1IDMuMDUwMDUgMi40NTI0OSAzLjA1MDA1IDIuNTAwMDdWNC41MDAwMUMzLjA1MDA1IDQuNzQ4NTQgMy4yNTE1MiA0Ljk1MDAxIDMuNTAwMDUgNC45NTAwMUMzLjc0ODU4IDQuOTUwMDEgMy45NTAwNSA0Ljc0ODU0IDMuOTUwMDUgNC41MDAwMVYyLjk1MDA1SDYuOTUwMDZWNy4zNDI4NEwxLjY0NjQ1IDEyLjY0NjRDMS40NTExOCAxMi44NDE3IDEuNDUxMTggMTMuMTU4MyAxLjY0NjQ1IDEzLjM1MzZDMS44NDE3MSAxMy41NDg4IDIuMTU4MjkgMTMuNTQ4OCAyLjM1MzU1IDEzLjM1MzZMNi45NTAwNiA4Ljc1NzA1VjEyLjA1MDFINS43NTQ0QzUuNTA1ODcgMTIuMDUwMSA1LjMwNDQgMTIuMjUxNSA1LjMwNDQgMTIuNTAwMUM1LjMwNDQgMTIuNzQ4NiA1LjUwNTg3IDEyLjk1MDEgNS43NTQ0IDEyLjk1MDFIOS4yNTQ0QzkuNTAyOTMgMTIuOTUwMSA5LjcwNDQgMTIuNzQ4NiA5LjcwNDQgMTIuNTAwMUM5LjcwNDQgMTIuMjUxNSA5LjUwMjkzIDEyLjA1MDEgOS4yNTQ0IDEyLjA1MDFIOC4wNTAwNlY3LjY1NzA1TDEzLjM1MzYgMi4zNTM1NVpNOC4wNTAwNiA2LjI0Mjg0TDExLjA1MDEgMy4yNDI4M1YyLjk1MDA1SDguMDUwMDZWNi4yNDI4NFpcIiBmaWxsPVwiI2RkZFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPmAsXG4gICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBcIkFkZCBhIFRpdGxlXCIsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IFwiYWRkLXRpdGxlXCIsXG4gICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgIGljb246IGA8c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTUgMTVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTMuOTQ5OTMgMi45NTAwMkwzLjk0OTkzIDQuNDk5OThDMy45NDk5MyA0Ljc0ODUxIDMuNzQ4NDUgNC45NDk5OCAzLjQ5OTkzIDQuOTQ5OThDMy4yNTE0IDQuOTQ5OTggMy4wNDk5MyA0Ljc0ODUxIDMuMDQ5OTMgNC40OTk5OFYyLjUwMDA0QzMuMDQ5OTMgMi40NTI0NiAzLjA1NzMxIDIuNDA2NjEgMy4wNzA5OSAyLjM2MzU3QzMuMTI4NzggMi4xODE3NSAzLjI5ODk3IDIuMDUwMDIgMy40OTk5MyAyLjA1MDAySDExLjQ5OTlDMTEuNjU1MyAyLjA1MDAyIDExLjc5MjIgMi4xMjg3MiAxMS44NzMxIDIuMjQ4NDJDMTEuOTIxNiAyLjMyMDI0IDExLjk0OTkgMi40MDY4MiAxMS45NDk5IDIuNTAwMDJMMTEuOTQ5OSAyLjUwMDA0VjQuNDk5OThDMTEuOTQ5OSA0Ljc0ODUxIDExLjc0ODUgNC45NDk5OCAxMS40OTk5IDQuOTQ5OThDMTEuMjUxNCA0Ljk0OTk4IDExLjA0OTkgNC43NDg1MSAxMS4wNDk5IDQuNDk5OThWMi45NTAwMkg4LjA0OTkzVjEyLjA1SDkuMjU0MjhDOS41MDI4MSAxMi4wNSA5LjcwNDI4IDEyLjI1MTUgOS43MDQyOCAxMi41QzkuNzA0MjggMTIuNzQ4NiA5LjUwMjgxIDEyLjk1IDkuMjU0MjggMTIuOTVINS43NTQyOEM1LjUwNTc1IDEyLjk1IDUuMzA0MjggMTIuNzQ4NiA1LjMwNDI4IDEyLjVDNS4zMDQyOCAxMi4yNTE1IDUuNTA1NzUgMTIuMDUgNS43NTQyOCAxMi4wNUg2Ljk0OTkzVjIuOTUwMDJIMy45NDk5M1pcIiBmaWxsPVwiI2RkZFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPmAsXG4gICAgICAgIH07XG4gICAgY29uc3QgcHJvcGVydHlNZW51SXRlbXMgPSBbXG4gICAgICAgIHRpdGxlQWN0aW9uSXRlbSxcbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbVR5cGU6IFwic2VwYXJhdG9yXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiTWFrZSBpdCBzbWFsbGVyXCIsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IFwic2hyaW5rXCIsXG4gICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgIGljb246IGA8c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTUgMTVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTIuMjUgNy41QzIuMjUgNy4yMjM4NiAyLjQ3Mzg2IDcgMi43NSA3SDEyLjI1QzEyLjUyNjEgNyAxMi43NSA3LjIyMzg2IDEyLjc1IDcuNUMxMi43NSA3Ljc3NjE0IDEyLjUyNjEgOCAxMi4yNSA4SDIuNzVDMi40NzM4NiA4IDIuMjUgNy43NzYxNCAyLjI1IDcuNVpcIiBmaWxsPVwiI2RkZFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPmAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiTWFrZSBpdCBiaWdnZXJcIixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogXCJncm93XCIsXG4gICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgIGljb246IGA8c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTUgMTVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTggMi43NUM4IDIuNDczODYgNy43NzYxNCAyLjI1IDcuNSAyLjI1QzcuMjIzODYgMi4yNSA3IDIuNDczODYgNyAyLjc1VjdIMi43NUMyLjQ3Mzg2IDcgMi4yNSA3LjIyMzg2IDIuMjUgNy41QzIuMjUgNy43NzYxNCAyLjQ3Mzg2IDggMi43NSA4SDdWMTIuMjVDNyAxMi41MjYxIDcuMjIzODYgMTIuNzUgNy41IDEyLjc1QzcuNzc2MTQgMTIuNzUgOCAxMi41MjYxIDggMTIuMjVWOEgxMi4yNUMxMi41MjYxIDggMTIuNzUgNy43NzYxNCAxMi43NSA3LjVDMTIuNzUgNy4yMjM4NiAxMi41MjYxIDcgMTIuMjUgN0g4VjIuNzVaXCIgZmlsbD1cIiNkZGRcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtVHlwZTogXCJzZXBhcmF0b3JcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9vbHRpcDogXCJDbGVhciBldmVyeXRoaW5nXCIsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IFwiY2xlYXItYWxsXCIsXG4gICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgIGljb246IGA8c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTUgMTVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTQuNjA5MTMgMC4wNjM0Mjg3QzQuMzkwODIgMC4wMDg4NTA1IDQuMTY1NzUgMC4xMjM5MyA0LjA4MjE4IDAuMzMyODY3TDMuMTUzOCAyLjY1MzhMMC44MzI4NjYgMy41ODIxOEMwLjcwMjg4NCAzLjYzNDE3IDAuNjA0NTA0IDMuNzQzNyAwLjU2NjcwNSAzLjg3ODQ5QzAuNTI4OTA2IDQuMDEzMjkgMC41NTU5OTQgNC4xNTggMC42Mzk5OTIgNC4yNjk5OUwyLjAxMTQ4IDYuMDk4NjRMMS4wNjM0MyA5Ljg5MDg1QzEuMDA5NDQgMTAuMTA2OCAxLjEyMTQ1IDEwLjMyOTggMS4zMjY5MSAxMC40MTU0TDQuMjAxMTUgMTEuNjEzTDUuNjI1NTcgMTMuNzQ5NkM1LjczNDEyIDEzLjkxMjQgNS45MzU0NSAxMy45ODY0IDYuMTIzNjIgMTMuOTMyN0w5LjYyMzYyIDEyLjkzMjdDOS42Mjk4OCAxMi45MzA5IDkuNjM2MTEgMTIuOTI5IDkuNjQyMjkgMTIuOTI2OUwxMi42NDIzIDExLjkyNjlDMTIuNzkyMyAxMS44NzY5IDEyLjkwNSAxMS43NTE5IDEyLjkzOTMgMTEuNTk3NkwxMy45MzkzIDcuMDk3NjFDMTMuOTc3NiA2LjkyNTA2IDEzLjkxMTQgNi43NDYwNSAxMy43NyA2LjYzOTk5TDExLjk1IDUuMjc0OTlWMi45OTk5OUMxMS45NSAyLjgyOTU1IDExLjg1MzcgMi42NzM3MyAxMS43MDEyIDIuNTk3NUw4LjcwMTI0IDEuMDk3NUM4LjY3MTg3IDEuMDgyODIgOC42NDA5OCAxLjA3MTM5IDguNjA5MTMgMS4wNjM0M0w0LjYwOTEzIDAuMDYzNDI4N1pNMTEuNDMyMyA2LjAxMTczTDEyLjc3NDggNy4wMTg1OEwxMC4yMTE5IDkuMTU0MjlDMTAuMTQ3NiA5LjIwNzg2IDEwLjA5OTUgOS4yNzgzIDEwLjA3MzEgOS4zNTc2OUw5LjI1MzgyIDExLjgxNTVMNy43Mzg0OSAxMC44Njg0QzcuNTI3NzQgMTAuNzM2NyA3LjI1MDExIDEwLjgwMDcgNy4xMTgzOSAxMS4wMTE1QzYuOTg2NjcgMTEuMjIyMiA3LjA1MDc0IDExLjQ5OTkgNy4yNjE0OSAxMS42MzE2TDguNDAzNDEgMTIuMzQ1M0w2LjE5MjIxIDEyLjk3NzFMNC44NzQ0MSAxMS4wMDA0QzQuODI1MTMgMTAuOTI2NSA0Ljc1NTA4IDEwLjg2ODggNC42NzMwNyAxMC44MzQ2TDIuMDMwNDYgOS43MzM1MkwyLjg1MTM0IDYuNDQ5OTlINC45OTk5OUM1LjI0ODUyIDYuNDQ5OTkgNS40NDk5OSA2LjI0ODUyIDUuNDQ5OTkgNS45OTk5OUM1LjQ0OTk5IDUuNzUxNDYgNS4yNDg1MiA1LjU0OTk5IDQuOTk5OTkgNS41NDk5OUgyLjcyNDk5TDEuNzEyMyA0LjE5OTc0TDMuNTE0MDcgMy40NzkwM0w2LjM1NzY5IDQuNDI2OUM2LjUzNjU1IDQuNDg2NTIgNi43MzM2MSA0LjQyODMyIDYuODUxMzggNC4yODExMUw4LjYyNDEzIDIuMDY1MThMMTEuMDUgMy4yNzgxMVY1LjE5NTMzTDguODMyODcgNi4wODIxOEM4LjcwOTk2IDYuMTMxMzQgOC42MTQ5NCA2LjIzMjEyIDguNTczMDggNi4zNTc2OUw4LjA3MzA4IDcuODU3NjlDNy45OTQ0OSA4LjA5MzQ2IDguMTIxOTEgOC4zNDgzMSA4LjM1NzY5IDguNDI2OUM4LjU5MzQ2IDguNTA1NDkgOC44NDgzMSA4LjM3ODA3IDguOTI2OSA4LjE0MjI5TDkuMzYwOSA2Ljg0MDI5TDExLjQzMjMgNi4wMTE3M1pNNy43MTA1MiAxLjc2NjQ4TDYuMzQ0NjIgMy40NzM4Nkw0LjA5NTA1IDIuNzI0TDQuNzcxOTIgMS4wMzE4M0w3LjcxMDUyIDEuNzY2NDhaTTEwLjIxMTUgMTEuNzg4NUwxMi4xMTYgMTEuMTUzN0wxMi43NzQ1IDguMTkwMzRMMTAuODg2NCA5Ljc2Mzc0TDEwLjIxMTUgMTEuNzg4NVpcIiBmaWxsPVwiI2RkZFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPmAsXG4gICAgICAgIH0sXG4gICAgXTtcbiAgICB1c2VQcm9wZXJ0eU1lbnUocHJvcGVydHlNZW51SXRlbXMsICh7IHByb3BlcnR5TmFtZSB9KSA9PiB7XG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdncm93JyB8fCBwcm9wZXJ0eU5hbWUgPT09ICdzaHJpbmsnKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdTaXplID0gcHJvcGVydHlOYW1lID09PSBcImdyb3dcIiA/IHNpemUgKiAxLjMgOiBzaXplIC8gMS4zO1xuICAgICAgICAgICAgcmV0dXJuIHNldFNpemUobmV3U2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbGVhci1hbGxcIjpcbiAgICAgICAgICAgICAgICBzZXRUb2RvcyhbXSk7XG4gICAgICAgICAgICAgICAgc2V0SGFzVGl0bGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldFRpdGxlKFwiXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFkZC10aXRsZVwiOlxuICAgICAgICAgICAgICAgIHNldEhhc1RpdGxlKHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlbW92ZS10aXRsZVwiOlxuICAgICAgICAgICAgICAgIHNldEhhc1RpdGxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICBjb25zdCB7IGlkLCBkb25lLCB0aXRsZSwgb3V0T2ZTY29wZSB9ID0gdG9kbztcbiAgICAgICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGtleTogaWQsIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsIHZlcnRpY2FsQWxpZ25JdGVtczogXCJzdGFydFwiLCBzcGFjaW5nOiBcImF1dG9cIiwgd2lkdGg6IFwiZmlsbC1wYXJlbnRcIiB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLCB2ZXJ0aWNhbEFsaWduSXRlbXM6IFwic3RhcnRcIiwgc3BhY2luZzogOCAqIHNpemUgfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogZG9uZSB8fCBvdXRPZlNjb3BlLCBoZWlnaHQ6IDIwICogc2l6ZSwgd2lkdGg6IDIwICogc2l6ZSwgdmVydGljYWxBbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBob3Jpem9udGFsQWxpZ25JdGVtczogXCJjZW50ZXJcIiwgcGFkZGluZzogNCAqIHNpemUsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwiZG9uZVwiIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFJlY3RhbmdsZSwgeyBmaWxsOiBcIiNmZmZcIiwgc3Ryb2tlOiBcIiNhZWFlYWVcIiwgc3Ryb2tlV2lkdGg6IDEgKiBzaXplLCBzdHJva2VBbGlnbjogXCJpbnNpZGVcIiwgaGVpZ2h0OiAxNiAqIHNpemUsIHdpZHRoOiAxNiAqIHNpemUsIGNvcm5lclJhZGl1czogNCAqIHNpemUgfSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46ICFkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwiZG9uZVwiIH0pLCBoZWlnaHQ6IDIwICogc2l6ZSwgd2lkdGg6IDIwICogc2l6ZSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk02IDJDMy43OTA4NiAyIDIgMy43OTA4NiAyIDZWMTRDMiAxNi4yMDkxIDMuNzkwODYgMTggNiAxOEgxNEMxNi4yMDkxIDE4IDE4IDE2LjIwOTEgMTggMTRWNkMxOCAzLjc5MDg2IDE2LjIwOTEgMiAxNCAySDZaTTE0LjM0MDggOC43NDc0MUMxNC43NTM2IDguMjgzMDMgMTQuNzExOCA3LjU3MTk1IDE0LjI0NzQgNy4xNTkxNkMxMy43ODMgNi43NDYzOCAxMy4wNzE5IDYuNzg4MjEgMTIuNjU5MiA3LjI1MjU5TDEwLjY1OTIgOS41MDI1OUw5LjQ1MTgzIDEwLjg2MDhMNy43OTU1IDkuMjA0NUM3LjM1NjE2IDguNzY1MTYgNi42NDM4NCA4Ljc2NTE2IDYuMjA0NSA5LjIwNDVDNS43NjUxNyA5LjY0Mzg0IDUuNzY1MTcgMTAuMzU2MiA2LjIwNDUgMTAuNzk1NUw4LjcwNDUgMTMuMjk1NUM4LjkyMzU5IDEzLjUxNDYgOS4yMjMzNCAxMy42MzM2IDkuNTMzMDUgMTMuNjI0NUM5Ljg0Mjc1IDEzLjYxNTQgMTAuMTM1IDEzLjQ3OSAxMC4zNDA4IDEzLjI0NzRMMTIuMzQwOCAxMC45OTc0TDE0LjM0MDggOC43NDc0MVpcIiBmaWxsPVwiIzRBQjM5M1wiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFJlY3RhbmdsZSwgeyBoaWRkZW46ICFvdXRPZlNjb3BlLCBmaWxsOiBcIiNmMmYyZjJcIiwgd2lkdGg6IDIwICogc2l6ZSwgaGVpZ2h0OiAyMCAqIHNpemUgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoSW5wdXQsIHsgZmlsbDogb3V0T2ZTY29wZSA/IFwiIzZFNkU2RVwiIDogZG9uZSA/IFwiIzc2NzY3NlwiIDogXCIjMTAxMDEwXCIsIGZvbnRTaXplOiAoZG9uZSB8fCBvdXRPZlNjb3BlID8gMTMgOiAxNCkgKiBzaXplLCBsaW5lSGVpZ2h0OiAyMCAqIHNpemUsIHdpZHRoOiAyNDAgKiBzaXplLCB2YWx1ZTogdGl0bGUsIHBsYWNlaG9sZGVyOiBcIkkgbmVlZCB0by4uLlwiLCBwbGFjZWhvbGRlclByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiBcIiNiN2I3YjdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAtMC4xNSxcbiAgICAgICAgICAgICAgICAgICAgfSwgb25UZXh0RWRpdEVuZDogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY2hhcmFjdGVycyA9PT0gXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZGVsZXRlVG9kbyhpZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwidGl0bGVcIiwgdmFsdWU6IGUuY2hhcmFjdGVycyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSB9KSksXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGZpbGw6IG91dE9mU2NvcGUgPyBcIiNmMmYyZjJcIiA6IFwiI2ZmZlwiLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGZpZ21hLmdldE5vZGVCeUlkKHdpZGdldElkKTtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB3aWRnZXQueSAtIDU4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHdpZGdldC54ICsgd2lkZ2V0LndpZHRoICsgNyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwidWlcIiwgaWQsIHRpdGxlLCBvdXRPZlNjb3BlIH0pO1xuICAgICAgICAgICAgICAgIH0pIH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhlaWdodDogMjAgKiBzaXplLCB3aWR0aDogMjAgKiBzaXplLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjEuNlwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjQUFBQUFBXCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI4XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiNBQUFBQUFcIi8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjE0LjRcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiI0FBQUFBQVwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBjb3JuZXJSYWRpdXM6IDggKiBzaXplLCBmaWxsOiBcIiNmZmZcIiwgd2lkdGg6IDM4MCAqIHNpemUsIHN0cm9rZTogXCIjZTdlN2U3XCIsIHN0cm9rZVdpZHRoOiAxICogc2l6ZSB9LFxuICAgICAgICBoYXNUaXRsZSAmJiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyB3aWR0aDogXCJmaWxsLXBhcmVudFwiLCBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgdmVydGljYWxBbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBob3Jpem9udGFsQWxpZ25JdGVtczogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoSW5wdXQsIHsgdmFsdWU6IHRpdGxlLCBwbGFjZWhvbGRlcjogXCJBZGQgYSB0aXRsZS4uLlwiLCBmaWxsOiBcIiMyQTJBMkFcIiwgZm9udFdlaWdodDogNzAwLCBmb250U2l6ZTogMTkuOCAqIHNpemUsIGxpbmVIZWlnaHQ6IDI0ICogc2l6ZSwgaG9yaXpvbnRhbEFsaWduVGV4dDogXCJjZW50ZXJcIiwgd2lkdGg6IDI5MCAqIHNpemUsIGxldHRlclNwYWNpbmc6IC0wLjE1ICogc2l6ZSwgaW5wdXRGcmFtZVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogeyB0b3A6IDI0ICogc2l6ZSB9LFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgfSwgb25UZXh0RWRpdEVuZDogKGUpID0+IHNldFRpdGxlKGUuY2hhcmFjdGVycykgfSkpKSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgc3BhY2luZzogMjQgKiBzaXplLCBwYWRkaW5nOiAyNCAqIHNpemUsIHdpZHRoOiBcImZpbGwtcGFyZW50XCIgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsIHNwYWNpbmc6IDggKiBzaXplLCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoeyBkb25lLCBvdXRPZlNjb3BlIH0pID0+ICFkb25lICYmICFvdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgICAgICAubWFwKCh7IGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiAoZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiB0aXRsZSwgZG9uZTogZG9uZSwgb3V0T2ZTY29wZTogb3V0T2ZTY29wZSB9KSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgd2lkdGg6IFwiZmlsbC1wYXJlbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsIHZlcnRpY2FsQWxpZ25JdGVtczogXCJjZW50ZXJcIiwgc3BhY2luZzogOCAqIHNpemUsIGZpbGw6IFwiI2ZmZlwiLCBvbkNsaWNrOiAoKSA9PiBjcmVhdGVUb2RvKGNyZWF0ZUlkKCkpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGVpZ2h0OiAyMCAqIHNpemUsIHdpZHRoOiAyMCAqIHNpemUsIHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMC4xMjUgNUMxMC43NDYzIDUgMTEuMjUgNS40NDc3MiAxMS4yNSA2VjE0QzExLjI1IDE0LjU1MjMgMTAuNzQ2MyAxNSAxMC4xMjUgMTVDOS41MDM2OCAxNSA5IDE0LjU1MjMgOSAxNFY2QzkgNS40NDc3MiA5LjUwMzY4IDUgMTAuMTI1IDVaXCIgZmlsbD1cIiM5Nzk3OTdcIi8+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTUgOS44NzVDNSA5LjI1MzY4IDUuNDQ3NzIgOC43NSA2IDguNzVMMTQgOC43NUMxNC41NTIzIDguNzUgMTUgOS4yNTM2OCAxNSA5Ljg3NUMxNSAxMC40OTYzIDE0LjU1MjMgMTEgMTQgMTFMNiAxMUM1LjQ0NzcyIDExIDUgMTAuNDk2MyA1IDkuODc1WlwiIGZpbGw9XCIjOTc5Nzk3XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogXCIjOTQ5NDk0XCIsIGZvbnRTaXplOiAxNCAqIHNpemUsIGxpbmVIZWlnaHQ6IDIwICogc2l6ZSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiBcIi0wLjc1JVwiIH0sIFwiQWRkIGEgdG9kb1wiKSkpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKCh7IGRvbmUsIG91dE9mU2NvcGUgfSkgPT4gZG9uZSAmJiAhb3V0T2ZTY29wZSkubGVuZ3RoLCBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgc3BhY2luZzogOCAqIHNpemUsIHdpZHRoOiBcImZpbGwtcGFyZW50XCIgfSwgdG9kb3NcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCh7IGRvbmUsIG91dE9mU2NvcGUgfSkgPT4gZG9uZSAmJiAhb3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAubWFwKCh7IGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiAoZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiB0aXRsZSwgZG9uZTogZG9uZSwgb3V0T2ZTY29wZTogb3V0T2ZTY29wZSB9KSkpKSksXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiB0b2Rvcy5maWx0ZXIoKHsgb3V0T2ZTY29wZSB9KSA9PiBvdXRPZlNjb3BlKS5sZW5ndGggPT09IDAsIHdpZHRoOiBcImZpbGwtcGFyZW50XCIsIGhlaWdodDogIXRvZG9zLmZpbHRlcigoeyBvdXRPZlNjb3BlIH0pID0+IG91dE9mU2NvcGUpLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gNDAgKiBzaXplXG4gICAgICAgICAgICAgICAgOiBcImh1Zy1jb250ZW50c1wiLCBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgaG9yaXpvbnRhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsIHNwYWNpbmc6IDggKiBzaXplLCBwYWRkaW5nOiAyNCAqIHNpemUsIGZpbGw6IFwiI2YyZjJmMlwiIH0sIHRvZG9zXG4gICAgICAgICAgICAuZmlsdGVyKCh7IG91dE9mU2NvcGUgfSkgPT4gb3V0T2ZTY29wZSlcbiAgICAgICAgICAgIC5tYXAoKHsgaWQsIHRpdGxlLCBkb25lLCBvdXRPZlNjb3BlIH0pID0+IChmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogaWQsIGlkOiBpZCwgdGl0bGU6IHRpdGxlLCBkb25lOiBkb25lLCBvdXRPZlNjb3BlOiBvdXRPZlNjb3BlIH0pKSkpKSk7XG59XG53aWRnZXQucmVnaXN0ZXIoVG9kb1dpZGdldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=