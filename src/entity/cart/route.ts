import express from 'express';
// import { processRequestBody } from 'zod-express-middleware';
// import { newCartSchema } from './schema';
import { getCartHandler, getCartsHandler, getSuccesCartHandler, newCartHandler, updateCartHandler, updateCartMiddleware } from './controller';
import { requireUser } from '../../middleware';
import { createCheckout, getPaymentStatusHandler, handlePayment } from '../../providers/mercadopago/controller';

const router = express.Router();

router.get('/success', handlePayment);

router.get('/payments/:payment_id', getPaymentStatusHandler);

router.use(requireUser);

router.get('/', getCartsHandler);

router.get('/checkout', updateCartMiddleware, createCheckout);

router.get('/paid', getSuccesCartHandler);

router.get('/:userId', getCartHandler);

router.post('/', newCartHandler);

router.put('/:id', updateCartHandler);

router.delete('/:id');

export default router;
