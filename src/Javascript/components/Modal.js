// Create overlay element once and reuse
const overlay = document.createElement("div");
overlay.classList.add("overlay", "modal-overlay");

// Creates and manages a modal for adding or editing notes
const NoteModal = function (
  title = "Untitled",
  text = "Add your note...",
  time = ""
) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Use template literal for cleaner HTML structure
  modal.innerHTML = `
      <button class="icon-btn large" aria-label="Close modal" data-close-btn>
        <span class="material-symbols-rounded" aria-hidden="true">close</span>
        <div class="state-layer"></div>
      </button>

      <input type="text" 
        placeholder="Untitled" 
        value="${title}" 
        class="modal-title text-title-medium" 
        data-note-field>

      <textarea 
        placeholder="Take a note..." 
        class="modal-text text-body-large custom-scrollbar" 
        data-note-field>${text}</textarea>

      <div class="modal-footer">
        <span class="time text-label-large">${time}</span>
        <button class="btn text" data-submit-btn>
          <span class="text-label-large">Save</span>
          <div class="state-layer"></div>
        </button>
      </div>
  `;

  // Cache DOM elements
  const submitBtn = modal.querySelector("[data-submit-btn]");
  const [titleField, textField] = modal.querySelectorAll("[data-note-field]");
  const closeBtn = modal.querySelector("[data-close-btn]");

  submitBtn.disabled = true;

  // Enable submit if either field has content
  const enableSubmit = () => {
    submitBtn.disabled = !titleField.value && !textField.value;
  };

  // Event listeners
  textField.addEventListener("keyup", enableSubmit);
  titleField.addEventListener("keyup", enableSubmit);
  closeBtn.addEventListener("click", close);

  function open() {
    document.body.append(modal, overlay);
    titleField.focus();
  }

  function close() {
    modal.remove();
    overlay.remove();
  }

  function onSubmit(callback) {
    submitBtn.addEventListener("click", () => {
      callback({
        title: titleField.value,
        text: textField.value,
      });
    });
  }

  return { open, close, onSubmit };
};

//  Creates and manages a modal for confirming deletions
const DeleteConfirmModal = function (title) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
      <h3 class="modal-title text-title-medium">
        Are you sure you want to delete <strong>"${title}"</strong>?
      </h3>

      <div class="modal-footer">
        <button class="btn text" data-action-btn="false">
          <span class="text-label-large">Cancel</span>
          <div class="state-layer"></div>
        </button>

        <button class="btn fill" data-action-btn="true">
          <span class="text-label-large">Delete</span>
          <div class="state-layer"></div>
        </button>
      </div>
  `;

  function open() {
    document.body.append(modal, overlay);
  }

  function close() {
    modal.remove();
    overlay.remove();
  }

  function onSubmit(callback) {
    modal.querySelectorAll("[data-action-btn]").forEach((btn) =>
      btn.addEventListener("click", () => {
        callback(btn.dataset.actionBtn === "true");
      })
    );
  }

  return { open, close, onSubmit };
};

export { DeleteConfirmModal, NoteModal };
