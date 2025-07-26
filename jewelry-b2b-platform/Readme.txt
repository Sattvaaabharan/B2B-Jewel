Jewelry B2B Platform
====================

Overview:
---------
This is a modular full-stack B2B jewelry platform:
- Backend: Node.js + Express + MongoDB Atlas + AWS S3 + JWT Auth
- Frontend: React + Chakra UI + React Hook Form
- Features: Auth, Admin Verification, RFQ, Messaging, File Uploads, Pagination, Search/Filters.

Prerequisites:
--------------
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB Atlas account with cluster & user created
- AWS account for S3 bucket with credentials obtained
- Policy with S3 full access or appropriate scoped access

Setup Instructions:
-------------------
1. Clone or unzip this project.

2. Backend Setup:
   - Navigate to /server
   - Create a file named `.env` with at least the following:
     MONGO_URI=<Your MongoDB Atlas connection string>
     JWT_SECRET=<Your JWT secret key, random string>
     AWS_ACCESS_KEY_ID=<Your AWS S3 Access Key ID>
     AWS_SECRET_ACCESS_KEY=<Your AWS Secret Access Key>
     AWS_REGION=<Your AWS region, e.g., us-east-1>
     AWS_S3_BUCKET_NAME=<Your S3 Bucket name>

   - Example `.env`:
     MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/jewelryDB?retryWrites=true&w=majority
     JWT_SECRET=my_super_secret_key_123456
     AWS_ACCESS_KEY_ID=AKIA...
     AWS_SECRET_ACCESS_KEY=abcd1234...
     AWS_REGION=us-east-1
     AWS_S3_BUCKET_NAME=jewelry-platform-uploads

   - Run:
     npm install
     node index.js

   The backend runs on http://localhost:5000 by default.

3. Frontend Setup:
   - Navigate to /client
   - Run:
     npm install
     npm start

   Your React frontend will open at http://localhost:3000

Using the Platform:
-------------------

- Register a user account and login
- Add companies (for users)
- Access admin route to verify companies (admin account required)
- Use RFQ module to post/paginate/filter quotes
- Use Messaging to communicate between buyer and seller
- Upload documents securely (files saved in AWS S3)

Notes:
------

- MongoDB Atlas config: Make sure your user has readWrite access to 'jewelryDB' database.
- AWS config: Ensure your credentials have appropriate permissions and the bucket exists.
- JWT_SECRET: Use a sufficiently long and random secret.
- Secure the backend for production use (HTTPS, CORS policies, rate limiting, etc.).
- This is a minimal viable product skeleton; extend & harden as needed.

Folder Highlights:
------------------

/server/config      - Database and AWS S3 config
/server/models      - Mongoose schemas (User, Company, RFQ, Message)
/server/controllers - API endpoint logic
/server/middlewares - JWT auth, role guard, error handling
/server/routes      - Express routers
/server/services    - Business logic layer

/client/src/components - UI components (Auth, RFQ, Messaging)
/client/src/pages      - Pages like Dashboard, Admin, Messaging
/client/src/context    - Auth state management
/client/theme.js       - Royal Chakra UI theme customization
/client/App.js         - Router & route guards


Run locally:
PS C:\Users\admin\Desktop\B2B Jewelry\jewelry-b2b-platform\client> npm install -g serve
>> serve -s build

Contact:
--------

For support and enhancements, please contact [Your Contact Info].

Enjoy building your Jewelry B2B ecosystem!

