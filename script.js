let dailyProfits = [];

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
  dailyProfits.push({ date, fuel, dailyProfit, distance });

  // Salvar o lucro diário no LocalStorage
  localStorage.setItem('dailyProfits', JSON.stringify(dailyProfits));

  // Exibir o resultado na página
  displayResults();
  
  // Limpar os campos para a próxima interação
  dateInput.value = '';
  fuelInput.value = '';
  balanceInput.value = '';
  distanceInput.value = '';
}

function displayResults() {
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

  // Exibir o acumulado do gasto de combustível no mês, a quantidade percorrida no mês e o lucro do mês
  allResultsHTML += `
    <p><strong>Acumulado do gasto de combustível no mês:</strong> R$ ${monthlyFuelCost.toFixed(2)}</p>
    <p><strong>Quantidade percorrida no mês:</strong> ${totalDistance.toFixed(2)} km</p>
    <p><strong>Lucro do mês até a última interação:</strong> R$ ${monthlyProfit.toFixed(2)}</p>
  `;

  resultElement.innerHTML = allResultsHTML;
}

function isValidDate(date) {
  // Verificar se a data está no formato "yyyy-mm-dd"
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(date)) return false;

  // Verificar se a data é válida
  const composedDate = new Date(date);
  return composedDate.toString() !== 'Invalid Date';
}
