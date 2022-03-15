import axios from 'axios';

function getFromApi(uri, cb) {
    axios.get(uri)
    .then(cb)
    .catch(error => {
        console.log(error)
    })
}

export default usersApi;