import { Router } from 'express'
import { searchItemsController, getItemDetailController, generateTitleController, saveItemTitleController } from '../controllers/itemsController'

const router = Router()

router.get('/items', searchItemsController)
router.get('/items/:id', getItemDetailController)
router.get('/generate-title/:title', generateTitleController)
router.post('/items', saveItemTitleController)

export default router