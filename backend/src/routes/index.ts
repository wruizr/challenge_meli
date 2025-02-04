import { Router } from 'express'
import { searchItemsController, getItemDetailController, generateTitleController } from '../controllers/itemsController'

const router = Router()

router.get('/items', searchItemsController)
router.get('/items/:id', getItemDetailController)
router.get('/generate-title/:id', generateTitleController)

export default router