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
const { useSyncedState, useWidgetId, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;

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
                        figma.showUI(__html__, { height: 56, title: 'Edit your todo', position: { y: -950, x: 527 } });
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
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 315 },
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
                    figma.widget.h(TextBlock, { fill: '#8B8B8B', fontSize: 13, lineHeight: 20, fontWeight: 700 }, "Add a todo"))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsc0ZBQXNGO0FBQ3ZDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsNkNBQTZDLDZGQUE2RjtBQUMxSSx5Q0FBeUMsa0VBQWtFO0FBQzNHLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Ysc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiw0Q0FBNEMsNkRBQTZEO0FBQ3pHLDRDQUE0QztBQUM1QztBQUNBLGlEQUFpRCxpREFBaUQsbUJBQW1CO0FBQ3JILCtDQUErQyxpQ0FBaUM7QUFDaEYscUJBQXFCLEdBQUc7QUFDeEIseUNBQXlDLGtHQUFrRztBQUMzSSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLHlDQUF5QyxxR0FBcUc7QUFDOUkscUNBQXFDLHVFQUF1RTtBQUM1Ryx5Q0FBeUMseURBQXlEO0FBQ2xHO0FBQ0E7QUFDQSx3REFBd0QsNkZBQTZGO0FBQ3JKLDZDQUE2QztBQUM3QyxtQ0FBbUMseURBQVE7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLHlCQUF5QjtBQUN4RSxxQkFBcUIsR0FBRztBQUN4QiwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZ0RBQWdELGdFQUFnRTtBQUNoSCx5Q0FBeUMsOEhBQThIO0FBQ3ZLO0FBQ0Esb0RBQW9ELDZGQUE2RjtBQUNqSixxQ0FBcUMsZ1FBQWdRO0FBQ3JTLGdEQUFnRCw2RkFBNkY7QUFDN0k7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Njb3BlLXRvLWRvLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9ub24tc2VjdXJlL2luZGV4LmpzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9zcmMvY29kZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIHNpemUpID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIGxldCBpID0gc2l6ZVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlkICs9IGFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKSB8IDBdXG4gICAgfVxuICAgIHJldHVybiBpZFxuICB9XG59XG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgaSA9IHNpemVcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogNjQpIHwgMF1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCB7IHdpZGdldCB9ID0gZmlnbWE7XG5jb25zdCB7IHVzZVN5bmNlZFN0YXRlLCB1c2VXaWRnZXRJZCwgdXNlRWZmZWN0LCBBdXRvTGF5b3V0LCBUZXh0OiBUZXh0QmxvY2ssIFNWRywgUmVjdGFuZ2xlIH0gPSB3aWRnZXQ7XG5pbXBvcnQgeyBuYW5vaWQgYXMgY3JlYXRlSWQgfSBmcm9tICduYW5vaWQvbm9uLXNlY3VyZSc7XG5mdW5jdGlvbiBUb2RvV2lkZ2V0KCkge1xuICAgIGNvbnN0IHdpZGdldElkID0gdXNlV2lkZ2V0SWQoKTtcbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN5bmNlZFN0YXRlKCd0b2RvcycsIFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAndXBkYXRlLXRpdGxlJykge1xuICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZShtc2cuaWQsICd0aXRsZScsIG1zZy50aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2RlbGV0ZS10b2RvJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG8obXNnLmlkKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdjbG9zZS1wbHVnaW4nKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBkZWxldGVUb2RvKGlkKSB7XG4gICAgICAgIHNldFRvZG9zKFsuLi50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBpZCldKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVG9kbyhpZCkge1xuICAgICAgICBzZXRUb2RvcyhbXG4gICAgICAgICAgICAuLi50b2RvcyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGlkLCBpZCwgdGl0bGU6ICcnLCBkb25lOiBmYWxzZSwgb3V0T2ZTY29wZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShpZCwgY2hhbmdlZFByb3AsIGNoYW5nZWRQcm9wVmFsdWUpIHtcbiAgICAgICAgY29uc3QgZ2V0VXBkYXRlZFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wID09PSBcInRpdGxlXCIpIHtcbiAgICAgICAgICAgICAgICB0b2RvLnRpdGxlID0gY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZWRQcm9wID09PSBcImRvbmVcIikge1xuICAgICAgICAgICAgICAgIHRvZG8uZG9uZSA9ICFjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3AgPT09IFwib3V0T2ZTY29wZVwiKSB7XG4gICAgICAgICAgICAgICAgdG9kby5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdG9kby5vdXRPZlNjb3BlID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZnJlc2hUb2RvcyA9IHRvZG9zLm1hcCh0b2RvID0+IHtcbiAgICAgICAgICAgIGlmICh0b2RvLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRVcGRhdGVkVG9kbyh0b2RvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VG9kb3MoZnJlc2hUb2Rvcyk7XG4gICAgfVxuICAgIGNvbnN0IFRvZG8gPSAoeyBrZXksIGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiAnYXV0bycsIHdpZHRoOiAnZmlsbC1wYXJlbnQnIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6IDggfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGlkZGVuOiBkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZShpZCwgXCJkb25lXCIsIGRvbmUpLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjIuNVwiIHk9XCIyLjVcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiByeD1cIjMuNVwiIGZpbGw9XCJ3aGl0ZVwiIHN0cm9rZT1cIiNhZWFlYWVcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGlkZGVuOiAhZG9uZSB8fCBvdXRPZlNjb3BlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwiZG9uZVwiLCBkb25lKSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk02IDJDMy43OTA4NiAyIDIgMy43OTA4NiAyIDZWMTRDMiAxNi4yMDkxIDMuNzkwODYgMTggNiAxOEgxNEMxNi4yMDkxIDE4IDE4IDE2LjIwOTEgMTggMTRWNkMxOCAzLjc5MDg2IDE2LjIwOTEgMiAxNCAySDZaTTE0LjM0MDggOC43NDc0MUMxNC43NTM2IDguMjgzMDMgMTQuNzExOCA3LjU3MTk1IDE0LjI0NzQgNy4xNTkxNkMxMy43ODMgNi43NDYzOCAxMy4wNzE5IDYuNzg4MjEgMTIuNjU5MiA3LjI1MjU5TDEwLjY1OTIgOS41MDI1OUw5LjQ1MTgzIDEwLjg2MDhMNy43OTU1IDkuMjA0NUM3LjM1NjE2IDguNzY1MTYgNi42NDM4NCA4Ljc2NTE2IDYuMjA0NSA5LjIwNDVDNS43NjUxNyA5LjY0Mzg0IDUuNzY1MTcgMTAuMzU2MiA2LjIwNDUgMTAuNzk1NUw4LjcwNDUgMTMuMjk1NUM4LjkyMzU5IDEzLjUxNDYgOS4yMjMzNCAxMy42MzM2IDkuNTMzMDUgMTMuNjI0NUM5Ljg0Mjc1IDEzLjYxNTQgMTAuMTM1IDEzLjQ3OSAxMC4zNDA4IDEzLjI0NzRMMTIuMzQwOCAxMC45OTc0TDE0LjM0MDggOC43NDc0MVpcIiBmaWxsPVwiIzRBQjM5M1wiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFJlY3RhbmdsZSwgeyBoaWRkZW46ICFvdXRPZlNjb3BlLCBmaWxsOiAnI2YyZjJmMicsIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogb3V0T2ZTY29wZSB8fCBkb25lID8gXCIjNkU2RTZFXCIgOiBcIiMxMDEwMTBcIiwgZm9udFNpemU6IGRvbmUgfHwgb3V0T2ZTY29wZSA/IDEzIDogMTQsIGxpbmVIZWlnaHQ6IDIwLCB3aWR0aDogMTgwLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTYsIHRpdGxlOiAnRWRpdCB5b3VyIHRvZG8nLCBwb3NpdGlvbjogeyB5OiAtOTUwLCB4OiA1MjcgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2VkaXQnLCBpZCwgdGl0bGUsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSwgdGl0bGUpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcIm91dE9mU2NvcGVcIiwgb3V0T2ZTY29wZSksIGZpbGw6IG91dE9mU2NvcGUgPyBcIiNmMmYyZjJcIiA6IFwiI2ZmZlwiIH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMS42XCIgeT1cIjhcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgZmlsbD1cIiM5NDk0OTRcIi8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjhcIiB5PVwiOFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMTQuNFwiIHk9XCI4XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSkpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBjb3JuZXJSYWRpdXM6IDgsIGZpbGw6ICcjZmZmJywgc3Ryb2tlOiAnI0U1RTVFNScsIHN0cm9rZVdpZHRoOiAxLCB3aWR0aDogMzE1IH0sXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiAyNCwgcGFkZGluZzogMjQsIHdpZHRoOiAnZmlsbC1wYXJlbnQnIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogOCwgd2lkdGg6ICdmaWxsLXBhcmVudCcgfSxcbiAgICAgICAgICAgICAgICB0b2Rvc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHRvZG8gPT4gIXRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdjZW50ZXInLCBzcGFjaW5nOiA4LCBmaWxsOiAnI2ZmZicsIG9uQ2xpY2s6ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNyZWF0ZUlkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2RvKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGZpZ21hLmdldE5vZGVCeUlkKHdpZGdldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdhZGQnLCBpZCwgd2lkZ2V0IH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSB9LFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgc3JjOiBgXG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTAuMTI1IDVDMTAuNzQ2MyA1IDExLjI1IDUuNDQ3NzIgMTEuMjUgNlYxNEMxMS4yNSAxNC41NTIzIDEwLjc0NjMgMTUgMTAuMTI1IDE1QzkuNTAzNjggMTUgOSAxNC41NTIzIDkgMTRWNkM5IDUuNDQ3NzIgOS41MDM2OCA1IDEwLjEyNSA1WlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTUgOS44NzVDNSA5LjI1MzY4IDUuNDQ3NzIgOC43NSA2IDguNzVMMTQgOC43NUMxNC41NTIzIDguNzUgMTUgOS4yNTM2OCAxNSA5Ljg3NUMxNSAxMC40OTYzIDE0LjU1MjMgMTEgMTQgMTFMNiAxMUM1LjQ0NzcyIDExIDUgMTAuNDk2MyA1IDkuODc1WlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogJyM4QjhCOEInLCBmb250U2l6ZTogMTMsIGxpbmVIZWlnaHQ6IDIwLCBmb250V2VpZ2h0OiA3MDAgfSwgXCJBZGQgYSB0b2RvXCIpKSksXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogIXRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKS5sZW5ndGgsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogOCwgd2lkdGg6ICdmaWxsLXBhcmVudCcgfSwgdG9kb3NcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSkpKSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBoaWRkZW46IHRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSkubGVuZ3RoID09PSAwLCB3aWR0aDogJ2ZpbGwtcGFyZW50JywgaGVpZ2h0OiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKS5sZW5ndGggPyA0MCA6ICdodWctY29udGVudHMnLCBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIGhvcml6b250YWxBbGlnbkl0ZW1zOiAnY2VudGVyJywgc3BhY2luZzogOCwgcGFkZGluZzogMjQsIGZpbGw6ICcjZjJmMmYyJyB9LCB0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSkpKTtcbn1cbndpZGdldC5yZWdpc3RlcihUb2RvV2lkZ2V0KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==