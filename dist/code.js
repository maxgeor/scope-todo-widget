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
                handleChange(msg.id, 'outOfScope', msg.outOfScope);
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
        const updateTodo = (todo) => {
            if (changedProp === 'title') {
                todo.title = changedPropValue;
            }
            else if (changedProp === 'done') {
                todo.done = !changedPropValue;
            }
            else if (changedProp === 'outOfScope') {
                todo.done = false;
                todo.outOfScope = changedPropValue;
            }
            return todo;
        };
        const freshTodos = todos.map(todo => {
            if (todo.id === id) {
                return updateTodo(todo);
            }
            else {
                return todo;
            }
        });
        setTodos(freshTodos);
    }
    usePropertyMenu([
        {
            tooltip: "Clear All",
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
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#101010", fontSize: done || outOfScope ? 13 : 14, lineHeight: 20, width: 180, onClick: () => new Promise((resolve) => {
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__uiFiles__.ui, { height: 56, title: 'Edit your todo', position: { y: widget.y - 151, x: widget.x } });
                        figma.ui.postMessage({ type: 'edit', id, title, widget });
                    }) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => new Promise((resolve) => {
                    const widget = figma.getNodeById(widgetId);
                    figma.showUI(__uiFiles__.menu, { height: 85, width: 180, title: 'Menu', position: { y: widget.y, x: widget.x + widget.width + 7 } });
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
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', width: 320, stroke: '#e7e7e7', effect: {
            type: 'drop-shadow',
            color: { r: 0, g: 0, b: 0, a: 0.09 },
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
                        figma.showUI(__uiFiles__.ui, { height: 56, title: 'Add a todo', position: { y: widget.y - 151, x: widget.x } });
                        figma.ui.postMessage({ type: 'add', id, widget });
                    }) },
                    figma.widget.h(SVG, { src: `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 5C10.7463 5 11.25 5.44772 11.25 6V14C11.25 14.5523 10.7463 15 10.125 15C9.50368 15 9 14.5523 9 14V6C9 5.44772 9.50368 5 10.125 5Z" fill="#949494"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875C5 9.25368 5.44772 8.75 6 8.75L14 8.75C14.5523 8.75 15 9.25368 15 9.875C15 10.4963 14.5523 11 14 11L6 11C5.44772 11 5 10.4963 5 9.875Z" fill="#949494"/>
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#949494', fontSize: 14, lineHeight: 20, fontWeight: 700, letterSpacing: '-0.75%' }, "Add a todo"))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsdUdBQXVHO0FBQ3hEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTCxvQkFBb0Isa0NBQWtDO0FBQ3RELDZDQUE2Qyw2RkFBNkY7QUFDMUkseUNBQXlDLGtFQUFrRTtBQUMzRyxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsNENBQTRDLDZEQUE2RDtBQUN6Ryw0Q0FBNEM7QUFDNUM7QUFDQSx1REFBdUQsaURBQWlELGtDQUFrQztBQUMxSSwrQ0FBK0MsaUNBQWlDO0FBQ2hGLHFCQUFxQixHQUFHO0FBQ3hCLHlDQUF5QztBQUN6QztBQUNBLHFEQUFxRCxtREFBbUQsK0NBQStDO0FBQ3ZKLDJDQUEyQyw2Q0FBNkM7QUFDeEYsaUJBQWlCLDBDQUEwQztBQUMzRCxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLHlDQUF5QztBQUN6QztBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQsc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBLFdBQVc7QUFDWCxxQ0FBcUMsdUVBQXVFO0FBQzVHLHlDQUF5Qyx5REFBeUQ7QUFDbEc7QUFDQTtBQUNBLHdEQUF3RCw2RkFBNkY7QUFDckosNkNBQTZDO0FBQzdDLG1DQUFtQyx5REFBUTtBQUMzQztBQUNBO0FBQ0EsdURBQXVELDZDQUE2QyxrQ0FBa0M7QUFDdEksK0NBQStDLHlCQUF5QjtBQUN4RSxxQkFBcUIsR0FBRztBQUN4QiwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZ0RBQWdELHlGQUF5RjtBQUN6SSx5Q0FBeUMsOEhBQThIO0FBQ3ZLO0FBQ0Esb0RBQW9ELDZGQUE2RjtBQUNqSixxQ0FBcUMsZ1FBQWdRO0FBQ3JTLGdEQUFnRCw2RkFBNkY7QUFDN0k7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Njb3BlLXRvLWRvLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9ub24tc2VjdXJlL2luZGV4LmpzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9zcmMvY29kZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIHNpemUpID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIGxldCBpID0gc2l6ZVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlkICs9IGFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKSB8IDBdXG4gICAgfVxuICAgIHJldHVybiBpZFxuICB9XG59XG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgaSA9IHNpemVcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogNjQpIHwgMF1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCB7IHdpZGdldCB9ID0gZmlnbWE7XG5jb25zdCB7IHVzZVN5bmNlZFN0YXRlLCB1c2VXaWRnZXRJZCwgdXNlUHJvcGVydHlNZW51LCB1c2VFZmZlY3QsIEF1dG9MYXlvdXQsIFRleHQ6IFRleHRCbG9jaywgU1ZHLCBSZWN0YW5nbGUgfSA9IHdpZGdldDtcbmltcG9ydCB7IG5hbm9pZCBhcyBjcmVhdGVJZCB9IGZyb20gJ25hbm9pZC9ub24tc2VjdXJlJztcbmZ1bmN0aW9uIFRvZG9XaWRnZXQoKSB7XG4gICAgY29uc3Qgd2lkZ2V0SWQgPSB1c2VXaWRnZXRJZCgpO1xuICAgIGNvbnN0IFt0b2Rvcywgc2V0VG9kb3NdID0gdXNlU3luY2VkU3RhdGUoJ3RvZG9zJywgW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICd1cGRhdGUtdGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlQ2hhbmdlKG1zZy5pZCwgJ3RpdGxlJywgbXNnLnRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnZGVsZXRlLXRvZG8nKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlVG9kbyhtc2cuaWQpO1xuICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2ZsaXAtdG9kby1zY29wZScpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVDaGFuZ2UobXNnLmlkLCAnb3V0T2ZTY29wZScsIG1zZy5vdXRPZlNjb3BlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnY2xvc2UtcGx1Z2luJykge1xuICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gZGVsZXRlVG9kbyhpZCkge1xuICAgICAgICBzZXRUb2RvcyhbLi4udG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5pZCAhPT0gaWQpXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRvZG8oaWQpIHtcbiAgICAgICAgc2V0VG9kb3MoW1xuICAgICAgICAgICAgLi4udG9kb3MsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBpZCwgaWQsIHRpdGxlOiAnJywgZG9uZTogZmFsc2UsIG91dE9mU2NvcGU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoaWQsIGNoYW5nZWRQcm9wLCBjaGFuZ2VkUHJvcFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wID09PSAndGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgdG9kby50aXRsZSA9IGNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VkUHJvcCA9PT0gJ2RvbmUnKSB7XG4gICAgICAgICAgICAgICAgdG9kby5kb25lID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VkUHJvcCA9PT0gJ291dE9mU2NvcGUnKSB7XG4gICAgICAgICAgICAgICAgdG9kby5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdG9kby5vdXRPZlNjb3BlID0gY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmcmVzaFRvZG9zID0gdG9kb3MubWFwKHRvZG8gPT4ge1xuICAgICAgICAgICAgaWYgKHRvZG8uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZVRvZG8odG9kbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRvZG9zKGZyZXNoVG9kb3MpO1xuICAgIH1cbiAgICB1c2VQcm9wZXJ0eU1lbnUoW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b29sdGlwOiBcIkNsZWFyIEFsbFwiLFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBcImNsZWFyLWFsbFwiLFxuICAgICAgICAgICAgaXRlbVR5cGU6IFwiYWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICBdLCAoZSkgPT4ge1xuICAgICAgICBzZXRUb2RvcyhbXSk7XG4gICAgfSk7XG4gICAgY29uc3QgVG9kbyA9ICh7IGtleSwgaWQsIHRpdGxlLCBkb25lLCBvdXRPZlNjb3BlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6ICdhdXRvJywgd2lkdGg6ICdmaWxsLXBhcmVudCcgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ3N0YXJ0Jywgc3BhY2luZzogOCB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46IGRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcImRvbmVcIiwgZG9uZSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMi41XCIgeT1cIjIuNVwiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHJ4PVwiMy41XCIgZmlsbD1cIndoaXRlXCIgc3Ryb2tlPVwiI2FlYWVhZVwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46ICFkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZShpZCwgXCJkb25lXCIsIGRvbmUpLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTYgMkMzLjc5MDg2IDIgMiAzLjc5MDg2IDIgNlYxNEMyIDE2LjIwOTEgMy43OTA4NiAxOCA2IDE4SDE0QzE2LjIwOTEgMTggMTggMTYuMjA5MSAxOCAxNFY2QzE4IDMuNzkwODYgMTYuMjA5MSAyIDE0IDJINlpNMTQuMzQwOCA4Ljc0NzQxQzE0Ljc1MzYgOC4yODMwMyAxNC43MTE4IDcuNTcxOTUgMTQuMjQ3NCA3LjE1OTE2QzEzLjc4MyA2Ljc0NjM4IDEzLjA3MTkgNi43ODgyMSAxMi42NTkyIDcuMjUyNTlMMTAuNjU5MiA5LjUwMjU5TDkuNDUxODMgMTAuODYwOEw3Ljc5NTUgOS4yMDQ1QzcuMzU2MTYgOC43NjUxNiA2LjY0Mzg0IDguNzY1MTYgNi4yMDQ1IDkuMjA0NUM1Ljc2NTE3IDkuNjQzODQgNS43NjUxNyAxMC4zNTYyIDYuMjA0NSAxMC43OTU1TDguNzA0NSAxMy4yOTU1QzguOTIzNTkgMTMuNTE0NiA5LjIyMzM0IDEzLjYzMzYgOS41MzMwNSAxMy42MjQ1QzkuODQyNzUgMTMuNjE1NCAxMC4xMzUgMTMuNDc5IDEwLjM0MDggMTMuMjQ3NEwxMi4zNDA4IDEwLjk5NzRMMTQuMzQwOCA4Ljc0NzQxWlwiIGZpbGw9XCIjNEFCMzkzXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoUmVjdGFuZ2xlLCB7IGhpZGRlbjogIW91dE9mU2NvcGUsIGZpbGw6ICcjZjJmMmYyJywgd2lkdGg6IDIwLCBoZWlnaHQ6IDIwIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiBvdXRPZlNjb3BlID8gXCIjNkU2RTZFXCIgOiBkb25lID8gXCIjNzY3Njc2XCIgOiBcIiMxMDEwMTBcIiwgZm9udFNpemU6IGRvbmUgfHwgb3V0T2ZTY29wZSA/IDEzIDogMTQsIGxpbmVIZWlnaHQ6IDIwLCB3aWR0aDogMTgwLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLnVpLCB7IGhlaWdodDogNTYsIHRpdGxlOiAnRWRpdCB5b3VyIHRvZG8nLCBwb3NpdGlvbjogeyB5OiB3aWRnZXQueSAtIDE1MSwgeDogd2lkZ2V0LnggfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2VkaXQnLCBpZCwgdGl0bGUsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSwgdGl0bGUpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgb25DbGljazogKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkoX191aUZpbGVzX18ubWVudSwgeyBoZWlnaHQ6IDg1LCB3aWR0aDogMTgwLCB0aXRsZTogJ01lbnUnLCBwb3NpdGlvbjogeyB5OiB3aWRnZXQueSwgeDogd2lkZ2V0LnggKyB3aWRnZXQud2lkdGggKyA3IH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ21lbnUnLCBpZCwgdGl0bGUsIG91dE9mU2NvcGUsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICB9KSwgZmlsbDogb3V0T2ZTY29wZSA/IFwiI2YyZjJmMlwiIDogXCIjZmZmXCIgfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxLjZcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiOFwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNC40XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSkpKTtcbiAgICB9O1xuICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIGNvcm5lclJhZGl1czogOCwgZmlsbDogJyNmZmYnLCB3aWR0aDogMzIwLCBzdHJva2U6ICcjZTdlN2U3JywgZWZmZWN0OiB7XG4gICAgICAgICAgICB0eXBlOiAnZHJvcC1zaGFkb3cnLFxuICAgICAgICAgICAgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCwgYTogMC4wOSB9LFxuICAgICAgICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDQgfSxcbiAgICAgICAgICAgIGJsdXI6IDEyLFxuICAgICAgICAgICAgc3ByZWFkOiAtMjQsXG4gICAgICAgIH0gfSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIHNwYWNpbmc6IDI0LCBwYWRkaW5nOiAyNCwgd2lkdGg6ICdmaWxsLXBhcmVudCcgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4LCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LFxuICAgICAgICAgICAgICAgIHRvZG9zXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiAhdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIGZpbGw6ICcjZmZmJywgb25DbGljazogKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY3JlYXRlSWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRvZG8oaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLnVpLCB7IGhlaWdodDogNTYsIHRpdGxlOiAnQWRkIGEgdG9kbycsIHBvc2l0aW9uOiB7IHk6IHdpZGdldC55IC0gMTUxLCB4OiB3aWRnZXQueCB9IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnYWRkJywgaWQsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEwLjEyNSA1QzEwLjc0NjMgNSAxMS4yNSA1LjQ0NzcyIDExLjI1IDZWMTRDMTEuMjUgMTQuNTUyMyAxMC43NDYzIDE1IDEwLjEyNSAxNUM5LjUwMzY4IDE1IDkgMTQuNTUyMyA5IDE0VjZDOSA1LjQ0NzcyIDkuNTAzNjggNSAxMC4xMjUgNVpcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01IDkuODc1QzUgOS4yNTM2OCA1LjQ0NzcyIDguNzUgNiA4Ljc1TDE0IDguNzVDMTQuNTUyMyA4Ljc1IDE1IDkuMjUzNjggMTUgOS44NzVDMTUgMTAuNDk2MyAxNC41NTIzIDExIDE0IDExTDYgMTFDNS40NDc3MiAxMSA1IDEwLjQ5NjMgNSA5Ljg3NVpcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6ICcjOTQ5NDk0JywgZm9udFNpemU6IDE0LCBsaW5lSGVpZ2h0OiAyMCwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnLTAuNzUlJyB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4LCB3aWR0aDogJ2ZpbGwtcGFyZW50JyB9LCB0b2Rvc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiB0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSkpLFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKS5sZW5ndGggPT09IDAsIHdpZHRoOiAnZmlsbC1wYXJlbnQnLCBoZWlnaHQ6ICF0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCA/IDQwIDogJ2h1Zy1jb250ZW50cycsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgaG9yaXpvbnRhbEFsaWduSXRlbXM6ICdjZW50ZXInLCBzcGFjaW5nOiA4LCBwYWRkaW5nOiAyNCwgZmlsbDogJyNmMmYyZjInIH0sIHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSkpO1xufVxud2lkZ2V0LnJlZ2lzdGVyKFRvZG9XaWRnZXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9