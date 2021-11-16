import './ui.css';
const textbox = document.getElementById('textbox');
textbox.focus();
textbox.select();
let widget;
let id;
onmessage = (event) => {
    const msg = event.data.pluginMessage;
    widget = msg.widget;
    id = msg.id;
    if (msg.type === 'edit') {
        textbox.value = msg.title;
    }
};
const handleClose = (title) => {
    if (title === '') {
        parent.postMessage({ pluginMessage: { type: 'delete-todo', id } }, '*');
    }
    else {
        parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
    }
};
textbox.addEventListener('blur', () => {
    const title = textbox.value;
    handleClose(title);
});
textbox.addEventListener('keyup', (e) => {
    const title = textbox.value;
    if (e.key === 'Enter' || e.key === 'Escape') {
        handleClose(title);
    }
    else {
        parent.postMessage({ pluginMessage: { type: 'update-title', title, id } }, '*');
    }
});
textbox.addEventListener('keypress', (e) => {
    const title = textbox.value;
    if (e.key === 'Backspace' && title === '') {
        handleClose(title);
    }
});
