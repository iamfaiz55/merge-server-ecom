const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")
const { upload } = require("../utils/upload")
const Order = require("../models/Order")
const User = require("../models/User")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


exports.adminGetAllProducts = asyncHandler(async (req, res) => {
    const { search } = req.query;
    console.log(search);

    let query = {};
    if (search) { query.name = { $regex: search, $options: 'i' }; }
    const result = await Product.find(query);
    res.json({
        message: "Product Fetch Success", products: result
    });
});



exports.adminAddProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "upload error" })
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        const result = await Product.create({ ...req.body, images: secure_url })
        res.json({ message: "Product Add Success", result })

    })
})
exports.adminUpdateProduct = asyncHandler(async (req, res) => {
    const { updateId } = req.params
    await Product.findByIdAndUpdate(updateId, req.body)
    res.json({ message: "Product Update Success" })
})
exports.adminDeleteProduct = asyncHandler(async (req, res) => {
    const { deleteId } = req.params
    const result = await Product.findById(deleteId)
    const str = result.images.split("/")
    const img = str[str.length - 1].split(".")[0]
    await cloudinary.uploader.destroy(img)
    await Product.findByIdAndDelete(deleteId)
    res.json({ message: "Product Delete Success" })
})  




// order
exports.getAllOrder = asyncHandler(async (req, res) => {
    const result = await Order.find().sort({ createdAt: -1 }).populate("user", { password: 0, active: 0, createdAt: 0, updatedAt: 0, __v: 0 }).populate("products.product")
    res.json({ message: "Order Fetch Success", result })
})
exports.getOrdersByUserId = asyncHandler(async (req, res) => {
    const result = await Order.find({ user: '6687ad9eea288e9a29112b89' }).populate("products.product")
    res.json({ message: "Order By User ID Fetch Success", result })
})
exports.getOrderDetails = asyncHandler(async (req, res) => {
    res.json({ message: "Order details Fetch Success" })
})
exports.cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);

    await Order.findByIdAndDelete(id)
    res.json({ message: "Order cancel Success" })
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    await Order.findByIdAndUpdate(id, { status })

    res.json({ message: "Order status update Success" })
})
exports.updateReturnRequest = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Order.findByIdAndUpdate(id, { returnRequested: true })

    res.json({ message: "Order return request update Success" })
})


