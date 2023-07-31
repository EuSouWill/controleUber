const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitando o CORS para permitir requisições do front-end
app.use(cors());

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb+srv://williamnunesregis:<password>@cluster0.pid3xm6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model do documento que será armazenado no banco de dados
const MonthlyProfit = mongoose.model('MonthlyProfit', {
  date: Date,
  fuelCost: Number,
  balance: Number,
  distance: Number,
});

app.use(bodyParser.json());

// Rota para salvar os dados no banco de dados
app.post('/api/save', async (req, res) => {
  try {
    const { date, fuel, balance, distance } = req.body;

    // Criando um novo documento com os dados recebidos
    const monthlyProfit = new MonthlyProfit({
      date: new Date(date),
      fuelCost: fuel,
      balance,
      distance,
    });

    // Salvando o documento no banco de dados
    await monthlyProfit.save();

    res.status(201).json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar os dados.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
