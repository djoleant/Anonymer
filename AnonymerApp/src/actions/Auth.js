export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const login = (email, password) => {
    return async (dispatch) => {
        const response = await fetch("http://localhost:7240/Auth/Login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                "Content-Type": "application/json",
                //"cookie": "UserAuthCookie=" + getCookie("UserAuthCookie")
            },
            body: JSON.stringify({
                Username: email,
                Password: password,
            }),
            credentials: "include"

        });
        const data = await response.json();

        if (data.succeeded) {
            checkIfLogged();
        }
        return data;
    };
};

// export const logout = () => {
//     return async (dispatch) => {
//         const response = await fetch("/auth/logout");
//         const data = await response.json();

//         if (data.success) {
//             dispatch({ type: LOGOUT, user: null, loggedIn: false });
//         }
//     };
// };

export const checkIfLogged = (reloadHeader) => {
    return async (dispatch, getState) => {

        const response = await fetch("http://localhost:7240/Auth/CheckUser", {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        if (data.logged) {
            dispatch({
                type: LOGIN,
                user: data.user,
                loggedIn: true,
            });
            localStorage.setItem("role", data.user.roles[0])
            if (reloadHeader !== undefined) {
                loadUserData().then(r => {

                    reloadHeader();
                })
            }
        }
    };
};

export const register = async (firstName, lastName, email, username, password, companyName, role) => {

    const response = await fetch("http://localhost:7240/Auth/Register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            companyName: companyName,
            role, role
        }),
        credentials: "include"
    });

    const data = await response.json();
    

    return data;
};

export const clearData = () => {
    localStorage.setItem("role", "Guest");
    localStorage.setItem("id", "");
    localStorage.setItem("username", "");
    localStorage.setItem("picture", "");
}

export const loadUserData = async () => {
    const response = await fetch("http://localhost:7240/Auth/CheckUser", {
        method: "GET",
        credentials: "include"
    });

    const data = await response.json();

    if (data.logged) {
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("role", data.user.roles[0])
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("picture", data.user.picture);
    }
}


export const logout = async () => {
    const response = await fetch("http://localhost:7240/Auth/Logout", {
        method: "POST",
        credentials: "include"
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("role", "Guest");
        localStorage.setItem("id", "");
        localStorage.setItem("username", "");
        localStorage.setItem("picture", "");
    }

}