 const validateUser = async (email) => {

  try {
    const result =  await fetch(
        `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
        )

   const user = await result.json()
   
   return user 

  } catch (error) {
      return { error }
  }
 }

const onclicklogin = async () => {
    const email = document.getElementById('input-email').value  
    
    if( email.length < 5 || !email.includes("@")) {
        alert("Email inválido!")
       return
    }

const result = await validateUser(email)

console.log(result)

if(result.error) {
     alert("Erro ao validar E-mail!")
     return
}

localStorage.setItem("@WalletApp:UserEmail", result.email)
localStorage.setItem("@WalletApp:UserName", result.name)
localStorage.setItem("@WalletApp:UserId", result.id)

window.open("./src/pages/home/index3.html", "_self")
    
  }

