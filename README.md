<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="fruits-click-game-dashboard---backend">Fruits Click Game Dashboard - Backend</h1>
<p>This is the <strong>backend</strong> portion of the Fruits Click Game Dashboard, handling user authentication, game data management, and real-time updates for the Fruits Click Game Dashboard application.</p>
<h2 id="features">Features</h2>
<ol>
<li><strong>User Management</strong>:
<ul>
<li>Admins can create, edit, delete players.</li>
<li>Blocking/unblocking players to control login access.</li>
</ul>
</li>
<li><strong>Game Data Management</strong>:
<ul>
<li>Real-time update of banana click counts.</li>
<li>Endpoints for managing player data and game stats.</li>
</ul>
</li>
<li><strong>Real-Time Communication</strong>:
<ul>
<li>Integrated <a href="http://Socket.io">Socket.io</a> for real-time updates on click counts and user activity.</li>
</ul>
</li>
<li><strong>JWT Authentication</strong>:
<ul>
<li>Secure login and user authentication using JSON Web Tokens.</li>
</ul>
</li>
</ol>
<h2 id="tech-stack">Tech Stack</h2>
<ul>
<li><strong>Node.js</strong> - Runtime environment</li>
<li><strong>Express</strong> - Backend framework</li>
<li><strong>MongoDB</strong> - Database</li>
<li><strong><a href="http://Socket.io">Socket.io</a></strong> - Real-time updates</li>
<li><strong>JWT</strong> - Authentication and authorization</li>
</ul>
<h2 id="setup-and-installation">Setup and Installation</h2>
<h3 id="clone-the-repository">Clone the Repository</h3>
<p>bash</p>
<pre><code>
`git clone https://github.com/pintu544/BackendAuthSocket.git
cd BackendAuthSocket` 
</code></pre>
<h3 id="install-dependencies">Install Dependencies</h3>
<p>bash</p>
<pre><code>
npm install
</code></pre>
<h3 id="environment-variables">Environment Variables</h3>
<p>Create a <code>.env</code> file in the root directory and configure the following variables:<br>
<code>`PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret`</code></p>
<h3 id="running-the-application">Running the Application</h3>
<p>To start the server, run:</p>
<p>bash</p>
<pre><code>
`npm start` 
</code></pre>
<p>The backend should be running at <code>http://localhost:5000</code>.</p>
<h3 id="live-demo">Live Demo</h3>
<p>The live backend demo is available <a href="https://backendauthsocket.onrender.com">here</a>.</p>
<h2 id="api-endpoints">API Endpoints</h2>
<h3 id="authentication-endpoints">Authentication Endpoints</h3>
<ul>
<li><strong>POST</strong> <code>/api/v1/login</code> - User login</li>
<li><strong>POST</strong> <code>/api/v1/register</code> - User registration</li>
<li><strong>GET</strong> <code>/api/v1/dashboard</code> - Dashboard (authentication required)</li>
</ul>
<h3 id="admin-endpoints">Admin Endpoints</h3>
<ul>
<li><strong>GET</strong> <code>/api/v1/users</code> - Get all users (admin authentication required)</li>
<li><strong>POST</strong> <code>/api/game/players</code> - Create a player (admin authentication required)</li>
<li><strong>PUT</strong> <code>/api/game/players/:id</code> - Edit a player (admin authentication required)</li>
<li><strong>DELETE</strong> <code>/api/game/players/:id</code> - Delete a player (admin authentication required)</li>
<li><strong>POST</strong> <code>/api/game/block/:id</code> - Block a player (admin authentication required)</li>
</ul>
<h3 id="game-endpoints">Game Endpoints</h3>
<ul>
<li><strong>POST</strong> <code>/api/game/click</code> - Increment player’s “banana” click count</li>
</ul>
<h2 id="project-structure">Project Structure</h2>
<p>bash</p>
<pre><code>
BackendAuthSocket/
├── db/               # Configuration files (DB, JWT)
├── controllers/          # Functions handling requests
├── middleware/           # Middleware (auth and admin checks)
├── models/               # Mongoose models (User, Game Data)
├── routes/               # API routes
├── sockets/              # Socket.io event handlers
└── app.js             # Main server entry point
</code></pre>
</div>
</body>

</html>
