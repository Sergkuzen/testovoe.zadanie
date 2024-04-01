const changeTitle = (text) => {
    $('title').text(function () {
        return APP_NAME + ' | ' + text
    })
}

export {changeTitle}