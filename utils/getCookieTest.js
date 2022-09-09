import jwtDecode from "jwt-decode";



function getCookieTest(cookieName, cookieSample) {
	try {
		const name = cookieName + "=";
		const cookieDecode = decodeURIComponent(cookieSample);
		
		const cookieArr = cookieDecode.split(";");
		
		let res;
    
		cookieArr.forEach(e => {
			if (e.indexOf(name) === 0) {
				res = e.substring(name.length);
			}
		});

		const decoded = jwtDecode(res);
		if (decoded === undefined || !decoded) {
			throw Error(err);
		}
		return res;
	} catch(err) {
		return false;
	}
}

module.exports = getCookieTest;