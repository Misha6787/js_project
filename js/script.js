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
        cancel = document.getElementById('cancel'),
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
        this.budget = +salaryAmount.value;

        console.log(this);
        const inputText = document.querySelectorAll('input[type=text]');
        function closeInpText(){
            inputText.forEach(function(item){
                if(!item.hasAttribute('disabled')){
                    item.setAttribute('disabled', 'disabled');
                } else {
                    item.removeAttribute('disabled');
                }  
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
        }
        closeInpText();

        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    },
    cancel: function(){
        const inputText = document.querySelectorAll('input[type=text]');
        
        salaryAmount.value = '';
        incomeItems.forEach(function(item){
            item.querySelector('.income-title').value = '';
            item.querySelector('.income-amount').value = '';
        });
        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').value = '';
            item.querySelector('.expenses-amount').value = '';
        });
        inputText.forEach(function(item){
            if(!item.hasAttribute('disabled')){
                item.setAttribute('disabled', 'disabled');
            } else {
                item.removeAttribute('disabled');
            }  
        });
        additionalIncomeItem[0].value = '';
        additionalIncomeItem[1].value = '';
        additionalExpensesItem.value = '';
        targetAmount.value = '';
        periodSelect.value = 1;
        periodAmount.textContent = 1;

        budgetMonthValue.value = '';
        budgetdayValue.value = '';
        expensesMonthValue.value = '';
        additionalIncomeValue.value = '';
        additionalExpensesValue.value = '';
        incomePeriodValue.value = '';
        targetMonthValue.value = '';

        appData.budgetMonth = 0;

        start.style.display = 'block';
        cancel.style.display = 'none';
        start.setAttribute('disabled', 'disabled');
    },
    showResult: function() {
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
        });
        budgetMonthValue.value = this.budgetMonth;
        budgetdayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    },
    getAddExpenses: function(){
        this.addExpenses = [];
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.map(item => {
            if(additionalExpensesItem.value !== ''){
                item = item.trim();
                item = item[0].toUpperCase() + item.slice(1);
            }
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });
    },
    getIncome: function(){
        this.income = {};
        this.incomeMonth = 0;
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
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
        this.expenses = {};
        this.expensesMonth = 0;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
        for(let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function() { 
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / this.budget);
    }, 
    getStatusIncome: function() {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
    
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            return ('У вас средний уровень дохода');
    
        } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
    
        } else if (this.budgetDay <= 0) {
            return ('Что то пошло не так');
        } 
    },
    calcSavedMoney: function() {
        periodAmount.textContent = periodSelect.value;
        return this.budgetMonth * periodSelect.value;
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
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.calcSavedMoney);

