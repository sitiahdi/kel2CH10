


function getCookie(cookieName) {
    const name = cookieName + '=';
    const cookieDecode = decodeURIComponent(document.cookie);

    const cookieArr = cookieDecode.split(';');

    let res;

    cookieArr.forEach(e => {
        if (e.indexOf(name) === 0) {
            res = e.substring(name.length);
        }
    });

    return res
}

export default getCookie