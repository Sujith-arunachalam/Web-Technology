const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

async function onRequest(req, res) {
    const path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received');

    const query = url.parse(req.url).query;
    const params = querystring.parse(query);
    const username = params["username"];
    const id = params["id"];
    const q1 = params["q1"];
    const q2 = params["q2"];
    const q3 = params["q3"];
    const q4 = params["q4"];
    const q5 = params["q5"];


    if (req.url.includes("/submit")) {
        await handleQuizSubmission(req, res, username, id, q1, q2, q3, q4, q5);
    } else if (req.url.includes("/display")) {
        await displayTable(req, res);
    } else if (req.url.includes("/delete")) {
        await deleteResults(req, res, username);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

async function handleQuizSubmission(req, res, username, id, q1, q2, q3, q4, q5) {
    try {
        const correctAnswers = {
            q1: "HYPERTEXT MARKUP LANGUAGE",
            q2: "HYPERTEXT TRANSFER PROTOCOL",
            q3: "C",
            q4: "H2O",
            q5: "OBJECT ORIENTED"
        };

        let score = 0;
        if (q1 === correctAnswers.q1) score++;
        if (q2 === correctAnswers.q2) score++;
        if (q3 === correctAnswers.q3) score++;
        if (q4 === correctAnswers.q4) score++;
        if (q5 === correctAnswers.q5) score++;

        const database = client.db('quizapp'); 
        const collection = database.collection('results');

        const result = {
            username,
            id,
            score
        };

        await collection.insertOne(result);

        const htmlResponse = `
            <html>
                <head>
                    <title>Quiz Result</title>
                </head>
                <body>
                    <h2>Quiz Result</h2>
                    <p>Username: ${username}</p>
                    <p>ID: ${id}</p>
                    <p>Score: ${score}</p>
                    <a href="/display">View All Results</a>
                </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error handling quiz submission:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function displayTable(req, res) {
    try {
        const database = client.db('quizapp'); 
        const collection = database.collection('results');

        const cursor = collection.find({});
        const results = await cursor.toArray();

        let tableHtml = `
            <html>
                <head>
                    <title>Quiz Results</title>
                    <style>
                        table {
                            font-family: Arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Quiz Results</h2>
                    <table>
                        <tr>
                            <th>Username</th>
                            <th>ID</th>
                            <th>Score</th>
                        </tr>
        `;
        results.forEach(result => {
            tableHtml += `
                <tr>
                    <td>${result.username}</td>
                    <td>${result.id}</td>
                    <td>${result.score}</td>
                </tr>
            `;
        });
        tableHtml += `
                    </table>
                    
                </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(tableHtml);
        res.end();
    } catch (error) {
        console.error('Error displaying results:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function deleteResults(req, res, username) {
    try {
        const database = client.db('quizapp'); 
        const collection = database.collection('results');

        await collection.deleteMany({ username: username });

        const htmlResponse = `
            <html>
                <head>
                    <title>Delete Results</title>
                </head>
                <body>
                    <h2>All quiz results for ${username} have been deleted.</h2>
                    
                </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error deleting results:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

// Create HTTP server
http.createServer(onRequest).listen(7050);
console.log('Server is running...');
