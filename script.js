let dailyProfits = [];

document.addEventListener('DOMContentLoaded', () => {
  const calculateAndSaveBtn = document.getElementById('calculateAndSaveBtn');
  calculateAndSaveBtn.addEventListener('click', calculateAndSave);

  const showAllBtn = document.getElementById('showAllBtn');
  showAllBtn.addEventListener('click', showAllRecords);

  const showSelectedDateBtn = document.getElementById('showSelectedDateBtn');
  showSelectedDateBtn.addEventListener('click', showSelectedDateRecords);

  // Exibir os registros ao carregar a página
  displayResults();
});

function calculateAndSave() {
  const dateInput = document.getElementById('date');
  const fuelInput = document.getElementById('fuel');
  const balanceInput = document.getElementById('balance');
  const distanceInput = document.getElementById('distance');

  const date = dateInput.value;
  const fuel = parseFloat(fuelInput.value);
  const balance = parseFloat(balanceInput.value);
  const distance = parseFloat(distanceInput.value);

  // Verificar se a data é válida
  if (!isValidDate(date) || isNaN(fuel) || isNaN(balance) || isNaN(distance)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const fuelCost = fuel;
  const dailyProfit = balance - fuelCost;

  // Salvando os registros no LocalStorage
  dailyProfits.push({ date, fuel, dailyProfit, distance });
  localStorage.setItem('dailyProfits', JSON.stringify(dailyProfits));

  // Atualizar a exibição dos resultados na página
  displayResults();

  // Limpar os campos para a próxima interação
  dateInput.value = '';
  fuelInput.value = '';
  balanceInput.value = '';
  distanceInput.value = '';
}

function showAllRecords() {
  const resultElement = document.getElementById('result');

  // Recuperar os dados do LocalStorage e exibir os resultados passados
  const savedResults = JSON.parse(localStorage.getItem('dailyProfits')) || [];
  let allResultsHTML = '';
  let monthlyFuelCost = 0;
  let totalDistance = 0;
  let monthlyProfit = 0;

  for (const { date, fuel, dailyProfit, distance } of savedResults) {
    allResultsHTML += `
      <p><strong>Data:</strong> ${date}</p>
      <p><strong>Gasto com combustível:</strong> R$ ${fuel.toFixed(2)}</p>
      <p><strong>Lucro do dia:</strong> R$ ${dailyProfit.toFixed(2)}</p>
      <p><strong>Distância percorrida:</strong> ${distance.toFixed(2)} km</p>
      <hr>
    `;
    monthlyFuelCost += fuel;
    totalDistance += distance;
    monthlyProfit += dailyProfit;
  }

  allResultsHTML += `
    <p><strong>Acumulado do gasto de combustível no mês:</strong> R$ ${monthlyFuelCost.toFixed(2)}</p>
    <p><strong>Quantidade percorrida no mês:</strong> ${totalDistance.toFixed(2)} km</p>
    <p><strong>Lucro do mês até a última interação:</strong> R$ ${monthlyProfit.toFixed(2)}</p>
  `;

  resultElement.innerHTML = allResultsHTML;
}

function showSelectedDateRecords() {
  const selectedDateInput = document.getElementById('selectedDate');
  const selectedDate = selectedDateInput.value;

  if (!isValidDate(selectedDate)) {
    alert('Por favor, selecione uma data válida.');
    return;
  }

  const resultElement = document.getElementById('result');
  const savedResults = JSON.parse(localStorage.getItem('dailyProfits')) || [];
  let selectedDateRecordsHTML = '';
  let selectedDateFuelCost = 0;
  let selectedDateTotalDistance = 0;
  let selectedDateProfit = 0;

  for (const { date, fuel, dailyProfit, distance } of savedResults) {
    if (date === selectedDate) {
      selectedDateRecordsHTML += `
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Gasto com combustível:</strong> R$ ${fuel.toFixed(2)}</p>
        <p><strong>Lucro do dia:</strong> R$ ${dailyProfit.toFixed(2)}</p>
        <p><strong>Distância percorrida:</strong> ${distance.toFixed(2)} km</p>
        <hr>
      `;
      selectedDateFuelCost += fuel;
      selectedDateTotalDistance += distance;
      selectedDateProfit += dailyProfit;
    }
  }

  if (selectedDateRecordsHTML === '') {
    selectedDateRecordsHTML = '<p>Nenhum registro encontrado para a data selecionada.</p>';
  } else {
    selectedDateRecordsHTML += `
      <p><strong>Total do gasto de combustível:</strong> R$ ${selectedDateFuelCost.toFixed(2)}</p>
      <p><strong>Total da distância percorrida:</strong> ${selectedDateTotalDistance.toFixed(2)} km</p>
      <p><strong>Lucro do dia:</strong> R$ ${selectedDateProfit.toFixed(2)}</p>
    `;
  }

  resultElement.innerHTML = selectedDateRecordsHTML;
}

function displayResults() {
  // Chame a função para mostrar todos os registros
  showAllRecords();
}

function isValidDate(date) {
  // Verificar se a data está no formato "yyyy-mm-dd"
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(date)) return false;

  // Verificar se a data é válida
  const composedDate = new Date(date);
  return composedDate.toString() !== 'Invalid Date';
}
