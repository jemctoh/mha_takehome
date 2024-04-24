const Joi = require('joi');

module.exports = (petStoreService) => {
    return {
        method: 'DELETE',
        path: '/remove-pet/{id}',
        options: {
            handler: (request, reply) => {
                
                const petId = request.params.id;
                // Delete pet, get pet object (for response)
                const petDeleted = petStoreService.deletePetById(petId);
                // findIndex returns -1 if not found
                if (petDeleted !== undefined) {
                    return reply.response(petDeleted).code(204);
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

}