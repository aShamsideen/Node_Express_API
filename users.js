import express, { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = []

router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', (req, res) => {
    // push user
    const user = req.body;

    // const userWithId = { ...user, id: uuidv4() }

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.firstName} added to the database.`);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with id ${id} has been deleted from the database.`);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age} = req.body;

    const user = users.find((user) => user.id === id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    res.send(`User with the id ${id} has been updated on the database.`);
})

export default router;