import Product from "../models/productMadal.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        

        // Check if product with the same name exists
        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product with this name already exists",
            });
        }

        // Create a new product instance
        const newProduct = new Product({
            name,
            description,
            price,
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message,
        });
    }
};



export const getAvailableProduct = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)

    } catch (err) {
        res.status(500).json({ message: "Failed Fetch Products" })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteProduct = await Product.findByIdAndDelete(id)

        if (!deleteProduct) {
            return res.status(400).json({
                success: false,
                message: "Product is not found"
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            product: deleteProduct,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "error on deleting product",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price },
            { new: true, runValidators: true }
        )


        if (!updateProduct) {
            return res.status(400).json({
                success: false,
                message: "Error on Product Editeding",
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Edited Succesfully",
            product: updateProduct
        })

    } catch (error) {


        res.status(500).json({
            success: false,
            message: "Error on Product Editeding",
            product: error.message
        })

    }
}

