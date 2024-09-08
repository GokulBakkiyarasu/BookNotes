let booksFound = document.querySelector(".books-found").value;

if (booksFound === "noBooks") {
  swal({
    title: "No Book Found!",
    text: "No book matches the search string.",
    icon: "error",
    buttons: {
      confirm: {
        text: "OK!",
        value: true,
        visible: true,
        className: "btn btn-danger",
        closeModal: true,
      },
    },
  });
}
