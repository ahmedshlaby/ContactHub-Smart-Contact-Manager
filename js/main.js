// form elements
var nameContactElement = document.getElementById("contactName");
var phoneContactElement = document.getElementById("contactPhone");
var emailContactElement = document.getElementById("contactEmail");
var addressContactElement = document.getElementById("contactAddress");
var typeContactElement = document.getElementById("contactType");
var emergencyContactElement = document.getElementById("contactEmergency");
var favoriteContactElement = document.getElementById("contactFavorite");
var notesContactElement = document.getElementById("contactNotes");
var contactFormModalElement = document.getElementById("contactFormModal");
var totalContactsElement = document.getElementById("totalContacts");
var totalContactsSpanElement = document.getElementById("totalContactsSpan");
var favoriteContactsElement = document.getElementById("favoriteContacts");
var emergencyContactsElement = document.getElementById("emergencyContacts");
var favoritesListElement = document.getElementById("favoritesContactsList");
var emergencyListElement = document.getElementById("emergencyContactsList");
var searchInputElement = document.getElementById("searchInput");
var contactPhotoElement = document.getElementById("contactPhoto");
var contactPhotoUrlElement = document.getElementById("contactPhotoUrl");
var avatarPrev = document.getElementById("avatarPrev");

// error messages
var nameErrorElement = document.getElementById("nameError");
var phoneErrorElement = document.getElementById("phoneError");
var emailErrorElement = document.getElementById("emailError");

// save contact button
var saveContactButton = document.getElementById("saveContactBtn");
// edit contact button
var editContactButton = document.getElementById("editContactBtn");

var contacts;
// contacts array
if (localStorage.getItem("contacts") === null) {
  contacts = [];
} else {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  displayContacts();
}

// event add contact
saveContactButton.addEventListener("click", function () {
  var isValid = validateAllFields();
  if (!isValid) {
    return;
  }

  if (currentIndex === -1) {
    addContact();
    closeModal();

    showSuccessAlert("Contact saved successfully");

    // save to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayContacts();
  } else {
    updateContact();
    showSuccessAlert("Contact updated successfully");
  }
});

// add contact function
function addContact() {
  var contact = {
    img: contactPhotoUrlElement.value
      ? "images/" + contactPhotoUrlElement.value
      : "",
    name: nameContactElement.value,
    phone: phoneContactElement.value,
    email: emailContactElement.value,
    address: addressContactElement.value,
    type: typeContactElement.value,
    emergency: emergencyContactElement.checked,
    favorite: favoriteContactElement.checked,
    notes: notesContactElement.value,
  };

  contacts.push(contact);
  updateStats();
}

// close modal function
function closeModal() {
  var modal = bootstrap.Modal.getInstance(contactFormModalElement);
  modal.hide();
}

// sweatAlert function
function showSuccessAlert(message) {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

// display contacts function
function displayContacts() {
  var contactsListsCards = "";
  for (var i = 0; i < contacts.length; i++) {
    contactsListsCards += `<div class="col-md-6">
                            <div class="contact-card p-3 rounded-4">
                                <!-- imge, name, phone -->
                                <div class="d-flex align-items-center mb-3">
                                    <!-- img, badge -->
                                    <div class="position-relative me-2">
                                        ${
                                          contacts[i].img
                                            ? `<img src="${contacts[i].img}" alt="${contacts[i].name}" class="avatar-box object-fit-cover ">`
                                            : `<div
                                            class="avatar-box text-white fw-bold d-flex align-items-center justify-content-center fs-4">
                                            ${contacts[i].name.split(" ").length > 1 ? contacts[i].name[0].toUpperCase() + contacts[i].name.split(" ")[1][0].toUpperCase() : contacts[i].name[0].toUpperCase()}
                                            </div>`
                                        }
                                        <!-- favorite badge -->
                                        <span
                                            class="favorite-badge position-absolute badge rounded-circle bg-warning text-white p-1 d-flex align-items-center justify-content-center ${contacts[i].favorite ? "d-inline-flex" : "d-none"}">
                                            <i class="fa-solid fa-star"></i>
                                        </span>
                                        <!-- emergency badge -->
                                        <span
                                            class="emergency-badge position-absolute badge rounded-circle bg-danger text-white p-1 d-flex align-items-center justify-content-center ${contacts[i].emergency ? "d-inline-flex" : "d-none"}">
                                            <i class="fa-solid fa-heart-pulse"></i>
                                        </span>
                                    </div>

                                    <!-- name, phone -->
                                    <div class="ms-1">
                                        <h4 class="contact-name mb-2">${contacts[i].name.toUpperCase()}</h4>
                                        <div class="d-flex align-items-center text-muted">
                                            <span
                                                class="phone-icon d-inline-flex align-items-center justify-content-center rounded-1 p-1 me-2">
                                                <i class="fa-solid fa-phone"></i>
                                            </span>
                                            <span class="phone-number text-secondary">${contacts[i].phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- email -->
                                <div class="d-flex align-items-center mb-2 text-secondary">
                                    <span
                                        class="email-icon d-inline-flex align-items-center justify-content-center rounded-2 p-2 me-2">
                                        <i class="fa-solid fa-envelope"></i>
                                    </span>
                                    <span class="email">${contacts[i].email}</span>
                                </div>
                                <!-- address -->
                                <div class="d-flex align-items-center mb-2 text-secondary">
                                    <span
                                        class="address-icon d-inline-flex align-items-center justify-content-center rounded-2 p-2 me-2">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </span>
                                    <span class="address">${contacts[i].address}</span>
                                </div>

                                <!-- badges -->
                                <div class="d-flex gap-2 mb-3">
                                    ${
                                      contacts[i].type
                                        ? `
                                    <span
                                        class="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-2 fw-semibold">
                                        ${contacts[i].type}
                                    </span>`
                                        : ""
                                    }
                                    ${
                                      contacts[i].emergency
                                        ? `
                                    <span
                                        class="badge bg-danger-subtle text-danger px-3 py-2 rounded-2 fw-semibold d-flex align-items-center gap-1">
                                        <i class="fa-solid fa-heart-pulse"></i>
                                        Emergency
                                    </span>`
                                        : ""
                                    }
                                    
                                </div>

                                <!-- actions icons -->
                                <div
                                    class="actions-icons d-flex justify-content-between align-items-center border-top pt-2">
                                    <!-- left icons -->
                                    <div class="left-icons d-flex gap-2">
                                        <a href="tel:${contacts[i].phone}">
                                            <i class="fa-solid fa-phone"></i>
                                        </a>
                                        ${
                                          contacts[i].email
                                            ? `
                                        <a href="mailto:${contacts[i].email}">
                                            <i class="fa-solid fa-envelope"></i>
                                        </a>`
                                            : ""
                                        }
                                    </div>
                                    <!-- right icons -->
                                    <div class="right-icons d-flex gap-3 align-items-center">
                                        <button onclick="toggleFavorite(${i})" class="favorite-btn">
                                            <i class="${contacts[i].favorite ? "fa-solid" : "fa-regular"} fa-star"></i>
                                        </button>
                                        <button onclick="toggleEmergency(${i})" class="emergency-btn">
                                            <i class="fa-solid fa-heart${contacts[i].emergency ? "-pulse" : ""}"></i>
                                        </button>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#contactFormModal" onclick="editContact(${i})" class="edit-btn">
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                        <button onclick="deleteContact(${i})" class="delete-btn">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
  }
  if (contacts.length === 0) {
    contactsListsCards = `<div id="emptyArray" class="col-12 text-center py-5">
                            <div class="d-flex justify-content-center flex-column align-items-center">
                                <i class="fa-solid fa-users-slash fs-1 text-muted mb-3"></i>
                                <h5 class="text-muted">No contacts found</h5>
                                <p class="text-muted">Click "Add Contact" to get started</p>
                            </div>
                        </div>`;
  }
  document.getElementById("contactsList").innerHTML = contactsListsCards;

  updateStats();
  displayFavContacts();
  displayEmergencyContacts();
}

// reset form function
function resetForm() {
  nameContactElement.value = "";
  phoneContactElement.value = "";
  emailContactElement.value = "";
  addressContactElement.value = "";
  typeContactElement.value = "Select Group";
  emergencyContactElement.checked = false;
  favoriteContactElement.checked = false;
  notesContactElement.value = "";
  contactPhotoUrlElement.value = "";
  avatarPrev.innerHTML = '<i class="fa-solid fa-user"></i>';

  nameContactElement.classList.remove("is-invalid", "is-valid");
  phoneContactElement.classList.remove("is-invalid", "is-valid");
  emailContactElement.classList.remove("is-invalid", "is-valid");

  currentIndex = -1;
}

// event when close modal reset form
contactFormModalElement.addEventListener("hidden.bs.modal", function () {
  resetForm();
});

// delete contact function
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contacts[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contacts.splice(index, 1);
      if (contacts.length === 0) {
        localStorage.removeItem("contacts");
      } else {
        localStorage.setItem("contacts", JSON.stringify(contacts));
      }
      displayContacts();
      updateStats();
      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

// global variable to store current index
var currentIndex = -1;

// edit contact function
function editContact(index) {
  currentIndex = index;
  nameContactElement.value = contacts[index].name;
  phoneContactElement.value = contacts[index].phone;
  emailContactElement.value = contacts[index].email;
  addressContactElement.value = contacts[index].address;
  typeContactElement.value = contacts[index].type;
  emergencyContactElement.checked = contacts[index].emergency;
  favoriteContactElement.checked = contacts[index].favorite;
  notesContactElement.value = contacts[index].notes;
  contactPhotoUrlElement.value = contacts[index].img;
  avatarPrev.innerHTML = contacts[index].img
    ? `<img src="${contacts[index].img}" alt="${contacts[index].name}" class="img-fluid rounded-circle">`
    : '<i class="fa-solid fa-user"></i>';
}

// update contact function
function updateContact() {
  contacts[currentIndex] = {
    name: nameContactElement.value,
    phone: phoneContactElement.value,
    email: emailContactElement.value,
    address: addressContactElement.value,
    type: typeContactElement.value,
    emergency: emergencyContactElement.checked,
    favorite: favoriteContactElement.checked,
    notes: notesContactElement.value,
    img: contactPhotoUrlElement.value
      ? "images/" + contactPhotoUrlElement.value
      : "",
  };
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
  closeModal();
}

// card stats
function updateStats() {
  totalContactsElement.innerHTML = contacts.length;
  totalContactsSpanElement.innerHTML = contacts.length;
}

// display favorite contactsList function
function displayFavContacts() {
  var favLists = "";
  var favCount = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite) {
      favCount++;
      favLists += `<div class="sub-contact-item rounded-3 p-2 px-3 d-flex align-items-center justify-content-between mb-2">
                                <div class="d-flex align-items-center gap-2">
                                    ${
                                      contacts[i].img
                                        ? `<img src="${contacts[i].img}" alt="${contacts[i].name}" class="avatar-box object-fit-cover ">`
                                        : `<div
                                        class="avatar-box rounded-2 text-white fw-bold d-flex align-items-center justify-content-center">
                                        ${contacts[i].name.split(" ").length > 1 ? contacts[i].name[0].toUpperCase() + contacts[i].name.split(" ")[1][0].toUpperCase() : contacts[i].name[0].toUpperCase()}
                                    </div>`
                                    }
                                    <div>
                                        <h6 class="mb-0">${contacts[i].name.toUpperCase()}</h6>
                                        <p class="text-muted mb-0">${contacts[i].phone}</p>
                                    </div>
                                </div>

                                <a class="text-decoration-none" href="tel:${contacts[i].phone}">
                                    <span class="rounded-2 p-2 d-flex align-items-center justify-content-center">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                </a>
                            </div>`;

      favoritesListElement.innerHTML = favLists;
    }
  }

  favoriteContactsElement.innerHTML = favCount;
  if (favCount === 0) {
    favoritesListElement.innerHTML = `<div class="text-center py-3">
            <p class="text-muted mb-0">No favorite contacts yet</p>
        </div>`;
  }
}

// display emergency contacts list function
function displayEmergencyContacts() {
  var emergencyLists = "";
  var emergencyCount = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].emergency) {
      emergencyCount++;
      emergencyLists += `<div class="sub-contact-item rounded-3 p-2 px-3 d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-2">
                                    ${
                                      contacts[i].img
                                        ? `<img src="${contacts[i].img}" alt="${contacts[i].name}" class="avatar-box object-fit-cover ">`
                                        : `<div
                                        class="avatar-box rounded-2 text-white fw-bold d-flex align-items-center justify-content-center">
                                        ${contacts[i].name.split(" ").length > 1 ? contacts[i].name[0].toUpperCase() + contacts[i].name.split(" ")[1][0].toUpperCase() : contacts[i].name[0].toUpperCase()}
                                    </div>`
                                    }
                                    <div>
                                        <h6 class="mb-0">${contacts[i].name.toUpperCase()}</h6>
                                        <p class="text-muted mb-0">${contacts[i].phone}</p>
                                    </div>
                                </div>

                                <a class="text-decoration-none" href="tel:${contacts[i].phone}">
                                    <span class="rounded-2 p-2 d-flex align-items-center justify-content-center">
                                        <i class="fa-solid fa-phone"></i>
                                    </span>
                                </a>
                            </div>`;
      emergencyListElement.innerHTML = emergencyLists;
    }
  }
  emergencyContactsElement.innerHTML = emergencyCount;
  if (emergencyCount === 0) {
    emergencyListElement.innerHTML = `<div class="text-center py-3">
            <p class="text-muted mb-0">No emergency contacts yet</p>
        </div>`;
  }
}

// toggle favorite function
function toggleFavorite(index) {
  contacts[index].favorite = !contacts[index].favorite;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

// toggle emergency function
function toggleEmergency(index) {
  contacts[index].emergency = !contacts[index].emergency;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

// search event

searchInputElement.addEventListener("input", function () {
  isMatchSearch();
});

function isMatchSearch() {
  var currentSearchValue = searchInputElement.value.trim().toLowerCase();
  var temp = "";
  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].name.toLowerCase().includes(currentSearchValue) ||
      (contacts[i].phone && contacts[i].phone.includes(currentSearchValue)) ||
      (contacts[i].email &&
        contacts[i].email.toLowerCase().includes(currentSearchValue))
    ) {
      temp += `<div class="col-md-6">
                            <div class="contact-card p-3 rounded-4">
                                <!-- imge, name, phone -->
                                <div class="d-flex align-items-center mb-3">
                                    <!-- img, badge -->
                                    <div class="position-relative me-2">
                                        ${
                                          contacts[i].img
                                            ? `<img src="${contacts[i].img}" alt="${contacts[i].name}" class="avatar-box object-fit-cover ">`
                                            : `<div
                                            class="avatar-box text-white fw-bold d-flex align-items-center justify-content-center fs-4">
                                            ${contacts[i].name.split(" ").length > 1 ? contacts[i].name[0].toUpperCase() + contacts[i].name.split(" ")[1][0].toUpperCase() : contacts[i].name[0].toUpperCase()}
                                            </div>`
                                        }
                                        <!-- favorite badge -->
                                        <span
                                            class="favorite-badge position-absolute badge rounded-circle bg-warning text-white p-1 d-flex align-items-center justify-content-center ${contacts[i].favorite ? "d-inline-flex" : "d-none"}">
                                            <i class="fa-solid fa-star"></i>
                                        </span>
                                        <!-- emergency badge -->
                                        <span
                                            class="emergency-badge position-absolute badge rounded-circle bg-danger text-white p-1 d-flex align-items-center justify-content-center ${contacts[i].emergency ? "d-inline-flex" : "d-none"}">
                                            <i class="fa-solid fa-heart-pulse"></i>
                                        </span>
                                    </div>

                                    <!-- name, phone -->
                                    <div class="ms-1">
                                        <h4 class="contact-name mb-2">${contacts[i].name.toUpperCase()}</h4>
                                        <div class="d-flex align-items-center text-muted">
                                            <span
                                                class="phone-icon d-inline-flex align-items-center justify-content-center rounded-1 p-1 me-2">
                                                <i class="fa-solid fa-phone"></i>
                                            </span>
                                            <span class="phone-number text-secondary">${contacts[i].phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- email -->
                                <div class="d-flex align-items-center mb-2 text-secondary">
                                    <span
                                        class="email-icon d-inline-flex align-items-center justify-content-center rounded-2 p-2 me-2">
                                        <i class="fa-solid fa-envelope"></i>
                                    </span>
                                    <span class="email">${contacts[i].email}</span>
                                </div>
                                <!-- address -->
                                <div class="d-flex align-items-center mb-2 text-secondary">
                                    <span
                                        class="address-icon d-inline-flex align-items-center justify-content-center rounded-2 p-2 me-2">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </span>
                                    <span class="address">${contacts[i].address}</span>
                                </div>

                                <!-- badges -->
                                <div class="d-flex gap-2 mb-3">
                                    ${
                                      contacts[i].type
                                        ? `
                                    <span
                                        class="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-2 fw-semibold">
                                        ${contacts[i].type}
                                    </span>`
                                        : ""
                                    }
                                    ${
                                      contacts[i].emergency
                                        ? `
                                    <span
                                        class="badge bg-danger-subtle text-danger px-3 py-2 rounded-2 fw-semibold d-flex align-items-center gap-1">
                                        <i class="fa-solid fa-heart-pulse"></i>
                                        Emergency
                                    </span>`
                                        : ""
                                    }
                                    
                                </div>

                                <!-- actions icons -->
                                <div
                                    class="actions-icons d-flex justify-content-between align-items-center border-top pt-2">
                                    <!-- left icons -->
                                    <div class="left-icons d-flex gap-2">
                                        <a href="tel:${contacts[i].phone}">
                                            <i class="fa-solid fa-phone"></i>
                                        </a>
                                        ${
                                          contacts[i].email
                                            ? `
                                        <a href="mailto:${contacts[i].email}">
                                            <i class="fa-solid fa-envelope"></i>
                                        </a>`
                                            : ""
                                        }
                                    </div>
                                    <!-- right icons -->
                                    <div class="right-icons d-flex gap-3 align-items-center">
                                        <button onclick="toggleFavorite(${i})" class="favorite-btn">
                                            <i class="${contacts[i].favorite ? "fa-solid" : "fa-regular"} fa-star"></i>
                                        </button>
                                        <button onclick="toggleEmergency(${i})" class="emergency-btn">
                                            <i class="fa-solid fa-heart${contacts[i].emergency ? "-pulse" : ""}"></i>
                                        </button>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#contactFormModal" onclick="editContact(${i})" class="edit-btn">
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                        <button onclick="deleteContact(${i})" class="delete-btn">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
  }
  document.getElementById("contactsList").innerHTML = temp;
  if (temp === "") {
    document.getElementById("contactsList").innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fa-solid fa-magnifying-glass fa-3x text-secondary mb-3"></i>
            <h4 class="text-secondary">No Contacts Found</h4>
            <p class="text-muted">Try searching with another name, phone, or email.</p>
        </div>
    `;
  }
}

// add photo event
contactPhotoElement.addEventListener("change", function () {
  var imgFile = contactPhotoElement.files[0];
  contactPhotoUrlElement.value = imgFile.name;
  avatarPrev.innerHTML = `<img src="images/${imgFile.name}" alt="${imgFile.name}" class="img-fluid rounded-circle">`;
});

// validation
function showInvalidFeedback(inputElement, feedbackElement) {
  inputElement.classList.add("is-invalid");
  inputElement.classList.remove("is-valid");
  feedbackElement.classList.remove("d-none");
}

function showValidFeedback(inputElement, feedbackElement) {
  inputElement.classList.add("is-valid");
  inputElement.classList.remove("is-invalid");
  feedbackElement.classList.add("d-none");
}

// name validation
nameContactElement.addEventListener("input", function () {
  var name = nameContactElement.value.trim();
  var nameRegex = /^[a-zA-Z\u0621-\u064A\s]{3,50}$/;
  if (!name || !nameRegex.test(name)) {
    showInvalidFeedback(nameContactElement, nameErrorElement);
  } else {
    showValidFeedback(nameContactElement, nameErrorElement);
  }
});

// phone validation
phoneContactElement.addEventListener("input", function () {
  var phone = phoneContactElement.value.trim();
  var phoneRegex = /^01[0125][0-9]{8}$/;
  if (!phone || !phoneRegex.test(phone)) {
    showInvalidFeedback(phoneContactElement, phoneErrorElement);
  } else {
    showValidFeedback(phoneContactElement, phoneErrorElement);
  }
});

// email validation but i need optional
emailContactElement.addEventListener("input", function () {
  var email = emailContactElement.value.trim();
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    showInvalidFeedback(emailContactElement, emailErrorElement);
  } else if (email) {
    showValidFeedback(emailContactElement, emailErrorElement);
  } else {
    emailContactElement.classList.remove("is-invalid", "is-valid");
    emailErrorElement.classList.add("d-none");
  }
});

// validation for all fields
function validateAllFields() {
  var name = nameContactElement.value.trim();
  var phone = phoneContactElement.value.trim();
  var email = emailContactElement.value.trim();

  var nameRegex = /^[a-zA-Z\u0621-\u064A\s]{3,50}$/;
  var phoneRegex = /^01[0125][0-9]{8}$/;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  var isValid = true;

  if (!name || !nameRegex.test(name)) {
    showInvalidFeedback(nameContactElement, nameErrorElement);
    isValid = false;
  } else {
    showValidFeedback(nameContactElement, nameErrorElement);
  }

  if (!phone || !phoneRegex.test(phone)) {
    showInvalidFeedback(phoneContactElement, phoneErrorElement);
    isValid = false;
  } else {
    showValidFeedback(phoneContactElement, phoneErrorElement);
  }

  if (email && !emailRegex.test(email)) {
    showInvalidFeedback(emailContactElement, emailErrorElement);
    isValid = false;
  } else if (email) {
    showValidFeedback(emailContactElement, emailErrorElement);
  } else {
    emailContactElement.classList.remove("is-invalid", "is-valid");
    emailErrorElement.classList.add("d-none");
  }

  return isValid;
}

displayContacts();
