const { json } = require('express');
const Products = require('../models/productModel')

const productsCtr = {
    getProducts: async (req, res) => {
        try {
            // Fetch all products from the database
            const products = await Products.find();

            // Check if there are no products found
            if (products.length === 0) {
                return res.status(404).json({ msg: "No products found." });
            }

            // Return the list of products with a success status
            return res.status(200).json(products);
        } catch (error) {
            // Log the error for debugging purposes
            console.error("Error fetching products:", error);
            return res.status(500).json({ msg: error.message });
        }
    },

    creteProducts: async (req, res) => {
        try {
            const { product_Id, tittle, price, description, content, images, category, userId } = req.body;

            // Check if the images object is provided
            if (!images || !images.url) {
                return res.status(400).json({ msg: "No image uploaded" });
            }

            // Check if the product already exists
            const product = await Products.findOne({ product_Id });
            if (product) {
                return res.status(400).json({ msg: "This product already exists." });
            }

            // Create a new product
            const newProduct = new Products({
                product_Id,
                tittle: tittle.toLowerCase(),
                price,
                description,
                content,
                images, // Use the images object as defined in your schema
                category,
                userId // Optionally include userId if you want to track who created the product
            });

            await newProduct.save(); // Save the new product to the database

            return res.status(201).json({ msg: "Created product." });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteProducts: async (req, res) => {
        try {
            // Attempt to find and delete the product by ID
            const deletedProduct = await Products.findByIdAndDelete(req.params.id);

            // Check if the product was found and deleted
            if (!deletedProduct) {
                return res.status(404).json({ msg: "Product not found." });
            }

            // Return a success message if deletion was successful
            return res.status(200).json({ msg: "Deleted a product successfully." });
        } catch (error) {
            // Log the error for debugging purposes
            console.error("Error deleting product:", error);
            return res.status(500).json({ msg: error.message });
        }
    },

    updateProducts: async (req, res) => {
        try {
            const { tittle, price, description, content, images, category, userId } = req.body;

            // Check if the images object is provided
            if (!images) {
                return res.status(400).json({ msg: "No image upload." });
            }

            // Use findByIdAndUpdate with the correct parameters
            const updatedProduct = await Products.findByIdAndUpdate(
                req.params.id, // The ID passed in the URL
                {
                    tittle: tittle.toLowerCase(),
                    price,
                    description,
                    content,
                    images, // Use the images object as defined in your schema
                    category,
                    userId
                },
                { new: true, runValidators: true } // Options to return the updated document and run validators
            );

            // Check if the product was found and updated
            if (!updatedProduct) {
                return res.status(404).json({ msg: "Product not found." });
            }

            // Return the updated product in the response
            return res.status(200).json({ msg: "Updated a product", product: updatedProduct });
        } catch (error) {
            // Log the error for debugging
            console.error("Error updating product:", error);
            return res.status(500).json({ msg: error.message });
        }
    },

}

module.exports = productsCtr;