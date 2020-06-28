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
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
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
        this.budget = +salaryAmount.value;

        // console.log(this);
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
    }
    cancel(){
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
    getAddExpenses(){
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.map(item => {
            if(additionalExpensesItem.value !== ''){
                item = item.trim();
                item = item[0].toUpperCase() + item.slice(1);
            }
            if(item !== ''){
                this.addExpenses.push(item);
            }
        }, this);
    }
    getIncome(){
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        }, this);
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }
    addIncomeBlock(){
        const cloneGetIncome = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneGetIncome, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    }
    getAddIncome(){
        additionalIncomeItem.forEach((item) =>{
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        }, this);
    }
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
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
        salaryAmount.addEventListener('keyup', this.validStart.bind(appData));
        salaryAmount.addEventListener('keydown', this.validStart.bind(appData));
        start.addEventListener('click', this.start.bind(appData));
        cancel.addEventListener('click', this.cancel.bind(appData));
        expensesAdd.addEventListener('click', this.addExpensesBlock.bind(appData));
        incomeAdd.addEventListener('click', this.addIncomeBlock.bind(appData));
        periodSelect.addEventListener('input', this.calcSavedMoney.bind(appData));
    }
}

const appData = new AppData();
AppData.prototype.eventList();

console.log(appData);


