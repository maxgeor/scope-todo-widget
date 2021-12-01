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
            else if (msg.type === 'flip-todo-scope') {
                handleChange(msg.id, 'scope', !msg.outOfScope);
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
                        figma.showUI(__uiFiles__.ui, { height: 56, title: 'Edit your todo', position: { y: 0, x: 0 } });
                        figma.ui.postMessage({ type: 'edit', id, title, widget });
                    }) }, title)),
            figma.widget.h(AutoLayout
            // onClick={() => handleChange(id, "outOfScope", outOfScope)}
            , { 
                // onClick={() => handleChange(id, "outOfScope", outOfScope)}
                onClick: () => new Promise((resolve) => {
                    const widget = figma.getNodeById(widgetId);
                    figma.showUI(__uiFiles__.menu);
                    figma.ui.postMessage({ type: 'menu', id, title, outOfScope, widget });
                }), fill: outOfScope ? "#f2f2f2" : "#fff" },
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
            color: { r: 0, g: 0, b: 0, a: 0.06 },
            offset: { x: 0, y: 4 },
            blur: 12,
            spread: -24,
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
                        figma.showUI(__uiFiles__.ui, { height: 56, title: 'Edit your todo', position: { y: 0, x: 0 } });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsdUdBQXVHO0FBQ3hEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTCxvQkFBb0Isa0NBQWtDO0FBQ3RELDZDQUE2Qyw2RkFBNkY7QUFDMUkseUNBQXlDLGtFQUFrRTtBQUMzRyxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsNENBQTRDLDZEQUE2RDtBQUN6Ryw0Q0FBNEM7QUFDNUM7QUFDQSx1REFBdUQsaURBQWlELGNBQWM7QUFDdEgsK0NBQStDLGlDQUFpQztBQUNoRixxQkFBcUIsR0FBRztBQUN4QjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsNkNBQTZDO0FBQ3hGLGlCQUFpQiwwQ0FBMEM7QUFDM0Qsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hELHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQSxXQUFXO0FBQ1gscUNBQXFDLHVFQUF1RTtBQUM1Ryx5Q0FBeUMseURBQXlEO0FBQ2xHO0FBQ0E7QUFDQSx3REFBd0QsNkZBQTZGO0FBQ3JKLDZDQUE2QztBQUM3QyxtQ0FBbUMseURBQVE7QUFDM0M7QUFDQTtBQUNBLHVEQUF1RCxpREFBaUQsY0FBYztBQUN0SCwrQ0FBK0MseUJBQXlCO0FBQ3hFLHFCQUFxQixHQUFHO0FBQ3hCLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixnREFBZ0Qsd0ZBQXdGO0FBQ3hJLHlDQUF5Qyw4SEFBOEg7QUFDdks7QUFDQSxvREFBb0QsNkZBQTZGO0FBQ2pKLHFDQUFxQyxnUUFBZ1E7QUFDclMsZ0RBQWdELDZGQUE2RjtBQUM3STtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9ub2RlX21vZHVsZXMvbmFub2lkL25vbi1zZWN1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zY29wZS10by1kby8uL3NyYy9jb2RlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSkgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgbGV0IGkgPSBzaXplXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWQgKz0gYWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5sZW5ndGgpIHwgMF1cbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH1cbn1cbmxldCBuYW5vaWQgPSAoc2l6ZSA9IDIxKSA9PiB7XG4gIGxldCBpZCA9ICcnXG4gIGxldCBpID0gc2l6ZVxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWQgKz0gdXJsQWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiA2NCkgfCAwXVxuICB9XG4gIHJldHVybiBpZFxufVxuZXhwb3J0IHsgbmFub2lkLCBjdXN0b21BbHBoYWJldCB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgd2lkZ2V0IH0gPSBmaWdtYTtcbmNvbnN0IHsgdXNlU3luY2VkU3RhdGUsIHVzZVdpZGdldElkLCB1c2VQcm9wZXJ0eU1lbnUsIHVzZUVmZmVjdCwgQXV0b0xheW91dCwgVGV4dDogVGV4dEJsb2NrLCBTVkcsIFJlY3RhbmdsZSB9ID0gd2lkZ2V0O1xuaW1wb3J0IHsgbmFub2lkIGFzIGNyZWF0ZUlkIH0gZnJvbSAnbmFub2lkL25vbi1zZWN1cmUnO1xuZnVuY3Rpb24gVG9kb1dpZGdldCgpIHtcbiAgICBjb25zdCB3aWRnZXRJZCA9IHVzZVdpZGdldElkKCk7XG4gICAgY29uc3QgW3RvZG9zLCBzZXRUb2Rvc10gPSB1c2VTeW5jZWRTdGF0ZSgndG9kb3MnLCBbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ3VwZGF0ZS10aXRsZScpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2UobXNnLmlkLCAndGl0bGUnLCBtc2cudGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdkZWxldGUtdG9kbycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGVUb2RvKG1zZy5pZCk7XG4gICAgICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnZmxpcC10b2RvLXNjb3BlJykge1xuICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZShtc2cuaWQsICdzY29wZScsICFtc2cub3V0T2ZTY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2Nsb3NlLXBsdWdpbicpIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGRlbGV0ZVRvZG8oaWQpIHtcbiAgICAgICAgc2V0VG9kb3MoWy4uLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uaWQgIT09IGlkKV0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVUb2RvKGlkKSB7XG4gICAgICAgIHNldFRvZG9zKFtcbiAgICAgICAgICAgIC4uLnRvZG9zLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogaWQsIGlkLCB0aXRsZTogJycsIGRvbmU6IGZhbHNlLCBvdXRPZlNjb3BlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGlkLCBjaGFuZ2VkUHJvcCwgY2hhbmdlZFByb3BWYWx1ZSkge1xuICAgICAgICBjb25zdCBnZXRVcGRhdGVkVG9kbyA9ICh0b2RvKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZFByb3AgPT09IFwidGl0bGVcIikge1xuICAgICAgICAgICAgICAgIHRvZG8udGl0bGUgPSBjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3AgPT09IFwiZG9uZVwiKSB7XG4gICAgICAgICAgICAgICAgdG9kby5kb25lID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VkUHJvcCA9PT0gXCJvdXRPZlNjb3BlXCIpIHtcbiAgICAgICAgICAgICAgICB0b2RvLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0b2RvLm91dE9mU2NvcGUgPSAhY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmcmVzaFRvZG9zID0gdG9kb3MubWFwKHRvZG8gPT4ge1xuICAgICAgICAgICAgaWYgKHRvZG8uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFVwZGF0ZWRUb2RvKHRvZG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUb2RvcyhmcmVzaFRvZG9zKTtcbiAgICB9XG4gICAgdXNlUHJvcGVydHlNZW51KFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9vbHRpcDogXCJDbGVhciBhbGxcIixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogXCJjbGVhci1hbGxcIixcbiAgICAgICAgICAgIGl0ZW1UeXBlOiBcImFjdGlvblwiXG4gICAgICAgIH0sXG4gICAgXSwgKGUpID0+IHtcbiAgICAgICAgc2V0VG9kb3MoW10pO1xuICAgIH0pO1xuICAgIGNvbnN0IFRvZG8gPSAoeyBrZXksIGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiAnYXV0bycsIHdpZHRoOiAnZmlsbC1wYXJlbnQnIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6IDggfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGlkZGVuOiBkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZShpZCwgXCJkb25lXCIsIGRvbmUpLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjIuNVwiIHk9XCIyLjVcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiByeD1cIjMuNVwiIGZpbGw9XCJ3aGl0ZVwiIHN0cm9rZT1cIiNhZWFlYWVcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGlkZGVuOiAhZG9uZSB8fCBvdXRPZlNjb3BlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwiZG9uZVwiLCBkb25lKSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk02IDJDMy43OTA4NiAyIDIgMy43OTA4NiAyIDZWMTRDMiAxNi4yMDkxIDMuNzkwODYgMTggNiAxOEgxNEMxNi4yMDkxIDE4IDE4IDE2LjIwOTEgMTggMTRWNkMxOCAzLjc5MDg2IDE2LjIwOTEgMiAxNCAySDZaTTE0LjM0MDggOC43NDc0MUMxNC43NTM2IDguMjgzMDMgMTQuNzExOCA3LjU3MTk1IDE0LjI0NzQgNy4xNTkxNkMxMy43ODMgNi43NDYzOCAxMy4wNzE5IDYuNzg4MjEgMTIuNjU5MiA3LjI1MjU5TDEwLjY1OTIgOS41MDI1OUw5LjQ1MTgzIDEwLjg2MDhMNy43OTU1IDkuMjA0NUM3LjM1NjE2IDguNzY1MTYgNi42NDM4NCA4Ljc2NTE2IDYuMjA0NSA5LjIwNDVDNS43NjUxNyA5LjY0Mzg0IDUuNzY1MTcgMTAuMzU2MiA2LjIwNDUgMTAuNzk1NUw4LjcwNDUgMTMuMjk1NUM4LjkyMzU5IDEzLjUxNDYgOS4yMjMzNCAxMy42MzM2IDkuNTMzMDUgMTMuNjI0NUM5Ljg0Mjc1IDEzLjYxNTQgMTAuMTM1IDEzLjQ3OSAxMC4zNDA4IDEzLjI0NzRMMTIuMzQwOCAxMC45OTc0TDE0LjM0MDggOC43NDc0MVpcIiBmaWxsPVwiIzRBQjM5M1wiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFJlY3RhbmdsZSwgeyBoaWRkZW46ICFvdXRPZlNjb3BlLCBmaWxsOiAnI2YyZjJmMicsIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogb3V0T2ZTY29wZSB8fCBkb25lID8gXCIjNkU2RTZFXCIgOiBcIiMxMDEwMTBcIiwgZm9udFNpemU6IGRvbmUgfHwgb3V0T2ZTY29wZSA/IDEzIDogMTQsIGxpbmVIZWlnaHQ6IDIwLCB3aWR0aDogMTgwLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLnVpLCB7IGhlaWdodDogNTYsIHRpdGxlOiAnRWRpdCB5b3VyIHRvZG8nLCBwb3NpdGlvbjogeyB5OiAwLCB4OiAwIH0gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlZGl0JywgaWQsIHRpdGxlLCB3aWRnZXQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH0sIHRpdGxlKSksXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0XG4gICAgICAgICAgICAvLyBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwib3V0T2ZTY29wZVwiLCBvdXRPZlNjb3BlKX1cbiAgICAgICAgICAgICwgeyBcbiAgICAgICAgICAgICAgICAvLyBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwib3V0T2ZTY29wZVwiLCBvdXRPZlNjb3BlKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBmaWdtYS5nZXROb2RlQnlJZCh3aWRnZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX3VpRmlsZXNfXy5tZW51KTtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbWVudScsIGlkLCB0aXRsZSwgb3V0T2ZTY29wZSwgd2lkZ2V0IH0pO1xuICAgICAgICAgICAgICAgIH0pLCBmaWxsOiBvdXRPZlNjb3BlID8gXCIjZjJmMmYyXCIgOiBcIiNmZmZcIiB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjEuNlwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI4XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjE0LjRcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgY29ybmVyUmFkaXVzOiA4LCBmaWxsOiAnI2ZmZicsIHdpZHRoOiAzMjAsIHN0cm9rZTogJyNFOUU5RTknLCBlZmZlY3Q6IHtcbiAgICAgICAgICAgIHR5cGU6ICdkcm9wLXNoYWRvdycsXG4gICAgICAgICAgICBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAwLCBhOiAwLjA2IH0sXG4gICAgICAgICAgICBvZmZzZXQ6IHsgeDogMCwgeTogNCB9LFxuICAgICAgICAgICAgYmx1cjogMTIsXG4gICAgICAgICAgICBzcHJlYWQ6IC0yNCxcbiAgICAgICAgfSB9LFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogMjQsIHBhZGRpbmc6IDI0LCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIHNwYWNpbmc6IDgsIHdpZHRoOiAnZmlsbC1wYXJlbnQnIH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+ICF0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnY2VudGVyJywgc3BhY2luZzogOCwgZmlsbDogJyNmZmYnLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVG9kbyhpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBmaWdtYS5nZXROb2RlQnlJZCh3aWRnZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkoX191aUZpbGVzX18udWksIHsgaGVpZ2h0OiA1NiwgdGl0bGU6ICdFZGl0IHlvdXIgdG9kbycsIHBvc2l0aW9uOiB7IHk6IDAsIHg6IDAgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2FkZCcsIGlkLCB3aWRnZXQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMC4xMjUgNUMxMC43NDYzIDUgMTEuMjUgNS40NDc3MiAxMS4yNSA2VjE0QzExLjI1IDE0LjU1MjMgMTAuNzQ2MyAxNSAxMC4xMjUgMTVDOS41MDM2OCAxNSA5IDE0LjU1MjMgOSAxNFY2QzkgNS40NDc3MiA5LjUwMzY4IDUgMTAuMTI1IDVaXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNSA5Ljg3NUM1IDkuMjUzNjggNS40NDc3MiA4Ljc1IDYgOC43NUwxNCA4Ljc1QzE0LjU1MjMgOC43NSAxNSA5LjI1MzY4IDE1IDkuODc1QzE1IDEwLjQ5NjMgMTQuNTUyMyAxMSAxNCAxMUw2IDExQzUuNDQ3NzIgMTEgNSAxMC40OTYzIDUgOS44NzVaXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiAnIzk0OTQ5NCcsIGZvbnRTaXplOiAxNCwgbGluZUhlaWdodDogMjAsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJy0wLjglJyB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4LCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LCB0b2Rvc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiB0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSkpLFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKS5sZW5ndGggPT09IDAsIHdpZHRoOiAnZmlsbC1wYXJlbnQnLCBoZWlnaHQ6ICF0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCA/IDQwIDogJ2h1Zy1jb250ZW50cycsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgaG9yaXpvbnRhbEFsaWduSXRlbXM6ICdjZW50ZXInLCBzcGFjaW5nOiA4LCBwYWRkaW5nOiAyNCwgZmlsbDogJyNmMmYyZjInIH0sIHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSkpO1xufVxud2lkZ2V0LnJlZ2lzdGVyKFRvZG9XaWRnZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9