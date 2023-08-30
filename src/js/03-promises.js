const { Notify } = require("notiflix");

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector("form input[name='delay']"),
  delayStepInput: document.querySelector("form input[name='step']"),
  amountInput: document.querySelector("form input[name='amount']"),
  submitBtn: document.querySelector('form button')
};
refs.form.addEventListener('submit', onFormSubmit); 

function onFormSubmit(event) {
  event.preventDefault(); 
  const delay = parseInt(refs.delayInput.value); 
  const delayStep = parseInt(refs.delayStepInput.value); 
  const amount = parseInt(refs.amountInput.value); 
  
  for (let i = 0; i < amount; i += 1) {
    const promiseDelay = delay + i * delayStep; 
    createPromise(i+1, promiseDelay)
      .then(({ position, delay }) => {
               Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  refs.form.reset();
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => { 
      if (shouldResolve) {
        resolve({ position, delay }); 
      } else {
        reject({ position, delay }); 
      }
    }, delay);
  });
}