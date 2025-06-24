document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('nameInput').addEventListener('keydown', checkEnter);
    document.getElementById('imageInput').addEventListener('change', handleFormSubmit);
});

function checkEnter(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleFormSubmit();
    }
}

function handleFormSubmit() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const imageInput = document.getElementById('imageInput');

    if (!imageInput.files[0]) {
        fetchData(`/gemini?query=${encodeURIComponent(nameInput)}`)
            .then(data => handleResponse(data));
    } else {
        const formData = new FormData();
        formData.append('file', imageInput.files[0]);

        fetchUpload(`/upload`, formData)
            .then(response => {
                if (response.ok && nameInput) {
                    // const temp = "Explain this image in paragraph "
                    return fetchData(`/gemini/img?query=${encodeURIComponent(nameInput)}`)
                    .then(data => handleResponse(data));
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    document.getElementById('nameInput').value.trim() = "";
}

function fetchData(url) {
    return fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        });
}

function fetchUpload(url, formData) {
    return fetch(url, { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response;
        });
}

function handleResponse(data) {
    const userInputDisplay = document.getElementById('userInputDisplay');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = data;
    userInputDisplay.appendChild(messageElement);

    document.getElementById('nameInput').value = '';
    userInputDisplay.scrollTop = userInputDisplay.scrollHeight;

    document.getElementById('imageInput').value = null;
}
