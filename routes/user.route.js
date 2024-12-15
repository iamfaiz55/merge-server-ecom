const router = require("express").Router()
const { userProtected } = require("../middleware/userProtected")
const userController = require("./../controllers/user.controller")
const adminController= require("./../controllers/admin.controller")

router
    .get("/order/:id", userController.userGetAllOrders)
    .get("/order-details/:id", userController.userGetOrderDetails)
    .post("/place-order", userController.userPlaceOrder)
    .delete("/cancel-order/:id", userController.userCancelOrder)
    .post("/update-password", userController.userUpdatePassword)
    .delete("/delete-address/:addressId", userController.deleteAddress)
    .get("/get-address/:id", userController.getAddresses)
    .post("/add-address", userController.addAddress)
    .post("/update-address", userController.updateAddress)


    .post("/add-product", userController.addCart)
    .delete("/delete-product/:id", userController.deleteItemFromCart)
    .delete("/delete-all-product/:userId", userController.deleteAllCart)
    .get("/get-all-product/:uid", userController.getAllCartItems)
    //  .delete("/cancel-order/:id", adminController.cancelOrder)
     .put("/return-order/:id", adminController.updateReturnRequest)
     

module.exports = router