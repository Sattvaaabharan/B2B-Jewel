# ------------------------
# Jewelry B2B Platform Auto-Setup Script (setup-jewelry-b2b.ps1)
# Creates minimal, functional Node.js backend and React frontend
# ------------------------

# Set your base project directory here
$BaseDir = "$PWD\jewelry-b2b-platform"
$ClientDir = "$BaseDir\client"
$ServerDir = "$BaseDir\server"

# Create Project Folders
New-Item -ItemType Directory -Path $BaseDir -Force | Out-Null
New-Item -ItemType Directory -Path "$ServerDir\models" -Force | Out-Null
New-Item -ItemType Directory -Path "$ServerDir\routes" -Force | Out-Null
New-Item -ItemType Directory -Path "$ClientDir\src\components" -Force | Out-Null

# --- SERVER FILES ---
# .env (update with your Mongo URI later)
Set-Content -Path "$ServerDir\.env" -Value @"
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
"@

# package.json (backend)
Set-Content -Path "$ServerDir\package.json" -Value @"
{
  "name": "jewelry-b2b-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": { "start": "node index.js" },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.1",
    "mongoose": "^6.3.3",
    "multer": "^1.4.4",
    "jsonwebtoken": "^8.5.1",
    "bcryptjs": "^2.4.3"
  }
}
"@

# index.js (backend entry)
Set-Content -Path "$ServerDir\index.js" -Value @"
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const companyRoutes = require('./routes/company');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/company', companyRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => res.send('Jewelry B2B API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port \${PORT}`));
"@

# models/Company.js
Set-Content -Path "$ServerDir\models\Company.js" -Value @"
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gstin: { type: String, required: true, unique: true },
  pan: { type: String, required: true, unique: true },
  udyam: { type: String, default: '' },
  iec: { type: String, default: '' },
  bisLicense: { type: String, default: '' },
  bankDetails: {
    accountNumber: { type: String, default: '' },
    ifsc: { type: String, default: '' },
    bankName: { type: String, default: '' }
  },
  documents: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);
"@

# routes/company.js
Set-Content -Path "$ServerDir\routes\company.js" -Value @"
const express = require('express');
const Company = require('../models/Company');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { gstin } = req.body;
    const existing = await Company.findOne({ gstin });
    if (existing) return res.status(400).json({ msg: "Company with this GSTIN already registered." });

    const company = new Company(req.body);
    await company.save();
    return res.status(201).json(company);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
"@

# routes/upload.js
Set-Content -Path "$ServerDir\routes\upload.js" -Value @"
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/document', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  const fakeUrl = \`https://fake-storage-service.com/\${req.file.originalname}\`;
  res.json({ url: fakeUrl });
});

module.exports = router;
"@

# --- CLIENT FILES ---

# package.json (frontend)
Set-Content -Path "$ClientDir\package.json" -Value @"
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "^2.2.8",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "axios": "^0.27.2",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start"
  }
}
"@

# src/index.js
Set-Content -Path "$ClientDir\src\index.js" -Value @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const theme = extendTheme({
  colors: {
    primary: '#0f1951',
    accent: '#D4AF37'
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Open Sans', sans-serif"
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
"@

# src/App.js
Set-Content -Path "$ClientDir\src\App.js" -Value @"
import React from 'react';
import CompanyRegistration from './components/CompanyRegistration';
import { Box, Heading } from '@chakra-ui/react';

function App() {
  return (
    <Box bg="white" minH="100vh" p={5}>
      <Heading textAlign="center" mb={6} color="primary">
        Jewelry B2B Platform Registration
      </Heading>
      <CompanyRegistration />
    </Box>
  );
}

export default App;
"@

# components/CompanyRegistration.js
Set-Content -Path "$ClientDir\src\components\CompanyRegistration.js" -Value @"
import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function CompanyRegistration() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    gstin: '',
    pan: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/company/register', form);
      toast({
        title: 'Registered successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setForm({ name: '', gstin: '', pan: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'Unknown error.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" p={5} borderWidth="1px" borderColor="accent" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="e.g., ABC Jewellers" />
          </FormControl>
          <FormControl id="gstin" isRequired>
            <FormLabel>GSTIN</FormLabel>
            <Input name="gstin" value={form.gstin} onChange={handleChange} placeholder="GST Number" />
          </FormControl>
          <FormControl id="pan" isRequired>
            <FormLabel>PAN</FormLabel>
            <Input name="pan" value={form.pan} onChange={handleChange} placeholder="PAN Card Number" />
          </FormControl>
          <Button colorScheme="yellow" type="submit" width="full">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
"@

# --- NPM INSTALL AND OPEN VS CODE ---

# Server: install dependencies
Push-Location $ServerDir
npm install
Pop-Location

# Client: install dependencies
Push-Location $ClientDir
npm install
Pop-Location

# Open VS Code at Project root
code $BaseDir

Write-Host "`nAll files and dependencies created. Update your MongoDB URI in /server/.env before starting your project." -ForegroundColor Green
