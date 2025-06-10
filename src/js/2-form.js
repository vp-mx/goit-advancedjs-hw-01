const LOCALSTORAGE_KEY = 'form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name=email]');
const messageInput = document.querySelector('textarea[name=message]');

try {
  const lsValue = localStorage.getItem(LOCALSTORAGE_KEY);
  if (lsValue) {
    const parsedValue = JSON.parse(lsValue);
    formData.email = parsedValue.email;
    formData.message = parsedValue.message;
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
} catch (error) {
  console.error(error);
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if (Object.values(formData).some(v => !v)) {
    return alert('Fill please all fields');
  }

  console.log(formData);
  formData.email = '';
  formData.message = '';
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;

  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error(error);
  }
});
