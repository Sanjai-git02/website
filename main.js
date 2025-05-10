const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});


ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 500,
});

const clientImageArr = [
  "/assets/client-1.jpg",
  "/assets/client-2.jpg",
  "/assets/client-3.jpg",
];

const clientImage = document.querySelector(".client__image img");

function updateSwiperImage(eventName, args) {
  if (eventName === "slideChangeTransitionStart") {
    const index = args && args[0].realIndex;
    clientImage.classList.remove("show");
    clientImage.classList.add("hide");
    clientImage.addEventListener(
      "animationend",
      (e) => {
        clientImage.src = clientImageArr[index];
        clientImage.classList.remove("hide");
        clientImage.classList.add("show");
      },
      {
        once: true,
      }
    );
  }
}

const swiper = new Swiper(".swiper", {
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },

  onAny(event, ...args) {
    updateSwiperImage(event, args);
  },
});

const banner = document.querySelector(".banner__wrapper");

Array.from(banner.children).forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});


let products = {
  data: [
    {
      productName: "Marina Beach",
      category: "Chennai",
      price: "30 per day",
      image: "assets/marina.jpg",
    },
    {
      productName: "Mamallapuram",
      category: "Chennai",
      price: "50 per day",
      image: "assets/mamallapuram.jpg",
    },
    {
      productName: "Meenakshi Amman Temple",
      category: "Madurai",
      price: "40 per day",
      image: "assets/meenakshi.jpg",
    },
    {
      productName: "Thirumalai Nayakkar Palace",
      category: "Madurai",
      price: "45 per day",
      image: "assets/palace.jpg",
    },
    {
      productName: " Vivekananda Rock Memorial",
      category: "kanyakumari",
      price: "35 per day",
      image: "assets/rock.jpg",
    },
    {
      productName: " Thiruvalluvar Statue",
      category: "kanyakumari",
      price: "30 per day",
      image: "assets/tiruvallur.jpg",
    },
    {
      productName: "ooty lake",
      category: "ooty",
      price: "45 per day",
      image: "assets/ooty lake.jpg",
    },
    {
      productName: "Botanical Gardens",
      category: "ooty",
      price: "40 per day",
      image: "assets/botanical.jpg",
    },
    {
      productName: "Nilgiri Mountain Railway ",
      category: "ooty",
      price: "35 per day",
      image: "assets/rail.jpg",
    },
  ],
};

for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //price
  let price = document.createElement("h6");
  price.innerText = "$" + i.price;
  container.appendChild(price);
  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}
//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}
//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");
  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});
//Initially display all products
window.onload = () => {
  filterProduct("all");
};
