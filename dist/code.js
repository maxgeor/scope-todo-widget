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
const { useSyncedState, useEffect, AutoLayout, Text: TextBlock, SVG, Rectangle } = widget;

// figma.showUI(__html__)
// figma.ui.onmessage = msg => {
//   if (msg.type === 'create-rectangles') {
//     const nodes = []
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle()
//       rect.x = i * 150
//       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}]
//       figma.currentPage.appendChild(rect)
//       nodes.push(rect)
//     }
//     figma.currentPage.selection = nodes
//     figma.viewport.scrollAndZoomIntoView(nodes)
//   }
//   figma.closePlugin()
// }
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', []);
    function handleMove(id, outOfScope) {
        const targetTodo = todos.find(todo => todo.id === id);
        targetTodo.outOfScope = !outOfScope;
        setTodos([...todos.filter(todo => todo.id !== id), targetTodo]);
    }
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 320 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope, 
                    // onClick={() => handleCheck(key, id, title, outOfScope)}
                    src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" stroke="#b2b2b2"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, 
                    // onClick={() => handleCheck(key, id, title, outOfScope)}
                    src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#000", textDecoration: done && !outOfScope ? "strikethrough" : "none", fontSize: done || outOfScope ? 14 : 15, lineHeight: 24, width: 220 }, title)),
            figma.widget.h(SVG, { onClick: () => handleMove(id, outOfScope), src: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="${outOfScope ? "#919191" : "#949494"}" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="4" height="4" rx="2" />
              <rect x="10" y="10" width="4" height="4" rx="2" />
              <rect x="16" y="10" width="4" height="4" rx="2" />
            </svg>
          ` })));
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 364 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                todos
                    .filter(todo => !todo.done && !todo.outOfScope)
                    .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })),
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, onClick: () => {
                        const id = (0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)();
                        setTodos([
                            ...todos,
                            {
                                key: id,
                                id: id,
                                title: "New todo",
                                done: false,
                                outOfScope: false
                            }
                        ]);
                    } },
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
        !todos.filter(todo => todo.outOfScope).length ?
            figma.widget.h(Rectangle, { width: 364, height: 48, fill: '#f2f2f2' }) :
            figma.widget.h(AutoLayout, { direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
                .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(ScopedTodoCard);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEseUVBQXlFO0FBQzFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGVBQWU7QUFDdEM7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUIsb0JBQW9CO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsNkNBQTZDLG1GQUFtRjtBQUNoSSx5Q0FBeUMsa0VBQWtFO0FBQzNHLHNDQUFzQztBQUN0QyxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Ysc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiw0Q0FBNEMsNkRBQTZEO0FBQ3pHLDRDQUE0Qyw4TEFBOEw7QUFDMU8sa0NBQWtDO0FBQ2xDLG9FQUFvRSxtQ0FBbUM7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSx5Q0FBeUMscUdBQXFHO0FBQzlJLHFDQUFxQyxpREFBaUQ7QUFDdEYseUNBQXlDLG1DQUFtQztBQUM1RTtBQUNBO0FBQ0Esd0RBQXdELDZGQUE2RjtBQUNySiw2Q0FBNkM7QUFDN0MsbUNBQW1DLHlEQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixnREFBZ0QsZ0RBQWdEO0FBQ2hHLHlDQUF5Qyx3R0FBd0c7QUFDako7QUFDQSxvREFBb0QsNkZBQTZGO0FBQ2pKO0FBQ0Esd0NBQXdDLHlDQUF5QztBQUNqRix5Q0FBeUMsaUdBQWlHO0FBQzFJLG9EQUFvRCw2RkFBNkY7QUFDako7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Njb3BlLXRvLWRvLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9ub24tc2VjdXJlL2luZGV4LmpzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9zcmMvY29kZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHVybEFscGhhYmV0ID1cbiAgJ3VzZWFuZG9tLTI2VDE5ODM0MFBYNzVweEpBQ0tWRVJZTUlOREJVU0hXT0xGX0dRWmJmZ2hqa2xxdnd5enJpY3QnXG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIHNpemUpID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsZXQgaWQgPSAnJ1xuICAgIGxldCBpID0gc2l6ZVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlkICs9IGFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKSB8IDBdXG4gICAgfVxuICAgIHJldHVybiBpZFxuICB9XG59XG5sZXQgbmFub2lkID0gKHNpemUgPSAyMSkgPT4ge1xuICBsZXQgaWQgPSAnJ1xuICBsZXQgaSA9IHNpemVcbiAgd2hpbGUgKGktLSkge1xuICAgIGlkICs9IHVybEFscGhhYmV0WyhNYXRoLnJhbmRvbSgpICogNjQpIHwgMF1cbiAgfVxuICByZXR1cm4gaWRcbn1cbmV4cG9ydCB7IG5hbm9pZCwgY3VzdG9tQWxwaGFiZXQgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCB7IHdpZGdldCB9ID0gZmlnbWE7XG5jb25zdCB7IHVzZVN5bmNlZFN0YXRlLCB1c2VFZmZlY3QsIEF1dG9MYXlvdXQsIFRleHQ6IFRleHRCbG9jaywgU1ZHLCBSZWN0YW5nbGUgfSA9IHdpZGdldDtcbmltcG9ydCB7IG5hbm9pZCBhcyBjcmVhdGVJZCB9IGZyb20gJ25hbm9pZC9ub24tc2VjdXJlJztcbi8vIGZpZ21hLnNob3dVSShfX2h0bWxfXylcbi8vIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4vLyAgIGlmIChtc2cudHlwZSA9PT0gJ2NyZWF0ZS1yZWN0YW5nbGVzJykge1xuLy8gICAgIGNvbnN0IG5vZGVzID0gW11cbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5jb3VudDsgaSsrKSB7XG4vLyAgICAgICBjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKClcbi8vICAgICAgIHJlY3QueCA9IGkgKiAxNTBcbi8vICAgICAgIHJlY3QuZmlsbHMgPSBbe3R5cGU6ICdTT0xJRCcsIGNvbG9yOiB7cjogMSwgZzogMC41LCBiOiAwfX1dXG4vLyAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KVxuLy8gICAgICAgbm9kZXMucHVzaChyZWN0KVxuLy8gICAgIH1cbi8vICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2Rlc1xuLy8gICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcylcbi8vICAgfVxuLy8gICBmaWdtYS5jbG9zZVBsdWdpbigpXG4vLyB9XG5mdW5jdGlvbiBTY29wZWRUb2RvQ2FyZCgpIHtcbiAgICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN5bmNlZFN0YXRlKCd0b2RvcycsIFtdKTtcbiAgICBmdW5jdGlvbiBoYW5kbGVNb3ZlKGlkLCBvdXRPZlNjb3BlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldFRvZG8gPSB0b2Rvcy5maW5kKHRvZG8gPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgICB0YXJnZXRUb2RvLm91dE9mU2NvcGUgPSAhb3V0T2ZTY29wZTtcbiAgICAgICAgc2V0VG9kb3MoWy4uLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uaWQgIT09IGlkKSwgdGFyZ2V0VG9kb10pO1xuICAgIH1cbiAgICBjb25zdCBUb2RvID0gKHsga2V5LCBpZCwgdGl0bGUsIGRvbmUsIG91dE9mU2NvcGUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ3N0YXJ0Jywgc3BhY2luZzogJ2F1dG8nLCB3aWR0aDogMzIwIH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6IDggfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGlkZGVuOiBkb25lIHx8IG91dE9mU2NvcGUsIFxuICAgICAgICAgICAgICAgICAgICAvLyBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDaGVjayhrZXksIGlkLCB0aXRsZSwgb3V0T2ZTY29wZSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiNC41XCIgeT1cIjQuNVwiIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHJ4PVwiMy41XCIgc3Ryb2tlPVwiI2IyYjJiMlwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBoaWRkZW46ICFkb25lIHx8IG91dE9mU2NvcGUsIFxuICAgICAgICAgICAgICAgICAgICAvLyBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDaGVjayhrZXksIGlkLCB0aXRsZSwgb3V0T2ZTY29wZSl9XG4gICAgICAgICAgICAgICAgICAgIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOCA0QzUuNzkwODYgNCA0IDUuNzkwODYgNCA4VjE2QzQgMTguMjA5MSA1Ljc5MDg2IDIwIDggMjBIMTZDMTguMjA5MSAyMCAyMCAxOC4yMDkxIDIwIDE2VjhDMjAgNS43OTA4NiAxOC4yMDkxIDQgMTYgNEg4Wk0xNi4yNDc0IDEwLjY2NDRDMTYuNjE0MyAxMC4yNTE2IDE2LjU3NzEgOS42MTk1MSAxNi4xNjQ0IDkuMjUyNTlDMTUuNzUxNiA4Ljg4NTY3IDE1LjExOTUgOC45MjI4NSAxNC43NTI2IDkuMzM1NjRMMTEuNDU3MiAxMy4wNDNMOS43MDcxMSAxMS4yOTI5QzkuMzE2NTggMTAuOTAyNCA4LjY4MzQyIDEwLjkwMjQgOC4yOTI4OSAxMS4yOTI5QzcuOTAyMzcgMTEuNjgzNCA3LjkwMjM3IDEyLjMxNjYgOC4yOTI4OSAxMi43MDcxTDEwLjc5MjkgMTUuMjA3MUMxMC45ODc2IDE1LjQwMTkgMTEuMjU0MSAxNS41MDc3IDExLjUyOTQgMTUuNDk5NkMxMS44MDQ3IDE1LjQ5MTUgMTIuMDY0NCAxNS4zNzAyIDEyLjI0NzQgMTUuMTY0NEwxNi4yNDc0IDEwLjY2NDRaXCIgZmlsbD1cIiM0QUIzOTNcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChSZWN0YW5nbGUsIHsgaGlkZGVuOiAhb3V0T2ZTY29wZSwgZmlsbDogJyNmMmYyZjInLCB3aWR0aDogMjQsIGhlaWdodDogMjQgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6IG91dE9mU2NvcGUgPyBcIiM2RTZFNkVcIiA6IGRvbmUgPyBcIiM3Njc2NzZcIiA6IFwiIzAwMFwiLCB0ZXh0RGVjb3JhdGlvbjogZG9uZSAmJiAhb3V0T2ZTY29wZSA/IFwic3RyaWtldGhyb3VnaFwiIDogXCJub25lXCIsIGZvbnRTaXplOiBkb25lIHx8IG91dE9mU2NvcGUgPyAxNCA6IDE1LCBsaW5lSGVpZ2h0OiAyNCwgd2lkdGg6IDIyMCB9LCB0aXRsZSkpLFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZU1vdmUoaWQsIG91dE9mU2NvcGUpLCBzcmM6IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCIke291dE9mU2NvcGUgPyBcIiM5MTkxOTFcIiA6IFwiIzk0OTQ5NFwifVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiMTBcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgLz5cbiAgICAgICAgICAgICAgPHJlY3QgeD1cIjEwXCIgeT1cIjEwXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIC8+XG4gICAgICAgICAgICAgIDxyZWN0IHg9XCIxNlwiIHk9XCIxMFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgYCB9KSkpO1xuICAgIH07XG4gICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgY29ybmVyUmFkaXVzOiA4LCBmaWxsOiAnI2ZmZicsIHN0cm9rZTogJyNFNUU1RTUnLCBzdHJva2VXaWR0aDogMSwgd2lkdGg6IDM2NCB9LFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogMjQsIHBhZGRpbmc6IDI0IH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogOCB9LFxuICAgICAgICAgICAgICAgIHRvZG9zXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiAhdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY3JlYXRlSWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRvZG9zKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50b2RvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmV3IHRvZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dE9mU2NvcGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCIjOTQ5NDk0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDdDMTIuNTUyMyA3IDEzIDcuNDQ3NzIgMTMgOFYxNkMxMyAxNi41NTIzIDEyLjU1MjMgMTcgMTIgMTdDMTEuNDQ3NyAxNyAxMSAxNi41NTIzIDExIDE2VjhDMTEgNy40NDc3MiAxMS40NDc3IDcgMTIgN1pcIiAvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcgMTJDNyAxMS40NDc3IDcuNDQ3NzIgMTEgOCAxMUwxNiAxMUMxNi41NTIzIDExIDE3IDExLjQ0NzcgMTcgMTJDMTcgMTIuNTUyMyAxNi41NTIzIDEzIDE2IDEzTDggMTNDNy40NDc3MiAxMyA3IDEyLjU1MjMgNyAxMlpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogJyM3Njc2NzYnLCBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgaGlkZGVuOiAhdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5kb25lICYmICF0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCwgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0sIHRvZG9zXG4gICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+IHRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSksXG4gICAgICAgICF0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpLmxlbmd0aCA/XG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChSZWN0YW5nbGUsIHsgd2lkdGg6IDM2NCwgaGVpZ2h0OiA0OCwgZmlsbDogJyNmMmYyZjInIH0pIDpcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBob3Jpem9udGFsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIHBhZGRpbmc6IDI0LCBmaWxsOiAnI2YyZjJmMicgfSwgdG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5vdXRPZlNjb3BlKVxuICAgICAgICAgICAgICAgIC5tYXAodG9kbyA9PiBmaWdtYS53aWRnZXQuaChUb2RvLCB7IGtleTogdG9kby5rZXksIGlkOiB0b2RvLmlkLCB0aXRsZTogdG9kby50aXRsZSwgZG9uZTogdG9kby5kb25lLCBvdXRPZlNjb3BlOiB0b2RvLm91dE9mU2NvcGUgfSkpKSkpO1xufVxud2lkZ2V0LnJlZ2lzdGVyKFNjb3BlZFRvZG9DYXJkKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==