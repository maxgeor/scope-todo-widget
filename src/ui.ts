import './ui.css'

const textbox = <HTMLInputElement>document.getElementById('textbox')
textbox.focus()

let id: string

onmessage = (event) => {
  const { id: widgetId } = event.data.pluginMessage

  id = widgetId
}

const handleClose = (title: string) => {
  if (title === '') {
    parent.postMessage({ pluginMessage: { type: 'delete-todo', id }}, '*')
  } else {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' }}, '*')
  }
}

window.addEventListener('click', (event) => {
  if (event.target != document.body) {
    handleClose(textbox.value);
  };
})

textbox.addEventListener('blur', () => handleClose(textbox.value));

textbox.addEventListener('keyup', (e) => {
  const title = textbox.value
  if (e.key === 'Enter' || e.key === 'Escape') {
    handleClose(title)
  } else {
    parent.postMessage({ pluginMessage: { type: 'update-title', title, id }}, '*')
  }
})

