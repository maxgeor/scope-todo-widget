import './menu.css'

const deleteBtn = <HTMLButtonElement>document.getElementById('delete-btn')
const moveOutBtn = <HTMLButtonElement>document.getElementById('move-out-btn')
const moveInBtn = <HTMLButtonElement>document.getElementById('move-in-btn')

let id: string

onmessage = (event) => {
  const msg = event.data.pluginMessage
  id = msg.id

  if (msg.outOfScope === true) {
    moveInBtn.style.display = 'flex'
    moveOutBtn.style.display = 'none'
  }
}

const handleClose = () => 
  parent.postMessage({ pluginMessage: { type: 'close-plugin' }}, '*');

document.addEventListener('click', (e) => {
  if (e.target === deleteBtn) {
    parent.postMessage({ pluginMessage: { type: 'delete-todo', id } }, '*');
    handleClose();
  } else if (
    e.target === moveOutBtn || 
    e.target === moveInBtn
  ) {
    parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id }}, '*')
    handleClose()
  }
})
