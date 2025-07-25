import express from 'express';
import ProductController from '../controllers/productController';
import { upload } from '../middlewares/multerMiddleware';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const productController = new ProductController();

router.post('/', protect, upload.fields([{name:"image1",maxCount:1}]),productController.addProduct);
router.put('/:id/quantity',protect,productController.updateProQuantity);
router.get('/',protect,productController.getProducts)

export default router