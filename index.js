const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://menu-1sn8qqowf-adnan-quazis-projects.vercel.app",
    "https://menu-theta-khaki.vercel.app",
    "https://zooptiq.vercel.app",
    "https://www.zooptick.com",
    "https://www.zooptick.in",
    "https://menu.zooptick.com"
  ],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
const port = process.env.PORT || 3000;
const Profile = require("./models/profile");
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
require("./db/conn");

app.get('/create-dummy-profile', async (req, res) => {
  try {
    // Dummy data to insert
    const dummyProfile = new Profile({
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown',
      menu: ['Pizza', 'Pasta', 'Salad'],
      socials: {
        instagram: 'john_doe_insta',
        whatsapp: '+1234567890',
        facebook: 'john_doe_fb',
      },
    });

    // Save the profile to the database
    await dummyProfile.save();

    res.status(201).json({
      message: 'Dummy profile created successfully!',
      data: dummyProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating dummy profile',
      error: error.message,
    });
  }
});
app.get('/menu', async (req, res) => {
  try {
    const { id } = req.query; // Get id from query params
    if (!id) {
      return res.status(400).send('ID is required');
    }

    // Search for the document by ID
    const document = await Profile.findById(id);
    if (!document) {
      return res.status(404).send('Document not found');
    }
    res.json(document);
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error');
  }
});


const server = require("http").createServer(app);
server.listen(port, () => {
  console.log("Conection is established at " + port);
});