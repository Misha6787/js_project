const   button1 = document.getElementsByTagName('button')[0],
        button2 = document.getElementsByTagName('button')[1],
        depositCheck = document.querySelector('#deposit-check');

const   budgetMonthValue = document.querySelector(' .result-total .budget_month-value'),
        budgetdayValue = document.querySelector(' .result-total .budget_day-value'),
        expensesMonthValue = document.querySelector(' .result-total .expenses_month-value'),
        additionalIncomeValue = document.querySelector(' .result-total .additional_income-value'),
        additionalExpensesValue = document.querySelector(' .result-total .additional_expenses-value'),
        incomePeriodValue = document.querySelector(' .result-total .income_period-value'),
        targetMonthValue = document.querySelector(' .result-total .target_month-value');

const   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        start = document.getElementById('start'),
        salaryAmount  = document.querySelector('.salary-amount '),
        incomeTitle = document.querySelector('.income-items .income-title'),
        incomeAmount = document.querySelector('.income-amount'),
        expensesTitle = document.querySelector('.expenses-items .expenses-title'),
        expensesAmount = document.querySelector('.expenses-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select');

        console.log(button1,
            button2,
            depositCheck,
            budgetMonthValue,
            budgetdayValue,
            expensesMonthValue,
            additionalIncomeValue,
            additionalExpensesValue,
            incomePeriodValue,
            targetMonthValue,
            additionalIncomeItem,
            start,
            salaryAmount,
            incomeTitle,
            incomeAmount,
            expensesTitle,
            expensesAmount,
            additionalExpensesItem,
            targetAmount,
            periodSelect);
