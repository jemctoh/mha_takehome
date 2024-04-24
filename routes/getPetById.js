const Joi = require('joi');

module.exports = (petStoreService) => {
    return {
        method: 'GET',
        path: '/pets/{id}',
        options: {
            handler: (request, reply) => {
    
                const petId = request.params.id;
    
                // Find the pet by id
                let pet = petStoreService.findPetById(petId);
    
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
            },
        } 
    };   
};