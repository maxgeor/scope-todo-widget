import './menu.css'

const deleteBtn = <HTMLButtonElement>document.getElementById('delete-btn')
const moveUpBtn = <HTMLButtonElement>document.getElementById('move-up-btn')
const moveDownBtn = <HTMLButtonElement>document.getElementById('move-down-btn')
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
  switch(e.target) {
    case deleteBtn:
      parent.postMessage({ pluginMessage: { type: 'delete-todo', id } }, '*');
      handleClose();
      break;
    case moveUpBtn:
      parent.postMessage({ pluginMessage: { type: 'move-todo-up', id } }, '*');
      case moveDownBtn:
      parent.postMessage({ pluginMessage: { type: 'move-todo-down', id } }, '*');
    case moveOutBtn || moveInBtn:
    case moveInBtn:
      parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id } }, '*');
      handleClose();
      break;
  }

  // if (e.target === deleteBtn) {
  //   parent.postMessage({ pluginMessage: { type: 'delete-todo', id } }, '*');
  //   handleClose();
  // } else if (
  //   e.target === moveOutBtn || 
  //   e.target === moveInBtn
  // ) {
  //   parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id }}, '*')
  //   handleClose()
  // }
})
