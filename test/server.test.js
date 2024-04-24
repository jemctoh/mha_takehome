const init = require('../server.js'); // Import the init function from the server file

let insertId = 0;

describe('Hapi.js Server Tests', () => {
    // Before all tests, start the server
    let server;
    beforeAll(async () => {
        server = await init();
    });

    // After all tests, stop the server
    afterAll(async () => {
        if (server) {
            await server.stop();
        }
    });

    test('should start the server', async () => {
        // Verify that the server is running
        expect(server !== undefined).toBe(true);
    });

    test('should handle a POST request to /addPetToJson', async () => {
        // Define a POST request to the /addPetToJson route with payload
        const request = {
            method: 'POST',
            url: '/new-pet',
            payload: {
                name: 'Fluffy',
                animal: 'Cat',
                color: 'White'
            }
        };

        // Send the request using the server's inject method
        const response = await server.inject(request);

        // Store the id of the newly added pet
        insertId = response.result.id;

        // Check that the response status code is 201 (Created)
        expect(response.statusCode).toBe(201);

        // Verify the response contains the newly added pet (customize this based on your application's response)
        expect(response.result).toHaveProperty('name', 'Fluffy');
    });

    test('should handle a GET request to /pets/{id}', async () => {
        // Define a GET request to the /pets/{id} route with id = 1
        const request = {
            method: 'GET',
            url: '/pets/' + insertId
        };

        // Send the request using the server's inject method
        const response = await server.inject(request);

        // Check that the response status code is 200 (OK)
        expect(response.statusCode).toBe(200);

        // Verify the response contains the expected data (you can customize this based on your application's response)
        expect(response.result).toHaveProperty('id', insertId);
    });

    test('should handle a DELETE request to /remove-pet/{id}', async () => {
        // Define a DELETE request to the /remove-pet/{id} route with id = 1
        const request = {
            method: 'DELETE',
            url: '/remove-pet/' + insertId
        };

        // Send the request using the server's inject method
        const response = await server.inject(request);

        // Check that the response status code is 204 (No Content)
        expect(response.statusCode).toBe(204);
    });

    // Add more tests for other routes or components as needed
});
