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
        const targetTodo = todos.find(todo => todo.id === id);
        if (changedProp === "title") {
            targetTodo.title = changedPropValue;
        }
        else if (changedProp === "done") {
            targetTodo.done = !changedPropValue;
        }
        else if (changedProp === "outOfScope") {
            targetTodo.done = false;
            targetTodo.outOfScope = !changedPropValue;
        }
        setTodos([...todos.filter(todo => todo.id !== id), targetTodo]);
    }
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 290 },
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
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#000", fontSize: 14, lineHeight: 20, width: 200, onClick: () => new Promise((resolve) => {
                        const widget = figma.getNodeById(widgetId);
                        figma.showUI(__html__);
                        figma.ui.postMessage({ type: 'edit', id, title, widget });
                    }) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => handleChange(id, "outOfScope", outOfScope), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="22" height="22" viewBox="0 0 22 22" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="9" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="9" y="9" width="4" height="4" rx="2" fill="#949494"/>
                <rect x="15" y="9" width="4" height="4" rx="2" fill="#949494"/>
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 344 },
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
        figma.widget.h(AutoLayout, { width: 'fill-parent', height: !todos.filter(todo => todo.outOfScope).length ? 48 : 'hug-contents', direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(TodoWidget);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsc0ZBQXNGO0FBQ3ZDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtDQUFrQztBQUN0RCw2Q0FBNkMsbUZBQW1GO0FBQ2hJLHlDQUF5QyxrRUFBa0U7QUFDM0csc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLDRDQUE0Qyw2REFBNkQ7QUFDekcsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQSwrQ0FBK0MsaUNBQWlDO0FBQ2hGLHFCQUFxQixHQUFHO0FBQ3hCLHlDQUF5QyxrR0FBa0c7QUFDM0ksc0NBQXNDO0FBQ3RDLHNFQUFzRSxtQ0FBbUM7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSx5Q0FBeUMscUdBQXFHO0FBQzlJLHFDQUFxQyxpREFBaUQ7QUFDdEYseUNBQXlDLG1DQUFtQztBQUM1RTtBQUNBO0FBQ0Esd0RBQXdELDZGQUE2RjtBQUNySiw2Q0FBNkM7QUFDN0MsbUNBQW1DLHlEQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyx5QkFBeUI7QUFDeEUscUJBQXFCLEdBQUc7QUFDeEIsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixnREFBZ0QsZ0VBQWdFO0FBQ2hILHlDQUF5Qyx3R0FBd0c7QUFDako7QUFDQSxvREFBb0QsNkZBQTZGO0FBQ2pKLHFDQUFxQyxvTUFBb007QUFDek8sZ0RBQWdELDZGQUE2RjtBQUM3STtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9ub2RlX21vZHVsZXMvbmFub2lkL25vbi1zZWN1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zY29wZS10by1kby8uL3NyYy9jb2RlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSkgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgbGV0IGkgPSBzaXplXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWQgKz0gYWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5sZW5ndGgpIHwgMF1cbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH1cbn1cbmxldCBuYW5vaWQgPSAoc2l6ZSA9IDIxKSA9PiB7XG4gIGxldCBpZCA9ICcnXG4gIGxldCBpID0gc2l6ZVxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWQgKz0gdXJsQWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiA2NCkgfCAwXVxuICB9XG4gIHJldHVybiBpZFxufVxuZXhwb3J0IHsgbmFub2lkLCBjdXN0b21BbHBoYWJldCB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgd2lkZ2V0IH0gPSBmaWdtYTtcbmNvbnN0IHsgdXNlU3luY2VkU3RhdGUsIHVzZVdpZGdldElkLCB1c2VFZmZlY3QsIEF1dG9MYXlvdXQsIFRleHQ6IFRleHRCbG9jaywgU1ZHLCBSZWN0YW5nbGUgfSA9IHdpZGdldDtcbmltcG9ydCB7IG5hbm9pZCBhcyBjcmVhdGVJZCB9IGZyb20gJ25hbm9pZC9ub24tc2VjdXJlJztcbmZ1bmN0aW9uIFRvZG9XaWRnZXQoKSB7XG4gICAgY29uc3Qgd2lkZ2V0SWQgPSB1c2VXaWRnZXRJZCgpO1xuICAgIGNvbnN0IFt0b2Rvcywgc2V0VG9kb3NdID0gdXNlU3luY2VkU3RhdGUoJ3RvZG9zJywgW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICd1cGRhdGUtdGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlQ2hhbmdlKG1zZy5pZCwgJ3RpdGxlJywgbXNnLnRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnZGVsZXRlLXRvZG8nKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlVG9kbyhtc2cuaWQpO1xuICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2Nsb3NlLXBsdWdpbicpIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGRlbGV0ZVRvZG8oaWQpIHtcbiAgICAgICAgc2V0VG9kb3MoWy4uLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uaWQgIT09IGlkKV0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVUb2RvKGlkKSB7XG4gICAgICAgIHNldFRvZG9zKFtcbiAgICAgICAgICAgIC4uLnRvZG9zLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogaWQsIGlkLCB0aXRsZTogJycsIGRvbmU6IGZhbHNlLCBvdXRPZlNjb3BlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGlkLCBjaGFuZ2VkUHJvcCwgY2hhbmdlZFByb3BWYWx1ZSkge1xuICAgICAgICBjb25zdCB0YXJnZXRUb2RvID0gdG9kb3MuZmluZCh0b2RvID0+IHRvZG8uaWQgPT09IGlkKTtcbiAgICAgICAgaWYgKGNoYW5nZWRQcm9wID09PSBcInRpdGxlXCIpIHtcbiAgICAgICAgICAgIHRhcmdldFRvZG8udGl0bGUgPSBjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYW5nZWRQcm9wID09PSBcImRvbmVcIikge1xuICAgICAgICAgICAgdGFyZ2V0VG9kby5kb25lID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3AgPT09IFwib3V0T2ZTY29wZVwiKSB7XG4gICAgICAgICAgICB0YXJnZXRUb2RvLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRhcmdldFRvZG8ub3V0T2ZTY29wZSA9ICFjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHNldFRvZG9zKFsuLi50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBpZCksIHRhcmdldFRvZG9dKTtcbiAgICB9XG4gICAgY29uc3QgVG9kbyA9ICh7IGtleSwgaWQsIHRpdGxlLCBkb25lLCBvdXRPZlNjb3BlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6ICdhdXRvJywgd2lkdGg6IDI5MCB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogZG9uZSB8fCBvdXRPZlNjb3BlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwiZG9uZVwiLCBkb25lKSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIyLjVcIiB5PVwiMi41XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgcng9XCIzLjVcIiBmaWxsPVwid2hpdGVcIiBzdHJva2U9XCIjYWVhZWFlXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogIWRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcImRvbmVcIiwgZG9uZSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNiAyQzMuNzkwODYgMiAyIDMuNzkwODYgMiA2VjE0QzIgMTYuMjA5MSAzLjc5MDg2IDE4IDYgMThIMTRDMTYuMjA5MSAxOCAxOCAxNi4yMDkxIDE4IDE0VjZDMTggMy43OTA4NiAxNi4yMDkxIDIgMTQgMkg2Wk0xNC40MzQzIDguODMwNDVDMTQuODkyOSA4LjMxNDQ4IDE0Ljg0NjQgNy41MjQzOSAxNC4zMzA1IDcuMDY1NzRDMTMuODE0NSA2LjYwNzA5IDEzLjAyNDQgNi42NTM1NyAxMi41NjU3IDcuMTY5NTVMOS40NDY0OCAxMC42Nzg3TDcuODgzODggOS4xMTYxMkM3LjM5NTczIDguNjI3OTYgNi42MDQyNyA4LjYyNzk2IDYuMTE2MTIgOS4xMTYxMkM1LjYyNzk2IDkuNjA0MjcgNS42Mjc5NiAxMC4zOTU3IDYuMTE2MTIgMTAuODgzOUw4LjYxNjEyIDEzLjM4MzlDOC44NTk1NSAxMy42MjczIDkuMTkyNiAxMy43NTk2IDkuNTM2NzIgMTMuNzQ5NUM5Ljg4MDgzIDEzLjczOTMgMTAuMjA1NSAxMy41ODc4IDEwLjQzNDMgMTMuMzMwNUwxNC40MzQzIDguODMwNDVaXCIgZmlsbD1cIiM0QUIzOTNcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChSZWN0YW5nbGUsIHsgaGlkZGVuOiAhb3V0T2ZTY29wZSwgZmlsbDogJyNmMmYyZjInLCB3aWR0aDogMjAsIGhlaWdodDogMjAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6IG91dE9mU2NvcGUgPyBcIiM2RTZFNkVcIiA6IGRvbmUgPyBcIiM3Njc2NzZcIiA6IFwiIzAwMFwiLCBmb250U2l6ZTogMTQsIGxpbmVIZWlnaHQ6IDIwLCB3aWR0aDogMjAwLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQod2lkZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2VkaXQnLCBpZCwgdGl0bGUsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSwgdGl0bGUpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcIm91dE9mU2NvcGVcIiwgb3V0T2ZTY29wZSksIGZpbGw6IG91dE9mU2NvcGUgPyBcIiNmMmYyZjJcIiA6IFwiI2ZmZlwiIH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjIgMjJcIiBmaWxsPVwiJHtvdXRPZlNjb3BlID8gXCIjOTE5MTkxXCIgOiBcIiM5NDk0OTRcIn1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjNcIiB5PVwiOVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiBmaWxsPVwiIzk0OTQ5NFwiLz5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiOVwiIHk9XCI5XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNVwiIHk9XCI5XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIGZpbGw9XCIjOTQ5NDk0XCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSkpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBjb3JuZXJSYWRpdXM6IDgsIGZpbGw6ICcjZmZmJywgc3Ryb2tlOiAnI0U1RTVFNScsIHN0cm9rZVdpZHRoOiAxLCB3aWR0aDogMzQ0IH0sXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiAyNCwgcGFkZGluZzogMjQgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+ICF0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnY2VudGVyJywgc3BhY2luZzogOCwgZmlsbDogJyNmZmYnLCBvbkNsaWNrOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVG9kbyhpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBmaWdtYS5nZXROb2RlQnlJZCh3aWRnZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnYWRkJywgaWQsIHdpZGdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCIjYTJhMmEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTExLjI1IDZDMTEuMjUgNS4zMDk2NCAxMC42OTA0IDQuNzUgMTAgNC43NUM5LjMwOTY0IDQuNzUgOC43NSA1LjMwOTY0IDguNzUgNlY4Ljc1SDZDNS4zMDk2NCA4Ljc1IDQuNzUgOS4zMDk2NCA0Ljc1IDEwQzQuNzUgMTAuNjkwNCA1LjMwOTY0IDExLjI1IDYgMTEuMjVIOC43NVYxNEM4Ljc1IDE0LjY5MDQgOS4zMDk2NCAxNS4yNSAxMCAxNS4yNUMxMC42OTA0IDE1LjI1IDExLjI1IDE0LjY5MDQgMTEuMjUgMTRWMTEuMjVIMTRDMTQuNjkwNCAxMS4yNSAxNS4yNSAxMC42OTA0IDE1LjI1IDEwQzE1LjI1IDkuMzA5NjQgMTQuNjkwNCA4Ljc1IDE0IDguNzVIMTEuMjVWNlpcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiAnIzk0OTQ5NCcsIGZvbnRTaXplOiAxNCwgbGluZUhlaWdodDogMjAsIGZvbnRXZWlnaHQ6IDcwMCB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0sIHRvZG9zXG4gICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+IHRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSksXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgd2lkdGg6ICdmaWxsLXBhcmVudCcsIGhlaWdodDogIXRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSkubGVuZ3RoID8gNDggOiAnaHVnLWNvbnRlbnRzJywgZGlyZWN0aW9uOiAndmVydGljYWwnLCBob3Jpem9udGFsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIHBhZGRpbmc6IDI0LCBmaWxsOiAnI2YyZjJmMicgfSwgdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSkpKSk7XG59XG53aWRnZXQucmVnaXN0ZXIoVG9kb1dpZGdldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=