import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //   router.post('/register', register);
// router.post('/login', login);
// router.get('/users', getAllUsers);
// router.get('/users/:idUser', getUserById);
// router.post('/addresses', createAddress);

// main_bp.route('/api/products', methods=['POST'])(add_product)
 
// main_bp.route('/api/products', methods=['GET'])(get_products)
 
// main_bp.route('/api/products/<idProduct>', methods=['PUT'])(update_product)
 
// main_bp.route('/api/products/<idProduct>', methods=['DELETE'])(delete_product)

// routerOrder.post("", orderController.createOrder);
// routerOrder.get("/:id", orderController.getOrderById);
// routerOrder.put("/:id", orderController.modifyStatusOrder);

  // @Get('/ping-user')
  // getPing() {
  //   return this.appService.pingServiceA()
  // }
}
