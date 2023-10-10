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
    moveOutBtn.style.display = 'none'
    moveInBtn.style.display = 'flex'
  }

  if (msg.pileSize === 1) {
    moveUpBtn.disabled = true;
    moveDownBtn.disabled = true;
  } else if (msg.index === 0) {
    moveUpBtn.disabled = true;
  } else if (msg.index === msg.length - 1) {
    moveDownBtn.disabled = true;
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
      break;
    case moveDownBtn:
      parent.postMessage({ pluginMessage: { type: 'move-todo-down', id } }, '*');
      break;
    case (moveOutBtn || moveInBtn):
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
