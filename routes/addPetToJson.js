const Joi = require('joi');

module.exports = (petStoreService) => {
    return {
        method: 'POST',
        path: '/new-pet',
        options: {
            handler: (request, reply) => {
                const newPet = request.payload;
                newPetInfo = petStoreService.newPet(newPet);
                return reply.response(newPetInfo).code(201);
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
};