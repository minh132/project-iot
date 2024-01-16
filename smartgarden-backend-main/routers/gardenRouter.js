const express = require('express')
const gardenController = require('../controllers/gardenController')
const router = express.Router()

//create garden
router.post('/api/garden/create', gardenController.creategarden);

//delete garden
router.delete('/api/garden/delete', gardenController.deletegarden);

//update garden data
router.put('/api/garden/update', gardenController.updategardenData);

//get garden data
router.get('/api/garden/detail', gardenController.getgardenData);

//get other gardens list
router.get('/api/garden/find', gardenController.getOthergardensList);

//request to join garden
router.post('/api/garden/request-to-join-garden', gardenController.requestToJoingarden);

//confirm join garden
router.post('/api/garden/confirm-join-garden', gardenController.confirmJoingarden);

//refuse join garden
router.post('/api/garden/refuse-join-garden', gardenController.refuseJoingarden);

//delete member
router.delete('/api/garden/delete-member', gardenController.deleteMember);
module.exports = router