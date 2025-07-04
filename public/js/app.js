const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msgOne.textContent = ''
    msgTwo.textContent = ''
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error
                return
            }
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecastData
        })
    })
})