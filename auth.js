


class User {
    construtor() {
        // this.name=n
    }
   
    #checkUsername(username) {
        let value = username.includes("#") ? false : true;
        return value;
    }

    #checkPassword(password) {
        let pass = password.length >= 8 ? true : false;
        return pass
    }

    async Signup(n, e, u, p, m, d) {
        let isValidated = this.#checkUsername(u) && this.#checkPassword(p);
        // if user is va;idated we store data here
        if (isValidated) {
            this.name = n;
            this.email = e;
            this.username = u;
            this.password = p;
            this.mobile = m;
            this.description = d;

            let actual_data = JSON.stringify(this);

            try {
                let res = await fetch(`https://masai-api-mocker.herokuapp.com/auth/register`, {
                    method: `POST`,
                    body: actual_data,
                    headers: {
                        "Content-Type": "appliccation/json",
                    },
                    // console.log("user Login succesful")
                });
                let data = await res.json()
                console.log(data);
                if (data.mesage == "Login Success") {
                    alert("Login Success")
                } else if (data.mesage == "Registration Fail,User Exist") {
                    alert("Registration Fail,User Exist")
                }
                // let NewData=data

            } catch (error) {
                console.log(error);
            }



        } else {
            alert("check Credential")
        }
    }
    async login(u, p) {
        this.username = u;
        this.password = p;

        let actual_data = JSON.stringify(this);

        try {
            let res = await fetch('https://masai-api-mocker.herokuapp.com/auth/login', {
                method: "POST",
                body:actual_data,
                headers:{
                    'Content-Type' : 'application/json',    
                }
            })
            let data=await res.json();
            getProfile(this.username,data.token);
            window.location.href="index.html"
        } catch (error) {
            alert("wrong Credentials")

        }
    }
}


let u1 = new User();

function Register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;
    const description = document.getElementById("description").value;


    u1.Signup(name, email, password, username, mobile, description)
}
function login(){
    let username =document.getElementById("login-username").value;
    let password=document.getElementById("login-password").value;

    u1.login(username,password);
}

async function getProfile(username,token){
    let apikey=`https://masai-api-mocker.herokuapp.com/user/${username}`

    let res =await fetch(apikey,{
        headers: {

            'Content-Type':'application/json',

            Authorization:`Bearer ${token}`
        },
    })
    let data = await res.json();
    console.log(data);
}