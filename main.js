// Inputs
const totalCost = document.getElementById('total-cost'),
	  anInitialFee = document.getElementById('an-initial-fee'),
	  creditTerm = document.getElementById('credit-term'),
	  interestRate = document.getElementById('interest-rate');

// Results
const amountOfCredit = document.getElementById('amount-of-credit'),
	  displayMonthlyPayment = document.getElementById('monthly-payment'),
	  overpay = document.getElementById('overpay'),
	  recommendedIncome = document.getElementById('recommended-income');

// All inputs and buttons
const inputValue = document.querySelectorAll('.input-value');
const feeBtns = document.querySelectorAll('.fee');

// Controls
const saveBtn = document.getElementById('save-btn'),
	  cancelBtn = document.getElementById('cancel-btn');

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

	btnActive = true;
	btnValue = currentFee.fee;

	calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
};

const useActiveFee = () => {
	anInitialFee.value = Math.round(( totalCost.value / 100 ) * btnValue);
}

for (item of inputValue) {
	item.addEventListener('input', () => {
		if (btnActive) {
			useActiveFee();
			calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
		} else {
			calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);
		}
	})
}

anInitialFee.addEventListener('input', () => {
	btnActive = false;
	for (let item of feeBtns) {
		item.classList.remove('active');
	}
})

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
		amountOfCredit.innerHTML = `${loan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
		displayMonthlyPayment.innerHTML = `${monthlyPaymentRound.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
		overpay.innerHTML = `${(( monthlyPaymentRound * months ) - loan).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
		recommendedIncome.innerHTML = `${recommendedIncomeRound.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
	} else {
		return false
	}
}

const cancel = () => {
	totalCost.value = 0;
	anInitialFee.value = 0;
	creditTerm.value = 1;
	interestRate.value = 4;
	btnActive = false;
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
}

saveBtn.addEventListener('click', () => {
	save();
	console.log('inputs saved');
})

cancelBtn.addEventListener('click', () => {
	cancel();
});

const getItems = () => {
	const cost = localStorage.getItem('cost');
	const fee = localStorage.getItem('fee');
	const term = localStorage.getItem('term');
	const rate = localStorage.getItem('rate');

	if (cost) {
		const parsedCost = parseInt(cost, 10);
		totalCost.value = parsedCost;
	} 
	if (fee) {
		const parsedFee = parseInt(fee, 10);
		anInitialFee.value = parsedFee;
	}
	if (term) {
		const parsedTerm = parseInt(term, 10);
		creditTerm.value = parsedTerm;
	} 
	if (rate) {
		const parsedRate = parseInt(rate, 10);
		interestRate.value = parsedRate;
	}

	calculate(totalCost.value, anInitialFee.value, creditTerm.value, interestRate.value);

}

getItems();






















