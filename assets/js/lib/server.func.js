const sendRequest = async function (form_data, url = APP_URL + '/requests', method = 'POST', headers = {}) {
    headers['Cache-Control'] = 'no-cache'
    let response = false
    await fetch(url, {
        method: method,
        headers: headers,
        body: form_data
    })
        .then(response => response.json())
        .then((data) => {
            if(DEBUG) console.log(data)
            if(data['error'] === false)
                response = data
        })
        .catch((error) => {
            if(DEBUG) console.log(error)
        });
    return response
}

export {sendRequest}