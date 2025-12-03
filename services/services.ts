import * as foods from "./foods/foods";
import * as reservation from "./reservation/reservation"
import * as categories from "./categories/categories"
import * as cart from "./cart/cart"
import * as auth from './auth/auth'
import * as users from "./users/users"
import * as orders from './orders/orders'
import * as payments from './payment/payment'

const services = {
    auth,
    cart,
    categories,
    foods,
    reservation,
    users,
    orders,
    payments
}

export default services;
