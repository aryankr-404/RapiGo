const app = require("./app");
const http = require('http');
const { initializeSocket } = require('./socket');

const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

