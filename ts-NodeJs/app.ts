import http from 'http';

http.createServer((request, response) => {
    response.end("TypeScript!");
})
.listen(3000, () => console.log("Server Started!"));

