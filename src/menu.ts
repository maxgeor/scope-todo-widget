import './menu.css'

const moveInBtn = <HTMLButtonElement>document.getElementById('move-in-btn')
const moveOutBtn = <HTMLButtonElement>document.getElementById('move-out-btn')
const moveUpBtn = <HTMLButtonElement>document.getElementById('move-up-btn')
const moveDownBtn = <HTMLButtonElement>document.getElementById('move-down-btn')
const deleteBtn = <HTMLButtonElement>document.getElementById('delete-btn')

let widget
let id: string
let outOfScope: boolean

onmessage = (event) => {
  const msg = event.data.pluginMessage
  widget = msg.widget
  id = msg.id
  outOfScope = msg.outOfScope
  if (outOfScope === true) {
    moveInBtn.style.display = 'flex'
    moveOutBtn.style.display = 'none'
  }
}

const handleClose = () => {
  parent.postMessage({ pluginMessage: { type: 'close-plugin' }}, '*')
}

document.addEventListener('click', (e) => {
  if (e.target === deleteBtn) {
    parent.postMessage({ pluginMessage: { type: 'delete-todo', id }}, '*')
    handleClose()
  } else if (e.target === moveOutBtn || e.target === moveInBtn) {
    outOfScope = !outOfScope
    parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id, outOfScope }}, '*')
    handleClose()
  } else if (e.target === moveUpBtn || e.target === moveDownBtn) {
    const movingUp = e.target === moveUpBtn

    parent.postMessage({ 
      pluginMessage: { 
        type: movingUp ? 'move-todo-up' : 'move-todo-down', 
        id 
      }
    }, '*')
  }
})
