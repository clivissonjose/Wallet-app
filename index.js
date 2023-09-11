const onclicklogin = () => {
    const email = document.getElementById('input-email').value  
    
    if( email.length < 5 || !email.includes("@")) {
        alert("Email inválido!")
      return
    }

localStorage.setItem("@WalletApp:UserEmail", email)
window.open("./src/pages/home/index3.html", "_self")
    
  }

