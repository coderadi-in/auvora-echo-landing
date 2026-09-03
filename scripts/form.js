// ==================================================
// ELEMENT REFERENCE
// ==================================================

const successPage = document.getElementById('successPage');
const hideSuccessPage = document.querySelector('.success-page .btn');

const registrationForm = document.getElementById('registrationForm');
const enquiryForm = document.getElementById('enquiryForm');

const registrationFormTrigger = document.getElementById('registrationFormTrigger');
const closeRegistrationForm = document.getElementById('closeRegistrationForm');
const registrationSubmit = document.getElementById('registrationSubmit');

const registrationName = document.getElementById('registrationName');
const registrationEmail = document.getElementById('registrationEmail');
const registrationPhone = document.getElementById('registrationPhone');
const registrationBusiness = document.getElementById('registrationBusiness');

const enquiryFormTrigger = document.getElementById('enquiryFormTrigger');
const closeEnquiryForm = document.getElementById('closeEnquiryForm');
const enquirySubmit = document.getElementById('enquirySubmit');

const enquiryName = document.getElementById('enquiryName');
const enquiryEmail = document.getElementById('enquiryEmail');
const enquiryPhone = document.getElementById('enquiryPhone');
const enquiryMessage = document.getElementById('enquiryMessage');

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO TOGGLE REGISTRATION SEND-BTN STATE
function toggleRegistration(btn) {
    btn.classList.toggle('disabled', registrationName.value.trim() === '' || registrationEmail.value.trim() === '' || registrationPhone.value.trim() === '' || registrationBusiness.value.trim() === '');
}

// * FUNCTION TO TOGGLE ENQUIRY SEND-BTN STATE
function toggleEnquiry(btn) {
    btn.classList.toggle('disabled', enquiryName.value.trim() === '' || enquiryEmail.value.trim() === '' || enquiryPhone.value.trim() === '' || enquiryMessage.value.trim() === '');
}

// * FUNCTION TO UPDATE INPUT STATES
function updateInputState(elem) {
    if (elem.value.trim() === '') {
        elem.style.borderColor = 'var(--color-state-red)';
        const msg = elem.parentElement.querySelector('.err-msg');
        if (!msg) { return; }
        msg.classList.remove('hidden');
        msg.textContent = 'This field is required';
    }

    else {
        elem.style.borderColor = 'var(--color-state-green)';
        const msg = elem.parentElement.querySelector('.err-msg');
        if (!msg) { return; }
        msg.classList.add('hidden');
        msg.textContent = '';
    }
}

// * FUNCTION TO CREATE A FORM DATA OBJECT
function createFormData(entries) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(entries)) {
        formData.append(key, value.value);
    }

    return formData;
}

// * FUNCTION TO RESET INPUTS
function resetInputs(inputs) {
    inputs.forEach(element => {
        element.value = '';
    });
}

// * FUNCTION TO ADD EVENT LISTENER FOR UPDATING INPUT STATE
function addUpdateStateChanger(input, submitBtn) {
    input.addEventListener('input', () => {
        updateInputState(input);
        toggleSendBtnState(submitBtn);
    });
}

// * FUNCTION TO SUBMIT A FORM
function addSubmissionListener(submitBtn, entries, submitURL) {
    const inputs = Object.values(entries);

    submitBtn.addEventListener('click', () => {
        let isValid = true;

        // Validate inputs
        inputs.forEach((input) => {
            if (input.value.trim() == '') {
                isValid = false;
                updateInputState(input);
            }
        });

        if (!isValid) {
            submitBtn.classList.add('shake');
            setTimeout(() => {
                submitBtn.classList.remove('shake');
            }, 2000);
            return;
        }

        // Submit form
        try {
            const formData = createFormData(entries);
            fetch(submitURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            resetInputs(inputs);

            submitBtn.classList.remove('open');
            setTimeout(() => {
                successPage.classList.add('active');
            }, 400);

        } catch {
            submitBtn.style.borderColor = 'var(--color-state-red)';
            submitBtn.textContent = "Error submitting form.";
        }
    });
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & EVENT LISTENER FOR FORM STATE TOGGLE
formTrigger.addEventListener('click', () => {
    form.classList.add('active');
});

// & EVENT LISTENER FOR FORM STATE TOGGLE
closeForm.addEventListener('click', () => {
    form.classList.remove('active');
});

// & EVENT LISTENER FOR INPUT VALIDATION
addUpdateStateChanger(username, submitBtn);
addUpdateStateChanger(email, submitBtn);
addUpdateStateChanger(phone, submitBtn);
addUpdateStateChanger(business, submitBtn);

// & EVENT LISTENER FOR SUCCESS PAGE CLOSE
hideSuccessPage.addEventListener('click', () => {
    successPage.classList.remove('active');
});

// & EVENT LISTENER FOR FORM SUBMISSION
addSubmissionListener(
    submitBtn,
    {
        'entry.1918707273': username,
        'entry.1654067689': email,
        'entry.700167914': phone,
        'entry.1259074432': business,
    },
    'https://docs.google.com/forms/d/e/1FAIpQLSe5k_scVs7FVaPFfD6KgNR3T7wGEa6MZPDKXUvp-KA1bEZ6XA/formResponse'
);

// https://docs.google.com/forms/d/e/1FAIpQLSfTXjt5uYNt296mS8vLoXKfgS47EMcyYJdvsb432ZEy3IvKwA/viewform?usp=pp_url&entry.1551876098=ADI&entry.1204135284=adi@coderadi.in&entry.1855383320=000&entry.1083720747=I+don't+know