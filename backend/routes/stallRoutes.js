import express from 'express'
import {
  getAllStalls,
  getStallById,
  getStallsByLocation,
  getAvailableMarkets,
} from '../stallcontrollers/stallController.js'

const router = express.Router()

// GET routes for landing page
router.get('/', getAllStalls) // GET /api/stalls - Get all available stalls
router.get('/markets', getAvailableMarkets) // GET /api/stalls/markets - Get available markets
router.get('/filter', getStallsByLocation) // GET /api/stalls/filter?location=market_name
router.get('/:id', getStallById) // GET /api/stalls/:id - Get specific stall

export default router