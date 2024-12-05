require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const db = require('./db'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const Offre = require('./models/offre.model');
const Admin = require('./models/admin.model');
const User=require('./models/user.model');
const Abonnement=require('./models/abonnement.model');
const Article=require('./models/article.model');
const Cours=require('./models/cours.model');
const Notif=require('./models/notif.model');

const adminRouter=require('./routes/adminRoute');
const offreRouter = require('./routes/offreRoute');
const subscriptionRoutes = require('./routes/subsRoute');
const articleRouter=require('./routes/articleRoute');
const coursRouter=require('./routes/coursRoute');
const abonnementRouter=require('./routes/abonnementRoute');
const userRouter=require('./routes/userRoute');
const membreRouter=require('./routes/membreRoute');

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/admin', adminRouter);
app.use('/Offre', offreRouter);
app.use('/subs', subscriptionRoutes);
app.use('/article',articleRouter);
app.use('/cours',coursRouter);
app.use('/user',userRouter);
app.use('/abonnement',abonnementRouter);
app.use('/membre',membreRouter);


(async () => {
  try {
    await db.authenticate();
    console.log('Database connected successfully.');

    await Offre.sync(); // Creates the table if it doesn't exist
    await Admin.sync();
    await User.sync();
    await Abonnement.sync();
    await Article.sync();
    await Cours.sync(); 
    await Notif.sync();
  

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();