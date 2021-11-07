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
const { useSyncedState, useWidgetId, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;

figma.ui.onmessage = msg => {
    if (msg.type === 'delete-todo') {
        // delete the todo
        figma.closePlugin();
    }
    else if (msg.type === 'update-title') {
        // handleChange()
        figma.closePlugin();
    }
};
function TodoWidget() {
    const widgetId = useWidgetId();
    const [todos, setTodos] = useSyncedState('todos', []);
    function handleAdd() {
        const id = (0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)();
        setTodos([
            ...todos,
            {
                key: id, id: id, title: "This is a really long todo with a lot of conditions and other stuff", done: false, outOfScope: false
            }
        ]);
        figma.showUI(__html__);
    }
    function handleChange(id, changedPropName, changedPropValue) {
        const targetTodo = todos.find(todo => todo.id === id);
        if (changedPropName === "title") {
            targetTodo.title = !changedPropValue;
        }
        else if (changedPropName === "done") {
            targetTodo.done = !changedPropValue;
        }
        else if (changedPropName === "outOfScope") {
            targetTodo.done = false;
            targetTodo.outOfScope = !changedPropValue;
        }
        setTodos([...todos.filter(todo => todo.id !== id), targetTodo]);
    }
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 320 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" fill="white" stroke="#aeaeae"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#949494" : "#000", fontSize: done || outOfScope ? 14 : 15, lineHeight: 24, width: 220, onClick: () => figma.showUI(__html__) }, title)),
            figma.widget.h(AutoLayout, { onClick: () => handleChange(id, "outOfScope", outOfScope), fill: outOfScope ? "#f2f2f2" : "#fff" },
                figma.widget.h(SVG, { src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="4" height="4" rx="2" />
                <rect x="10" y="10" width="4" height="4" rx="2" />
                <rect x="16" y="10" width="4" height="4" rx="2" />
              </svg>
            ` }))));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 364 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                todos
                    .filter(todo => !todo.done && !todo.outOfScope)
                    .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })),
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, fill: '#fff', onClick: handleAdd },
                    figma.widget.h(SVG, { src: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#949494" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11L16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13L8 13C7.44772 13 7 12.5523 7 12Z" />
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#767676', fontSize: 14, fontWeight: 600 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.done && !todo.outOfScope).length, direction: 'vertical', spacing: 8 }, todos
                .filter(todo => todo.done && !todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))),
        figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.outOfScope).length, direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(TodoWidget);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsMkVBQTJFO0FBQzVCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseURBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0NBQWtDO0FBQ3RELDZDQUE2QyxtRkFBbUY7QUFDaEkseUNBQXlDLGtFQUFrRTtBQUMzRyxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsNENBQTRDLDZEQUE2RDtBQUN6Ryw0Q0FBNEMscUtBQXFLO0FBQ2pOLHlDQUF5QyxrR0FBa0c7QUFDM0ksc0NBQXNDO0FBQ3RDLHNFQUFzRSxtQ0FBbUM7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSx5Q0FBeUMscUdBQXFHO0FBQzlJLHFDQUFxQyxpREFBaUQ7QUFDdEYseUNBQXlDLG1DQUFtQztBQUM1RTtBQUNBO0FBQ0Esd0RBQXdELDZGQUE2RjtBQUNySiw2Q0FBNkMscUdBQXFHO0FBQ2xKLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixnREFBZ0QsZ0RBQWdEO0FBQ2hHLHlDQUF5Qyx3R0FBd0c7QUFDako7QUFDQSxvREFBb0QsNkZBQTZGO0FBQ2pKLHFDQUFxQyx3SkFBd0o7QUFDN0wsZ0RBQWdELDZGQUE2RjtBQUM3STtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9ub2RlX21vZHVsZXMvbmFub2lkL25vbi1zZWN1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zY29wZS10by1kby8uL3NyYy9jb2RlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSkgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgbGV0IGkgPSBzaXplXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWQgKz0gYWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5sZW5ndGgpIHwgMF1cbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH1cbn1cbmxldCBuYW5vaWQgPSAoc2l6ZSA9IDIxKSA9PiB7XG4gIGxldCBpZCA9ICcnXG4gIGxldCBpID0gc2l6ZVxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWQgKz0gdXJsQWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiA2NCkgfCAwXVxuICB9XG4gIHJldHVybiBpZFxufVxuZXhwb3J0IHsgbmFub2lkLCBjdXN0b21BbHBoYWJldCB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgd2lkZ2V0IH0gPSBmaWdtYTtcbmNvbnN0IHsgdXNlU3luY2VkU3RhdGUsIHVzZVdpZGdldElkLCBBdXRvTGF5b3V0LCBUZXh0OiBUZXh0QmxvY2ssIFNWRywgUmVjdGFuZ2xlIH0gPSB3aWRnZXQ7XG5pbXBvcnQgeyBuYW5vaWQgYXMgY3JlYXRlSWQgfSBmcm9tICduYW5vaWQvbm9uLXNlY3VyZSc7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ2RlbGV0ZS10b2RvJykge1xuICAgICAgICAvLyBkZWxldGUgdGhlIHRvZG9cbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICd1cGRhdGUtdGl0bGUnKSB7XG4gICAgICAgIC8vIGhhbmRsZUNoYW5nZSgpXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxufTtcbmZ1bmN0aW9uIFRvZG9XaWRnZXQoKSB7XG4gICAgY29uc3Qgd2lkZ2V0SWQgPSB1c2VXaWRnZXRJZCgpO1xuICAgIGNvbnN0IFt0b2Rvcywgc2V0VG9kb3NdID0gdXNlU3luY2VkU3RhdGUoJ3RvZG9zJywgW10pO1xuICAgIGZ1bmN0aW9uIGhhbmRsZUFkZCgpIHtcbiAgICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgICBzZXRUb2RvcyhbXG4gICAgICAgICAgICAuLi50b2RvcyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGlkLCBpZDogaWQsIHRpdGxlOiBcIlRoaXMgaXMgYSByZWFsbHkgbG9uZyB0b2RvIHdpdGggYSBsb3Qgb2YgY29uZGl0aW9ucyBhbmQgb3RoZXIgc3R1ZmZcIiwgZG9uZTogZmFsc2UsIG91dE9mU2NvcGU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoaWQsIGNoYW5nZWRQcm9wTmFtZSwgY2hhbmdlZFByb3BWYWx1ZSkge1xuICAgICAgICBjb25zdCB0YXJnZXRUb2RvID0gdG9kb3MuZmluZCh0b2RvID0+IHRvZG8uaWQgPT09IGlkKTtcbiAgICAgICAgaWYgKGNoYW5nZWRQcm9wTmFtZSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICAgICAgICB0YXJnZXRUb2RvLnRpdGxlID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3BOYW1lID09PSBcImRvbmVcIikge1xuICAgICAgICAgICAgdGFyZ2V0VG9kby5kb25lID0gIWNoYW5nZWRQcm9wVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhbmdlZFByb3BOYW1lID09PSBcIm91dE9mU2NvcGVcIikge1xuICAgICAgICAgICAgdGFyZ2V0VG9kby5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICB0YXJnZXRUb2RvLm91dE9mU2NvcGUgPSAhY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUb2RvcyhbLi4udG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5pZCAhPT0gaWQpLCB0YXJnZXRUb2RvXSk7XG4gICAgfVxuICAgIGNvbnN0IFRvZG8gPSAoeyBrZXksIGlkLCB0aXRsZSwgZG9uZSwgb3V0T2ZTY29wZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiAnYXV0bycsIHdpZHRoOiAzMjAgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ3N0YXJ0Jywgc3BhY2luZzogOCB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46IGRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcImRvbmVcIiwgZG9uZSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiNC41XCIgeT1cIjQuNVwiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHJ4PVwiMy41XCIgZmlsbD1cIndoaXRlXCIgc3Ryb2tlPVwiI2FlYWVhZVwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46ICFkb25lIHx8IG91dE9mU2NvcGUsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZShpZCwgXCJkb25lXCIsIGRvbmUpLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggNEM1Ljc5MDg2IDQgNCA1Ljc5MDg2IDQgOFYxNkM0IDE4LjIwOTEgNS43OTA4NiAyMCA4IDIwSDE2QzE4LjIwOTEgMjAgMjAgMTguMjA5MSAyMCAxNlY4QzIwIDUuNzkwODYgMTguMjA5MSA0IDE2IDRIOFpNMTYuMjQ3NCAxMC42NjQ0QzE2LjYxNDMgMTAuMjUxNiAxNi41NzcxIDkuNjE5NTEgMTYuMTY0NCA5LjI1MjU5QzE1Ljc1MTYgOC44ODU2NyAxNS4xMTk1IDguOTIyODUgMTQuNzUyNiA5LjMzNTY0TDExLjQ1NzIgMTMuMDQzTDkuNzA3MTEgMTEuMjkyOUM5LjMxNjU4IDEwLjkwMjQgOC42ODM0MiAxMC45MDI0IDguMjkyODkgMTEuMjkyOUM3LjkwMjM3IDExLjY4MzQgNy45MDIzNyAxMi4zMTY2IDguMjkyODkgMTIuNzA3MUwxMC43OTI5IDE1LjIwNzFDMTAuOTg3NiAxNS40MDE5IDExLjI1NDEgMTUuNTA3NyAxMS41Mjk0IDE1LjQ5OTZDMTEuODA0NyAxNS40OTE1IDEyLjA2NDQgMTUuMzcwMiAxMi4yNDc0IDE1LjE2NDRMMTYuMjQ3NCAxMC42NjQ0WlwiIGZpbGw9XCIjNEFCMzkzXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoUmVjdGFuZ2xlLCB7IGhpZGRlbjogIW91dE9mU2NvcGUsIGZpbGw6ICcjZjJmMmYyJywgd2lkdGg6IDI0LCBoZWlnaHQ6IDI0IH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiBvdXRPZlNjb3BlID8gXCIjNkU2RTZFXCIgOiBkb25lID8gXCIjOTQ5NDk0XCIgOiBcIiMwMDBcIiwgZm9udFNpemU6IGRvbmUgfHwgb3V0T2ZTY29wZSA/IDE0IDogMTUsIGxpbmVIZWlnaHQ6IDI0LCB3aWR0aDogMjIwLCBvbkNsaWNrOiAoKSA9PiBmaWdtYS5zaG93VUkoX19odG1sX18pIH0sIHRpdGxlKSksXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNoYW5nZShpZCwgXCJvdXRPZlNjb3BlXCIsIG91dE9mU2NvcGUpLCBmaWxsOiBvdXRPZlNjb3BlID8gXCIjZjJmMmYyXCIgOiBcIiNmZmZcIiB9LFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIiR7b3V0T2ZTY29wZSA/IFwiIzkxOTE5MVwiIDogXCIjOTQ5NDk0XCJ9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI0XCIgeT1cIjEwXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIC8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjEwXCIgeT1cIjEwXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIC8+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjE2XCIgeT1cIjEwXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSkpKTtcbiAgICB9O1xuICAgIHJldHVybiAoZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIGNvcm5lclJhZGl1czogOCwgZmlsbDogJyNmZmYnLCBzdHJva2U6ICcjRTVFNUU1Jywgc3Ryb2tlV2lkdGg6IDEsIHdpZHRoOiAzNjQgfSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIHNwYWNpbmc6IDI0LCBwYWRkaW5nOiAyNCB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIHNwYWNpbmc6IDggfSxcbiAgICAgICAgICAgICAgICB0b2Rvc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHRvZG8gPT4gIXRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdjZW50ZXInLCBzcGFjaW5nOiA4LCBmaWxsOiAnI2ZmZicsIG9uQ2xpY2s6IGhhbmRsZUFkZCB9LFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgc3JjOiBgXG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIiM5NDk0OTRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgN0MxMi41NTIzIDcgMTMgNy40NDc3MiAxMyA4VjE2QzEzIDE2LjU1MjMgMTIuNTUyMyAxNyAxMiAxN0MxMS40NDc3IDE3IDExIDE2LjU1MjMgMTEgMTZWOEMxMSA3LjQ0NzcyIDExLjQ0NzcgNyAxMiA3WlwiIC8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNyAxMkM3IDExLjQ0NzcgNy40NDc3MiAxMSA4IDExTDE2IDExQzE2LjU1MjMgMTEgMTcgMTEuNDQ3NyAxNyAxMkMxNyAxMi41NTIzIDE2LjU1MjMgMTMgMTYgMTNMOCAxM0M3LjQ0NzcyIDEzIDcgMTIuNTUyMyA3IDEyWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiAnIzc2NzY3NicsIGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwIH0sIFwiQWRkIGEgdG9kb1wiKSkpLFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBoaWRkZW46ICF0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSkubGVuZ3RoLCBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIHNwYWNpbmc6IDggfSwgdG9kb3NcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSkpKSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBoaWRkZW46ICF0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBob3Jpem9udGFsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIHBhZGRpbmc6IDI0LCBmaWxsOiAnI2YyZjJmMicgfSwgdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSkpKSk7XG59XG53aWRnZXQucmVnaXN0ZXIoVG9kb1dpZGdldCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=