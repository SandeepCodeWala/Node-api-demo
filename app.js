const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: '*', // Allow all origins
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests
};
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors(corsOptions));
// Connect to MongoDB
mongoose
.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit the process if connection fails
  });

// Import routes
// const loginRoutes = require('./routes/loginRoutes');
// const signupRoutes = require('./routes/signupRoutes');
// const userRoutes = require('./routes/userRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const authenticateToken = require('./middleware/authMiddleware');
const authenticateToken = require("./middleware/authMiddleware");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const profileController = require("./controllers/profileController");
const friendController = require("./controllers/friendController");
const userController = require("./controllers/userController");

app.use(express.json());

app.post("/signup", signupController.signup);
app.post("/login", loginController.login);
app.get("/users", userController.getAllUsers);
app.get("/user/:userId", authenticateToken, userController.getUserById);
app.post("/friends", authenticateToken, friendController.createFriend);
app.get("/friends", authenticateToken, friendController.getFriends);
app.put("/friends/:id", authenticateToken, friendController.updateFriend);
app.delete("/friends/:id", authenticateToken, friendController.deleteFriend);
// app.get('/profile', authenticateToken);

app.get("/profile", authenticateToken, profileController.getProfile);

// Use routes
// app.use('/api', loginRoutes);
// app.use('/api', signupRoutes);
// app.use('/api', userRoutes);
// app.use('/api', profileRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
