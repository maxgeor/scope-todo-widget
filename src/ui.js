import './ui.css';
const deleteBtn = document.getElementById('delete-btn');
const moveOutBtn = document.getElementById('move-out-btn');
const moveInBtn = document.getElementById('move-in-btn');
let id;
onmessage = (event) => {
    const { id: widgetId, outOfScope } = event.data.pluginMessage;
    id = widgetId;
    if (outOfScope === true) {
        moveOutBtn.style.display = 'none';
        moveInBtn.style.display = 'flex';
    }
};
const handleClose = () => parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
document.addEventListener('keyup', (e) => {
    debugger;
    if (e.key === 'Escape')
        handleClose();
});
document.addEventListener('click', (e) => {
    switch (e.target) {
        case deleteBtn:
            parent.postMessage({ pluginMessage: { type: 'delete-todo', id } }, '*');
            break;
        case moveOutBtn:
            parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id } }, '*');
            handleClose();
            break;
        case moveInBtn:
            parent.postMessage({ pluginMessage: { type: 'flip-todo-scope', id } }, '*');
            handleClose();
            break;
    }
});
