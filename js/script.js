'use strict';
const   incomeAdd = document.getElementsByTagName('button')[0],
        expensesAdd = document.getElementsByTagName('button')[1],
        depositCheck = document.querySelector('#deposit-check');
let     expensesItems = document.querySelectorAll('.expenses-items');
let     incomeItems = document.querySelectorAll('.income-items');

const   budgetMonthValue = document.querySelector('.budget_month-value'),
        budgetdayValue = document.querySelector('.budget_day-value'),
        expensesMonthValue = document.querySelector('.expenses_month-value'),
        additionalIncomeValue = document.querySelector('.additional_income-value'),
        additionalExpensesValue = document.querySelector('.additional_expenses-value'),
        incomePeriodValue = document.querySelector('.income_period-value'),
        targetMonthValue = document.querySelector('.target_month-value');

const   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        start = document.getElementById('start'),
        salaryAmount  = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('.income-title'),
        incomeAmount = document.querySelector('.income-amount'),
        expensesTitle = document.querySelector('.expenses-items .expenses-title'),
        expensesAmount = document.querySelector('.expenses-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budget: 0,
    incomeMonth: 0,
    budgetDay: 0,
    deposit: [],
    persentDeposit: 0,
    moneyDeposit: 0,
    budgetMonth: 0, 
    expensesMonth: 0,
    start: function() {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
        });

        budgetMonthValue.value = '';
        budgetdayValue.value = '';
        expensesMonthValue.value = '';
        additionalExpensesValue.value = '';
        additionalIncomeValue.value = '';
        targetMonthValue.value = '';
        incomePeriodValue.value = '';

        budgetMonthValue.value = appData.budgetMonth;
        budgetdayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });
        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    addIncomeBlock: function(){
        const cloneGetIncome = incomeItems[0].cloneNode(true);
        cloneGetIncome.querySelector('.income-title').value = '';
        cloneGetIncome.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneGetIncome, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
        appData.validNameAndAmount();
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
        appData.validNameAndAmount();
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    asking: function(){
        appData.addExpenses = appData.addExpenses.split(',');
        appData.addExpenses = appData.addExpenses.map(item => {
            item = item.trim();
            return item[0].toUpperCase() + item.slice(1);
        });
        appData.addExpenses = appData.addExpenses.join(', ');
        console.log(appData.addExpenses);
    }, 
    getBudget: function() { 
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;

        console.log('Бюджет на месяц: ' + appData.budgetMonth);

        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        console.log('Бюджет на день: ' + appData.budgetDay);

        console.log('Расходы за месяц: ' + appData.expensesMonth);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budget);
    }, 
    getStatusIncome: function() {
        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
    
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            return ('У вас средний уровень дохода');
    
        } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
    
        } else if (appData.budgetDay <= 0) {
            return ('Что то пошло не так');
        } 
    },
    statusData: function() {
            console.log('');
            console.log('Наша программа включает в себя данные: ');
        for (let key in appData) {
            console.log(key + ':' + appData[key]);
        }
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.persentDeposit = +prompt('Какой у вас годовой процент?');
            }
            while(!isNumber(appData.persentDeposit) || appData.persentDeposit === null || appData.persentDeposit === 0);

            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена');
            }
            while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0 );
        }
    },
    calcSavedMoney: function() {
        periodAmount.textContent = periodSelect.value;
        return appData.budgetMonth * periodSelect.value;
    },
    validNameAndAmount: function() {
        const placeHolderName = document.querySelectorAll('[placeholder="Наименование"]');
        const placeHolderAmount = document.querySelectorAll('[placeholder="Сумма"]');

        placeHolderName.forEach(function(item) {
            item.addEventListener('keyup', function() {
                if (!item.value.match(/^[?!,.а-яА-ЯёЁ\s]+$/)) {
                    item.value = item.value.replace(/[a-zA-Z0-9\s]+/, '');
                    item.style.border = '1px solid red';
                } else if (item.value !== '') {
                    item.style.border = '1px solid #ff7f63';
                }
            });
        });
        placeHolderAmount.forEach(function(item) {
            item.addEventListener('keyup', function() {
                if (item.value.match(/\D/g)) {
                    item.value = item.value.replace(/\D/g, '');
                    item.style.border = '1px solid red';
                } else if (item.value !== '') {
                    item.style.border = '1px solid #ff7f63';
                }
            });
        });
    }
};
function validStart(){
    if(salaryAmount.value === '') {
        start.setAttribute('disabled', 'disabled');
    } else {
        start.removeAttribute('disabled');
    }
}
appData.validNameAndAmount();

salaryAmount.addEventListener('keyup', validStart);
salaryAmount.addEventListener('keydown', validStart);

start.addEventListener('click', appData.start);

expensesAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.calcSavedMoney);

appData.statusData();
//appData.getInfoDeposit();

// console.log(appData.calcSavedMoney(), appData.persentDeposit, appData.moneyDeposit);

