const Category = require("../models/categoryModels");


const categoryCtr = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();

            res.json(categories);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    creteCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name });

            if (category) return res.status(400).json({ msg: "Category Already Exists." });

            const newCategory = new Category({ name });

            await newCategory.save();

            return res.status(200).json({ msg: "Created Category" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);

            return res.status(200).json({ msg: "Deleted Successful" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;

            await Category.findByIdAndUpdate({ _id: req.params.id }, { name });

            return res.status(200).json({ msg: "Updated" })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

module.exports = categoryCtr;