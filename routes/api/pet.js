const debug = require('debug')('app:routes:api:pet');
const debugError = require('debug')('app:error');
const express = require('express');
const { nanoid } = require('nanoid');



const petsArray = [{
    _id: '1',
    name: 'Fido',
    createdDate: new Date(),
},
{
    _id: '2',
    name: 'Rover',
    createdDate: new Date(),
},
{
    _id: '3',
    name: 'Spot',
    createdDate: new Date(),
},
];

//create a routes

const router = express.Router();

//define the routes
router.get('/list', (req, res, next) => {
    
    res.json(petsArray);
    
});
router.get('/:petId', (req, res, next) => {
    const petID = req.params.petId;
   

    //     lines that follow are for a linear search
    //     let pet = null;
    //     for(const p of petsArray) {
    //         if(p.name == petID) {
    //             pet = p;
    //             break;
    //         }
    //     }
    //     res.json(pet);
    //line below is for a binary search

    const pet = petsArray.find((x) => x._id == petID);
    if (!pet) {
        res.status(404).json({error:'Pet not found'});
    }else{
        res.json(pet);
    }
});
router.put('/new', (req, res, next) => {
    const petID = nanoid();
    const {species, name, gender} = req.body;
    const age = parseInt(req.body.age);
    const pet = {
        _id: petID,
        species,
        name,
        age,
        gender,
        createdDate: new Date(),
    };

    if (!species){
        res.status(400).json({error:'Species is required'});
    }else if (!name){
        res.status(400).json({error:'Name is required'});
    }else if (!age){
        res.status(400).json({error:'Age is required'});
    }else if (!gender){
        res.status(400).json({error:'Gender is required'});
    }else {
        petsArray.push(pet);
        res.json(pet);
    }
});
router.put('/:petId', (req, res, next) => {
    const petID = req.params.petId;
    const {species, name, age, gender} = req.body;

    const pet = petsArray.find(x => x._id == petID);
    if (!pet) {
        res.status(404).json({error:'Pet not found'});
    }else{
        if(species != undefined) {
            pet.species = species;
        }
        if(name != undefined) {
            pet.name = name;
        }
        if(age != undefined) {
            pet.age = parseInt(age);
        }
        if(gender != undefined) {
            pet.gender = gender;
        }
        pet.lastUpdated = new Date();
        res.json(pet);
            
        };
    }
);
router.delete('/:petId', (req, res, next) => {
    const petID = req.params.petId;

    const indexPet = petsArray.findIndex(x => x._id == petID);
    if (indexPet < 0) {
        res.status(404).json({error:'Pet not found'});
    }else{
        petsArray.splice(indexPet, 1);
        res.json({message:'Pet deleted'});
        
    }

});


//export the routes
module.exports = router;

