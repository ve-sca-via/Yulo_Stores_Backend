import { Router } from 'express';
import { upload } from '../../middleware/upload.js';
import {
  list, create, getOne, update, remove, toggle, updateIngredients,
  createAddon, deleteAddon,
} from '../../controllers/owner/menuItem.controller.js';

const router = Router({ mergeParams: true });

router.get('/', list);
router.post('/', upload('image', 10), create);
router.get('/:itemId', getOne);
router.patch('/:itemId', upload('image', 10), update);
router.delete('/:itemId', remove);
router.patch('/:itemId/toggle', toggle);
router.patch('/:itemId/ingredients', updateIngredients);
router.post('/:itemId/addons', upload('image', 5), createAddon);
router.delete('/:itemId/addons/:addonId', deleteAddon);

export default router;
