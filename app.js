const path = require('path');
const express = require('express');
const cors = require('cors');


const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeature')

const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();
const port=process.env.PORT || 3000;

app.use(cors());

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumFeatureRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

app.use(express.static('public'));


app.use((req,res)=>{
        res.status(404).sendFile(path.join(__dirname,'public','error.html'))
    });
    

sequelize.sync()
    .then(() => {
        app.listen(port,() => console.log(`server running on port: ${port}`))
    })
    .catch(err => {
        console.log(err);
    });
