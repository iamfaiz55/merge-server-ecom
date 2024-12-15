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
    // .get("/orders/getOrdersByUserId", adminController.getOrdersByUserId)
    .get("/orders-details/:orderDetailId", adminController.getOrderDetails)
   
    
    // .get("/all-users/", adminController.getAllUsers)

module.exports = router
