'use strict';
const   incomeAdd = document.getElementsByTagName('button')[0],
        expensesAdd = document.getElementsByTagName('button')[1],
        depositCheck = document.querySelector('#deposit-check');
let     expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItems = document.querySelectorAll('.income-items');

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
        additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
    constructor(){
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.budget = 0;
        this.incomeMonth = 0;
        this.budgetDay = 0;
        this.deposit = [];
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
    start() {
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        this.budget = +salaryAmount.value;

        const inputText = document.querySelectorAll('input[type=text]');
        function closeInpText(){
        inputText.forEach((item) => {
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
        this.getExpInc();
        this.getAddExpInc();
        this.getBudget();
        this.showResult();
    }
    cancel(){
        const inputText = document.querySelectorAll('input[type=text]');
        
        salaryAmount.value = '';
        incomeItems.forEach((item) => {
            item.querySelector('.income-title').value = '';
            item.querySelector('.income-amount').value = '';
        }, this);
        expensesItems.forEach((item) => {
            item.querySelector('.expenses-title').value = '';
            item.querySelector('.expenses-amount').value = '';
        }, this);
        inputText.forEach((item) => {
            if(!item.hasAttribute('disabled')){
                item.setAttribute('disabled', 'disabled');
            } else {
                item.removeAttribute('disabled');
            }  
        }, this);
        additionalIncomeItem[0].value = '';
        additionalIncomeItem[1].value = '';
        additionalExpensesItem[0].value = '';
        targetAmount.value = '';
        periodSelect.value = 1;
        periodAmount.textContent = 1;

        if(incomeItems[2]){
            incomeItems[1].remove();
            incomeItems[2].remove();
            incomeAdd.style.display = 'block';
        } else if(incomeItems[1]) {
            incomeItems[1].remove();
            incomeAdd.style.display = 'block';
        }
        if(expensesItems[2]){
            expensesItems[1].remove();
            expensesItems[2].remove();
            expensesAdd.style.display = 'block';
        } else if(expensesItems[1]){
            expensesItems[1].remove();
            expensesAdd.style.display = 'block';
        }

        budgetMonthValue.value = '';
        budgetdayValue.value = '';
        expensesMonthValue.value = '';
        additionalIncomeValue.value = '';
        additionalExpensesValue.value = '';
        incomePeriodValue.value = '';
        targetMonthValue.value = '';

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.addExpenses = [];
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;

        start.style.display = 'block';
        cancel.style.display = 'none';
        start.setAttribute('disabled', 'disabled');
        incomeAdd.removeAttribute('disabled');
        expensesAdd.removeAttribute('disabled');
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetdayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    }
    getAddExpInc() {
        const count = item => {
            const itemValue = item.value.trim();
            if(itemValue !== '' && item.className === 'additional_income-item'){
                this.addIncome.push(itemValue);
            } else if (itemValue !== '' && item.className === 'additional_expenses-item') {
                this.addExpenses.push(itemValue);
            }
        };
        additionalIncomeItem.forEach(count);
        additionalExpensesItem.forEach(count);
    }
    getExpIncBlock(event) {
        const startStr = event.target.className.split(' ')[1].split('_')[0];
        let itemStr = document.querySelectorAll(`.${startStr}-items`);
        const addStr = document.querySelector(`.${startStr}_add`);

        const cloneExpIncItem = itemStr[0].cloneNode(true);
        itemStr[0].parentNode.insertBefore(cloneExpIncItem, addStr);
        itemStr = document.querySelectorAll(`.${startStr}-items`);
        if(itemStr.length === 3) {
            addStr.style.display = 'none';
        }
    }
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };
        incomeItems.forEach(count);
        expensesItems.forEach(count);
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
        for(let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() { 
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budget);
    }
    getStatusIncome() {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');

        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            return ('У вас средний уровень дохода');

        } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');

        } else if (this.budgetDay <= 0) {
            return ('Что то пошло не так');
        } 
    }
    calcSavedMoney() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    }
    validStart(){
        salaryAmount.value === '' ? start.setAttribute('disabled', 'disabled') : start.removeAttribute('disabled');
    }
    eventList(){
        salaryAmount.addEventListener('keyup', this.validStart.bind(this));
        salaryAmount.addEventListener('keydown', this.validStart.bind(this));
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.cancel.bind(this));
        expensesAdd.addEventListener('click', this.getExpIncBlock.bind(this));
        incomeAdd.addEventListener('click', this.getExpIncBlock.bind(this));
        periodSelect.addEventListener('input', this.calcSavedMoney.bind(this));
    }
}

const appData = new AppData();
appData.eventList();

console.log(appData);


