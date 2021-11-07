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
    function handleChange(id, changedPropName, changedPropValue) {
        const targetTodo = todos.find(todo => todo.id === id);
        if (changedPropName === "done") {
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
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" fill="white" stroke="#b2b2b2"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: !done || outOfScope, onClick: () => handleChange(id, "done", done), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : done ? "#767676" : "#000", textDecoration: done && !outOfScope ? "strikethrough" : "none", fontSize: done || outOfScope ? 14 : 15, lineHeight: 24, width: 220 }, title)),
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
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, fill: '#fff', onClick: () => {
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
        figma.widget.h(AutoLayout, { hidden: !todos.filter(todo => todo.outOfScope).length, direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' }, todos.filter(todo => todo.outOfScope)
            .map(todo => figma.widget.h(Todo, { key: todo.key, id: todo.id, title: todo.title, done: todo.done, outOfScope: todo.outOfScope })))));
}
widget.register(ScopedTodoCard);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEseUVBQXlFO0FBQzFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGVBQWU7QUFDdEM7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUIsb0JBQW9CO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQ0FBa0M7QUFDdEQsNkNBQTZDLG1GQUFtRjtBQUNoSSx5Q0FBeUMsa0VBQWtFO0FBQzNHLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Ysc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiw0Q0FBNEMsNkRBQTZEO0FBQ3pHLDRDQUE0Qyw4TEFBOEw7QUFDMU8seUNBQXlDLGtHQUFrRztBQUMzSSxzQ0FBc0M7QUFDdEMsc0VBQXNFLG1DQUFtQztBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLHlDQUF5QyxxR0FBcUc7QUFDOUkscUNBQXFDLGlEQUFpRDtBQUN0Rix5Q0FBeUMsbUNBQW1DO0FBQzVFO0FBQ0E7QUFDQSx3REFBd0QsNkZBQTZGO0FBQ3JKLDZDQUE2QztBQUM3QyxtQ0FBbUMseURBQVE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGdEQUFnRCxnREFBZ0Q7QUFDaEcseUNBQXlDLHdHQUF3RztBQUNqSjtBQUNBLG9EQUFvRCw2RkFBNkY7QUFDakoscUNBQXFDLHdKQUF3SjtBQUM3TCxnREFBZ0QsNkZBQTZGO0FBQzdJO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY29wZS10by1kby8uL25vZGVfbW9kdWxlcy9uYW5vaWQvbm9uLXNlY3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zY29wZS10by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Njb3BlLXRvLWRvLy4vc3JjL2NvZGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImxldCB1cmxBbHBoYWJldCA9XG4gICd1c2VhbmRvbS0yNlQxOTgzNDBQWDc1cHhKQUNLVkVSWU1JTkRCVVNIV09MRl9HUVpiZmdoamtscXZ3eXpyaWN0J1xubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBzaXplKSA9PiB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IGlkID0gJydcbiAgICBsZXQgaSA9IHNpemVcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZCArPSBhbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIGFscGhhYmV0Lmxlbmd0aCkgfCAwXVxuICAgIH1cbiAgICByZXR1cm4gaWRcbiAgfVxufVxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGkgPSBzaXplXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZCArPSB1cmxBbHBoYWJldFsoTWF0aC5yYW5kb20oKSAqIDY0KSB8IDBdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0IH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgeyB3aWRnZXQgfSA9IGZpZ21hO1xuY29uc3QgeyB1c2VTeW5jZWRTdGF0ZSwgdXNlRWZmZWN0LCBBdXRvTGF5b3V0LCBUZXh0OiBUZXh0QmxvY2ssIFNWRywgUmVjdGFuZ2xlIH0gPSB3aWRnZXQ7XG5pbXBvcnQgeyBuYW5vaWQgYXMgY3JlYXRlSWQgfSBmcm9tICduYW5vaWQvbm9uLXNlY3VyZSc7XG4vLyBmaWdtYS5zaG93VUkoX19odG1sX18pXG4vLyBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuLy8gICBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtcmVjdGFuZ2xlcycpIHtcbi8vICAgICBjb25zdCBub2RlcyA9IFtdXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtc2cuY291bnQ7IGkrKykge1xuLy8gICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpXG4vLyAgICAgICByZWN0LnggPSBpICogMTUwXG4vLyAgICAgICByZWN0LmZpbGxzID0gW3t0eXBlOiAnU09MSUQnLCBjb2xvcjoge3I6IDEsIGc6IDAuNSwgYjogMH19XVxuLy8gICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdClcbi8vICAgICAgIG5vZGVzLnB1c2gocmVjdClcbi8vICAgICB9XG4vLyAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXNcbi8vICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpXG4vLyAgIH1cbi8vICAgZmlnbWEuY2xvc2VQbHVnaW4oKVxuLy8gfVxuZnVuY3Rpb24gU2NvcGVkVG9kb0NhcmQoKSB7XG4gICAgY29uc3QgW3RvZG9zLCBzZXRUb2Rvc10gPSB1c2VTeW5jZWRTdGF0ZSgndG9kb3MnLCBbXSk7XG4gICAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGlkLCBjaGFuZ2VkUHJvcE5hbWUsIGNoYW5nZWRQcm9wVmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0VG9kbyA9IHRvZG9zLmZpbmQodG9kbyA9PiB0b2RvLmlkID09PSBpZCk7XG4gICAgICAgIGlmIChjaGFuZ2VkUHJvcE5hbWUgPT09IFwiZG9uZVwiKSB7XG4gICAgICAgICAgICB0YXJnZXRUb2RvLmRvbmUgPSAhY2hhbmdlZFByb3BWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGFuZ2VkUHJvcE5hbWUgPT09IFwib3V0T2ZTY29wZVwiKSB7XG4gICAgICAgICAgICB0YXJnZXRUb2RvLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRhcmdldFRvZG8ub3V0T2ZTY29wZSA9ICFjaGFuZ2VkUHJvcFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHNldFRvZG9zKFsuLi50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBpZCksIHRhcmdldFRvZG9dKTtcbiAgICB9XG4gICAgY29uc3QgVG9kbyA9ICh7IGtleSwgaWQsIHRpdGxlLCBkb25lLCBvdXRPZlNjb3BlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6ICdhdXRvJywgd2lkdGg6IDMyMCB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogZG9uZSB8fCBvdXRPZlNjb3BlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwiZG9uZVwiLCBkb25lKSwgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI0LjVcIiB5PVwiNC41XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgcng9XCIzLjVcIiBmaWxsPVwid2hpdGVcIiBzdHJva2U9XCIjYjJiMmIyXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogIWRvbmUgfHwgb3V0T2ZTY29wZSwgb25DbGljazogKCkgPT4gaGFuZGxlQ2hhbmdlKGlkLCBcImRvbmVcIiwgZG9uZSksIHNyYzogYFxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOCA0QzUuNzkwODYgNCA0IDUuNzkwODYgNCA4VjE2QzQgMTguMjA5MSA1Ljc5MDg2IDIwIDggMjBIMTZDMTguMjA5MSAyMCAyMCAxOC4yMDkxIDIwIDE2VjhDMjAgNS43OTA4NiAxOC4yMDkxIDQgMTYgNEg4Wk0xNi4yNDc0IDEwLjY2NDRDMTYuNjE0MyAxMC4yNTE2IDE2LjU3NzEgOS42MTk1MSAxNi4xNjQ0IDkuMjUyNTlDMTUuNzUxNiA4Ljg4NTY3IDE1LjExOTUgOC45MjI4NSAxNC43NTI2IDkuMzM1NjRMMTEuNDU3MiAxMy4wNDNMOS43MDcxMSAxMS4yOTI5QzkuMzE2NTggMTAuOTAyNCA4LjY4MzQyIDEwLjkwMjQgOC4yOTI4OSAxMS4yOTI5QzcuOTAyMzcgMTEuNjgzNCA3LjkwMjM3IDEyLjMxNjYgOC4yOTI4OSAxMi43MDcxTDEwLjc5MjkgMTUuMjA3MUMxMC45ODc2IDE1LjQwMTkgMTEuMjU0MSAxNS41MDc3IDExLjUyOTQgMTUuNDk5NkMxMS44MDQ3IDE1LjQ5MTUgMTIuMDY0NCAxNS4zNzAyIDEyLjI0NzQgMTUuMTY0NEwxNi4yNDc0IDEwLjY2NDRaXCIgZmlsbD1cIiM0QUIzOTNcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChSZWN0YW5nbGUsIHsgaGlkZGVuOiAhb3V0T2ZTY29wZSwgZmlsbDogJyNmMmYyZjInLCB3aWR0aDogMjQsIGhlaWdodDogMjQgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6IG91dE9mU2NvcGUgPyBcIiM2RTZFNkVcIiA6IGRvbmUgPyBcIiM3Njc2NzZcIiA6IFwiIzAwMFwiLCB0ZXh0RGVjb3JhdGlvbjogZG9uZSAmJiAhb3V0T2ZTY29wZSA/IFwic3RyaWtldGhyb3VnaFwiIDogXCJub25lXCIsIGZvbnRTaXplOiBkb25lIHx8IG91dE9mU2NvcGUgPyAxNCA6IDE1LCBsaW5lSGVpZ2h0OiAyNCwgd2lkdGg6IDIyMCB9LCB0aXRsZSkpLFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGFuZ2UoaWQsIFwib3V0T2ZTY29wZVwiLCBvdXRPZlNjb3BlKSwgZmlsbDogb3V0T2ZTY29wZSA/IFwiI2YyZjJmMlwiIDogXCIjZmZmXCIgfSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgc3JjOiBgXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCIke291dE9mU2NvcGUgPyBcIiM5MTkxOTFcIiA6IFwiIzk0OTQ5NFwifVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiNFwiIHk9XCIxMFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxMFwiIHk9XCIxMFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiAvPlxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNlwiIHk9XCIxMFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSkpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gKGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBjb3JuZXJSYWRpdXM6IDgsIGZpbGw6ICcjZmZmJywgc3Ryb2tlOiAnI0U1RTVFNScsIHN0cm9rZVdpZHRoOiAxLCB3aWR0aDogMzY0IH0sXG4gICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiAyNCwgcGFkZGluZzogMjQgfSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgdG9kb3NcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih0b2RvID0+ICF0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0b2RvID0+IGZpZ21hLndpZGdldC5oKFRvZG8sIHsga2V5OiB0b2RvLmtleSwgaWQ6IHRvZG8uaWQsIHRpdGxlOiB0b2RvLnRpdGxlLCBkb25lOiB0b2RvLmRvbmUsIG91dE9mU2NvcGU6IHRvZG8ub3V0T2ZTY29wZSB9KSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnY2VudGVyJywgc3BhY2luZzogOCwgZmlsbDogJyNmZmYnLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNyZWF0ZUlkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUb2RvcyhbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udG9kb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5ldyB0b2RvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRPZlNjb3BlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwiIzk0OTQ5NFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiA3QzEyLjU1MjMgNyAxMyA3LjQ0NzcyIDEzIDhWMTZDMTMgMTYuNTUyMyAxMi41NTIzIDE3IDEyIDE3QzExLjQ0NzcgMTcgMTEgMTYuNTUyMyAxMSAxNlY4QzExIDcuNDQ3NzIgMTEuNDQ3NyA3IDEyIDdaXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03IDEyQzcgMTEuNDQ3NyA3LjQ0NzcyIDExIDggMTFMMTYgMTFDMTYuNTUyMyAxMSAxNyAxMS40NDc3IDE3IDEyQzE3IDEyLjU1MjMgMTYuNTUyMyAxMyAxNiAxM0w4IDEzQzcuNDQ3NzIgMTMgNyAxMi41NTIzIDcgMTJaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoVGV4dEJsb2NrLCB7IGZpbGw6ICcjNzY3Njc2JywgZm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAgfSwgXCJBZGQgYSB0b2RvXCIpKSksXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogIXRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uZG9uZSAmJiAhdG9kby5vdXRPZlNjb3BlKS5sZW5ndGgsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogOCB9LCB0b2Rvc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIodG9kbyA9PiB0b2RvLmRvbmUgJiYgIXRvZG8ub3V0T2ZTY29wZSlcbiAgICAgICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSkpLFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGhpZGRlbjogIXRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ub3V0T2ZTY29wZSkubGVuZ3RoLCBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsIGhvcml6b250YWxBbGlnbkl0ZW1zOiAnY2VudGVyJywgc3BhY2luZzogOCwgcGFkZGluZzogMjQsIGZpbGw6ICcjZjJmMmYyJyB9LCB0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLm91dE9mU2NvcGUpXG4gICAgICAgICAgICAubWFwKHRvZG8gPT4gZmlnbWEud2lkZ2V0LmgoVG9kbywgeyBrZXk6IHRvZG8ua2V5LCBpZDogdG9kby5pZCwgdGl0bGU6IHRvZG8udGl0bGUsIGRvbmU6IHRvZG8uZG9uZSwgb3V0T2ZTY29wZTogdG9kby5vdXRPZlNjb3BlIH0pKSkpKTtcbn1cbndpZGdldC5yZWdpc3RlcihTY29wZWRUb2RvQ2FyZCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=