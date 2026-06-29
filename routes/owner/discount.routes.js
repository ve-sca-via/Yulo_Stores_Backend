import { Router } from 'express';
import { list, create, update, remove, publish, draft } from '../../controllers/owner/discount.controller.js';
import { upload } from '../../middleware/upload.js';

const router = Router({ mergeParams: true });

router.get('/', list);
router.post('/', upload('image', 5), create);
router.patch('/:dId', upload('image', 5), update);
router.delete('/:dId', remove);
router.patch('/:dId/publish', publish);
router.patch('/:dId/draft', draft);

export default router;
