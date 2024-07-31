const Product = require("../models/Product");
const { sendErrorResponse } = require("../utils/serverUtils");
const path = require("path");
const fs = require("fs/promises");

const getAllProducts = async (req, res) => {
  try {
    // Filters
    const { gender, category } = req.query;
    const filter = {};
    if (gender) {
      filter.gender = gender;
    }
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter);
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug: slug });

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getTrendingProducts = async (req, res) => {
  try {
    const { slug } = req.params;
    const products = await Product.find({
      gender: slug,
      isTrending: true,
    }).limit(10);
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files.images;

    const images = [];

    if (Array.isArray(files)) {
      for (const img of files) {
        const fileName = Date.now() + "-" + img.name;
        await img.mv("uploads/" + fileName);
        images.push("http://localhost:5000/uploads/" + fileName);
      }
    } else {
      const fileName = Date.now() + "-" + files.name;
      await files.mv("uploads/" + fileName);
      images.push("http://localhost:5000/uploads/" + fileName);
    }

    const product = await Product.create({ ...body, images });

    res.status(200).json({
      success: true,
      data: product,
      msg: "Product added successfully!",
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const files = req.files?.images;

    if (!body.images) {
      body.images = [];
    } else if (!Array.isArray(body.images)) {
      body.images = [body.images];
    }

    if (!body.sizes) {
      body.sizes = [];
    } else if (!Array.isArray(body.sizes)) {
      body.sizes = [body.sizes];
    }

    if (!body.colors) {
      body.colors = [];
    } else if (!Array.isArray(body.colors)) {
      body.colors = [body.colors];
    }

    const product = await Product.findById(id);
    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    if (product.images.length) {
      for (const img of product.images) {
        if (!body.images.includes(img)) {
          const deletePath = path.join(
            __dirname,
            "../uploads",
            path.basename(img)
          );
          await fs.unlink(deletePath);
        }
      }
    }

    // Check for new images and add them.
    if (files) {
      if (Array.isArray(files)) {
        for (const img of files) {
          const fileName = Date.now() + "-" + img.name;
          await img.mv("uploads/" + fileName);
          body.images.push("http://localhost:5000/uploads/" + fileName);
        }
      } else {
        const fileName = Date.now() + "-" + files.name;
        await files.mv("uploads/" + fileName);
        body.images.push("http://localhost:5000/uploads/" + fileName);
      }
    }

    await Product.findByIdAndUpdate(id, body);

    res
      .status(200)
      .json({ success: true, msg: "Product updated successfully!" });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    // Get array of file names form array of file paths.
    const imageFileNames = product.images.map((img) => {
      return path.basename(img);
    });

    // Get array of file names in uploads folder.
    const pathToUploadsFolder = path.join(__dirname, "../uploads");
    const filesInUploadsFolder = await fs.readdir(pathToUploadsFolder);

    // Delete files from the uploads folder if they are in the imageFileNames array.
    for (const fileName of imageFileNames) {
      try {
        if (filesInUploadsFolder.includes(fileName)) {
          const pathOfFile = path.join(__dirname, "../uploads", fileName);
          await fs.unlink(pathOfFile);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "File deleted successfully." });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllProducts,
  getTrendingProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
