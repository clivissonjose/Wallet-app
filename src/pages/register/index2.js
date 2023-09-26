const onCallRegister = async (email, name) => {

 try {
  const data = {
    email,
    name
  }
  const response = await fetch("https://mp-wallet-app-api.herokuapp.com/users",{

    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: "same-origin",
    headers: {
      'content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)

  })

  const user = await response.json()

  return user 


 } catch (error) {

  console.log(error)
  
 }
}

const onRegister = async () => {
  const email = document.getElementById("input-email").value 
  const name = document.getElementById("input-name").value

  if ( name.lenght < 3 ){
    alert("O nome não pode ter menos do que 3 letras.")
    return
  }else if ( email.lenght < 5 || !email.includes("@")){
    alert("E-mail inválido!")
    return 
  }

  const result = await onCallRegister(email,name)

  if( result.error){
    console.log("Erro ao cadastrar!")
    return 
  }

  localStorage.setItem("@WalletApp:UserEmail", result.email)
  localStorage.setItem("@WalletApp:UserName", result.name)
  localStorage.setItem("@WalletApp:UserID", result.id)

  window.open("../home/index3.html", "_self")


}

window.onload = () => {
  const form = document.getElementById("form-register")
  form.onsubmit = (event) => {
     event.preventDefault()
     onRegister()
  }
}