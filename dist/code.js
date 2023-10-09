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
const { useSyncedState, usePropertyMenu, useEffect, AutoLayout, Input, Text: TextBlock, SVG, Rectangle, } = widget;

const WIDGETID = figma.widgetId || "1036372982291551669";
function TodoWidget() {
    const [todos, setTodos] = useSyncedState("todos", []);
    const [title, setTitle] = useSyncedState("title", "");
    const [hasTitle, setHasTitle] = useSyncedState("hasTitle", false);
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
        const updatedTodo = (todo) => {
            if (editedTodo.field === "title" && "value" in editedTodo) {
                return Object.assign(Object.assign({}, todo), { title: editedTodo.value });
            }
            else if (editedTodo.field === "done") {
                return Object.assign(Object.assign({}, todo), { done: !todo.done });
            }
            else if (editedTodo.field === "outOfScope") {
                return Object.assign(Object.assign({}, todo), { outOfScope: !todo.outOfScope });
            }
            return todo;
        };
        setTodos(todos.map((todo) => todo.id === editedTodo.id ? updatedTodo(todo) : todo));
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
    const propertyMenuItems = todos.length > 4
        ? [
            titleActionItem,
            {
                itemType: "separator",
            },
            {
                tooltip: "Clear everything",
                propertyName: "clear-all",
                itemType: "action",
                icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.60913 0.0634287C4.39082 0.0088505 4.16575 0.12393 4.08218 0.332867L3.1538 2.6538L0.832866 3.58218C0.702884 3.63417 0.604504 3.7437 0.566705 3.87849C0.528906 4.01329 0.555994 4.158 0.639992 4.26999L2.01148 6.09864L1.06343 9.89085C1.00944 10.1068 1.12145 10.3298 1.32691 10.4154L4.20115 11.613L5.62557 13.7496C5.73412 13.9124 5.93545 13.9864 6.12362 13.9327L9.62362 12.9327C9.62988 12.9309 9.63611 12.929 9.64229 12.9269L12.6423 11.9269C12.7923 11.8769 12.905 11.7519 12.9393 11.5976L13.9393 7.09761C13.9776 6.92506 13.9114 6.74605 13.77 6.63999L11.95 5.27499V2.99999C11.95 2.82955 11.8537 2.67373 11.7012 2.5975L8.70124 1.0975C8.67187 1.08282 8.64098 1.07139 8.60913 1.06343L4.60913 0.0634287ZM11.4323 6.01173L12.7748 7.01858L10.2119 9.15429C10.1476 9.20786 10.0995 9.2783 10.0731 9.35769L9.25382 11.8155L7.73849 10.8684C7.52774 10.7367 7.25011 10.8007 7.11839 11.0115C6.98667 11.2222 7.05074 11.4999 7.26149 11.6316L8.40341 12.3453L6.19221 12.9771L4.87441 11.0004C4.82513 10.9265 4.75508 10.8688 4.67307 10.8346L2.03046 9.73352L2.85134 6.44999H4.99999C5.24852 6.44999 5.44999 6.24852 5.44999 5.99999C5.44999 5.75146 5.24852 5.54999 4.99999 5.54999H2.72499L1.7123 4.19974L3.51407 3.47903L6.35769 4.4269C6.53655 4.48652 6.73361 4.42832 6.85138 4.28111L8.62413 2.06518L11.05 3.27811V5.19533L8.83287 6.08218C8.70996 6.13134 8.61494 6.23212 8.57308 6.35769L8.07308 7.85769C7.99449 8.09346 8.12191 8.34831 8.35769 8.4269C8.59346 8.50549 8.84831 8.37807 8.9269 8.14229L9.3609 6.84029L11.4323 6.01173ZM7.71052 1.76648L6.34462 3.47386L4.09505 2.724L4.77192 1.03183L7.71052 1.76648ZM10.2115 11.7885L12.116 11.1537L12.7745 8.19034L10.8864 9.76374L10.2115 11.7885Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
            },
        ]
        : [titleActionItem];
    usePropertyMenu(propertyMenuItems, ({ propertyName }) => {
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
    const Todo = ({ id, done, title, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { key: id, direction: "horizontal", verticalAlignItems: "start", spacing: "auto", width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "start", spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, onClick: () => updateTodo({ id, field: "done" }), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => updateTodo({ id, field: "done" }), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.3408 8.74741C14.7536 8.28303 14.7118 7.57195 14.2474 7.15916C13.783 6.74638 13.0719 6.78821 12.6592 7.25259L10.6592 9.50259L9.45183 10.8608L7.7955 9.2045C7.35616 8.76516 6.64384 8.76516 6.2045 9.2045C5.76517 9.64384 5.76517 10.3562 6.2045 10.7955L8.7045 13.2955C8.92359 13.5146 9.22334 13.6336 9.53305 13.6245C9.84275 13.6154 10.135 13.479 10.3408 13.2474L12.3408 10.9974L14.3408 8.74741Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: "#f2f2f2", width: 20, height: 20 }),
                figma.widget.h(Input, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#101010", fontSize: done || outOfScope ? 13 : 14, lineHeight: 20, width: 220, value: title, onTextEditEnd: (e) => {
                        if (e.characters === "") {
                            deleteTodo(id);
                        }
                        else {
                            updateTodo({ id, field: "title", value: e.characters });
                        }
                    } })),
            figma.widget.h(AutoLayout, { onClick: () => new Promise(() => {
                    const widget = figma.getNodeById(WIDGETID);
                    figma.showUI(__uiFiles__.menu, {
                        height: 85,
                        width: 180,
                        title: "",
                        position: {
                            y: widget.y - 58,
                            x: widget.x + widget.width + 7,
                        },
                    });
                    figma.ui.postMessage({ type: "menu", id, title, outOfScope });
                }), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6" y="8" width="4" height="4" rx="2" fill="#A5A5A5"/>
                <rect x="8" y="8" width="4" height="4" rx="2" fill="#A5A5A5"/>
                <rect x="14.4" y="8" width="4" height="4" rx="2" fill="#A5A5A5"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: "vertical", cornerRadius: 8, fill: "#fff", width: 360, stroke: "#e7e7e7" },
        hasTitle && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", verticalAlignItems: "center", horizontalAlignItems: "center", fill: "#eee" },
            figma.widget.h(Input, { value: title, placeholder: "Add a title...", fill: "#111", fontWeight: 700, fontSize: 20, lineHeight: 24, horizontalAlignText: "center", width: "fill-parent", letterSpacing: -0.15, inputFrameProps: {
                    fill: "#FFFFFF",
                    horizontalAlignItems: "center",
                    padding: { left: 49, right: 49, top: 24 },
                    verticalAlignItems: "center",
                }, onTextEditEnd: (e) => setTitle(e.characters) }))),
        figma.widget.h(AutoLayout, { direction: "vertical", spacing: 24, padding: 24, width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, width: "fill-parent" },
                todos
                    .filter(({ done, outOfScope }) => !done && !outOfScope)
                    .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))),
                figma.widget.h(AutoLayout, { width: "fill-parent" },
                    figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "center", spacing: 8, fill: "#fff", onClick: () => new Promise((resolve) => {
                            const id = (0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)();
                            const widget = figma.getNodeById(WIDGETID);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE2QjtBQUM3QixtREFBbUQseUJBQXlCO0FBQzVFLHlCQUF5QixHQUFHO0FBQzVCLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixvREFBb0QseUZBQXlGO0FBQzdJLHlDQUF5Qyx5QkFBeUIsa0JBQWtCLDJGQUEyRjtBQUMvSywyQkFBMkIsa0JBQWtCO0FBQzdDLHdCQUF3Qiw2QkFBNkIsNkJBQTZCLG1FQUFtRTtBQUNySixxQ0FBcUMsd0JBQXdCLFlBQVksOEVBQThFLFlBQVk7QUFDbks7QUFDQSxtSUFBbUk7QUFDbkksdUJBQXVCLFlBQVk7QUFDbkMsb0JBQW9CLDZCQUE2Qiw2QkFBNkIsbUVBQW1FO0FBQ2pKO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY29wZS10by1kby8uL25vZGVfbW9kdWxlcy9uYW5vaWQvbm9uLXNlY3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Njb3BlLXRvLWRvLy4vc3JjL2NvZGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImxldCB1cmxBbHBoYWJldCA9XG4gICd1c2VhbmRvbS0yNlQxOTgzNDBQWDc1cHhKQUNLVkVSWU1JTkRCVVNIV09MRl9HUVpiZmdoamtscXZ3eXpyaWN0J1xubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBkZWZhdWx0U2l6ZSA9IDIxKSA9PiB7XG4gIHJldHVybiAoc2l6ZSA9IGRlZmF1bHRTaXplKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICBsZXQgaSA9IHNpemVcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZCArPSBhbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0Lmxlbmd0aCkgfCAwXVxuICAgIH1cbiAgICByZXR1cm4gaWRcbiAgfVxufVxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGkgPSBzaXplXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZCArPSB1cmxBbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIDY0KSB8IDBdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgeyB3aWRnZXQgfSA9IGZpZ21hO1xuY29uc3QgeyB1c2VTeW5jZWRTdGF0ZSwgdXNlUHJvcGVydHlNZW51LCB1c2VFZmZlY3QsIEF1dG9MYXlvdXQsIElucHV0LCBUZXh0OiBUZXh0QmxvY2ssIFNWRywgUmVjdGFuZ2xlLCB9ID0gd2lkZ2V0O1xuaW1wb3J0IHsgbmFub2lkIGFzIGNyZWF0ZUlkIH0gZnJvbSBcIm5hbm9pZC9ub24tc2VjdXJlXCI7XG5jb25zdCBXSURHRVRJRCA9IGZpZ21hLndpZGdldElkIHx8IFwiMTAzNjM3Mjk4MjI5MTU1MTY2OVwiO1xuZnVuY3Rpb24gVG9kb1dpZGdldCgpIHtcbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN5bmNlZFN0YXRlKFwidG9kb3NcIiwgW10pO1xuICAgIGNvbnN0IFt0aXRsZSwgc2V0VGl0bGVdID0gdXNlU3luY2VkU3RhdGUoXCJ0aXRsZVwiLCBcIlwiKTtcbiAgICBjb25zdCBbaGFzVGl0bGUsIHNldEhhc1RpdGxlXSA9IHVzZVN5bmNlZFN0YXRlKFwiaGFzVGl0bGVcIiwgZmFsc2UpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9ICh7IHR5cGUsIGlkLCB0aXRsZSB9KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidXBkYXRlLXRpdGxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwidGl0bGVcIiwgdmFsdWU6IHRpdGxlIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmxpcC10b2RvLXNjb3BlXCI6XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwib3V0T2ZTY29wZVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGVsZXRlLXRvZG9cIjpcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlVG9kbyhpZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IGRlbGV0ZVRvZG8gPSAoaWQpID0+IHNldFRvZG9zKHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5pZCAhPT0gaWQpKTtcbiAgICBjb25zdCBjcmVhdGVUb2RvID0gKGlkKSA9PiBzZXRUb2RvcyhbXG4gICAgICAgIC4uLnRvZG9zLFxuICAgICAgICB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICBvdXRPZlNjb3BlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICBdKTtcbiAgICBmdW5jdGlvbiB1cGRhdGVUb2RvKGVkaXRlZFRvZG8pIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICAgICAgaWYgKGVkaXRlZFRvZG8uZmllbGQgPT09IFwidGl0bGVcIiAmJiBcInZhbHVlXCIgaW4gZWRpdGVkVG9kbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRvZG8pLCB7IHRpdGxlOiBlZGl0ZWRUb2RvLnZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWRpdGVkVG9kby5maWVsZCA9PT0gXCJkb25lXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0b2RvKSwgeyBkb25lOiAhdG9kby5kb25lIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWRpdGVkVG9kby5maWVsZCA9PT0gXCJvdXRPZlNjb3BlXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0b2RvKSwgeyBvdXRPZlNjb3BlOiAhdG9kby5vdXRPZlNjb3BlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICAgIH07XG4gICAgICAgIHNldFRvZG9zKHRvZG9zLm1hcCgodG9kbykgPT4gdG9kby5pZCA9PT0gZWRpdGVkVG9kby5pZCA/IHVwZGF0ZWRUb2RvKHRvZG8pIDogdG9kbykpO1xuICAgIH1cbiAgICBjb25zdCB0aXRsZUFjdGlvbkl0ZW0gPSBoYXNUaXRsZVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVtb3ZlIFRpdGxlXCIsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IFwicmVtb3ZlLXRpdGxlXCIsXG4gICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgIGljb246IGA8c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTUgMTVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTEzLjM1MzYgMi4zNTM1NUMxMy41NDg4IDIuMTU4MjkgMTMuNTQ4OCAxLjg0MTcxIDEzLjM1MzYgMS42NDY0NUMxMy4xNTgzIDEuNDUxMTggMTIuODQxNyAxLjQ1MTE4IDEyLjY0NjQgMS42NDY0NUwxMS45MjkxIDIuMzYzODNDMTEuOTE1OSAyLjMyMjQ2IDExLjg5NyAyLjI4MzY4IDExLjg3MzIgMi4yNDg0NUMxMS43OTIzIDIuMTI4NzUgMTEuNjU1NCAyLjA1MDA1IDExLjUwMDEgMi4wNTAwNUgzLjUwMDA1QzMuMjk5MDkgMi4wNTAwNSAzLjEyODkgMi4xODE3OCAzLjA3MTExIDIuMzYzNkMzLjA1NzQzIDIuNDA2NjUgMy4wNTAwNSAyLjQ1MjQ5IDMuMDUwMDUgMi41MDAwN1Y0LjUwMDAxQzMuMDUwMDUgNC43NDg1NCAzLjI1MTUyIDQuOTUwMDEgMy41MDAwNSA0Ljk1MDAxQzMuNzQ4NTggNC45NTAwMSAzLjk1MDA1IDQuNzQ4NTQgMy45NTAwNSA0LjUwMDAxVjIuOTUwMDVINi45NTAwNlY3LjM0Mjg0TDEuNjQ2NDUgMTIuNjQ2NEMxLjQ1MTE4IDEyLjg0MTcgMS40NTExOCAxMy4xNTgzIDEuNjQ2NDUgMTMuMzUzNkMxLjg0MTcxIDEzLjU0ODggMi4xNTgyOSAxMy41NDg4IDIuMzUzNTUgMTMuMzUzNkw2Ljk1MDA2IDguNzU3MDVWMTIuMDUwMUg1Ljc1NDRDNS41MDU4NyAxMi4wNTAxIDUuMzA0NCAxMi4yNTE1IDUuMzA0NCAxMi41MDAxQzUuMzA0NCAxMi43NDg2IDUuNTA1ODcgMTIuOTUwMSA1Ljc1NDQgMTIuOTUwMUg5LjI1NDRDOS41MDI5MyAxMi45NTAxIDkuNzA0NCAxMi43NDg2IDkuNzA0NCAxMi41MDAxQzkuNzA0NCAxMi4yNTE1IDkuNTAyOTMgMTIuMDUwMSA5LjI1NDQgMTIuMDUwMUg4LjA1MDA2VjcuNjU3MDVMMTMuMzUzNiAyLjM1MzU1Wk04LjA1MDA2IDYuMjQyODRMMTEuMDUwMSAzLjI0MjgzVjIuOTUwMDVIOC4wNTAwNlY2LjI0Mjg0WlwiIGZpbGw9XCIjZGRkXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+YCxcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiQWRkIGEgVGl0bGVcIixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogXCJhZGQtdGl0bGVcIixcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcImFjdGlvblwiLFxuICAgICAgICAgICAgaWNvbjogYDxzdmcgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgdmlld0JveD1cIjAgMCAxNSAxNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMy45NDk5MyAyLjk1MDAyTDMuOTQ5OTMgNC40OTk5OEMzLjk0OTkzIDQuNzQ4NTEgMy43NDg0NSA0Ljk0OTk4IDMuNDk5OTMgNC45NDk5OEMzLjI1MTQgNC45NDk5OCAzLjA0OTkzIDQuNzQ4NTEgMy4wNDk5MyA0LjQ5OTk4VjIuNTAwMDRDMy4wNDk5MyAyLjQ1MjQ2IDMuMDU3MzEgMi40MDY2MSAzLjA3MDk5IDIuMzYzNTdDMy4xMjg3OCAyLjE4MTc1IDMuMjk4OTcgMi4wNTAwMiAzLjQ5OTkzIDIuMDUwMDJIMTEuNDk5OUMxMS42NTUzIDIuMDUwMDIgMTEuNzkyMiAyLjEyODcyIDExLjg3MzEgMi4yNDg0MkMxMS45MjE2IDIuMzIwMjQgMTEuOTQ5OSAyLjQwNjgyIDExLjk0OTkgMi41MDAwMkwxMS45NDk5IDIuNTAwMDRWNC40OTk5OEMxMS45NDk5IDQuNzQ4NTEgMTEuNzQ4NSA0Ljk0OTk4IDExLjQ5OTkgNC45NDk5OEMxMS4yNTE0IDQuOTQ5OTggMTEuMDQ5OSA0Ljc0ODUxIDExLjA0OTkgNC40OTk5OFYyLjk1MDAySDguMDQ5OTNWMTIuMDVIOS4yNTQyOEM5LjUwMjgxIDEyLjA1IDkuNzA0MjggMTIuMjUxNSA5LjcwNDI4IDEyLjVDOS43MDQyOCAxMi43NDg2IDkuNTAyODEgMTIuOTUgOS4yNTQyOCAxMi45NUg1Ljc1NDI4QzUuNTA1NzUgMTIuOTUgNS4zMDQyOCAxMi43NDg2IDUuMzA0MjggMTIuNUM1LjMwNDI4IDEyLjI1MTUgNS41MDU3NSAxMi4wNSA1Ljc1NDI4IDEyLjA1SDYuOTQ5OTNWMi45NTAwMkgzLjk0OTkzWlwiIGZpbGw9XCIjZGRkXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+YCxcbiAgICAgICAgfTtcbiAgICBjb25zdCBwcm9wZXJ0eU1lbnVJdGVtcyA9IHRvZG9zLmxlbmd0aCA+IDRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICB0aXRsZUFjdGlvbkl0ZW0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbVR5cGU6IFwic2VwYXJhdG9yXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiQ2xlYXIgZXZlcnl0aGluZ1wiLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogXCJjbGVhci1hbGxcIixcbiAgICAgICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBgPHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDE1IDE1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk00LjYwOTEzIDAuMDYzNDI4N0M0LjM5MDgyIDAuMDA4ODUwNSA0LjE2NTc1IDAuMTIzOTMgNC4wODIxOCAwLjMzMjg2N0wzLjE1MzggMi42NTM4TDAuODMyODY2IDMuNTgyMThDMC43MDI4ODQgMy42MzQxNyAwLjYwNDUwNCAzLjc0MzcgMC41NjY3MDUgMy44Nzg0OUMwLjUyODkwNiA0LjAxMzI5IDAuNTU1OTk0IDQuMTU4IDAuNjM5OTkyIDQuMjY5OTlMMi4wMTE0OCA2LjA5ODY0TDEuMDYzNDMgOS44OTA4NUMxLjAwOTQ0IDEwLjEwNjggMS4xMjE0NSAxMC4zMjk4IDEuMzI2OTEgMTAuNDE1NEw0LjIwMTE1IDExLjYxM0w1LjYyNTU3IDEzLjc0OTZDNS43MzQxMiAxMy45MTI0IDUuOTM1NDUgMTMuOTg2NCA2LjEyMzYyIDEzLjkzMjdMOS42MjM2MiAxMi45MzI3QzkuNjI5ODggMTIuOTMwOSA5LjYzNjExIDEyLjkyOSA5LjY0MjI5IDEyLjkyNjlMMTIuNjQyMyAxMS45MjY5QzEyLjc5MjMgMTEuODc2OSAxMi45MDUgMTEuNzUxOSAxMi45MzkzIDExLjU5NzZMMTMuOTM5MyA3LjA5NzYxQzEzLjk3NzYgNi45MjUwNiAxMy45MTE0IDYuNzQ2MDUgMTMuNzcgNi42Mzk5OUwxMS45NSA1LjI3NDk5VjIuOTk5OTlDMTEuOTUgMi44Mjk1NSAxMS44NTM3IDIuNjczNzMgMTEuNzAxMiAyLjU5NzVMOC43MDEyNCAxLjA5NzVDOC42NzE4NyAxLjA4MjgyIDguNjQwOTggMS4wNzEzOSA4LjYwOTEzIDEuMDYzNDNMNC42MDkxMyAwLjA2MzQyODdaTTExLjQzMjMgNi4wMTE3M0wxMi43NzQ4IDcuMDE4NThMMTAuMjExOSA5LjE1NDI5QzEwLjE0NzYgOS4yMDc4NiAxMC4wOTk1IDkuMjc4MyAxMC4wNzMxIDkuMzU3NjlMOS4yNTM4MiAxMS44MTU1TDcuNzM4NDkgMTAuODY4NEM3LjUyNzc0IDEwLjczNjcgNy4yNTAxMSAxMC44MDA3IDcuMTE4MzkgMTEuMDExNUM2Ljk4NjY3IDExLjIyMjIgNy4wNTA3NCAxMS40OTk5IDcuMjYxNDkgMTEuNjMxNkw4LjQwMzQxIDEyLjM0NTNMNi4xOTIyMSAxMi45NzcxTDQuODc0NDEgMTEuMDAwNEM0LjgyNTEzIDEwLjkyNjUgNC43NTUwOCAxMC44Njg4IDQuNjczMDcgMTAuODM0NkwyLjAzMDQ2IDkuNzMzNTJMMi44NTEzNCA2LjQ0OTk5SDQuOTk5OTlDNS4yNDg1MiA2LjQ0OTk5IDUuNDQ5OTkgNi4yNDg1MiA1LjQ0OTk5IDUuOTk5OTlDNS40NDk5OSA1Ljc1MTQ2IDUuMjQ4NTIgNS41NDk5OSA0Ljk5OTk5IDUuNTQ5OTlIMi43MjQ5OUwxLjcxMjMgNC4xOTk3NEwzLjUxNDA3IDMuNDc5MDNMNi4zNTc2OSA0LjQyNjlDNi41MzY1NSA0LjQ4NjUyIDYuNzMzNjEgNC40MjgzMiA2Ljg1MTM4IDQuMjgxMTFMOC42MjQxMyAyLjA2NTE4TDExLjA1IDMuMjc4MTFWNS4xOTUzM0w4LjgzMjg3IDYuMDgyMThDOC43MDk5NiA2LjEzMTM0IDguNjE0OTQgNi4yMzIxMiA4LjU3MzA4IDYuMzU3NjlMOC4wNzMwOCA3Ljg1NzY5QzcuOTk0NDkgOC4wOTM0NiA4LjEyMTkxIDguMzQ4MzEgOC4zNTc2OSA4LjQyNjlDOC41OTM0NiA4LjUwNTQ5IDguODQ4MzEgOC4zNzgwNyA4LjkyNjkgOC4xNDIyOUw5LjM2MDkgNi44NDAyOUwxMS40MzIzIDYuMDExNzNaTTcuNzEwNTIgMS43NjY0OEw2LjM0NDYyIDMuNDczODZMNC4wOTUwNSAyLjcyNEw0Ljc3MTkyIDEuMDMxODNMNy43MTA1MiAxLjc2NjQ4Wk0xMC4yMTE1IDExLjc4ODVMMTIuMTE2IDExLjE1MzdMMTIuNzc0NSA4LjE5MDM0TDEwLjg4NjQgOS43NjM3NEwxMC4yMTE1IDExLjc4ODVaXCIgZmlsbD1cIiNkZGRcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgICA6IFt0aXRsZUFjdGlvbkl0ZW1dO1xuICAgIHVzZVByb3BlcnR5TWVudShwcm9wZXJ0eU1lbnVJdGVtcywgKHsgcHJvcGVydHlOYW1lIH0pID0+IHtcbiAgICAgICAgc3dpdGNoIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbGVhci1hbGxcIjpcbiAgICAgICAgICAgICAgICBzZXRUb2RvcyhbXSk7XG4gICAgICAgICAgICAgICAgc2V0SGFzVGl0bGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldFRpdGxlKFwiXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFkZC10aXRsZVwiOlxuICAgICAgICAgICAgICAgIHNldEhhc1RpdGxlKHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlbW92ZS10aXRsZVwiOlxuICAgICAgICAgICAgICAgIHNldEhhc1RpdGxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFRvZG8gPSAoeyBpZCwgZG9uZSwgdGl0bGUsIG91dE9mU2NvcGUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsga2V5OiBpZCwgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIiwgdmVydGljYWxBbGlnbkl0ZW1zOiBcInN0YXJ0XCIsIHNwYWNpbmc6IFwiYXV0b1wiLCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsIHZlcnRpY2FsQWxpZ25JdGVtczogXCJzdGFydFwiLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogZG9uZSB8fCBvdXRPZlNjb3BlLCBvbkNsaWNrOiAoKSA9PiB1cGRhdGVUb2RvKHsgaWQsIGZpZWxkOiBcImRvbmVcIiB9KSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIyLjVcIiB5PVwiMi41XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgcng9XCIzLjVcIiBmaWxsPVwid2hpdGVcIiBzdHJva2U9XCIjYWVhZWFlXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogIWRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gdXBkYXRlVG9kbyh7IGlkLCBmaWVsZDogXCJkb25lXCIgfSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNiAyQzMuNzkwODYgMiAyIDMuNzkwODYgMiA2VjE0QzIgMTYuMjA5MSAzLjc5MDg2IDE4IDYgMThIMTRDMTYuMjA5MSAxOCAxOCAxNi4yMDkxIDE4IDE0VjZDMTggMy43OTA4NiAxNi4yMDkxIDIgMTQgMkg2Wk0xNC4zNDA4IDguNzQ3NDFDMTQuNzUzNiA4LjI4MzAzIDE0LjcxMTggNy41NzE5NSAxNC4yNDc0IDcuMTU5MTZDMTMuNzgzIDYuNzQ2MzggMTMuMDcxOSA2Ljc4ODIxIDEyLjY1OTIgNy4yNTI1OUwxMC42NTkyIDkuNTAyNTlMOS40NTE4MyAxMC44NjA4TDcuNzk1NSA5LjIwNDVDNy4zNTYxNiA4Ljc2NTE2IDYuNjQzODQgOC43NjUxNiA2LjIwNDUgOS4yMDQ1QzUuNzY1MTcgOS42NDM4NCA1Ljc2NTE3IDEwLjM1NjIgNi4yMDQ1IDEwLjc5NTVMOC43MDQ1IDEzLjI5NTVDOC45MjM1OSAxMy41MTQ2IDkuMjIzMzQgMTMuNjMzNiA5LjUzMzA1IDEzLjYyNDVDOS44NDI3NSAxMy42MTU0IDEwLjEzNSAxMy40NzkgMTAuMzQwOCAxMy4yNDc0TDEyLjM0MDggMTAuOTk3NEwxNC4zNDA4IDguNzQ3NDFaXCIgZmlsbD1cIiM0QUIzOTNcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChSZWN0YW5nbGUsIHsgaGlkZGVuOiAhb3V0T2ZTY29wZSwgZmlsbDogXCIjZjJmMmYyXCIsIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChJbnB1dCwgeyBmaWxsOiBvdXRPZlNjb3BlID8gXCIjNkU2RTZFXCIgOiBkb25lID8gXCIjNzY3Njc2XCIgOiBcIiMxMDEwMTBcIiwgZm9udFNpemU6IGRvbmUgfHwgb3V0T2ZTY29wZSA/IDEzIDogMTQsIGxpbmVIZWlnaHQ6IDIwLCB3aWR0aDogMjIwLCB2YWx1ZTogdGl0bGUsIG9uVGV4dEVkaXRFbmQ6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5jaGFyYWN0ZXJzID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlVG9kbyhpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVUb2RvKHsgaWQsIGZpZWxkOiBcInRpdGxlXCIsIHZhbHVlOiBlLmNoYXJhY3RlcnMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gfSkpLFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGZpZ21hLmdldE5vZGVCeUlkKFdJREdFVElEKTtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLm1lbnUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogODUsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHdpZGdldC55IC0gNTgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogd2lkZ2V0LnggKyB3aWRnZXQud2lkdGggKyA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJtZW51XCIsIGlkLCB0aXRsZSwgb3V0T2ZTY29wZSB9KTtcbiAgICAgICAgICAgICAgICB9KSwgZmlsbDogb3V0T2ZTY29wZSA/IFwiI2YyZjJmMlwiIDogXCIjZmZmXCIgfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxLjZcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiI0E1QTVBNVwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiOFwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjQTVBNUE1XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNC40XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiNBNUE1QTVcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSkpKTtcbiAgICB9O1xuICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgY29ybmVyUmFkaXVzOiA4LCBmaWxsOiBcIiNmZmZcIiwgd2lkdGg6IDM2MCwgc3Ryb2tlOiBcIiNlN2U3ZTdcIiB9LFxuICAgICAgICBoYXNUaXRsZSAmJiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyB3aWR0aDogXCJmaWxsLXBhcmVudFwiLCBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgdmVydGljYWxBbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBob3Jpem9udGFsQWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZmlsbDogXCIjZWVlXCIgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKElucHV0LCB7IHZhbHVlOiB0aXRsZSwgcGxhY2Vob2xkZXI6IFwiQWRkIGEgdGl0bGUuLi5cIiwgZmlsbDogXCIjMTExXCIsIGZvbnRXZWlnaHQ6IDcwMCwgZm9udFNpemU6IDIwLCBsaW5lSGVpZ2h0OiAyNCwgaG9yaXpvbnRhbEFsaWduVGV4dDogXCJjZW50ZXJcIiwgd2lkdGg6IFwiZmlsbC1wYXJlbnRcIiwgbGV0dGVyU3BhY2luZzogLTAuMTUsIGlucHV0RnJhbWVQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICBmaWxsOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IHsgbGVmdDogNDksIHJpZ2h0OiA0OSwgdG9wOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgfSwgb25UZXh0RWRpdEVuZDogKGUpID0+IHNldFRpdGxlKGUuY2hhcmFjdGVycykgfSkpKSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgc3BhY2luZzogMjQsIHBhZGRpbmc6IDI0LCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBzcGFjaW5nOiA4LCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoeyBkb25lLCBvdXRPZlNjb3BlIH0pID0+ICFkb25lICYmICFvdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgICAgICAubWFwKCh7IGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiAoZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiB0aXRsZSwgZG9uZTogZG9uZSwgb3V0T2ZTY29wZTogb3V0T2ZTY29wZSB9KSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgd2lkdGg6IFwiZmlsbC1wYXJlbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsIHZlcnRpY2FsQWxpZ25JdGVtczogXCJjZW50ZXJcIiwgc3BhY2luZzogOCwgZmlsbDogXCIjZmZmXCIsIG9uQ2xpY2s6ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGZpZ21hLmdldE5vZGVCeUlkKFdJREdFVElEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2RvKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkoX191aUZpbGVzX18udWksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQWRkIGEgdG9kb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogd2lkZ2V0LnkgLSAxNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB3aWRnZXQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiYWRkXCIsIGlkLCB3aWRnZXQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMC4xMjUgNUMxMC43NDYzIDUgMTEuMjUgNS40NDc3MiAxMS4yNSA2VjE0QzExLjI1IDE0LjU1MjMgMTAuNzQ2MyAxNSAxMC4xMjUgMTVDOS41MDM2OCAxNSA5IDE0LjU1MjMgOSAxNFY2QzkgNS40NDc3MiA5LjUwMzY4IDUgMTAuMTI1IDVaXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTUgOS44NzVDNSA5LjI1MzY4IDUuNDQ3NzIgOC43NSA2IDguNzVMMTQgOC43NUMxNC41NTIzIDguNzUgMTUgOS4yNTM2OCAxNSA5Ljg3NUMxNSAxMC40OTYzIDE0LjU1MjMgMTEgMTQgMTFMNiAxMUM1LjQ0NzcyIDExIDUgMTAuNDk2MyA1IDkuODc1WlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogXCIjOTQ5NDk0XCIsIGZvbnRTaXplOiAxNCwgbGluZUhlaWdodDogMjAsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogXCItMC43NSVcIiB9LCBcIkFkZCBhIHRvZG9cIikpKSksXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogIXRvZG9zLmZpbHRlcigoeyBkb25lLCBvdXRPZlNjb3BlIH0pID0+IGRvbmUgJiYgIW91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsIHNwYWNpbmc6IDgsIHdpZHRoOiBcImZpbGwtcGFyZW50XCIgfSwgdG9kb3NcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCh7IGRvbmUsIG91dE9mU2NvcGUgfSkgPT4gZG9uZSAmJiAhb3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAubWFwKCh7IGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiAoZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiB0aXRsZSwgZG9uZTogZG9uZSwgb3V0T2ZTY29wZTogb3V0T2ZTY29wZSB9KSkpKSksXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiB0b2Rvcy5maWx0ZXIoKHsgb3V0T2ZTY29wZSB9KSA9PiBvdXRPZlNjb3BlKS5sZW5ndGggPT09IDAsIHdpZHRoOiBcImZpbGwtcGFyZW50XCIsIGhlaWdodDogIXRvZG9zLmZpbHRlcigoeyBvdXRPZlNjb3BlIH0pID0+IG91dE9mU2NvcGUpLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gNDBcbiAgICAgICAgICAgICAgICA6IFwiaHVnLWNvbnRlbnRzXCIsIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBob3Jpem9udGFsQWxpZ25JdGVtczogXCJjZW50ZXJcIiwgc3BhY2luZzogOCwgcGFkZGluZzogMjQsIGZpbGw6IFwiI2YyZjJmMlwiIH0sIHRvZG9zXG4gICAgICAgICAgICAuZmlsdGVyKCh7IG91dE9mU2NvcGUgfSkgPT4gb3V0T2ZTY29wZSlcbiAgICAgICAgICAgIC5tYXAoKHsgaWQsIHRpdGxlLCBkb25lLCBvdXRPZlNjb3BlIH0pID0+IChmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogaWQsIGlkOiBpZCwgdGl0bGU6IHRpdGxlLCBkb25lOiBkb25lLCBvdXRPZlNjb3BlOiBvdXRPZlNjb3BlIH0pKSkpKSk7XG59XG53aWRnZXQucmVnaXN0ZXIoVG9kb1dpZGdldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=