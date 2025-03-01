'use strict';

//////////////////////////////////////////////////////////////////

// DATA
const account1 = {
  owner: 'Bishwash Karki',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  username: 'bishwash00',
  pin: 1111,
  mail: 'karkibishwash222@gmail.com',

  movementsDates: [
    '2025-01-01T10:17:24.185Z',
    '2025-01-27T17:01:17.194Z',
    '2025-01-28T09:15:04.904Z',
    '2025-02-11T23:36:17.929Z',
    '2025-02-18T21:31:17.178Z',
    '2025-02-23T07:42:02.383Z',
    '2025-02-24T14:11:59.604Z',
    '2025-02-26T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Bipana Karki',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  username: 'bipana00',
  pin: 2222,
  mail: 'karkibipana222@gmail.com',

  movementsDates: [
    '2025-01-01T10:17:24.185Z',
    '2025-01-27T17:01:17.194Z',
    '2025-01-28T09:15:04.904Z',
    '2025-02-11T23:36:17.929Z',
    '2025-02-18T21:31:17.178Z',
    '2025-02-23T07:42:02.383Z',
    '2025-02-24T14:11:59.604Z',
    '2025-02-26T10:51:36.790Z',
  ],
};

const accounts = [account1, account2];

//LOGIN PAGE MANIPULATIONS
const beforePage = document.querySelector('.login--before');
const afterPage = document.querySelector('.login--after');
const signUPbtn = document.querySelector('.sign-up-btn');
const signUPmodal = document.querySelector('.sign-up-modal');
const formOverlay = document.querySelector('.form-overlay');
const closeModalbtn = document.querySelector('.btn--close-modal');
const navItems = document.querySelector('.login-nav-items');
const allnavItems = document.querySelectorAll('.login-nav-item');
const allnavSections = document.querySelectorAll('.nav-section');
const btnLogin = document.querySelector('.main-login-btn');
const btnLogout = document.querySelector('.log-out-btn');
const loginUsername = document.querySelector('#login-username');
const loginPIN = document.querySelector('#login-pin');
const welcomeName = document.querySelector('.welcome-name');
const pfpName = document.querySelector('.pfp-name');
const localeSelection = document.querySelector('.locales');
const currencySelection = document.querySelector('.currencies');

const openForm = function (e) {
  e.preventDefault();
  signUPmodal.classList.remove('animated-hidden');
  formOverlay.classList.remove('animated-hidden');
};
const closeForm = function () {
  signUPmodal.classList.add('animated-hidden');
  formOverlay.classList.add('animated-hidden');
};

signUPbtn.addEventListener('click', openForm);

closeModalbtn.addEventListener('click', closeForm);
formOverlay.addEventListener('click', closeForm);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !signUPmodal.classList.contains('animated-hidden'))
    closeForm();
});

navItems.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.parentNode.classList.contains('login-nav-item')) {
    allnavItems.forEach(item => item.classList.remove('active-nav-item'));
    e.target.parentNode.classList.add('active-nav-item');

    allnavSections.forEach(section => section.classList.add('hidden'));
    const targetElement =
      e.target.closest('.nav-link') ?? e.target.nextElementSibling;
    const displaySection = document.querySelector(
      targetElement.getAttribute('href')
    );
    displaySection.classList.remove('hidden');
  }
});

//APP INTERFACE
const balanceHistory = document.querySelector('.balance-history');
const balanceAmount = document.querySelector('.balance--amt');
const recentDeposit = document.querySelector('.deposit-balance');
const recentWithdrawl = document.querySelector('.withdrawl-balance');
const totalDeposits = document.querySelector('.total-deposit');
const totalWithdrawls = document.querySelector('.total-withdrawl');
const totalInterest = document.querySelector('.total-interest');
const transferAccountName = document.querySelector('.form__input--to--name');
const transferAccountMail = document.querySelector('.form__input--to--mail');
const transferAmtName = document.querySelector('.form__input--amount--name');
const transferAmtMail = document.querySelector('.form__input--amount--mail');
const btnTransferName = document.querySelector('.form__btn--transfer--name');
const btnTransferMail = document.querySelector('.form__btn--transfer--mail');
const loanAmt = document.querySelector('.form__loan--amt');
const btnLoan = document.querySelector('.form__btn--loan');
const reqName = document.querySelector('.form__request--to');
const reqAmount = document.querySelector('.form__input-req-amount');
const reqBtn = document.querySelector('.form__btn-loan-req');
const btnSort = document.querySelector('.sort-btn');
const sortStatus = document.querySelector('.btn-status');
const labelDate = document.querySelector('.balance-date');
const labelLogOutTimer = document.querySelector('.logout-timer');

//DISPLAYING BALANCE HISTORY
const formatDates = function (date, locale = 'default') {
  const now = new Date();
  const daysPassed = Math.abs(
    Math.round((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000))
  );
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  if (locale === 'default')
    return new Intl.DateTimeFormat(getLocale()).format(date);
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (
  movement,
  cur_type = 'USD',
  locale = 'default'
) {
  if (locale === 'default') {
    return new Intl.NumberFormat(getLocale(), {
      style: 'currency',
      currency: cur_type,
    }).format(movement);
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: cur_type,
  }).format(movement);
};

const displayMovements = function (
  acc,
  sort = false,
  cur_type = 'USD',
  locale = 'default'
) {
  const movementsWithDate = acc.movements.map((mov, i) => ({
    movement: mov,
    date: acc.movementsDates.at(i),
  }));

  if (sort) movementsWithDate.sort((a, b) => a.movement - b.movement);

  balanceHistory.innerHTML = '';
  movementsWithDate.forEach(function ({ movement, date }, i) {
    const movDate = new Date(date);
    const displayDate = formatDates(movDate, locale);

    const type = movement > 0 ? 'deposit' : 'withdrawl';

    let formattedMov;

    if (cur_type === 'USD') {
      formattedMov = formatCurrency(movement, cur_type, locale);
    }
    if (cur_type === 'EUR') {
      formattedMov = formatCurrency(movement * 0.96, cur_type, locale);
    }

    const addHTML = `<div class="movement">
              <div class="movement_type movement_type-${type}">${
      i + 1
    } ${type}</div>
              <div class="movement__date">${displayDate}</div>
              <div class="movement__value movement__value-${type}">${formattedMov}</div>
            </div>`;
    balanceHistory.insertAdjacentHTML('afterbegin', addHTML);
  });
};

//SHOW BALANCE
let balance;
const showBalance = function (curAcc, cur_type = 'USD', locale) {
  balance = curAcc.movements.reduce(function (acc, movement) {
    return acc + movement;
  }, 0);
  if (cur_type === 'USD') {
    balanceAmount.textContent = formatCurrency(balance, cur_type, locale);
  }
  if (cur_type === 'EUR') {
    balanceAmount.textContent = formatCurrency(
      balance * 0.96,
      cur_type,
      locale
    );
  }
};

//SHOW RECENT MOVEMENTS
const showRecentDeposit = function (movement, cur_type, locale) {
  if (cur_type === 'USD') {
    recentDeposit.textContent = formatCurrency(movement, cur_type, locale);
  }
  if (cur_type === 'EUR') {
    recentDeposit.textContent = formatCurrency(
      movement * 0.96,
      cur_type,
      locale
    );
  }
};
const showRecentWithdrawl = function (movement, cur_type, locale) {
  if (cur_type === 'USD') {
    recentWithdrawl.textContent = formatCurrency(movement, cur_type, locale);
  }
  if (cur_type === 'EUR') {
    recentWithdrawl.textContent = formatCurrency(
      movement * 0.96,
      cur_type,
      locale
    );
  }
};

const recentMovements = function (acc, cur_type = 'USD', locale) {
  const lastDeposit = acc.movements.findLast(mov => mov > 0);
  const lastWithdrawl = acc.movements.findLast(mov => mov < 0);
  showRecentDeposit(lastDeposit, cur_type, locale);
  showRecentWithdrawl(lastWithdrawl, cur_type, locale);
};

//BALANCE SUMMARY
const displaySummary = function (account, cur_type = 'USD', locale) {
  const totalDeposit = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);

  const totalWithdrawl = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);

  const interest = account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * account.interestRate) / 100)
    .reduce((int, movement) => int + movement, 0)
    .toFixed(2);

  if (cur_type === 'USD') {
    totalDeposits.textContent = formatCurrency(totalDeposit, cur_type, locale);
    totalWithdrawls.textContent = formatCurrency(
      Math.abs(totalWithdrawl),
      cur_type,
      locale
    );
    totalInterest.textContent = formatCurrency(interest, cur_type, locale);
  }
  if (cur_type === 'EUR') {
    totalDeposits.textContent = formatCurrency(
      totalDeposit * 0.96,
      cur_type,
      locale
    );
    totalWithdrawls.textContent = formatCurrency(
      Math.abs(totalWithdrawl * 0.96),
      cur_type,
      locale
    );
    totalInterest.textContent = formatCurrency(
      interest * 0.96,
      cur_type,
      locale
    );
  }
};

//UI UPDATE
let sort = false;
let cur_type = 'USD';
let locale = 'default';

const updateUI = function (currentAccount, cur_type, locale) {
  displayMovements(currentAccount, sort, cur_type, locale);
  showBalance(currentAccount, cur_type, locale);
  recentMovements(currentAccount, cur_type, locale);
  displaySummary(currentAccount, cur_type, locale);
};

//IMPLEMENTING LOGIN AND LOGOUT
let currentAccount;
let today;
let loginTimer;
const dateOpts = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const refreshTime = function (locale) {
  today = new Date();
  labelDate.textContent = new Intl.DateTimeFormat(locale, dateOpts).format(
    today
  );
};

let logOutTime;
const startLogOutTimer = function () {
  let time = 5 * 60;

  const tick = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, '0');
    const second = String(time % 60).padStart(2, '0');
    labelLogOutTimer.textContent = `${minute}:${second}`;

    if (time === 0) {
      clearInterval(logOutTime);
      logOUT();
    }
    time--;
  };

  tick();
  logOutTime = setInterval(tick, 1000);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.username === loginUsername.value
  );
  if (currentAccount?.pin === Number(loginPIN.value)) {
    refreshTime(locale);
    loginTimer = setInterval(refreshTime.bind(null, locale), 1000);

    beforePage.classList.add('hidden');
    afterPage.classList.remove('animated-hidden');

    loginUsername.value = loginPIN.value = '';
    loginUsername.blur();
    loginPIN.blur();

    welcomeName.textContent = currentAccount.owner.split(' ')[0];
    pfpName.textContent = currentAccount.owner;

    startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnLogout.addEventListener('click', function (e) {
  e.preventDefault();
  logOUT();
});
const logOUT = function () {
  currentAccount = undefined;
  beforePage.classList.remove('hidden');
  afterPage.classList.add('animated-hidden');
  clearInterval(logOutTime);
  setTimeout(() => alert('You have been logged out!'), 500);
};
////////////////////////////////////////////////////

//MONEY TRANSFER
const transferMoney = function (acc, amt) {
  const resetInput = function () {
    transferAmtName.value = transferAccountName.value = '';
    transferAmtMail.value = transferAccountMail.value = '';
  };

  if (acc && amt <= balance && acc != currentAccount) {
    currentAccount.movements.push(-amt);
    acc.movements.push(amt);
    currentAccount.movementsDates.push(new Date().toISOString());
    acc.movementsDates.push(new Date().toISOString());

    resetInput();

    updateUI(currentAccount);
    clearInterval(logOutTime);
    startLogOutTimer();
  }

  if (acc === currentAccount) {
    alert('Cannot transfer to own account!');
    resetInput();
  }
  if (amt > balance) {
    alert('Insufficient balance!');
    resetInput();
  }
  if (!acc) {
    alert('Account does not exist!');
    resetInput();
  }
};

btnTransferName.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAcc = accounts.find(
    acc => acc.username === transferAccountName.value
  );

  const transferAmt = Number(transferAmtName.value);
  transferMoney(transferAcc, transferAmt);
});
btnTransferMail.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAcc = accounts.find(
    acc => acc.mail === transferAccountMail.value
  );
  const transferAmt = Number(transferAmtMail.value);
  transferMoney(transferAcc, transferAmt);
});

//LOAN
btnLoan.addEventListener('click', function (e) {
  const loanAmount = Number(loanAmt.value);
  e.preventDefault();
  if (0.5 * loanAmount < balance) {
    setTimeout(function () {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      setTimeout(() => {
        alert('Your loan has been approved!');
        clearInterval(logOutTime);
        startLogOutTimer();
      }, 1000);
    }, 3500);
    loanAmt.value = '';
  } else {
    loanAmt.value = '';
    alert('50% of loan amount is greater than current balance');
    clearInterval(logOutTime);
    startLogOutTimer();
  }
});

reqBtn.addEventListener('click', function (e) {
  e.preventDefault;
  alert('Requesting Feature is still on progress');
  reqName.value = reqAmount.value = '';
  clearInterval(logOutTime);
  startLogOutTimer();
});

//SORTING
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
  btnSort.classList.toggle('status_off');
  sortStatus.textContent = sort ? 'OFF' : 'ON';
  clearInterval(logOutTime);
  startLogOutTimer();
});

//LOCALES
let defaultTimer, changeTimer;
localeSelection.addEventListener('change', function (e) {
  locale = localeSelection.value;

  clearInterval(loginTimer);
  clearInterval(defaultTimer);
  clearInterval(changeTimer);

  changeTimer = setInterval(refreshTime.bind(null, locale), 1000);
  updateUI(currentAccount, cur_type, locale);
});

// CURRENCY
currencySelection.addEventListener('change', function (e) {
  cur_type = currencySelection.value;
  updateUI(currentAccount, cur_type, locale);
});

const getLocale = () => navigator.language;
