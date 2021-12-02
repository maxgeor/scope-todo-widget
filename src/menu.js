import './ui.css';
const deleteBtn = document.getElementById('delete-btn');
const moveOutBtn = document.getElementById('move-out-btn');
const moveInBtn = document.getElementById('move-in-btn');
let widget;
let id;
let outOfScope;
onmessage = (event) => {
    const msg = event.data.pluginMessage;
    widget = msg.widget;
    id = msg.id;
    outOfScope = msg.outOfScope;
};
const handleClose = () => {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
};
document.addEventListener('click', (e) => {
    if (e.target === deleteBtn) {
        parent.postMessage({ pluginMessage: { type: 'delete-todo', id } }, '*');
        handleClose();
    }
    else if (e.target === moveOutBtn || e.target === moveInBtn) {
        parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id, outOfScope } }, '*');
        handleClose();
    }
});
