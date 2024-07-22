function validateForm() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pageCount = document.getElementById("page-count");
  const isRead = document.getElementById("is-read");

  title.addEventListener("input", () => {
    if (title.validity.valueMissing) {
      title.setCustomValidity("Field cannot be empty.");
    } else {
      title.setCustomValidity("");
    }
  });

  author.addEventListener("input", () => {
    if (author.validity.valueMissing) {
      author.setCustomValidity("Field cannot be empty.");
    } else {
      title.setCustomValidity("");
    }
  });

  pageCount.addEventListener("input", () => {
    if (pageCount.validity.valueMissing) {
      if (pageCount.validity.patternMismatch) {
        pageCount.setCustomValidity(
          "Must contain a whole number greater than or equal to 0."
        );
      } else {
        pageCount.setCustomValidity("");
      }
    }
  });

  isRead.addEventListener("click", () => {
    if (isRead.validity.valueMissing) {
      isRead.setCustomValidity("Please select an option.");
    } else {
      isRead.setCustomValidity("");
    }
  });
}

export { validateForm };
