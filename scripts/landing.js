// ==================================================
// REFERENCES
// ==================================================

// ? ELEMENT REFERENCES
const toggleDetailBtns = document.querySelectorAll('.more-info-btn');

// ==================================================
// FUNCTIONS
// ==================================================

// * Function to toggle details
function _toggleDetailsByInfoBtn(infoBtn) {
    const parent = infoBtn.closest('.pricing-card');
    parent.classList.toggle('active');
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & EVENT LISTENER FOR TOGGLE DETAILS CLICK
toggleDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => { _toggleDetailsByInfoBtn(btn); });
});