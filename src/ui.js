import './ui.css';
function handleSubmit() {
    const textbox = document.getElementById('title');
    const value = textbox.value;
    if (value === "") {
        parent.postMessage({ pluginMessage: { type: 'delete-todo' } }, '*');
    }
    else {
        parent.postMessage({ pluginMessage: { type: 'update-title', value } }, '*');
    }
}
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});
window.addEventListener('click', (e) => {
    const popup = document.getElementById("edit-todo-title-popup");
    if (e.target !== popup) {
        handleSubmit();
    }
});
