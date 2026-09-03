// ==================================================
// ELEMENT REFERENCE
// ==================================================

// ----- REGISTRATION SPECIFIC ----- //
const registrationForm = document.getElementById('registrationForm');
const closeRegistrationForm = document.getElementById('closeRegistrationForm');
const registrationFormTrigger = document.getElementById('registrationFormTrigger');
const registrationSubmit = document.getElementById('registrationSubmit');

const registrationName = document.getElementById('registrationName');
const registrationEmail = document.getElementById('registrationEmail');
const registrationPhone = document.getElementById('registrationPhone');
const registrationBusiness = document.getElementById('registrationBusiness');

// ----- ENQUIRY SPECIFIC ----- //
const enquiryForm = document.getElementById('enquiryForm');
const closeEnquiryForm = document.getElementById('closeEnquiryForm');
const enquiryFormTrigger = document.getElementById('enquiryFormTrigger');
const enquirySubmit = document.getElementById('enquirySubmit');

const enquiryName = document.getElementById('enquiryName');
const enquiryEmail = document.getElementById('enquiryEmail');
const enquiryPhone = document.getElementById('enquiryPhone');
const enquiryMessage = document.getElementById('enquiryMessage');

// ----- POPOVER SPECIFIC ----- //
const successPage = document.getElementById('successPage');
const failurePage = document.getElementById('failurePage');
const closePopovers = document.querySelectorAll('.popover .btn');

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO UPDATE BUTTON STATUS
function updateBtnStatus(inputs, btn) {
    let validated = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'var(--color-state-red)';
            validated = false;
        }
    });
    if (validated) {
        btn.classList.remove('disabled');
        return true;
    } else { return false; }
}

// * FUNCTION TO CREATE INPUT VALIDATOR
function createInputValidator(inputs, btn) {
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'var(--color-state-red)';
                btn.classList.add('disabled');
                return;
            } else {
                input.style.borderColor = 'var(--color-state-green)';
                updateBtnStatus(inputs, btn);
            }
        });
    });
}

// * FUNCTION TO OPEN/CLOSE FORM
function addToggleFormListener(form, trigger, status = 'open') {
    trigger.addEventListener('click', () => {
        if (status === 'open') {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    })
}

// * FUNCTION TO CREATE CLOSE POPOVER LISTENER
function addClosePopoverListener(triggers) {
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            document.querySelectorAll('.popover').forEach(popover => {
                popover.classList.remove('active');
            });
        });
    });
}

// * FUNCTION TO CREATE A FORM
function createForm(entries) {
    const keys = Object.keys(entries);
    const form = new FormData();

    keys.forEach(key => {
        form.append(key, entries[key].value);
    });

    return form;
}

// * FUNCTION TO HANDLE SUBMISSION BUTTON CLICK
async function handleSubmission(btn, entries, submissionURL) {
    if (btn.classList.contains('disabled')) {
        btn.classList.add('shake');
        setTimeout(() => {
            btn.classList.remove('shake');
        }, 700);
        return;
    }

    let validated = updateBtnStatus(Object.values(entries), btn);
    if (!validated) return;

    const body = createForm(entries);

    try {
        await fetch(submissionURL, {
            body: body,
            method: 'POST',
            mode: 'no-cors',
        });

        successPage.classList.add('active');
    } catch (error) {
        failurePage.classList.add('active');
    }
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & INITIAL DISPLAY SETTINGS
document.addEventListener('DOMContentLoaded', () => {
    createInputValidator([
        registrationName, registrationEmail,
        registrationPhone, registrationBusiness,
    ], registrationSubmit);

    createInputValidator([
        enquiryName, enquiryEmail,
        enquiryPhone, enquiryMessage,
    ], enquirySubmit);
})

// & EVENT LISTENERS FOR FORM TOGGLE
addToggleFormListener(registrationForm, registrationFormTrigger, 'open');
addToggleFormListener(registrationForm, closeRegistrationForm, 'close');
addToggleFormListener(enquiryForm, enquiryFormTrigger, 'open');
addToggleFormListener(enquiryForm, closeEnquiryForm, 'close');

// & EVENT LISTENERS FOR CLOSE POPOVER
addClosePopoverListener(closePopovers);

// & EVENT LISTENER FOR REGISTRATION SUBMISSION
registrationSubmit.addEventListener('click', () =>{
    handleSubmission(registrationSubmit, {
        'entry.1918707273': registrationName, 'entry.1654067689': registrationEmail,
        'entry.700167914': registrationPhone, 'entry.1259074432': registrationBusiness,
    }, 'https://docs.google.com/forms/d/e/1FAIpQLSe5k_scVs7FVaPFfD6KgNR3T7wGEa6MZPDKXUvp-KA1bEZ6XA/formResponse');
});

// & EVENT LISTENER FOR ENQUIRY SUBMISSION
enquirySubmit.addEventListener('click', () =>{
    handleSubmission(enquirySubmit, {
        'entry.1551876098': enquiryName, 'entry.1204135284': enquiryEmail,
        'entry.1855383320': enquiryPhone, 'entry.1083720747': enquiryMessage,
    }, 'https://docs.google.com/forms/d/e/1FAIpQLSfTXjt5uYNt296mS8vLoXKfgS47EMcyYJdvsb432ZEy3IvKwA/formResponse');
});