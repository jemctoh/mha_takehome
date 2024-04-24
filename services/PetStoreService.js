const fs = require('fs');
const path = require('path');

filePath = path.join(__dirname, '../data/pets.json');

class PetStoreService {
    constructor() {
        this.filePath = filePath;
        this.pets = PetStoreService.prototype.loadPets(); // Load data from the JSON file into memory
    }

    // Load data from the Pets JSON file into memory
    loadPets() {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    }

    // Save data in memory back to the JSON file
    saveData() {
        const fileContent = JSON.stringify(this.pets, null, 2);
        fs.writeFileSync(this.filePath, fileContent, 'utf-8');
    }

    // Create a new item and add it to the store
    newPet(newPet) {
        // Generate a new id
        let newId = 1;
        if (this.pets.length > 0) {
            // take the last pet id and increment by 1
            newId = this.pets[this.pets.length - 1].id + 1;
        }
        newPet.id = newId;

        this.pets.push(newPet);
        this.saveData(); // Save changes back to the file
        return newPet;
    }

    // Read an item by its ID
    findPetById(id) {
        return this.pets.find(item => item.id === id);
    }

    // Delete an item by its ID
    deletePetById(id) {
        const index = this.pets.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedPet = this.pets.splice(index, 1)[0];
            this.saveData(); // Save changes back to the file
            return deletedPet;
        }
        return null;
    }
}

module.exports = PetStoreService;
