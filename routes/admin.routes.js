const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")

router
    //product
    .get("/products", adminController.adminGetAllProducts)
    .post("/add-product", adminController.adminAddProduct)
    .put("/update-product/:updateId", adminController.adminUpdateProduct)
    .delete("/delete-product/:deleteId", adminController.adminDeleteProduct)








    // order
    .get("/orders", adminController.getAllOrder)
    .get("/orders/getOrdersByUserId", adminController.getOrdersByUserId)
    .get("/orders-details/:orderDetailId", adminController.getOrderDetails)
    .delete("/orders/cancel-order/:id", adminController.cancelOrder)
    .put("/orders/return-order/:id", adminController.updateReturnRequest)
    .put("/update-order-status/:id", adminController.updateOrderStatus)
    // .get("/all-users/", adminController.getAllUsers)

module.exports = router
