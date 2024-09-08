let submitted = document.querySelector(".submitted").value;
console.log(submitted);

if (submitted === "ER_DUP_ENTRY") {
  swal({
    title: "Duplicate Entry Detected!",
    text: "This book has already been added to the catalog. Please check the details or try a different book.",
    icon: "error",
    buttons: false,
    timer: 3000, // Closes the popup after 3 seconds
  });
}
