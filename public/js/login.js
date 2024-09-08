let login = document.querySelector(".error").value;

if (login === "failed") {
  swal({
    title: "Failed to login!",
    text: "The username or password you have entered is incorrect.",
    icon: "error",
    buttons: false,
    timer: 3000, // Closes the popup after 3 seconds
  });
}
