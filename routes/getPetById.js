const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const petsFilePath = path.join(__dirname, '../data/pets.json')

module.exports = {
    method: 'GET',
    path: '/pet/{id}',
    options: {
        handler: (request, reply) => {
            
            const petId = request.params.id;
            const pets = JSON.parse(fs.readFileSync(petsFilePath, 'utf-8'));

            // Find the pet by id
            const pet = pets.find(pet => pet.id === petId);
            if (pet) {
                return reply.response(pet);
            } else {
                return reply.response({ error: 'Pet not found' }).code(404);
            }
        },
        description: 'Get a pet by its id',
        notes: 'Returns a pet object',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer()
                .required().description('The ID of the pet to search for')
            })
        }
    }
}