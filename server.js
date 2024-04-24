const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const fs = require('fs');
const path = require('path');

// dependency injection --> a store service
const PetStoreService = require('./services/PetStoreService');

// Use the Intl.DateTimeFormat API to format the date in Singapore time
const singaporeTimeFormatter = new Intl.DateTimeFormat('en-SG', {
    timeZone: 'Asia/Singapore',
    dateStyle: 'short', // Optional: Customize the date style
    timeStyle: 'medium'  // Optional: Customize the time style
});

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // Create a new instance of the PetStoreService
    const petStoreService = new PetStoreService();

    // List of paths to include in logging
    const logPaths = ['/pets/{id}', '/remove-pet/{id}', '/new-pet'];
    
    // Log all incoming requests
    server.ext('onRequest', (request, h) => {
        // Check if the request path is in the list of included paths
        const isIncluded = logPaths.some((includedPath) => {
            // Match exact path or dynamic path using a regex pattern
            const regexPattern = includedPath.replace(/{[^}]+}/g, '([^/]+)');
            const regex = new RegExp(`^${regexPattern}$`);
            return regex.test(request.path);
        });
        // If the path is not included, do not log the request
        if (!isIncluded) {
            return h.continue;
        }

        // Prepare the log message
        const now = new Date();
        const logMessage = `${request.method.toUpperCase()} ${request.path} @ ${singaporeTimeFormatter.format(now)}\n`;

        // Path to the log file
        const logFilePath = path.join(__dirname, 'data/server.log');

        // Append the log message to the log file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Failed to write to log file:', err);
            }
        });
        console.log(logMessage);
        return h.continue;
    });

    // Import and register routes
    const getPetById = require('./routes/getPetById');
    const addPetToJson = require('./routes/addPetToJson');
    const deletePetFromJson = require('./routes/deletePetFromJson');

    server.route(getPetById(petStoreService));
    server.route(addPetToJson(petStoreService));
    server.route(deletePetFromJson(petStoreService));

    await server.start();
    console.log('Server running on %s', server.info.uri);

    return server;
}


if (process.env.NODE_ENV !== 'test') {
    init().catch(err => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = init;