// Inputs
const totalCost = document.getElementById('total-cost'),
	  anInitialFee = document.getElementById('an-initial-fee'),
	  creditTerm = document.getElementById('credit-term');

// Range inputs
const totalCostRange = document.getElementById('total-cost-range'),
	  anInitialFeeRange = document.getElementById('an-initial-fee-range'),
	  creditTermRange = document.getElementById('credit-term-range');

// Results
const amountOfCredit = document.getElementById('amount-of-credit'),
	  displayMonthlyPayment = document.getElementById('monthly-payment'),
	  recommendedIncome = document.getElementById('recommended-income');

// All inputs and buttons
const inputValue = document.querySelectorAll('.input-value');
const inputRange = document.querySelectorAll('.input-range');
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
	totalCost.value = totalCostRange.value;
	anInitialFee.value = anInitialFeeRange.value;
	creditTerm.value = creditTermRange.value;
};

// const assignRange = () => {
// 	totalCostRange.value = totalCost.value;
// 	anInitialFeeRange.value = anInitialFee.value;
// 	creditTermRange.value = creditTerm.value
// }

assignValue();
// assignRange();

const banks = [
	{
		name: '10',
		interest: 10
	},
	{
		name: '15',
		interest: 15
	},
	{
		name: '20',
		interest: 20
	},
	{
		name: '25',
		interest: 25
	},
	{
		name: '30',
		interest: 30
	},
];

let currentInterest = banks[0].interest;

for (let bank of bankBtns) {
	bank.addEventListener('click', () => {
		for (let item of bankBtns) {
			item.classList.remove('active');
		}
		bank.classList.add('active');
		takeActiveBank(bank);
	})
};

const takeActiveBank = (active) => {
	const dataAttrValue = active.dataset.name;
	const currentBank = banks.find( bank => bank.name === dataAttrValue);
	currentInterest = currentBank.interest;
	calculate(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (item of inputRange) {
	item.addEventListener('input', () => {
		assignValue();
		calculate(totalCost.value, anInitialFee.value, creditTerm.value);
	});
}

// for (item of inputValue) {
// 	item.addEventListener('input', () => {
// 		if (item.value === "") {
// 			item.value = 0;
// 		};
// 		assignRange();
// 	})
// }

const calculate = (totalCost = 0, anInitialFee = 0, creditTerm = 1) => {
	// ЕП - Ежемесячный платеж
	// РК - размер кредита
	// ПС - процентная ставка
	// КМ - количество месяцев

	// ЕП = (РК + ( ( (РК / 100) * ПС) / 12) * КМ) / КМ;

	let monthlyPayment; 
	let loan = totalCost - anInitialFee;
	let interestRate = currentInterest;
	let years = creditTerm;
	let months = 12 * years;

	monthlyPayment = (loan + ( ( (loan / 100) * currentInterest) / 12) * months) / months;
	const monthlyPaymentRound = Math.round(monthlyPayment);
	const recommendedIncomeRound = Math.round(monthlyPaymentRound + ( (monthlyPaymentRound / 100) * 35 ));
	if (monthlyPaymentRound < 0) {
		return false;
	} else {
		amountOfCredit.innerHTML = `${loan} ₽`;
		displayMonthlyPayment.innerHTML = `${monthlyPaymentRound} ₽`;
		recommendedIncome.innerHTML = `${recommendedIncomeRound} ₽`
	}
}




























