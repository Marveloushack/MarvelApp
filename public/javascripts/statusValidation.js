
const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');

let userStatus = ""
window.addEventListener('load', () => {

    ComicsAPI.getUserStatus()
        .then(response => {
            userStatus = response.data
            console.log(userStatus)
            if (userStatus == "Pending Confirmation") {
                $('#myModal').modal()
            } else {

            }
        })
        .catch(error => console.log('oOh No! Error is: ', error))
})