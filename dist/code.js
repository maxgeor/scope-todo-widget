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

figma.showUI(__html__);
figma.ui.onmessage = msg => {
    if (msg.type === 'create-rectangles') {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    figma.closePlugin();
};
function ScopedTodoCard() {
    const [todos, setTodos] = useSyncedState('todos', []);
    const Todo = ({ key, id, title, done, outOfScope }) => {
        return (figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 'auto', width: 320 },
            figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'start', spacing: 8 },
                figma.widget.h(SVG, { hidden: done || outOfScope ? true : false, onClick: () => handleCheck({ key, id, title, outOfScope }), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" stroke="#b2b2b2"/>
              </svg>
            ` }),
                figma.widget.h(SVG, { hidden: done === false || outOfScope ? true : false, onClick: () => handleCheck({ key, id, title, outOfScope }), src: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8ZM16.2474 10.6644C16.6143 10.2516 16.5771 9.61951 16.1644 9.25259C15.7516 8.88567 15.1195 8.92285 14.7526 9.33564L11.4572 13.043L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.7929 15.2071C10.9876 15.4019 11.2541 15.5077 11.5294 15.4996C11.8047 15.4915 12.0644 15.3702 12.2474 15.1644L16.2474 10.6644Z" fill="#4AB393"/>
              </svg>
            ` }),
                figma.widget.h(Rectangle, { hidden: !outOfScope, fill: '#f2f2f2', width: 24, height: 24 }),
                figma.widget.h(TextBlock, { fill: outOfScope ? "#6E6E6E" : "#000", textDecoration: done && !outOfScope ? "strikethrough" : "none", fontSize: done || outOfScope ? 14 : 15, lineHeight: 24, width: 220 }, title)),
            figma.widget.h(SVG, { src: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#919191" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="4" height="4" rx="2" />
              <rect x="10" y="10" width="4" height="4" rx="2" />
              <rect x="16" y="10" width="4" height="4" rx="2" />
            </svg>
          ` })));
    };
    const groupTodos = (targetTodo, todos) => {
        const copyOfTodos = [...todos];
        for (const group of copyOfTodos) {
            if (group.find(todo => todo.id === targetTodo.id)) {
                group.splice(group.indexOf(targetTodo), 1);
            }
        }
        switch (copyOfTodos) {
            case targetTodo.outOfScope:
        }
    };
    const handleCheck = ({ key, id, title, outOfScope }) => {
        const targetTodo = todos.find(todo => todo.id === id);
        const untargetedTodos = todos.filter(todo => todo.id !== id);
        const newTodo = {
            key,
            id,
            title,
            done: !targetTodo.done,
            outOfScope
        };
        setTodos([...untargetedTodos, newTodo]);
    };
    return (figma.widget.h(AutoLayout, { direction: 'vertical', cornerRadius: 8, fill: '#fff', stroke: '#E5E5E5', strokeWidth: 1, width: 364 },
        figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 24, padding: 24 },
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 },
                todos,
                figma.widget.h(AutoLayout, { direction: 'horizontal', verticalAlignItems: 'center', spacing: 8, onClick: () => setTodos([
                        ...todos,
                        {
                            id: (0,nanoid_non_secure__WEBPACK_IMPORTED_MODULE_0__.nanoid)(),
                            title: "New todo",
                            done: false,
                            outOfScope: false
                        }
                    ]) },
                    figma.widget.h(SVG, { src: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#919191" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.4477 7.44772 11 8 11L16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13L8 13C7.44772 13 7 12.5523 7 12Z" />
                </svg>
              ` }),
                    figma.widget.h(TextBlock, { fill: '#767676', fontSize: 14, fontWeight: 600 }, "Add a todo"))),
            figma.widget.h(AutoLayout, { direction: 'vertical', spacing: 8 })),
        figma.widget.h(AutoLayout
        // hidden={outOfScopeTodos.length === 0}
        , { 
            // hidden={outOfScopeTodos.length === 0}
            direction: 'vertical', horizontalAlignItems: 'center', spacing: 8, padding: 24, fill: '#f2f2f2' })));
}
widget.register(ScopedTodoCard);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lDOzs7Ozs7O1VDcEJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSxTQUFTO0FBQ2pCLFFBQVEseUVBQXlFO0FBQzFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBLDRCQUE0Qix3QkFBd0Isc0JBQXNCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtDQUFrQztBQUN0RCw2Q0FBNkMsbUZBQW1GO0FBQ2hJLHlDQUF5QyxrRUFBa0U7QUFDM0csc0NBQXNDLHdFQUF3RSw0QkFBNEI7QUFDMUk7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHNDQUFzQyxrRkFBa0YsNEJBQTRCO0FBQ3BKO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiw0Q0FBNEMsNkRBQTZEO0FBQ3pHLDRDQUE0QywyS0FBMks7QUFDdk4sa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDRCQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLHFHQUFxRztBQUM5SSxxQ0FBcUMsaURBQWlEO0FBQ3RGLHlDQUF5QyxtQ0FBbUM7QUFDNUU7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLGdDQUFnQyx5REFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QiwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZ0RBQWdELGdEQUFnRDtBQUNoRyx5Q0FBeUMsbUNBQW1DO0FBQzVFO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsdUJBQXVCO0FBQ3ZCLDZHQUE2RztBQUM3RztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vLi9ub2RlX21vZHVsZXMvbmFub2lkL25vbi1zZWN1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Njb3BlLXRvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2NvcGUtdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zY29wZS10by1kby8uL3NyYy9jb2RlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXJsQWxwaGFiZXQgPVxuICAndXNlYW5kb20tMjZUMTk4MzQwUFg3NXB4SkFDS1ZFUllNSU5EQlVTSFdPTEZfR1FaYmZnaGprbHF2d3l6cmljdCdcbmxldCBjdXN0b21BbHBoYWJldCA9IChhbHBoYWJldCwgc2l6ZSkgPT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgbGV0IGkgPSBzaXplXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWQgKz0gYWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiBhbHBoYWJldC5sZW5ndGgpIHwgMF1cbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH1cbn1cbmxldCBuYW5vaWQgPSAoc2l6ZSA9IDIxKSA9PiB7XG4gIGxldCBpZCA9ICcnXG4gIGxldCBpID0gc2l6ZVxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWQgKz0gdXJsQWxwaGFiZXRbKE1hdGgucmFuZG9tKCkgKiA2NCkgfCAwXVxuICB9XG4gIHJldHVybiBpZFxufVxuZXhwb3J0IHsgbmFub2lkLCBjdXN0b21BbHBoYWJldCB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IHsgd2lkZ2V0IH0gPSBmaWdtYTtcbmNvbnN0IHsgdXNlU3luY2VkU3RhdGUsIHVzZUVmZmVjdCwgQXV0b0xheW91dCwgVGV4dDogVGV4dEJsb2NrLCBTVkcsIFJlY3RhbmdsZSB9ID0gd2lkZ2V0O1xuaW1wb3J0IHsgbmFub2lkIGFzIGNyZWF0ZUlkIH0gZnJvbSAnbmFub2lkL25vbi1zZWN1cmUnO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgaWYgKG1zZy50eXBlID09PSAnY3JlYXRlLXJlY3RhbmdsZXMnKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgIHJlY3QueCA9IGkgKiAxNTA7XG4gICAgICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgfVxuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG59O1xuZnVuY3Rpb24gU2NvcGVkVG9kb0NhcmQoKSB7XG4gICAgY29uc3QgW3RvZG9zLCBzZXRUb2Rvc10gPSB1c2VTeW5jZWRTdGF0ZSgndG9kb3MnLCBbXSk7XG4gICAgY29uc3QgVG9kbyA9ICh7IGtleSwgaWQsIHRpdGxlLCBkb25lLCBvdXRPZlNjb3BlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ2hvcml6b250YWwnLCB2ZXJ0aWNhbEFsaWduSXRlbXM6ICdzdGFydCcsIHNwYWNpbmc6ICdhdXRvJywgd2lkdGg6IDMyMCB9LFxuICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dCwgeyBkaXJlY3Rpb246ICdob3Jpem9udGFsJywgdmVydGljYWxBbGlnbkl0ZW1zOiAnc3RhcnQnLCBzcGFjaW5nOiA4IH0sXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IGhpZGRlbjogZG9uZSB8fCBvdXRPZlNjb3BlID8gdHJ1ZSA6IGZhbHNlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGVjayh7IGtleSwgaWQsIHRpdGxlLCBvdXRPZlNjb3BlIH0pLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIjQuNVwiIHk9XCI0LjVcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiByeD1cIjMuNVwiIHN0cm9rZT1cIiNiMmIyYjJcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgYCB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChTVkcsIHsgaGlkZGVuOiBkb25lID09PSBmYWxzZSB8fCBvdXRPZlNjb3BlID8gdHJ1ZSA6IGZhbHNlLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDaGVjayh7IGtleSwgaWQsIHRpdGxlLCBvdXRPZlNjb3BlIH0pLCBzcmM6IGBcbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggNEM1Ljc5MDg2IDQgNCA1Ljc5MDg2IDQgOFYxNkM0IDE4LjIwOTEgNS43OTA4NiAyMCA4IDIwSDE2QzE4LjIwOTEgMjAgMjAgMTguMjA5MSAyMCAxNlY4QzIwIDUuNzkwODYgMTguMjA5MSA0IDE2IDRIOFpNMTYuMjQ3NCAxMC42NjQ0QzE2LjYxNDMgMTAuMjUxNiAxNi41NzcxIDkuNjE5NTEgMTYuMTY0NCA5LjI1MjU5QzE1Ljc1MTYgOC44ODU2NyAxNS4xMTk1IDguOTIyODUgMTQuNzUyNiA5LjMzNTY0TDExLjQ1NzIgMTMuMDQzTDkuNzA3MTEgMTEuMjkyOUM5LjMxNjU4IDEwLjkwMjQgOC42ODM0MiAxMC45MDI0IDguMjkyODkgMTEuMjkyOUM3LjkwMjM3IDExLjY4MzQgNy45MDIzNyAxMi4zMTY2IDguMjkyODkgMTIuNzA3MUwxMC43OTI5IDE1LjIwNzFDMTAuOTg3NiAxNS40MDE5IDExLjI1NDEgMTUuNTA3NyAxMS41Mjk0IDE1LjQ5OTZDMTEuODA0NyAxNS40OTE1IDEyLjA2NDQgMTUuMzcwMiAxMi4yNDc0IDE1LjE2NDRMMTYuMjQ3NCAxMC42NjQ0WlwiIGZpbGw9XCIjNEFCMzkzXCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIGAgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoUmVjdGFuZ2xlLCB7IGhpZGRlbjogIW91dE9mU2NvcGUsIGZpbGw6ICcjZjJmMmYyJywgd2lkdGg6IDI0LCBoZWlnaHQ6IDI0IH0pLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFRleHRCbG9jaywgeyBmaWxsOiBvdXRPZlNjb3BlID8gXCIjNkU2RTZFXCIgOiBcIiMwMDBcIiwgdGV4dERlY29yYXRpb246IGRvbmUgJiYgIW91dE9mU2NvcGUgPyBcInN0cmlrZXRocm91Z2hcIiA6IFwibm9uZVwiLCBmb250U2l6ZTogZG9uZSB8fCBvdXRPZlNjb3BlID8gMTQgOiAxNSwgbGluZUhlaWdodDogMjQsIHdpZHRoOiAyMjAgfSwgdGl0bGUpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKFNWRywgeyBzcmM6IGBcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCIjOTE5MTkxXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICA8cmVjdCB4PVwiNFwiIHk9XCIxMFwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjRcIiByeD1cIjJcIiAvPlxuICAgICAgICAgICAgICA8cmVjdCB4PVwiMTBcIiB5PVwiMTBcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCI0XCIgcng9XCIyXCIgLz5cbiAgICAgICAgICAgICAgPHJlY3QgeD1cIjE2XCIgeT1cIjEwXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMlwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICBgIH0pKSk7XG4gICAgfTtcbiAgICBjb25zdCBncm91cFRvZG9zID0gKHRhcmdldFRvZG8sIHRvZG9zKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcHlPZlRvZG9zID0gWy4uLnRvZG9zXTtcbiAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBjb3B5T2ZUb2Rvcykge1xuICAgICAgICAgICAgaWYgKGdyb3VwLmZpbmQodG9kbyA9PiB0b2RvLmlkID09PSB0YXJnZXRUb2RvLmlkKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNwbGljZShncm91cC5pbmRleE9mKHRhcmdldFRvZG8pLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNvcHlPZlRvZG9zKSB7XG4gICAgICAgICAgICBjYXNlIHRhcmdldFRvZG8ub3V0T2ZTY29wZTpcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2hlY2sgPSAoeyBrZXksIGlkLCB0aXRsZSwgb3V0T2ZTY29wZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldFRvZG8gPSB0b2Rvcy5maW5kKHRvZG8gPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgICBjb25zdCB1bnRhcmdldGVkVG9kb3MgPSB0b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBpZCk7XG4gICAgICAgIGNvbnN0IG5ld1RvZG8gPSB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgZG9uZTogIXRhcmdldFRvZG8uZG9uZSxcbiAgICAgICAgICAgIG91dE9mU2NvcGVcbiAgICAgICAgfTtcbiAgICAgICAgc2V0VG9kb3MoWy4uLnVudGFyZ2V0ZWRUb2RvcywgbmV3VG9kb10pO1xuICAgIH07XG4gICAgcmV0dXJuIChmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgY29ybmVyUmFkaXVzOiA4LCBmaWxsOiAnI2ZmZicsIHN0cm9rZTogJyNFNUU1RTUnLCBzdHJva2VXaWR0aDogMSwgd2lkdGg6IDM2NCB9LFxuICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogMjQsIHBhZGRpbmc6IDI0IH0sXG4gICAgICAgICAgICBmaWdtYS53aWRnZXQuaChBdXRvTGF5b3V0LCB7IGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgc3BhY2luZzogOCB9LFxuICAgICAgICAgICAgICAgIHRvZG9zLFxuICAgICAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsIHZlcnRpY2FsQWxpZ25JdGVtczogJ2NlbnRlcicsIHNwYWNpbmc6IDgsIG9uQ2xpY2s6ICgpID0+IHNldFRvZG9zKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRvZG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjcmVhdGVJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5ldyB0b2RvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0T2ZTY29wZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSkgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEud2lkZ2V0LmgoU1ZHLCB7IHNyYzogYFxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCIjOTE5MTkxXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDdDMTIuNTUyMyA3IDEzIDcuNDQ3NzIgMTMgOFYxNkMxMyAxNi41NTIzIDEyLjU1MjMgMTcgMTIgMTdDMTEuNDQ3NyAxNyAxMSAxNi41NTIzIDExIDE2VjhDMTEgNy40NDc3MiAxMS40NDc3IDcgMTIgN1pcIiAvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcgMTJDNyAxMS40NDc3IDcuNDQ3NzIgMTEgOCAxMUwxNiAxMUMxNi41NTIzIDExIDE3IDExLjQ0NzcgMTcgMTJDMTcgMTIuNTUyMyAxNi41NTIzIDEzIDE2IDEzTDggMTNDNy40NDc3MiAxMyA3IDEyLjU1MjMgNyAxMlpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICBgIH0pLFxuICAgICAgICAgICAgICAgICAgICBmaWdtYS53aWRnZXQuaChUZXh0QmxvY2ssIHsgZmlsbDogJyM3Njc2NzYnLCBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCB9LCBcIkFkZCBhIHRvZG9cIikpKSxcbiAgICAgICAgICAgIGZpZ21hLndpZGdldC5oKEF1dG9MYXlvdXQsIHsgZGlyZWN0aW9uOiAndmVydGljYWwnLCBzcGFjaW5nOiA4IH0pKSxcbiAgICAgICAgZmlnbWEud2lkZ2V0LmgoQXV0b0xheW91dFxuICAgICAgICAvLyBoaWRkZW49e291dE9mU2NvcGVUb2Rvcy5sZW5ndGggPT09IDB9XG4gICAgICAgICwgeyBcbiAgICAgICAgICAgIC8vIGhpZGRlbj17b3V0T2ZTY29wZVRvZG9zLmxlbmd0aCA9PT0gMH1cbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJywgaG9yaXpvbnRhbEFsaWduSXRlbXM6ICdjZW50ZXInLCBzcGFjaW5nOiA4LCBwYWRkaW5nOiAyNCwgZmlsbDogJyNmMmYyZjInIH0pKSk7XG59XG53aWRnZXQucmVnaXN0ZXIoU2NvcGVkVG9kb0NhcmQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9