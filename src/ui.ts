
import './ui.css'


const textbox = <HTMLInputElement>document.getElementById('textbox')
textbox.focus()
textbox.select()


let widget
let id: string

onmessage = (event) => {
  const msg = event.data.pluginMessage

  widget = msg.widget
  id = msg.id
  if (msg.type === 'edit') {
    textbox.value = msg.title
  }
}

const handleClose = (title: string) => {
  if (title === '') {
    parent.postMessage({ pluginMessage: { type: 'delete-todo', id }}, '*')
  } else {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' }}, '*')
  }
}

textbox.addEventListener('blur', () => {
  const title = textbox.value
  handleClose(title)
})

textbox.addEventListener('keyup', (e) => {
  const title = textbox.value
  if (e.key === "Enter" || e.key === "Escape") {
    handleClose(title)
  } else {
    parent.postMessage({ pluginMessage: { type: 'update-title', title, id }}, '*')
  }
})

// function handleSubmit() {
  // const textbox = document.getElementById('title') as HTMLInputElement
  // const value = textbox.value;
  // if (value === "") {
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  // } else {
  //   parent.postMessage({ pluginMessage: { type: 'update-todo-title', value } }, '*')
  // }
// }

// document.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     handleSubmit();
//   }
// })
