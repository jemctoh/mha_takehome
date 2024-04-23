const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const petsFilePath = path.join(__dirname, '../data/pets.json')

module.exports = {
    method: 'POST',
    path: '/pet',
    options: {
        handler: (request, reply) => {

            const newPet = request.payload;
            const pets = JSON.parse(fs.readFileSync(petsFilePath, 'utf-8'));

            // Generate a new id
            let newId = 1;
            if (pets.length > 0) {
                // take the last pet id and increment by 1
                newId = pets[pets.length - 1].id + 1;
            }
            newPet.id = newId;

            pets.push(newPet);

            // Write the updated pets array to the JSON file
            fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2), 'utf-8');

            return reply.response(newPet).code(201);
        },
        description: 'Add a new pet',
        notes: 'Adds new pet to JSON file and returns the new pet object on success',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                name: Joi.string().required().description('The name of the pet'),
                animal: Joi.string().required().description('The type of animal'),
                color: Joi.string().required().description('The color of the pet'),
            })
        }
    }
}