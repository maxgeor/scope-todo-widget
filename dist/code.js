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
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
let customAlphabet = (alphabet, size) => {
  return () => {
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
const { useSyncedState, useWidgetId, usePropertyMenu, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;

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
        const getUpdatedTodo = (todo) => {
            if (changedProp === "title") {
                todo.title = changedPropValue;
            }
            else if (changedProp === "done") {
                todo.done = !changedPropValue;
            }
            else if (changedProp === "outOfScope") {
                todo.done = false;
                todo.outOfScope = !changedPropValue;
            }
            return todo;
        };
        const freshTodos = todos.map(todo => {
            if (todo.id === id) {
                return getUpdatedTodo(todo);
            }
            else {
                return todo;
            }
        });
        setTodos(freshTodos);
    }
    usePropertyMenu([
        {
            tooltip: "Clear all",
            propertyName: "clear-all",
            itemType: "action"
        },
    ], (e) => {
        setTodos([]);
    });
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 'fill-parent' },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
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
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 20, height: 20 }),
                figma.widget.h(TextBlock, { fill: outOfScope || done ? "#6E6E6E" : "#101010", fontSize: done || outOfScope ? 13 : 14, lineHeight: 20, width: 180, onClick: () => new Promise((resolve) => {
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__html__, { height: 56, title: 'Edit your todo', position: { y: 0, x: 0 } });
                        figma.ui.postMessage({ type: 'edit', id, title, widget });
                    }) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => handleChange(id, "outOfScope", outOfScope), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6" y="8" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="8" y="8" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="14.4" y="8" width="4" height="4" rx="2" fill="#949494"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', width: 320, stroke: '#E9E9E9', effect: {
            type: 'drop-shadow',
            color: { r: 0, g: 0, b: 0, a: 0.08 },
            offset: { x: 0, y: 4 },
            blur: 12,
            spread: -16,
        } },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24, width: 'fill-parent' },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8, width: 'fill-parent' },
                todos
                    .filter(todo => !todo.done && !todo.outOfScope)
                    .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })),
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, fill: '#fff', onClick: () => new Promise((resolve) => {
                        const id = (0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)();
                        createTodo(id);
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__html__);
                        figma.ui.postMessage({ type: 'add', id, widget });
                    }) },
                    figma.widget.h(SVG, { src: `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 5C10.7463 5 11.25 5.44772 11.25 6V14C11.25 14.5523 10.7463 15 10.125 15C9.50368 15 9 14.5523 9 14V6C9 5.44772 9.50368 5 10.125 5Z" fill="#949494"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875C5 9.25368 5.44772 8.75 6 8.75L14 8.75C14.5523 8.75 15 9.25368 15 9.875C15 10.4963 14.5523 11 14 11L6 11C5.44772 11 5 10.4963 5 9.875Z" fill="#949494"/>
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#949494', fontSize: 14, lineHeight: 20, fontWeight: 700, letterSpacing: '-0.8%' }, "Add a todo"))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.done && !todo.outOfScope).length, direction: 'vertical', spacing: 8, width: 'fill-parent' }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        figma.widget.h(AutoLayout, { hidden: todos.filter(todo => todo.outOfScope).length === 0, width: 'fill-parent', height: !todos.filter(todo => todo.outOfScope).length ? 40 : 'hug-contents', direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(TodoWidget);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsdUdBQXVHO0FBQ3hEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTCxvQkFBb0Isa0NBQWtDO0FBQ3RELDZDQUE2Qyw2RkFBNkY7QUFDMUkseUNBQXlDLGtFQUFrRTtBQUMzRyxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsNENBQTRDLDZEQUE2RDtBQUN6Ryw0Q0FBNEM7QUFDNUM7QUFDQSxpREFBaUQsaURBQWlELGNBQWM7QUFDaEgsK0NBQStDLGlDQUFpQztBQUNoRixxQkFBcUIsR0FBRztBQUN4Qix5Q0FBeUMsa0dBQWtHO0FBQzNJLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRCxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0EsV0FBVztBQUNYLHFDQUFxQyx1RUFBdUU7QUFDNUcseUNBQXlDLHlEQUF5RDtBQUNsRztBQUNBO0FBQ0Esd0RBQXdELDZGQUE2RjtBQUNySiw2Q0FBNkM7QUFDN0MsbUNBQW1DLHlEQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyx5QkFBeUI7QUFDeEUscUJBQXFCLEdBQUc7QUFDeEIsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGdEQUFnRCx3RkFBd0Y7QUFDeEkseUNBQXlDLDhIQUE4SDtBQUN2SztBQUNBLG9EQUFvRCw2RkFBNkY7QUFDakoscUNBQXFDLGdRQUFnUTtBQUNyUyxnREFBZ0QsNkZBQTZGO0FBQzdJO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY29wZS10by1kby8uL25vZGVfbW9kdWxlcy9uYW5vaWQvbm9uLXNlY3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Njb3BlLXRvLWRvLy4vc3JjL2NvZGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImxldCB1cmxBbHBoYWJldCA9XG4gICd1c2VhbmRvbS0yNlQxOTgzNDBQWDc1cHhKQUNLVkVSWU1JTkRCVVNIV09MRl9HUVpiZmdoamtscXZ3eXpyaWN0J1xubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBzaXplKSA9PiB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICBsZXQgaSA9IHNpemVcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZCArPSBhbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0Lmxlbmd0aCkgfCAwXVxuICAgIH1cbiAgICByZXR1cm4gaWRcbiAgfVxufVxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGkgPSBzaXplXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZCArPSB1cmxBbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIDY0KSB8IDBdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgeyB3aWRnZXQgfSA9IGZpZ21hO1xuY29uc3QgeyB1c2VTeW5jZWRTdGF0ZSwgdXNlV2lkZ2V0SWQsIHVzZVByb3BlcnR5TWVudSwgdXNlRWZmZWN0LCBBdXRvTGF5b3V0LCBUZXh0OiBUZXh0QmxvY2ssIFNWRywgUmVjdGFuZ2xlIH0gPSB3aWRnZXQ7XG5pbXBvcnQgeyBuYW5vaWQgYXMgY3JlYXRlSWQgfSBmcm9tICduYW5vaWQvbm9uLXNlY3VyZSc7XG5mdW5jdGlvbiBUb2RvV2lkZ2V0KCkge1xuICAgIGNvbnN0IHdpZGdldElkID0gdXNlV2lkZ2V0SWQoKTtcbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN5bmNlZFN0YXRlKCd0b2RvcycsIFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAndXBkYXRlLXRpdGxlJykge1xuICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZShtc2cuaWQsICd0aXRsZScsIG1zZy50aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2RlbGV0ZS10b2RvJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG8obXNnLmlkKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdjbG9zZS1wbHVnaW4nKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBkZWxldGVUb2RvKGlkKSB7XG4gICAgICAgIHNldFRvZG9zKFsuLi50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBpZCldKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVG9kbyhpZCkge1xuICAgICAgICBzZXRUb2RvcyhbXG4gICAgICAgICAgICAuLi50b2RvcyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGlkLCBpZCwgdGl0bGU6ICcnLCBkb25lOiBmYWxzZSwgb3V0T2ZTY29wZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShpZCwgY2hhbmdlZFByb3AsIGNoYW5nZWRQcm9wVmFsdWUpIHtcbiAgICAgICAgY29uc3QgZ2V0VXBkYXRlZFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wID09PSBcInRpdGxlXCIpIHtcbiAgICAgICAgICAgICAgICB0b2RvLnRpdGxlID0gY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZWRQcm9wID09PSBcImRvbmVcIikge1xuICAgICAgICAgICAgICAgIHRvZG8uZG9uZSA9ICFjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3AgPT09IFwib3V0T2ZTY29wZVwiKSB7XG4gICAgICAgICAgICAgICAgdG9kby5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdG9kby5vdXRPZlNjb3BlID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZnJlc2hUb2RvcyA9IHRvZG9zLm1hcCh0b2RvID0+IHtcbiAgICAgICAgICAgIGlmICh0b2RvLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRVcGRhdGVkVG9kbyh0b2RvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VG9kb3MoZnJlc2hUb2Rvcyk7XG4gICAgfVxuICAgIHVzZVByb3BlcnR5TWVudShbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiQ2xlYXIgYWxsXCIsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IFwiY2xlYXItYWxsXCIsXG4gICAgICAgICAgICBpdGVtVHlwZTogXCJhY3Rpb25cIlxuICAgICAgICB9LFxuICAgIF0sIChlKSA9PiB7XG4gICAgICAgIHNldFRvZG9zKFtdKTtcbiAgICB9KTtcbiAgICBjb25zdCBUb2RvID0gKHsga2V5LCBpZCwgdGl0bGUsIGRvbmUsIG91dE9mU2NvcGUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ3N0YXJ0Jywgc3BhY2luZzogJ2F1dG8nLCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogZG9uZSB8fCBvdXRPZlNjb3BlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwiZG9uZVwiLCBkb25lKSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIyLjVcIiB5PVwiMi41XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgcng9XCIzLjVcIiBmaWxsPVwid2hpdGVcIiBzdHJva2U9XCIjYWVhZWFlXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogIWRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcImRvbmVcIiwgZG9uZSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNiAyQzMuNzkwODYgMiAyIDMuNzkwODYgMiA2VjE0QzIgMTYuMjA5MSAzLjc5MDg2IDE4IDYgMThIMTRDMTYuMjA5MSAxOCAxOCAxNi4yMDkxIDE4IDE0VjZDMTggMy43OTA4NiAxNi4yMDkxIDIgMTQgMkg2Wk0xNC4zNDA4IDguNzQ3NDFDMTQuNzUzNiA4LjI4MzAzIDE0LjcxMTggNy41NzE5NSAxNC4yNDc0IDcuMTU5MTZDMTMuNzgzIDYuNzQ2MzggMTMuMDcxOSA2Ljc4ODIxIDEyLjY1OTIgNy4yNTI1OUwxMC42NTkyIDkuNTAyNTlMOS40NTE4MyAxMC44NjA4TDcuNzk1NSA5LjIwNDVDNy4zNTYxNiA4Ljc2NTE2IDYuNjQzODQgOC43NjUxNiA2LjIwNDUgOS4yMDQ1QzUuNzY1MTcgOS42NDM4NCA1Ljc2NTE3IDEwLjM1NjIgNi4yMDQ1IDEwLjc5NTVMOC43MDQ1IDEzLjI5NTVDOC45MjM1OSAxMy41MTQ2IDkuMjIzMzQgMTMuNjMzNiA5LjUzMzA1IDEzLjYyNDVDOS44NDI3NSAxMy42MTU0IDEwLjEzNSAxMy40NzkgMTAuMzQwOCAxMy4yNDc0TDEyLjM0MDggMTAuOTk3NEwxNC4zNDA4IDguNzQ3NDFaXCIgZmlsbD1cIiM0QUIzOTNcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChSZWN0YW5nbGUsIHsgaGlkZGVuOiAhb3V0T2ZTY29wZSwgZmlsbDogJyNmMmYyZjInLCB3aWR0aDogMjAsIGhlaWdodDogMjAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6IG91dE9mU2NvcGUgfHwgZG9uZSA/IFwiIzZFNkU2RVwiIDogXCIjMTAxMDEwXCIsIGZvbnRTaXplOiBkb25lIHx8IG91dE9mU2NvcGUgPyAxMyA6IDE0LCBsaW5lSGVpZ2h0OiAyMCwgd2lkdGg6IDE4MCwgb25DbGljazogKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGZpZ21hLmdldE5vZGVCeUlkKHdpZGdldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDU2LCB0aXRsZTogJ0VkaXQgeW91ciB0b2RvJywgcG9zaXRpb246IHsgeTogMCwgeDogMCB9IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZWRpdCcsIGlkLCB0aXRsZSwgd2lkZ2V0IH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSB9LCB0aXRsZSkpLFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwib3V0T2ZTY29wZVwiLCBvdXRPZlNjb3BlKSwgZmlsbDogb3V0T2ZTY29wZSA/IFwiI2YyZjJmMlwiIDogXCIjZmZmXCIgfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxLjZcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiOFwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNC40XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSkpKTtcbiAgICB9O1xuICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIGNvcm5lclJhZGl1czogOCwgZmlsbDogJyNmZmYnLCB3aWR0aDogMzIwLCBzdHJva2U6ICcjRTlFOUU5JywgZWZmZWN0OiB7XG4gICAgICAgICAgICB0eXBlOiAnZHJvcC1zaGFkb3cnLFxuICAgICAgICAgICAgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCwgYTogMC4wOCB9LFxuICAgICAgICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDQgfSxcbiAgICAgICAgICAgIGJsdXI6IDEyLFxuICAgICAgICAgICAgc3ByZWFkOiAtMTYsXG4gICAgICAgIH0gfSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIHNwYWNpbmc6IDI0LCBwYWRkaW5nOiAyNCwgd2lkdGg6ICdmaWxsLXBhcmVudCcgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4LCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LFxuICAgICAgICAgICAgICAgIHRvZG9zXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiAhdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIGZpbGw6ICcjZmZmJywgb25DbGljazogKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY3JlYXRlSWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRvZG8oaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2FkZCcsIGlkLCB3aWRnZXQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMC4xMjUgNUMxMC43NDYzIDUgMTEuMjUgNS40NDc3MiAxMS4yNSA2VjE0QzExLjI1IDE0LjU1MjMgMTAuNzQ2MyAxNSAxMC4xMjUgMTVDOS41MDM2OCAxNSA5IDE0LjU1MjMgOSAxNFY2QzkgNS40NDc3MiA5LjUwMzY4IDUgMTAuMTI1IDVaXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNSA5Ljg3NUM1IDkuMjUzNjggNS40NDc3MiA4Ljc1IDYgOC43NUwxNCA4Ljc1QzE0LjU1MjMgOC43NSAxNSA5LjI1MzY4IDE1IDkuODc1QzE1IDEwLjQ5NjMgMTQuNTUyMyAxMSAxNCAxMUw2IDExQzUuNDQ3NzIgMTEgNSAxMC40OTYzIDUgOS44NzVaXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiAnIzk0OTQ5NCcsIGZvbnRTaXplOiAxNCwgbGluZUhlaWdodDogMjAsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJy0wLjglJyB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4LCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LCB0b2Rvc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiB0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSkpLFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKS5sZW5ndGggPT09IDAsIHdpZHRoOiAnZmlsbC1wYXJlbnQnLCBoZWlnaHQ6ICF0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCA/IDQwIDogJ2h1Zy1jb250ZW50cycsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgaG9yaXpvbnRhbEFsaWduSXRlbXM6ICdjZW50ZXInLCBzcGFjaW5nOiA4LCBwYWRkaW5nOiAyNCwgZmlsbDogJyNmMmYyZjInIH0sIHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSkpO1xufVxud2lkZ2V0LnJlZ2lzdGVyKFRvZG9XaWRnZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9