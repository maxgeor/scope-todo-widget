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
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 280 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V14C2 16.2091 3.79086 18 6 18H14C16.2091 18 18 16.2091 18 14V6C18 3.79086 16.2091 2 14 2H6ZM14.4343 8.83045C14.8929 8.31448 14.8464 7.52439 14.3305 7.06574C13.8145 6.60709 13.0244 6.65357 12.5657 7.16955L9.44648 10.6787L7.88388 9.11612C7.39573 8.62796 6.60427 8.62796 6.11612 9.11612C5.62796 9.60427 5.62796 10.3957 6.11612 10.8839L8.61612 13.3839C8.85955 13.6273 9.1926 13.7596 9.53672 13.7495C9.88083 13.7393 10.2055 13.5878 10.4343 13.3305L14.4343 8.83045Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 20, height: 20 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#101010", fontSize: done || outOfScope ? 13 : 14, lineHeight: 20, width: 200, onClick: () => new Promise((resolve) => {
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__html__);
                        figma.ui.postMessage({ type: 'edit', id, title, widget });
                    }) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => handleChange(id, "outOfScope", outOfScope), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="9" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="9" y="9" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="15" y="9" width="4" height="4" rx="2" fill="#949494"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 334 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 6C11.25 5.30964 10.6904 4.75 10 4.75C9.30964 4.75 8.75 5.30964 8.75 6V8.75H6C5.30964 8.75 4.75 9.30964 4.75 10C4.75 10.6904 5.30964 11.25 6 11.25H8.75V14C8.75 14.6904 9.30964 15.25 10 15.25C10.6904 15.25 11.25 14.6904 11.25 14V11.25H14C14.6904 11.25 15.25 10.6904 15.25 10C15.25 9.30964 14.6904 8.75 14 8.75H11.25V6Z"/>
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#949494', fontSize: 14, lineHeight: 20, fontWeight: 700 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.done && !todo.outOfScope).length, direction: 'vertical', spacing: 8 }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        figma.widget.h(AutoLayout, { width: 'fill-parent', height: !todos.filter(todo => todo.outOfScope).length ? 40 : 'hug-contents', direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(TodoWidget);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsc0ZBQXNGO0FBQ3ZDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsNkNBQTZDLG1GQUFtRjtBQUNoSSx5Q0FBeUMsa0VBQWtFO0FBQzNHLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Ysc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiw0Q0FBNEMsNkRBQTZEO0FBQ3pHLDRDQUE0QztBQUM1QztBQUNBO0FBQ0EsK0NBQStDLGlDQUFpQztBQUNoRixxQkFBcUIsR0FBRztBQUN4Qix5Q0FBeUMsa0dBQWtHO0FBQzNJLHNDQUFzQztBQUN0QyxzRUFBc0UsbUNBQW1DO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EseUNBQXlDLHFHQUFxRztBQUM5SSxxQ0FBcUMsaURBQWlEO0FBQ3RGLHlDQUF5QyxtQ0FBbUM7QUFDNUU7QUFDQTtBQUNBLHdEQUF3RCw2RkFBNkY7QUFDckosNkNBQTZDO0FBQzdDLG1DQUFtQyx5REFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MseUJBQXlCO0FBQ3hFLHFCQUFxQixHQUFHO0FBQ3hCLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZ0RBQWdELGdFQUFnRTtBQUNoSCx5Q0FBeUMsd0dBQXdHO0FBQ2pKO0FBQ0Esb0RBQW9ELDZGQUE2RjtBQUNqSixxQ0FBcUMsb01BQW9NO0FBQ3pPLGdEQUFnRCw2RkFBNkY7QUFDN0k7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Njb3BlLXRvLWRvLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9ub24tc2VjdXJlL2luZGV4LmpzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9zcmMvY29kZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIHNpemUpID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIGxldCBpID0gc2l6ZVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlkICs9IGFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKSB8IDBdXG4gICAgfVxuICAgIHJldHVybiBpZFxuICB9XG59XG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgaSA9IHNpemVcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogNjQpIHwgMF1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCB7IHdpZGdldCB9ID0gZmlnbWE7XG5jb25zdCB7IHVzZVN5bmNlZFN0YXRlLCB1c2VXaWRnZXRJZCwgdXNlRWZmZWN0LCBBdXRvTGF5b3V0LCBUZXh0OiBUZXh0QmxvY2ssIFNWRywgUmVjdGFuZ2xlIH0gPSB3aWRnZXQ7XG5pbXBvcnQgeyBuYW5vaWQgYXMgY3JlYXRlSWQgfSBmcm9tICduYW5vaWQvbm9uLXNlY3VyZSc7XG5mdW5jdGlvbiBUb2RvV2lkZ2V0KCkge1xuICAgIGNvbnN0IHdpZGdldElkID0gdXNlV2lkZ2V0SWQoKTtcbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN5bmNlZFN0YXRlKCd0b2RvcycsIFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSAndXBkYXRlLXRpdGxlJykge1xuICAgICAgICAgICAgICAgIGhhbmRsZUNoYW5nZShtc2cuaWQsICd0aXRsZScsIG1zZy50aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2RlbGV0ZS10b2RvJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG8obXNnLmlkKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdjbG9zZS1wbHVnaW4nKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBkZWxldGVUb2RvKGlkKSB7XG4gICAgICAgIHNldFRvZG9zKFsuLi50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBpZCldKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVG9kbyhpZCkge1xuICAgICAgICBzZXRUb2RvcyhbXG4gICAgICAgICAgICAuLi50b2RvcyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGlkLCBpZCwgdGl0bGU6ICcnLCBkb25lOiBmYWxzZSwgb3V0T2ZTY29wZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShpZCwgY2hhbmdlZFByb3AsIGNoYW5nZWRQcm9wVmFsdWUpIHtcbiAgICAgICAgY29uc3QgZ2V0VXBkYXRlZFRvZG8gPSAodG9kbykgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wID09PSBcInRpdGxlXCIpIHtcbiAgICAgICAgICAgICAgICB0b2RvLnRpdGxlID0gY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZWRQcm9wID09PSBcImRvbmVcIikge1xuICAgICAgICAgICAgICAgIHRvZG8uZG9uZSA9ICFjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3AgPT09IFwib3V0T2ZTY29wZVwiKSB7XG4gICAgICAgICAgICAgICAgdG9kby5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdG9kby5vdXRPZlNjb3BlID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZnJlc2hUb2RvcyA9IHRvZG9zLm1hcCh0b2RvID0+IHtcbiAgICAgICAgICAgIGlmICh0b2RvLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRVcGRhdGVkVG9kbyh0b2RvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0VG9kb3MoZnJlc2hUb2Rvcyk7XG4gICAgfVxuICAgIGNvbnN0IFRvZG8gPSAoeyBrZXksIGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiAnYXV0bycsIHdpZHRoOiAyODAgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ3N0YXJ0Jywgc3BhY2luZzogOCB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46IGRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcImRvbmVcIiwgZG9uZSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMi41XCIgeT1cIjIuNVwiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHJ4PVwiMy41XCIgZmlsbD1cIndoaXRlXCIgc3Ryb2tlPVwiI2FlYWVhZVwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46ICFkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZShpZCwgXCJkb25lXCIsIGRvbmUpLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTYgMkMzLjc5MDg2IDIgMiAzLjc5MDg2IDIgNlYxNEMyIDE2LjIwOTEgMy43OTA4NiAxOCA2IDE4SDE0QzE2LjIwOTEgMTggMTggMTYuMjA5MSAxOCAxNFY2QzE4IDMuNzkwODYgMTYuMjA5MSAyIDE0IDJINlpNMTQuNDM0MyA4LjgzMDQ1QzE0Ljg5MjkgOC4zMTQ0OCAxNC44NDY0IDcuNTI0MzkgMTQuMzMwNSA3LjA2NTc0QzEzLjgxNDUgNi42MDcwOSAxMy4wMjQ0IDYuNjUzNTcgMTIuNTY1NyA3LjE2OTU1TDkuNDQ2NDggMTAuNjc4N0w3Ljg4Mzg4IDkuMTE2MTJDNy4zOTU3MyA4LjYyNzk2IDYuNjA0MjcgOC42Mjc5NiA2LjExNjEyIDkuMTE2MTJDNS42Mjc5NiA5LjYwNDI3IDUuNjI3OTYgMTAuMzk1NyA2LjExNjEyIDEwLjg4MzlMOC42MTYxMiAxMy4zODM5QzguODU5NTUgMTMuNjI3MyA5LjE5MjYgMTMuNzU5NiA5LjUzNjcyIDEzLjc0OTVDOS44ODA4MyAxMy43MzkzIDEwLjIwNTUgMTMuNTg3OCAxMC40MzQzIDEzLjMzMDVMMTQuNDM0MyA4LjgzMDQ1WlwiIGZpbGw9XCIjNEFCMzkzXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoUmVjdGFuZ2xlLCB7IGhpZGRlbjogIW91dE9mU2NvcGUsIGZpbGw6ICcjZjJmMmYyJywgd2lkdGg6IDIwLCBoZWlnaHQ6IDIwIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiBvdXRPZlNjb3BlID8gXCIjNkU2RTZFXCIgOiBkb25lID8gXCIjNzY3Njc2XCIgOiBcIiMxMDEwMTBcIiwgZm9udFNpemU6IGRvbmUgfHwgb3V0T2ZTY29wZSA/IDEzIDogMTQsIGxpbmVIZWlnaHQ6IDIwLCB3aWR0aDogMjAwLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2VkaXQnLCBpZCwgdGl0bGUsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSwgdGl0bGUpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcIm91dE9mU2NvcGVcIiwgb3V0T2ZTY29wZSksIGZpbGw6IG91dE9mU2NvcGUgPyBcIiNmMmYyZjJcIiA6IFwiI2ZmZlwiIH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwiJHtvdXRPZlNjb3BlID8gXCIjOTE5MTkxXCIgOiBcIiM5NDk0OTRcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjNcIiB5PVwiOVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiOVwiIHk9XCI5XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNVwiIHk9XCI5XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSkpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBjb3JuZXJSYWRpdXM6IDgsIGZpbGw6ICcjZmZmJywgc3Ryb2tlOiAnI0U1RTVFNScsIHN0cm9rZVdpZHRoOiAxLCB3aWR0aDogMzM0IH0sXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiAyNCwgcGFkZGluZzogMjQgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+ICF0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnY2VudGVyJywgc3BhY2luZzogOCwgZmlsbDogJyNmZmYnLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVG9kbyhpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBmaWdtYS5nZXROb2RlQnlJZCh3aWRnZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnYWRkJywgaWQsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCIjYTJhMmEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTExLjI1IDZDMTEuMjUgNS4zMDk2NCAxMC42OTA0IDQuNzUgMTAgNC43NUM5LjMwOTY0IDQuNzUgOC43NSA1LjMwOTY0IDguNzUgNlY4Ljc1SDZDNS4zMDk2NCA4Ljc1IDQuNzUgOS4zMDk2NCA0Ljc1IDEwQzQuNzUgMTAuNjkwNCA1LjMwOTY0IDExLjI1IDYgMTEuMjVIOC43NVYxNEM4Ljc1IDE0LjY5MDQgOS4zMDk2NCAxNS4yNSAxMCAxNS4yNUMxMC42OTA0IDE1LjI1IDExLjI1IDE0LjY5MDQgMTEuMjUgMTRWMTEuMjVIMTRDMTQuNjkwNCAxMS4yNSAxNS4yNSAxMC42OTA0IDE1LjI1IDEwQzE1LjI1IDkuMzA5NjQgMTQuNjkwNCA4Ljc1IDE0IDguNzVIMTEuMjVWNlpcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiAnIzk0OTQ5NCcsIGZvbnRTaXplOiAxNCwgbGluZUhlaWdodDogMjAsIGZvbnRXZWlnaHQ6IDcwMCB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0sIHRvZG9zXG4gICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+IHRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSksXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgd2lkdGg6ICdmaWxsLXBhcmVudCcsIGhlaWdodDogIXRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSkubGVuZ3RoID8gNDAgOiAnaHVnLWNvbnRlbnRzJywgZGlyZWN0aW9uOiAndmVydGljYWwnLCBob3Jpem9udGFsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIHBhZGRpbmc6IDI0LCBmaWxsOiAnI2YyZjJmMicgfSwgdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSkpKSk7XG59XG53aWRnZXQucmVnaXN0ZXIoVG9kb1dpZGdldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=