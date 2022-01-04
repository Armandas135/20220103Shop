interface itemsInt {
    name: string,
    photo: string,
    weight: number,
    price: number,
    category: string
}

const items: itemsInt[] = [
    {
        name: "Milk",
        photo: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&resize=960,872",
        weight: 0.7,
        price: 2,
        category: "food"
    },
    {
        name: "Bread",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korb_mit_Br%C3%B6tchen.JPG/1200px-Korb_mit_Br%C3%B6tchen.JPG",
        weight: 0.5,
        price: 3,
        category: "food"
    },
    {
        name: "Meat",
        photo: "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/125:94/w_2393,h_1800,c_limit/meat-80049790.jpg",
        weight: 2.5,
        price: 4.50,
        category: "food"
    },
    {
        name: "Camera",
        photo: "http://i1.adis.ws/i/canon/eos-r6-rf24-105mm-f4_7.1_is_stm_front-on_square_6412568cc0e7484b96bd55e43069a56c",
        weight: 5,
        price: 200,
        category: "electronics"
    },
    {
        name: "Screen",
        photo: "https://lh3.googleusercontent.com/proxy/wl4THlWX1WeI7MVeP2X0DKLUE7NZr6fdm4WQ32TDzYefkQ67htVue1e-F_RKzSA8oTLNNfsBqGnUSbfeBip4F09i-PnAIyxMCd-l-zgh9ZNxSqcF20aBf_0BbdQ",
        weight: 8,
        price: 150,
        category: "electronics"
    },
    {
        name: "Phone",
        photo: "https://i5.walmartimages.com/asr/10accd37-b241-4d55-b39d-2417f2f80f74.dd8421d47ac8c8517d0b81fe716760b2.jpeg",
        weight: 0.5,
        price: 400,
        category: "electronics"
    },
    {
        name: "Chair",
        photo: "https://www.ikea.com/kr/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s",
        weight: 4,
        price: 20,
        category: "furniture"
    },
    {
        name: "Sofa",
        photo: "https://cdn.shopify.com/s/files/1/0056/0912/8000/products/Sofa_lova_Svan_1800x1800.jpg?v=1583269013",
        weight: 60,
        price: 200,
        category: "furniture"
    },
    {
        name: "Lamp",
        photo: "https://greenice.com/57848/a.jpg",
        weight: 4,
        price: 80,
        category: "furniture"
    },
]

const itemsInShop = document.querySelector(".shopContainer")!
const inventoryItems = document.querySelector(".inventoryContainer")!
let moneyCount: number = 300
let weightTotal: number = 30
const money = document.querySelector(".money")!
const weightCount = document.querySelector(".weight")!


money.innerHTML = `Money: ${moneyCount}`
weightCount.innerHTML = `Carry weight: ${weightTotal}`

function createShopItems(obj: itemsInt[]): void {
    for (const shopItem of obj) {
        const item = document.createElement("itemDiv")
        itemsInShop.appendChild(item)
        item.classList.add("itemSlot")
        const img = document.createElement("img")
        item.appendChild(img)
        img.src = shopItem.photo
        const name = document.createElement("p")
        item.appendChild(name)
        name.innerText = shopItem.name
        const weight = document.createElement("p")
        item.appendChild(weight)
        weight.innerText = `${shopItem.weight}`
        const price = document.createElement("p")
        item.appendChild(price)
        price.innerText = `${shopItem.price}`

        item.onclick = () => {
            if (moneyCount >= 0 && moneyCount >= shopItem.price && weightTotal >= 0 && weightTotal >= shopItem.weight) {
                inventoryItems.appendChild(item.cloneNode(true))
                weightTotal -= shopItem.weight
                weightCount.innerHTML = `Weight left: ${weightTotal}`
                moneyCount -= shopItem.price
                money.innerHTML = `Money left: ${moneyCount}`
            }
        }
    }
}

createShopItems(items)


// Get the modal
const modal: HTMLElement | null = document.getElementById("myModal");

// Get the button that opens the modal
const btn: HTMLElement | null = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span: HTMLElement | null = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Creating a new product

const addNewProduct = document.getElementById("confirmNewProduct")!
const inputs = document.querySelectorAll("input")
const selector = document.querySelector("select")!

addNewProduct.onclick = () => {
    if (inputs[0].value !== "" && inputs[1].value !== "" && inputs[2].value !== "" && inputs[3].value !== "") {
        items.push({
            name: inputs[0].value,
            photo: inputs[1].value,
            weight: Number(inputs[2].value),
            price: Number(inputs[3].value),
            category: selector.value
        })
        itemsInShop.innerHTML = ""
        createShopItems(items)

    } else {
        alert("Fill all the information needed")
    }
}


// categories

const foodCategory: HTMLElement = document.querySelector(".foodCategory")!
const electronicsCategory: HTMLElement = document.querySelector(".electronicsCategory")!
const furnitureCategory: HTMLElement = document.querySelector(".furnitureCategory")!
const showAllCategories: HTMLElement = document.querySelector(".showAllCategories")!

function filter(category: string) {
    itemsInShop.innerHTML = ""
    for (const i in items) {
        if (items[i].category === category) {
            const arr = []
            arr.push(items[i])
            createShopItems(arr)
        }
    }
}


foodCategory.onclick = () => filter("food")


electronicsCategory.onclick = () => filter("electronics")


furnitureCategory.onclick = () => filter("furniture")

showAllCategories.onclick = () => {
    itemsInShop.innerHTML = ""
    createShopItems(items)
}


