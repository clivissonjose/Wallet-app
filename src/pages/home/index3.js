const userInfomation = () => {

    const email = localStorage.getItem("@WalletApp:UserEmail")
    const name = localStorage.getItem("@WalletApp:UserName")

   const UserInfo = document.getElementById("navbar-user-container")
   const UserLetter = document.getElementById("user-letter")

   // User email 
   const emailElement = document.createElement("p")
   const emailText = document.createTextNode(email)
   emailElement.appendChild(emailText)
   UserInfo.appendChild(emailElement)

   // logout 

   const logoutElement = document.createElement("a")
   const logoutText = document.createTextNode("Sair")
   logoutElement.appendChild(logoutText)
   UserInfo.appendChild(logoutElement)

   // User  first Letter  

   const nameElement = document.createElement("h3")
   const nameText = document.createTextNode(name.charAt(0))
   nameElement.appendChild(nameText)
   UserLetter.appendChild(nameElement)

   


}


window.onload = () => {
  const email = localStorage.getItem("@WalletApp:UserEmail")
   userInfomation()
}