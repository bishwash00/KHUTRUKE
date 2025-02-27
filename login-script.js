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
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-27T17:01:17.194Z',
    '2019-07-11T23:36:17.929Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-03-08T14:11:59.604Z',
    '2020-03-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Bipana Karki',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  username: 'bipana00',
  pin: 2222,
  mail: 'karkibipana222@gmail.com',

  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2019-02-05T16:33:06.386Z',
    '2019-03-10T14:43:26.374Z',
    '2019-04-25T18:49:59.371Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

//DISPLAYING BALANCE HISTORY
const displayMovements = function (acc, sort = false) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  balanceHistory.innerHTML = '';
  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawl';
    const addHTML = `<div class="movement">
              <div class="movement_type movement_type-${type}">${
      i + 1
    } ${type}</div>
              <div class="movement__date">2025/05/04, 10:31:10</div>
              <div class="movement__value movement__value-${type}">$${movement}</div>
            </div>`;
    balanceHistory.insertAdjacentHTML('afterbegin', addHTML);
  });
};

//SHOW BALANCE
let balance;
const showBalance = function (curAcc) {
  balance = curAcc.movements.reduce(function (acc, movement) {
    return acc + movement;
  }, 0);
  balanceAmount.textContent = '$' + balance;
};

//SHOW RECENT MOVEMENTS
const showRecentDeposit = function (movement) {
  recentDeposit.textContent = `$${movement}`;
};
const showRecentWithdrawl = function (movement) {
  recentWithdrawl.textContent = `$${movement}`;
};

const recentMovements = function (acc) {
  const lastDeposit = acc.movements.findLast(mov => mov > 0);
  const lastWithdrawl = acc.movements.findLast(mov => mov < 0);
  showRecentDeposit(lastDeposit);
  showRecentWithdrawl(lastWithdrawl);
};

//BALANCE SUMMARY
const displaySummary = function (account) {
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

  totalDeposits.textContent = '$' + totalDeposit.toFixed(2);
  totalWithdrawls.textContent = '$' + Math.abs(totalWithdrawl).toFixed(2);
  totalInterest.textContent = `$${interest}`;
};

//UI UPDATE
const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  showBalance(currentAccount);
  recentMovements(currentAccount);
  displaySummary(currentAccount);
};
//IMPLEMENTING LOGIN AND LOGOUT
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.username === loginUsername.value
  );
  if (currentAccount?.pin === Number(loginPIN.value)) {
    beforePage.classList.add('hidden');
    afterPage.classList.remove('animated-hidden');

    loginUsername.value = loginPIN.value = '';
    loginUsername.blur();
    loginPIN.blur();

    welcomeName.textContent = currentAccount.owner.split(' ')[0];
    pfpName.textContent = currentAccount.owner;

    updateUI(currentAccount);
  }
});

btnLogout.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = undefined;
  beforePage.classList.remove('hidden');
  afterPage.classList.add('animated-hidden');
});
////////////////////////////////////////////////////

//MONEY TRANSFER
const transferMoney = function (acc, amt) {
  if (acc && amt <= balance) {
    currentAccount.movements.push(-amt);
    acc.movements.push(amt);

    transferAmtName.value = transferAccountName.value = '';
    transferAmtMail.value = transferAccountMail.value = '';

    updateUI(currentAccount);
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
    currentAccount.movements.push(loanAmount);
    loanAmt.value = '';

    updateUI(currentAccount);
  } else {
    loanAmt.value = '';
    alert('50% of loan amount is greater than current balance');
  }
});

reqBtn.addEventListener('click', function (e) {
  e.preventDefault;
  alert('Requesting Feature is still on progress');
  reqName.value = reqAmount.value = '';
});

//SORTING
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
  btnSort.classList.toggle('status_off');
  sortStatus.textContent = sort ? 'OFF' : 'ON';
});
