// Inputs
const totalCost = document.getElementById('total-cost'),
	  anInitialFee = document.getElementById('an-initial-fee'),
	  creditTerm = document.getElementById('credit-term'),
	  interestRate = document.getElementById('interest-rate');

// Range inputs
const totalCostRange = document.getElementById('total-cost-range'),
	  anInitialFeeRange = document.getElementById('an-initial-fee-range'),
	  creditTermRange = document.getElementById('credit-term-range'),
	  interestRateRange = document.getElementById('interest-rate-range');

// Results
const amountOfCredit = document.getElementById('amount-of-credit'),
	  displayMonthlyPayment = document.getElementById('monthly-payment'),
	  overpay = document.getElementById('overpay'),
	  recommendedIncome = document.getElementById('recommended-income');

// All inputs and buttons
const inputValue = document.querySelectorAll('.input-value');
const inputRange = document.querySelectorAll('.input-range');
const bankBtns = document.querySelectorAll('.bank');
const feeBtns = document.querySelectorAll('.fee');

// Controls
const saveBtn = document.getElementById('save-btn'),
	  cancelBtn = document.getElementById('cancel-btn');


const currentFee = 0;

const assignValue = () => {
	totalCost.value = totalCostRange.value;
	anInitialFee.value = anInitialFeeRange.value;
	creditTerm.value = creditTermRange.value;
	interestRate.value = interestRateRange.value;
};

const assignRange = () => {
	totalCostRange.value = totalCost.value;
	anInitialFeeRange.value = anInitialFee.value;
	creditTermRange.value = creditTerm.value;
	interestRateRange.value = interestRate.value;
}

assignValue();
assignRange();


const fees = [
	{
		name: '10',
		fee: 10
	},
	{
		name: '15',
		fee: 15
	},
	{
		name: '20',
		fee: 20
	},
	{
		name: '25',
		fee: 25
	},
	{
		name: '30',
		fee: 30
	},
];

let btnActive = false;
let btnValue = 0;

for (let item of feeBtns) {
	item.addEventListener('click', () => {
		for (let item of feeBtns) {
			item.classList.remove('active');
		}
		item.classList.add('active');
		takeActiveFee(item);
	})
};

const takeActiveFee = (active) => {
	const dataAttrValue = active.dataset.name;
	const currentFee = fees.find( fee => fee.name === dataAttrValue);
	
	anInitialFee.value = Math.round(( totalCost.value / 100 ) * currentFee.fee)

	anInitialFeeRange.value = anInitialFee.value
	btnActive = true;
	btnValue = currentFee.fee;

	calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
};

const useActiveFee = () => {
	anInitialFee.value = Math.round(( totalCost.value / 100 ) * btnValue);
	anInitialFeeRange.value = Math.round(( totalCost.value / 100 ) * btnValue);
}


for (item of inputRange) {
	item.addEventListener('input', () => {
		if (btnActive) {
			useActiveFee();
			assignValue();
			calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
		} else {
			assignValue();
			calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
		}
	});
}

for (item of inputValue) {
	item.addEventListener('input', () => {
		if (btnActive) {
			useActiveFee();
			assignRange();
			calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
		} else {
			assignRange();
			calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
		}
	})
}

const calculate = (totalCost = 0, anInitialFee = 0, creditTerm = 1, interestRate = 10) => {
	// ЕП - Ежемесячный платеж
	// РК - размер кредита
	// ПС - процентная ставка
	// КМ - количество месяцев

	// ЕП = (РК + ( ( (РК / 100) * ПС) / 12) * КМ) / КМ;

	let monthlyPayment; 
	let loan = totalCost - anInitialFee;
	let interest = interestRate;
	let years = creditTerm;
	let months = 12 * years;

	monthlyPayment = (loan + ( ( (loan / 100) * interest) / 12) * months) / months;
	const monthlyPaymentRound = Math.round(monthlyPayment);
	const recommendedIncomeRound = Math.round(monthlyPaymentRound + ( (monthlyPaymentRound / 100) * 35 ));
	if (monthlyPaymentRound >= 0 && loan >= 0 && recommendedIncomeRound >= 0) {
		amountOfCredit.innerHTML = `${loan} ₽`;
		displayMonthlyPayment.innerHTML = `${monthlyPaymentRound} ₽`;
		overpay.innerHTML = `${( monthlyPaymentRound * months ) - loan} ₽`
		recommendedIncome.innerHTML = `${recommendedIncomeRound} ₽`
	} else {
		return false
	}
}

const cancel = () => {
	totalCost.value = 0;
	anInitialFee.value = 0;
	creditTerm.value = 1;
	interestRate.value = 4;
	totalCostRange.value = 0;
	anInitialFeeRange.value = 0;
	creditTermRange.value = 1;
	interestRateRange.value = 4;
	calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
	for (let item of feeBtns) {
			item.classList.remove('active');
		}
}

const save = () => {
	localStorage.setItem('cost', totalCost.value.toString());
	localStorage.setItem('fee', anInitialFee.value.toString());
	localStorage.setItem('term', creditTerm.value.toString());
	localStorage.setItem('rate', interestRate.value.toString());
	localStorage.setItem('costRange', totalCostRange.value.toString());
	localStorage.setItem('feeRange', anInitialFeeRange.value.toString());
	localStorage.setItem('termRange', creditTermRange.value.toString());
	localStorage.setItem('rateRange', interestRateRange.value.toString());
}

saveBtn.addEventListener('click', () => {
	save();
	console.log('success');
})

cancelBtn.addEventListener('click', () => {
	cancel();
});

const checkForItems = () => {
	
}























