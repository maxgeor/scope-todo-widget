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
    const [todos, setTodos] = useSyncedState("todos", []); // Legacy
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
            tooltip: "Clear everything",
            propertyName: "clear-all",
            itemType: "action",
            icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.60913 0.0634287C4.39082 0.0088505 4.16575 0.12393 4.08218 0.332867L3.1538 2.6538L0.832866 3.58218C0.702884 3.63417 0.604504 3.7437 0.566705 3.87849C0.528906 4.01329 0.555994 4.158 0.639992 4.26999L2.01148 6.09864L1.06343 9.89085C1.00944 10.1068 1.12145 10.3298 1.32691 10.4154L4.20115 11.613L5.62557 13.7496C5.73412 13.9124 5.93545 13.9864 6.12362 13.9327L9.62362 12.9327C9.62988 12.9309 9.63611 12.929 9.64229 12.9269L12.6423 11.9269C12.7923 11.8769 12.905 11.7519 12.9393 11.5976L13.9393 7.09761C13.9776 6.92506 13.9114 6.74605 13.77 6.63999L11.95 5.27499V2.99999C11.95 2.82955 11.8537 2.67373 11.7012 2.5975L8.70124 1.0975C8.67187 1.08282 8.64098 1.07139 8.60913 1.06343L4.60913 0.0634287ZM11.4323 6.01173L12.7748 7.01858L10.2119 9.15429C10.1476 9.20786 10.0995 9.2783 10.0731 9.35769L9.25382 11.8155L7.73849 10.8684C7.52774 10.7367 7.25011 10.8007 7.11839 11.0115C6.98667 11.2222 7.05074 11.4999 7.26149 11.6316L8.40341 12.3453L6.19221 12.9771L4.87441 11.0004C4.82513 10.9265 4.75508 10.8688 4.67307 10.8346L2.03046 9.73352L2.85134 6.44999H4.99999C5.24852 6.44999 5.44999 6.24852 5.44999 5.99999C5.44999 5.75146 5.24852 5.54999 4.99999 5.54999H2.72499L1.7123 4.19974L3.51407 3.47903L6.35769 4.4269C6.53655 4.48652 6.73361 4.42832 6.85138 4.28111L8.62413 2.06518L11.05 3.27811V5.19533L8.83287 6.08218C8.70996 6.13134 8.61494 6.23212 8.57308 6.35769L8.07308 7.85769C7.99449 8.09346 8.12191 8.34831 8.35769 8.4269C8.59346 8.50549 8.84831 8.37807 8.9269 8.14229L9.3609 6.84029L11.4323 6.01173ZM7.71052 1.76648L6.34462 3.47386L4.09505 2.724L4.77192 1.03183L7.71052 1.76648ZM10.2115 11.7885L12.116 11.1537L12.7745 8.19034L10.8864 9.76374L10.2115 11.7885Z" fill="#ddd" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        },
    ];
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
    const Todo = (todo) => {
        const { id, done, title, outOfScope } = todo;
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
                figma.widget.h(Input, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#101010", fontSize: done || outOfScope ? 13 : 14, lineHeight: 20, width: 240, value: title, placeholder: "I need to...", placeholderProps: {
                        fill: '#b7b7b7',
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
                        // height: 154,
                        width: 220,
                        title,
                        position: {
                            y: widget.y - 58,
                            x: widget.x + widget.width + 7,
                        },
                    });
                    figma.ui.postMessage({ type: "ui", id, title, outOfScope });
                }) },
                figma.widget.h(SVG, { src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6" y="8" width="4" height="4" rx="2" fill="#A5A5A5"/>
                <rect x="8" y="8" width="4" height="4" rx="2" fill="#A5A5A5"/>
                <rect x="14.4" y="8" width="4" height="4" rx="2" fill="#A5A5A5"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: "vertical", cornerRadius: 8, fill: "#fff", width: 380, stroke: "#e7e7e7" },
        hasTitle && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", verticalAlignItems: "center", horizontalAlignItems: "center" },
            figma.widget.h(Input, { value: title, placeholder: "Add a title...", fill: "#222", fontWeight: 700, fontSize: 19.8, lineHeight: 24, horizontalAlignText: "center", width: 290, letterSpacing: -0.15, inputFrameProps: {
                    fill: "#FFFFFF",
                    horizontalAlignItems: "center",
                    padding: { top: 24 },
                    verticalAlignItems: "center",
                }, onTextEditEnd: (e) => setTitle(e.characters) }))),
        figma.widget.h(AutoLayout, { direction: "vertical", spacing: 24, padding: 24, width: "fill-parent" },
            figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, width: "fill-parent" },
                todos
                    .filter(({ done, outOfScope }) => !done && !outOfScope)
                    .map(({ id, title, done, outOfScope }) => (figma.widget.h(Todo, { key: id, id: id, title: title, done: done, outOfScope: outOfScope }))),
                figma.widget.h(AutoLayout, { width: "fill-parent" },
                    figma.widget.h(AutoLayout, { direction: "horizontal", verticalAlignItems: "center", spacing: 8, fill: "#fff", onClick: () => createTodo((0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)()) },
                        figma.widget.h(SVG, { src: `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 5C10.7463 5 11.25 5.44772 11.25 6V14C11.25 14.5523 10.7463 15 10.125 15C9.50368 15 9 14.5523 9 14V6C9 5.44772 9.50368 5 10.125 5Z" fill="#979797"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875C5 9.25368 5.44772 8.75 6 8.75L14 8.75C14.5523 8.75 15 9.25368 15 9.875C15 10.4963 14.5523 11 14 11L6 11C5.44772 11 5 10.4963 5 9.875Z" fill="#979797"/>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLG1CQUFtQjtBQUNuQixvREFBb0QseUZBQXlGO0FBQzdJLHlDQUF5Qyx5QkFBeUIsa0JBQWtCLDJGQUEyRjtBQUMvSywyQkFBMkIsa0JBQWtCO0FBQzdDLHdCQUF3Qiw2QkFBNkIsNkJBQTZCLG1FQUFtRTtBQUNySixxQ0FBcUMsd0JBQXdCLFlBQVksOEVBQThFLFlBQVk7QUFDbks7QUFDQSxtSUFBbUk7QUFDbkksdUJBQXVCLFlBQVk7QUFDbkMsb0JBQW9CLDZCQUE2Qiw2QkFBNkIsbUVBQW1FO0FBQ2pKO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY29wZS10by1kby8uL25vZGVfbW9kdWxlcy9uYW5vaWQvbm9uLXNlY3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Njb3BlLXRvLWRvLy4vc3JjL2NvZGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImxldCB1cmxBbHBoYWJldCA9XG4gICd1c2VhbmRvbS0yNlQxOTgzNDBQWDc1cHhKQUNLVkVSWU1JTkRCVVNIV09MRl9HUVpiZmdoamtscXZ3eXpyaWN0J1xubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBkZWZhdWx0U2l6ZSA9IDIxKSA9PiB7XG4gIHJldHVybiAoc2l6ZSA9IGRlZmF1bHRTaXplKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICBsZXQgaSA9IHNpemVcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZCArPSBhbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0Lmxlbmd0aCkgfCAwXVxuICAgIH1cbiAgICByZXR1cm4gaWRcbiAgfVxufVxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGkgPSBzaXplXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZCArPSB1cmxBbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIDY0KSB8IDBdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgeyB3aWRnZXQgfSA9IGZpZ21hO1xuY29uc3QgeyB1c2VTeW5jZWRTdGF0ZSwgdXNlV2lkZ2V0Tm9kZUlkLCB1c2VQcm9wZXJ0eU1lbnUsIHVzZUVmZmVjdCwgQXV0b0xheW91dCwgSW5wdXQsIFRleHQ6IFRleHRCbG9jaywgU1ZHLCBSZWN0YW5nbGUsIH0gPSB3aWRnZXQ7XG5pbXBvcnQgeyBuYW5vaWQgYXMgY3JlYXRlSWQgfSBmcm9tIFwibmFub2lkL25vbi1zZWN1cmVcIjtcbmZ1bmN0aW9uIFRvZG9XaWRnZXQoKSB7XG4gICAgY29uc3Qgd2lkZ2V0SWQgPSB1c2VXaWRnZXROb2RlSWQoKTtcbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN5bmNlZFN0YXRlKFwidG9kb3NcIiwgW10pOyAvLyBMZWdhY3lcbiAgICBjb25zdCBbdGl0bGUsIHNldFRpdGxlXSA9IHVzZVN5bmNlZFN0YXRlKFwidGl0bGVcIiwgXCJcIik7XG4gICAgY29uc3QgW2hhc1RpdGxlLCBzZXRIYXNUaXRsZV0gPSB1c2VTeW5jZWRTdGF0ZShcImhhc1RpdGxlXCIsIGZhbHNlKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSAoeyB0eXBlLCBpZCwgdGl0bGUgfSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVwZGF0ZS10aXRsZVwiOlxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUb2RvKHsgaWQsIGZpZWxkOiBcInRpdGxlXCIsIHZhbHVlOiB0aXRsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZsaXAtdG9kby1zY29wZVwiOlxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUb2RvKHsgaWQsIGZpZWxkOiBcIm91dE9mU2NvcGVcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRlbGV0ZS10b2RvXCI6XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG8oaWQpO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCBkZWxldGVUb2RvID0gKGlkKSA9PiBzZXRUb2Rvcyh0b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8uaWQgIT09IGlkKSk7XG4gICAgY29uc3QgY3JlYXRlVG9kbyA9IChpZCkgPT4gc2V0VG9kb3MoW1xuICAgICAgICAuLi50b2RvcyxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgb3V0T2ZTY29wZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgXSk7XG4gICAgZnVuY3Rpb24gdXBkYXRlVG9kbyhlZGl0ZWRUb2RvKSB7XG4gICAgICAgIGlmIChlZGl0ZWRUb2RvLmZpZWxkID09PSBcInRpdGxlXCIgJiYgXCJ2YWx1ZVwiIGluIGVkaXRlZFRvZG8pIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRUb2Rvcyh0b2Rvcy5tYXAoKHRvZG8pID0+IHRvZG8uaWQgPT09IGVkaXRlZFRvZG8uaWRcbiAgICAgICAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdG9kbyksIHsgdGl0bGU6IGVkaXRlZFRvZG8udmFsdWUgfSkgOiB0b2RvKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG9kbyA9IHRvZG9zLmZpbmQoKHRvZG8pID0+IHRvZG8uaWQgPT09IGVkaXRlZFRvZG8uaWQpO1xuICAgICAgICBjb25zdCByZXN0ID0gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLmlkICE9PSBlZGl0ZWRUb2RvLmlkKTtcbiAgICAgICAgaWYgKCF0b2RvKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoZWRpdGVkVG9kby5maWVsZCA9PT0gXCJvdXRPZlNjb3BlXCIpIHtcbiAgICAgICAgICAgIHNldFRvZG9zKFsuLi5yZXN0LCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRvZG8pLCB7IG91dE9mU2NvcGU6ICF0b2RvLm91dE9mU2NvcGUgfSldKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlZGl0ZWRUb2RvLmZpZWxkID09PSBcImRvbmVcIikge1xuICAgICAgICAgICAgc2V0VG9kb3MoWy4uLnJlc3QsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdG9kbyksIHsgZG9uZTogIXRvZG8uZG9uZSB9KV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHRpdGxlQWN0aW9uSXRlbSA9IGhhc1RpdGxlXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdG9vbHRpcDogXCJSZW1vdmUgVGl0bGVcIixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogXCJyZW1vdmUtdGl0bGVcIixcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcImFjdGlvblwiLFxuICAgICAgICAgICAgaWNvbjogYDxzdmcgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgdmlld0JveD1cIjAgMCAxNSAxNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTMuMzUzNiAyLjM1MzU1QzEzLjU0ODggMi4xNTgyOSAxMy41NDg4IDEuODQxNzEgMTMuMzUzNiAxLjY0NjQ1QzEzLjE1ODMgMS40NTExOCAxMi44NDE3IDEuNDUxMTggMTIuNjQ2NCAxLjY0NjQ1TDExLjkyOTEgMi4zNjM4M0MxMS45MTU5IDIuMzIyNDYgMTEuODk3IDIuMjgzNjggMTEuODczMiAyLjI0ODQ1QzExLjc5MjMgMi4xMjg3NSAxMS42NTU0IDIuMDUwMDUgMTEuNTAwMSAyLjA1MDA1SDMuNTAwMDVDMy4yOTkwOSAyLjA1MDA1IDMuMTI4OSAyLjE4MTc4IDMuMDcxMTEgMi4zNjM2QzMuMDU3NDMgMi40MDY2NSAzLjA1MDA1IDIuNDUyNDkgMy4wNTAwNSAyLjUwMDA3VjQuNTAwMDFDMy4wNTAwNSA0Ljc0ODU0IDMuMjUxNTIgNC45NTAwMSAzLjUwMDA1IDQuOTUwMDFDMy43NDg1OCA0Ljk1MDAxIDMuOTUwMDUgNC43NDg1NCAzLjk1MDA1IDQuNTAwMDFWMi45NTAwNUg2Ljk1MDA2VjcuMzQyODRMMS42NDY0NSAxMi42NDY0QzEuNDUxMTggMTIuODQxNyAxLjQ1MTE4IDEzLjE1ODMgMS42NDY0NSAxMy4zNTM2QzEuODQxNzEgMTMuNTQ4OCAyLjE1ODI5IDEzLjU0ODggMi4zNTM1NSAxMy4zNTM2TDYuOTUwMDYgOC43NTcwNVYxMi4wNTAxSDUuNzU0NEM1LjUwNTg3IDEyLjA1MDEgNS4zMDQ0IDEyLjI1MTUgNS4zMDQ0IDEyLjUwMDFDNS4zMDQ0IDEyLjc0ODYgNS41MDU4NyAxMi45NTAxIDUuNzU0NCAxMi45NTAxSDkuMjU0NEM5LjUwMjkzIDEyLjk1MDEgOS43MDQ0IDEyLjc0ODYgOS43MDQ0IDEyLjUwMDFDOS43MDQ0IDEyLjI1MTUgOS41MDI5MyAxMi4wNTAxIDkuMjU0NCAxMi4wNTAxSDguMDUwMDZWNy42NTcwNUwxMy4zNTM2IDIuMzUzNTVaTTguMDUwMDYgNi4yNDI4NEwxMS4wNTAxIDMuMjQyODNWMi45NTAwNUg4LjA1MDA2VjYuMjQyODRaXCIgZmlsbD1cIiNkZGRcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5gLFxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdG9vbHRpcDogXCJBZGQgYSBUaXRsZVwiLFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBcImFkZC10aXRsZVwiLFxuICAgICAgICAgICAgaXRlbVR5cGU6IFwiYWN0aW9uXCIsXG4gICAgICAgICAgICBpY29uOiBgPHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDE1IDE1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0zLjk0OTkzIDIuOTUwMDJMMy45NDk5MyA0LjQ5OTk4QzMuOTQ5OTMgNC43NDg1MSAzLjc0ODQ1IDQuOTQ5OTggMy40OTk5MyA0Ljk0OTk4QzMuMjUxNCA0Ljk0OTk4IDMuMDQ5OTMgNC43NDg1MSAzLjA0OTkzIDQuNDk5OThWMi41MDAwNEMzLjA0OTkzIDIuNDUyNDYgMy4wNTczMSAyLjQwNjYxIDMuMDcwOTkgMi4zNjM1N0MzLjEyODc4IDIuMTgxNzUgMy4yOTg5NyAyLjA1MDAyIDMuNDk5OTMgMi4wNTAwMkgxMS40OTk5QzExLjY1NTMgMi4wNTAwMiAxMS43OTIyIDIuMTI4NzIgMTEuODczMSAyLjI0ODQyQzExLjkyMTYgMi4zMjAyNCAxMS45NDk5IDIuNDA2ODIgMTEuOTQ5OSAyLjUwMDAyTDExLjk0OTkgMi41MDAwNFY0LjQ5OTk4QzExLjk0OTkgNC43NDg1MSAxMS43NDg1IDQuOTQ5OTggMTEuNDk5OSA0Ljk0OTk4QzExLjI1MTQgNC45NDk5OCAxMS4wNDk5IDQuNzQ4NTEgMTEuMDQ5OSA0LjQ5OTk4VjIuOTUwMDJIOC4wNDk5M1YxMi4wNUg5LjI1NDI4QzkuNTAyODEgMTIuMDUgOS43MDQyOCAxMi4yNTE1IDkuNzA0MjggMTIuNUM5LjcwNDI4IDEyLjc0ODYgOS41MDI4MSAxMi45NSA5LjI1NDI4IDEyLjk1SDUuNzU0MjhDNS41MDU3NSAxMi45NSA1LjMwNDI4IDEyLjc0ODYgNS4zMDQyOCAxMi41QzUuMzA0MjggMTIuMjUxNSA1LjUwNTc1IDEyLjA1IDUuNzU0MjggMTIuMDVINi45NDk5M1YyLjk1MDAySDMuOTQ5OTNaXCIgZmlsbD1cIiNkZGRcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5gLFxuICAgICAgICB9O1xuICAgIGNvbnN0IHByb3BlcnR5TWVudUl0ZW1zID0gW1xuICAgICAgICB0aXRsZUFjdGlvbkl0ZW0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcInNlcGFyYXRvclwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b29sdGlwOiBcIkNsZWFyIGV2ZXJ5dGhpbmdcIixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogXCJjbGVhci1hbGxcIixcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcImFjdGlvblwiLFxuICAgICAgICAgICAgaWNvbjogYDxzdmcgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgdmlld0JveD1cIjAgMCAxNSAxNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNNC42MDkxMyAwLjA2MzQyODdDNC4zOTA4MiAwLjAwODg1MDUgNC4xNjU3NSAwLjEyMzkzIDQuMDgyMTggMC4zMzI4NjdMMy4xNTM4IDIuNjUzOEwwLjgzMjg2NiAzLjU4MjE4QzAuNzAyODg0IDMuNjM0MTcgMC42MDQ1MDQgMy43NDM3IDAuNTY2NzA1IDMuODc4NDlDMC41Mjg5MDYgNC4wMTMyOSAwLjU1NTk5NCA0LjE1OCAwLjYzOTk5MiA0LjI2OTk5TDIuMDExNDggNi4wOTg2NEwxLjA2MzQzIDkuODkwODVDMS4wMDk0NCAxMC4xMDY4IDEuMTIxNDUgMTAuMzI5OCAxLjMyNjkxIDEwLjQxNTRMNC4yMDExNSAxMS42MTNMNS42MjU1NyAxMy43NDk2QzUuNzM0MTIgMTMuOTEyNCA1LjkzNTQ1IDEzLjk4NjQgNi4xMjM2MiAxMy45MzI3TDkuNjIzNjIgMTIuOTMyN0M5LjYyOTg4IDEyLjkzMDkgOS42MzYxMSAxMi45MjkgOS42NDIyOSAxMi45MjY5TDEyLjY0MjMgMTEuOTI2OUMxMi43OTIzIDExLjg3NjkgMTIuOTA1IDExLjc1MTkgMTIuOTM5MyAxMS41OTc2TDEzLjkzOTMgNy4wOTc2MUMxMy45Nzc2IDYuOTI1MDYgMTMuOTExNCA2Ljc0NjA1IDEzLjc3IDYuNjM5OTlMMTEuOTUgNS4yNzQ5OVYyLjk5OTk5QzExLjk1IDIuODI5NTUgMTEuODUzNyAyLjY3MzczIDExLjcwMTIgMi41OTc1TDguNzAxMjQgMS4wOTc1QzguNjcxODcgMS4wODI4MiA4LjY0MDk4IDEuMDcxMzkgOC42MDkxMyAxLjA2MzQzTDQuNjA5MTMgMC4wNjM0Mjg3Wk0xMS40MzIzIDYuMDExNzNMMTIuNzc0OCA3LjAxODU4TDEwLjIxMTkgOS4xNTQyOUMxMC4xNDc2IDkuMjA3ODYgMTAuMDk5NSA5LjI3ODMgMTAuMDczMSA5LjM1NzY5TDkuMjUzODIgMTEuODE1NUw3LjczODQ5IDEwLjg2ODRDNy41Mjc3NCAxMC43MzY3IDcuMjUwMTEgMTAuODAwNyA3LjExODM5IDExLjAxMTVDNi45ODY2NyAxMS4yMjIyIDcuMDUwNzQgMTEuNDk5OSA3LjI2MTQ5IDExLjYzMTZMOC40MDM0MSAxMi4zNDUzTDYuMTkyMjEgMTIuOTc3MUw0Ljg3NDQxIDExLjAwMDRDNC44MjUxMyAxMC45MjY1IDQuNzU1MDggMTAuODY4OCA0LjY3MzA3IDEwLjgzNDZMMi4wMzA0NiA5LjczMzUyTDIuODUxMzQgNi40NDk5OUg0Ljk5OTk5QzUuMjQ4NTIgNi40NDk5OSA1LjQ0OTk5IDYuMjQ4NTIgNS40NDk5OSA1Ljk5OTk5QzUuNDQ5OTkgNS43NTE0NiA1LjI0ODUyIDUuNTQ5OTkgNC45OTk5OSA1LjU0OTk5SDIuNzI0OTlMMS43MTIzIDQuMTk5NzRMMy41MTQwNyAzLjQ3OTAzTDYuMzU3NjkgNC40MjY5QzYuNTM2NTUgNC40ODY1MiA2LjczMzYxIDQuNDI4MzIgNi44NTEzOCA0LjI4MTExTDguNjI0MTMgMi4wNjUxOEwxMS4wNSAzLjI3ODExVjUuMTk1MzNMOC44MzI4NyA2LjA4MjE4QzguNzA5OTYgNi4xMzEzNCA4LjYxNDk0IDYuMjMyMTIgOC41NzMwOCA2LjM1NzY5TDguMDczMDggNy44NTc2OUM3Ljk5NDQ5IDguMDkzNDYgOC4xMjE5MSA4LjM0ODMxIDguMzU3NjkgOC40MjY5QzguNTkzNDYgOC41MDU0OSA4Ljg0ODMxIDguMzc4MDcgOC45MjY5IDguMTQyMjlMOS4zNjA5IDYuODQwMjlMMTEuNDMyMyA2LjAxMTczWk03LjcxMDUyIDEuNzY2NDhMNi4zNDQ2MiAzLjQ3Mzg2TDQuMDk1MDUgMi43MjRMNC43NzE5MiAxLjAzMTgzTDcuNzEwNTIgMS43NjY0OFpNMTAuMjExNSAxMS43ODg1TDEyLjExNiAxMS4xNTM3TDEyLjc3NDUgOC4xOTAzNEwxMC44ODY0IDkuNzYzNzRMMTAuMjExNSAxMS43ODg1WlwiIGZpbGw9XCIjZGRkXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+YCxcbiAgICAgICAgfSxcbiAgICBdO1xuICAgIHVzZVByb3BlcnR5TWVudShwcm9wZXJ0eU1lbnVJdGVtcywgKHsgcHJvcGVydHlOYW1lIH0pID0+IHtcbiAgICAgICAgc3dpdGNoIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbGVhci1hbGxcIjpcbiAgICAgICAgICAgICAgICBzZXRUb2RvcyhbXSk7XG4gICAgICAgICAgICAgICAgc2V0SGFzVGl0bGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldFRpdGxlKFwiXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFkZC10aXRsZVwiOlxuICAgICAgICAgICAgICAgIHNldEhhc1RpdGxlKHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlbW92ZS10aXRsZVwiOlxuICAgICAgICAgICAgICAgIHNldEhhc1RpdGxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICBjb25zdCB7IGlkLCBkb25lLCB0aXRsZSwgb3V0T2ZTY29wZSB9ID0gdG9kbztcbiAgICAgICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGtleTogaWQsIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsIHZlcnRpY2FsQWxpZ25JdGVtczogXCJzdGFydFwiLCBzcGFjaW5nOiBcImF1dG9cIiwgd2lkdGg6IFwiZmlsbC1wYXJlbnRcIiB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLCB2ZXJ0aWNhbEFsaWduSXRlbXM6IFwic3RhcnRcIiwgc3BhY2luZzogOCB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46IGRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gdXBkYXRlVG9kbyh7IGlkLCBmaWVsZDogXCJkb25lXCIgfSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMi41XCIgeT1cIjIuNVwiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHJ4PVwiMy41XCIgZmlsbD1cIndoaXRlXCIgc3Ryb2tlPVwiI2FlYWVhZVwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46ICFkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVRvZG8oeyBpZCwgZmllbGQ6IFwiZG9uZVwiIH0pLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTYgMkMzLjc5MDg2IDIgMiAzLjc5MDg2IDIgNlYxNEMyIDE2LjIwOTEgMy43OTA4NiAxOCA2IDE4SDE0QzE2LjIwOTEgMTggMTggMTYuMjA5MSAxOCAxNFY2QzE4IDMuNzkwODYgMTYuMjA5MSAyIDE0IDJINlpNMTQuMzQwOCA4Ljc0NzQxQzE0Ljc1MzYgOC4yODMwMyAxNC43MTE4IDcuNTcxOTUgMTQuMjQ3NCA3LjE1OTE2QzEzLjc4MyA2Ljc0NjM4IDEzLjA3MTkgNi43ODgyMSAxMi42NTkyIDcuMjUyNTlMMTAuNjU5MiA5LjUwMjU5TDkuNDUxODMgMTAuODYwOEw3Ljc5NTUgOS4yMDQ1QzcuMzU2MTYgOC43NjUxNiA2LjY0Mzg0IDguNzY1MTYgNi4yMDQ1IDkuMjA0NUM1Ljc2NTE3IDkuNjQzODQgNS43NjUxNyAxMC4zNTYyIDYuMjA0NSAxMC43OTU1TDguNzA0NSAxMy4yOTU1QzguOTIzNTkgMTMuNTE0NiA5LjIyMzM0IDEzLjYzMzYgOS41MzMwNSAxMy42MjQ1QzkuODQyNzUgMTMuNjE1NCAxMC4xMzUgMTMuNDc5IDEwLjM0MDggMTMuMjQ3NEwxMi4zNDA4IDEwLjk5NzRMMTQuMzQwOCA4Ljc0NzQxWlwiIGZpbGw9XCIjNEFCMzkzXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoUmVjdGFuZ2xlLCB7IGhpZGRlbjogIW91dE9mU2NvcGUsIGZpbGw6IFwiI2YyZjJmMlwiLCB3aWR0aDogMjAsIGhlaWdodDogMjAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoSW5wdXQsIHsgZmlsbDogb3V0T2ZTY29wZSA/IFwiIzZFNkU2RVwiIDogZG9uZSA/IFwiIzc2NzY3NlwiIDogXCIjMTAxMDEwXCIsIGZvbnRTaXplOiBkb25lIHx8IG91dE9mU2NvcGUgPyAxMyA6IDE0LCBsaW5lSGVpZ2h0OiAyMCwgd2lkdGg6IDI0MCwgdmFsdWU6IHRpdGxlLCBwbGFjZWhvbGRlcjogXCJJIG5lZWQgdG8uLi5cIiwgcGxhY2Vob2xkZXJQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogJyNiN2I3YjcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IC0wLjE1LFxuICAgICAgICAgICAgICAgICAgICB9LCBvblRleHRFZGl0RW5kOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5jaGFyYWN0ZXJzID09PSBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBkZWxldGVUb2RvKGlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdXBkYXRlVG9kbyh7IGlkLCBmaWVsZDogXCJ0aXRsZVwiLCB2YWx1ZTogZS5jaGFyYWN0ZXJzIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IH0pKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZmlsbDogb3V0T2ZTY29wZSA/IFwiI2YyZjJmMlwiIDogXCIjZmZmXCIsIG9uQ2xpY2s6ICgpID0+IG5ldyBQcm9taXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoZWlnaHQ6IDE1NCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogd2lkZ2V0LnkgLSA1OCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB3aWRnZXQueCArIHdpZGdldC53aWR0aCArIDcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInVpXCIsIGlkLCB0aXRsZSwgb3V0T2ZTY29wZSB9KTtcbiAgICAgICAgICAgICAgICB9KSB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjEuNlwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjQTVBNUE1XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI4XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiNBNUE1QTVcIi8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjE0LjRcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiI0E1QTVBNVwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBjb3JuZXJSYWRpdXM6IDgsIGZpbGw6IFwiI2ZmZlwiLCB3aWR0aDogMzgwLCBzdHJva2U6IFwiI2U3ZTdlN1wiIH0sXG4gICAgICAgIGhhc1RpdGxlICYmIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IHdpZHRoOiBcImZpbGwtcGFyZW50XCIsIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCB2ZXJ0aWNhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGhvcml6b250YWxBbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChJbnB1dCwgeyB2YWx1ZTogdGl0bGUsIHBsYWNlaG9sZGVyOiBcIkFkZCBhIHRpdGxlLi4uXCIsIGZpbGw6IFwiIzIyMlwiLCBmb250V2VpZ2h0OiA3MDAsIGZvbnRTaXplOiAxOS44LCBsaW5lSGVpZ2h0OiAyNCwgaG9yaXpvbnRhbEFsaWduVGV4dDogXCJjZW50ZXJcIiwgd2lkdGg6IDI5MCwgbGV0dGVyU3BhY2luZzogLTAuMTUsIGlucHV0RnJhbWVQcm9wczoge1xuICAgICAgICAgICAgICAgICAgICBmaWxsOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IHsgdG9wOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgfSwgb25UZXh0RWRpdEVuZDogKGUpID0+IHNldFRpdGxlKGUuY2hhcmFjdGVycykgfSkpKSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgc3BhY2luZzogMjQsIHBhZGRpbmc6IDI0LCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBzcGFjaW5nOiA4LCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoeyBkb25lLCBvdXRPZlNjb3BlIH0pID0+ICFkb25lICYmICFvdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgICAgICAubWFwKCh7IGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiAoZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiB0aXRsZSwgZG9uZTogZG9uZSwgb3V0T2ZTY29wZTogb3V0T2ZTY29wZSB9KSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgd2lkdGg6IFwiZmlsbC1wYXJlbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsIHZlcnRpY2FsQWxpZ25JdGVtczogXCJjZW50ZXJcIiwgc3BhY2luZzogOCwgZmlsbDogXCIjZmZmXCIsIG9uQ2xpY2s6ICgpID0+IGNyZWF0ZVRvZG8oY3JlYXRlSWQoKSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTAuMTI1IDVDMTAuNzQ2MyA1IDExLjI1IDUuNDQ3NzIgMTEuMjUgNlYxNEMxMS4yNSAxNC41NTIzIDEwLjc0NjMgMTUgMTAuMTI1IDE1QzkuNTAzNjggMTUgOSAxNC41NTIzIDkgMTRWNkM5IDUuNDQ3NzIgOS41MDM2OCA1IDEwLjEyNSA1WlwiIGZpbGw9XCIjOTc5Nzk3XCIvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01IDkuODc1QzUgOS4yNTM2OCA1LjQ0NzcyIDguNzUgNiA4Ljc1TDE0IDguNzVDMTQuNTUyMyA4Ljc1IDE1IDkuMjUzNjggMTUgOS44NzVDMTUgMTAuNDk2MyAxNC41NTIzIDExIDE0IDExTDYgMTFDNS40NDc3MiAxMSA1IDEwLjQ5NjMgNSA5Ljg3NVpcIiBmaWxsPVwiIzk3OTc5N1wiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6IFwiIzk0OTQ5NFwiLCBmb250U2l6ZTogMTQsIGxpbmVIZWlnaHQ6IDIwLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6IFwiLTAuNzUlXCIgfSwgXCJBZGQgYSB0b2RvXCIpKSkpLFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBoaWRkZW46ICF0b2Rvcy5maWx0ZXIoKHsgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiBkb25lICYmICFvdXRPZlNjb3BlKS5sZW5ndGgsIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLCBzcGFjaW5nOiA4LCB3aWR0aDogXCJmaWxsLXBhcmVudFwiIH0sIHRvZG9zXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoeyBkb25lLCBvdXRPZlNjb3BlIH0pID0+IGRvbmUgJiYgIW91dE9mU2NvcGUpXG4gICAgICAgICAgICAgICAgLm1hcCgoeyBpZCwgdGl0bGUsIGRvbmUsIG91dE9mU2NvcGUgfSkgPT4gKGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiBpZCwgaWQ6IGlkLCB0aXRsZTogdGl0bGUsIGRvbmU6IGRvbmUsIG91dE9mU2NvcGU6IG91dE9mU2NvcGUgfSkpKSkpLFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogdG9kb3MuZmlsdGVyKCh7IG91dE9mU2NvcGUgfSkgPT4gb3V0T2ZTY29wZSkubGVuZ3RoID09PSAwLCB3aWR0aDogXCJmaWxsLXBhcmVudFwiLCBoZWlnaHQ6ICF0b2Rvcy5maWx0ZXIoKHsgb3V0T2ZTY29wZSB9KSA9PiBvdXRPZlNjb3BlKS5sZW5ndGhcbiAgICAgICAgICAgICAgICA/IDQwXG4gICAgICAgICAgICAgICAgOiBcImh1Zy1jb250ZW50c1wiLCBkaXJlY3Rpb246IFwidmVydGljYWxcIiwgaG9yaXpvbnRhbEFsaWduSXRlbXM6IFwiY2VudGVyXCIsIHNwYWNpbmc6IDgsIHBhZGRpbmc6IDI0LCBmaWxsOiBcIiNmMmYyZjJcIiB9LCB0b2Rvc1xuICAgICAgICAgICAgLmZpbHRlcigoeyBvdXRPZlNjb3BlIH0pID0+IG91dE9mU2NvcGUpXG4gICAgICAgICAgICAubWFwKCh7IGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiAoZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiB0aXRsZSwgZG9uZTogZG9uZSwgb3V0T2ZTY29wZTogb3V0T2ZTY29wZSB9KSkpKSkpO1xufVxud2lkZ2V0LnJlZ2lzdGVyKFRvZG9XaWRnZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9