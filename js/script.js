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
        budgetMonthValue.value = appData.budgetMonth;
        budgetdayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    getAddExpenses: function(){
        appData.addExpenses = [];
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.map(item => {
            if(additionalExpensesItem.value !== ''){
                item = item.trim();
                item = item[0].toUpperCase() + item.slice(1);
            }
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getIncome: function(){
        appData.income = {};
        appData.incomeMonth = 0;
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
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
        incomeItems[0].parentNode.insertBefore(cloneGetIncome, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },
    getAddIncome: function(){
        appData.addIncome = [];
        additionalIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        appData.expenses = {};
        appData.expensesMonth = 0;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() { 
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
    calcSavedMoney: function() {
        periodAmount.textContent = periodSelect.value;
        return appData.budgetMonth * periodSelect.value;
    },
    validStart: function(){
        if(salaryAmount.value === '') {
            start.setAttribute('disabled', 'disabled');
        } else {
            start.removeAttribute('disabled');
        }
    }
};

salaryAmount.addEventListener('keyup', appData.validStart);
salaryAmount.addEventListener('keydown', appData.validStart);
start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.calcSavedMoney);

