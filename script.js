const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const genders = document.querySelectorAll('input[name="gender"]');
const terms = document.getElementById('terms');
const closeModalBtn = document.getElementById('closeModal');

const errors = {
  fullName: fullNameError,
  email: emailError,
  password: passwordError,
  confirmPassword: confirmPasswordError,
  phone: phoneError,
  gender: genderError,
  terms: termsError
};

const strengthFill = document.getElementById('strengthMeterFill');
const strengthText = document.getElementById('strengthText');
const modal = document.getElementById('successModal');
const successMessage = document.getElementById('successMessage');

//  events 

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateForm()) showSuccess();
});

password.addEventListener('input', updateStrength);
closeModalBtn.addEventListener('click', closeModal);

// validation 

function validateForm() {
  let valid = true;

  valid &= check(fullName.value.trim().length >= 2, fullName, errors.fullName, 'Enter full name');
  valid &= check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), email, errors.email, 'Invalid email');
  valid &= check(
    password.value.length >= 8 &&
    /\d/.test(password.value) &&
    /[!@#$%^&*]/.test(password.value),
    password,
    errors.password,
    'Weak password'
  );
  valid &= check(
    password.value === confirmPassword.value,
    confirmPassword,
    errors.confirmPassword,
    'Passwords do not match'
  );
  valid &= check(/^\d{10}$/.test(phone.value), phone, errors.phone, '10 digit number');
  valid &= check([...genders].some(g => g.checked), null, errors.gender, 'Select gender');
  valid &= check(terms.checked, null, errors.terms, 'Accept terms');

  return !!valid;
}

function check(condition, input, errorEl, message) {
  if (!condition) {
    if (input) input.classList.add('input-error');
    errorEl.textContent = message;
    return false;
  }
  if (input) input.classList.remove('input-error');
  errorEl.textContent = '';
  return true;
}

// password strength

function updateStrength() {
  let s = 0;
  const v = password.value;

  if (v.length >= 8) s++;
  if (/\d/.test(v)) s++;
  if (/[!@#$%^&*]/.test(v)) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[a-z]/.test(v)) s++;

  strengthFill.className = 'strength-meter-fill';
  strengthText.textContent = s <= 2 ? 'Weak' : s <= 4 ? 'Medium' : 'Strong';
  strengthFill.classList.add(s <= 2 ? 'weak' : s <= 4 ? 'medium' : 'strong');
}

//  success modal 

function showSuccess() {
  successMessage.innerHTML = `
    <b>Name:</b> ${fullName.value}<br>
    <b>Email:</b> ${email.value}<br>
    <b>Phone:</b> ${phone.value}
  `;
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
  form.reset();
  strengthText.textContent = '';
  strengthFill.className = 'strength-meter-fill';
}
