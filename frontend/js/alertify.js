const mainMsgDiv = document.getElementById('messageMainDiv');

function alertify(message, type, duration = 6000) {
    let color;
    switch (type) {
        case 'success':
            color = 'success';
            break;
        case 'error':
            color = 'error';
            break;
        default:
            color = 'warning';
            break;
    }
    const msgNode = createElement("div", { "class": `alertify_message ${color}` });
    msgNode.innerHTML = `<span class="alertify_message_text">${message}</span>`;
    const timeOut = setTimeout(() => {
        msgNode.remove();
    }, duration);
    msgNode.addEventListener('click', () => {
        msgNode.remove();
        clearTimeout(timeOut);
    });
    mainMsgDiv.appendChild(msgNode);
}
