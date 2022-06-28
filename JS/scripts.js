//Global Variabes
const userUrl = `https://randomuser.me/api/?results=12`;
const gallery = document.getElementById("gallery");
let employeesArr = [];
const bodyHtml = document.querySelector("body");

// Handle all fetch requests
fetch(userUrl)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(showEmployee)
  .catch((error) => console.log("Looks like there was a problem!", error));

//Function to create cards
function showEmployee(employees) {
  employeesArr = employees;
  let employeeHTMl = "";

  //For each that creates the profile card for each employee
  employees.forEach((employee, index) => {
    employeeHTMl += `
        <div class="card" data-index="${index}">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last} </h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
`;
  });
  gallery.insertAdjacentHTML("beforeend", employeeHTMl);
}

function showModal(index) {
  const {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employeesArr[index];
  const newPhoneFormat = phone.replace(/-/, " "); //Reformats the phone number
  let newDate = new Date(dob.date);

  //Creates and formats the Modal
  const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${
                  picture.large
                }" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${newPhoneFormat}</p>
                <p class="modal-text">${street.number} ${
    street.name
  }, ${city}, ${state} ${postcode}</p>
                <p class="modal-text">Birthday: ${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}</p>
            </div>
        </div>
    </div>
    `;
  bodyHtml.insertAdjacentHTML("beforeend", modalHTML); //Inserts in the Document

  //Event Listener to Close Modal
  let closeModal = document.getElementById("modal-close-btn");
  closeModal.addEventListener("click", (e) => {
    document.body.removeChild(document.body.lastElementChild);
  });
}

//EventListener to Display Modal
gallery.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  const index = card.getAttribute("data-index");
  currentModalIndex = index;
  showModal(currentModalIndex);
});
