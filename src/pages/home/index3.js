const RenderTable = (data) => {

   const table = document.getElementById("table-finances")
   table.innerHTML = ""

   data.map ((item) => {

      const tableRow = document.createElement("tr")
      tableRow.className = "mt"

      // title 

      const titleTd = document.createElement("td")
      const titleText =document.createTextNode(item.title)
      titleTd.appendChild(titleText)
      tableRow.appendChild(titleTd)

      // category 

      const categoryTd = document.createElement("td")
      const categoryText=
      document.createTextNode(item.name)
      categoryTd.appendChild(categoryText)
      tableRow.appendChild(categoryTd)

      // date 

      const datetd = document.createElement("td")
      const dateText = document.createTextNode(
         new Date(item.date).toLocaleDateString()
      )
      datetd.appendChild(dateText)
      tableRow.appendChild(datetd)

      // value 

      const valueTd = document.createElement("td")
      const valueText = document.createTextNode(
         new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
         }).format(item.value)
      )

      if ( item.value > 0){
         valueTd.style.color = "green"
      } else if ( item.value < 0){
         valueTd.style.color = "red"
      }
      valueTd.className = "center"
      valueTd.appendChild(valueText)
      tableRow.appendChild(valueTd)

      // delete

      const deleteTd = document.createElement("td")
      deleteTd.className = "right"
      const deleteText = document.createTextNode("Deletar")
      deleteTd.appendChild(deleteText)
      tableRow.appendChild(deleteTd)

      // table add tableRow

      table.appendChild(tableRow)

   })

}
const userExpensesData = (data) => {

   const totalItens = data.length 

   const revenues = data
   .filter((item) => Number(item.value) > 0)
   .reduce((acc, item) => acc + Number(item.value), 0)
   
   const expenses = data 
   .filter((item) => Number(item.value) < 0)
   .reduce((acc, item) => acc + Number(item.value), 0)

   const total = revenues -(-expenses)

   // total of finances
   
   const totalFinances = document.getElementById("finance-card-1")
   totalFinances.innerHTML = " "
      // subtext "Total de lançamentos"
          const totalSubtext = document.createElement("h3")
          const totalSubtextText = document.createTextNode("Total de lançamentos")
          totalSubtext.appendChild(totalSubtextText)
          totalFinances.appendChild(totalSubtext)

  
   const totalFinancesElement = document.createElement('h1')
   const totalFinancesText = document.createTextNode(totalItens)
   totalFinancesElement.appendChild(totalFinancesText)
   totalFinances.appendChild(totalFinancesElement)

   // total  revenues 

   const  totalRevenues = document.getElementById("finance-card-2")
   totalRevenues.innerHTML = " "


    //  Receitas 

       const revenuesSubTextElement = document.createElement("h3")
       const revenuesSubtextText = document.createTextNode("Receitas")
       revenuesSubTextElement.appendChild(revenuesSubtextText)
       totalRevenues.appendChild(revenuesSubTextElement)

   const totalRevenuesElement = document.createElement('h1')
   const totalRevenuesText = document.createTextNode(
      new Intl.NumberFormat("pt-br", {
         style: "currency",
         currency: "BRL",
      }).format(revenues)

      // or to be more simple: const totalRevenuesText = document.createTextNode(revenues)
   )
   totalRevenuesElement.appendChild(totalRevenuesText)
   totalRevenues.appendChild(totalRevenuesElement)

   // user`s spendings 

   const totalSpending = document.getElementById("finance-card-3")
   totalSpending.innerHTML =  " "

       // Despesa subText
         const spendingSubtextElement = document.createElement("h3")
         const totalSpendingSubtextText = document.createTextNode("Despesas")
         spendingSubtextElement.appendChild(totalSpendingSubtextText)
         totalSpending.appendChild(spendingSubtextElement)

   const spendingElement = document.createElement("h1")
   const spendingText = document.createTextNode(
      new Intl.NumberFormat("pt-br", {
         style:"currency",
         currency: "BRL",
      }).format(expenses)
   )
   spendingElement.appendChild(spendingText)
   totalSpending.appendChild(spendingElement)

   // user gains or loses 

   const balance = document.getElementById('finance-card-4')
   balance.innerHTML = " "

      // Balance subtext

      const balanceSubtextElement = document.createElement("h3")
      const balanceSubtextText = document.createTextNode("Balanço")
      balanceSubtextElement.appendChild(balanceSubtextText)
      balance.appendChild(balanceSubtextElement)

   const balanceElement = document.createElement("h1")
   const balanceText = document.createTextNode(
      new Intl.NumberFormat("pt-br", {
         style:"currency",
         currency:"BRL"
      }).format(total)
   )
   if ( total >= 0){
      balanceElement.style.color = "#5936CD";
   }else {
      balanceElement.style.color = "red"
   }
   balanceElement.appendChild(balanceText)
   balance.appendChild(balanceElement)

}

const userFinances = async ()  => {

   const email = localStorage.getItem("@WalletApp:UserEmail")

   try {
      const date = "2022-12-16"
      const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`, {

      method: 'GET',
      headers: {
         email: email
      }

      })

      const data = await result.json()

      console.log(data)
      userExpensesData(data)
      RenderTable(data)

   } catch (error) {
      return { error }
   }

}

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

const onLoadCategories = async () =>{
   try {

   const categoriesSelect  = document.getElementById("category")
   const response = await fetch('https://mp-wallet-app-api.herokuapp.com/categories')
   const categoriesResult = await response.json()

  categoriesResult.map((category) => {

     const option = document.createElement("option")
     const optionText =  document.createTextNode(category.name)
     option.id = `category_${category.id}`
     option.value = category.id
     option.appendChild(optionText)
     categoriesSelect.append(option)

  })

   console.log(categoriesResult)

   } catch (error) {
      alert("Erro ao cadastrar categoria!")
      return { error }
    
   }

}

const onOpenModal = () => {
   const modal = document.getElementById("modal")
   modal.style.display = "flex"
}

const onCloseModal = () => {
   const modal = document.getElementById("modal")
   modal.style.display = "none"
}

const onAddFinance = async (data) => {

   try {
      const email = localStorage.getItem("@WalletApp:UserEmail")
    const response = await fetch("https://mp-wallet-app-api.herokuapp.com/finances",{
  
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: "same-origin",
      headers: {
        'content-Type': 'application/json',
        email: email
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

const onCreateFinanceRelease = async (target) => {
   try {
      const title = target[0].value
      const value = Number(target[1].value)
      const date = target[2].value
      const category = Number(target[3].value)

      const result = await onAddFinance({
           title,
           value,
           date,
           category_id: category
      })

      if(result.error){
         alert("Erro ao cadastrar")
         return
      }

      onCloseModal()
    //  userInfomation()
   userFinances()
   } catch (error) {
      alert("Erro!")
   }
}

window.onload = () => {

   const email = localStorage.getItem("@WalletApp:UserEmail")
   userInfomation()
   userFinances()
   onLoadCategories()

   const form = document.getElementById("form-add-release-finances")
   form.onsubmit = (event) => {
     event.preventDefault() 
     console.log({target: event.target})
     onCreateFinanceRelease(event.target)
   }
}
