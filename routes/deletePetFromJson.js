const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const petsFilePath = path.join(__dirname, '../data/pets.json')

module.exports = {
    method: 'DELETE',
    path: '/remove-pet/{id}',
    options: {
        handler: (request, reply) => {
            
            const petId = request.params.id;
            const pets = JSON.parse(fs.readFileSync(petsFilePath, 'utf-8'));

            // Find the pet object id in the array
            const petIndex = pets.findIndex(pet => pet.id === petId);
            // Get pet object (for response only)
            const petToDelete = pets.find(pet => pet.id === petId);
            // findIndex returns -1 if not found
            if (petIndex !== -1) {
                pets.splice(petIndex, 1);
                fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2), 'utf-8');
                return reply.response(petToDelete).code(204);
            } else {
                return reply.response({ error: 'Pet does not exist' }).code(404);
            }
        },
        description: 'Delete a pet by its id',
        notes: 'Deletes a pet object',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer()
                .required().description('The ID of the pet to delete')
            })
        }
    }
}