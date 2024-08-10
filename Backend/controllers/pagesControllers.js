const Page = require("../models/Page");
const fs = require("fs/promises");
const path = require("path");
const { uploadAndGetImageURLs } = require("../utils/fileUploadUtils");
const {
  sendErrorResponse,
  sendDataResponse,
  sendSuccessResponse,
} = require("../utils/serverUtils");

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({});
    sendDataResponse(res, pages);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSinglePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug: slug });
    sendDataResponse(res, page);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addPage = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;

    body.categories = JSON.parse(body.categories);

    let carouselImages = [];
    let categoryImages = [];

    for (const key in files) {
      if (key === "carouselImages") {
        carouselImages = await uploadAndGetImageURLs(files[key]);
      } else {
        const temp = await uploadAndGetImageURLs(files[key]);
        categoryImages.push({ category: key, image: temp[0] });
      }
    }

    const categories = body.categories.map((value) => {
      const img = categoryImages.find((v) => {
        return v.category === value.name;
      });
      return { ...value, image: img?.image };
    });

    await Page.create({
      name: body.name,
      carouselImages,
      categories,
      slug: body.slug,
    });

    sendSuccessResponse(res, "Page added successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const body = req.body;
    body.categories = JSON.parse(body.categories);
    if (!body.carouselImages) {
      body.carouselImages = [];
    }
    if (body.carouselImages && !Array.isArray(body.carouselImages)) {
      body.carouselImages = [body.carouselImages];
    }

    const pageFromDB = await Page.findById(id);

    if (!pageFromDB) {
      return sendErrorResponse(res, "No such page found.");
    }

  

    let updatedCarouselImages = [];
    let updatedCategoryImages = [];

    if (files) {
      for (const key in files) {
        if (key === "carouselImages") {
          updatedCarouselImages = await uploadAndGetImageURLs(files[key]);
        } else {
          const temp = await uploadAndGetImageURLs(files[key]);
          updatedCategoryImages.push({ category: key, image: temp[0] });
        }
      }
    }

    const pathToUploadsFolder = path.join(__dirname, "../uploads");
    const filesInUploadsFolder = await fs.readdir(pathToUploadsFolder);

    // Check if any carousel image is removed and remove them from uploads folder.
    for (const image of pageFromDB.carouselImages) {
      if (!body.carouselImages.includes(image)) {
        if (filesInUploadsFolder.includes(path.parse(image).base)) {
          await fs.unlink(
            path.join(__dirname, "../uploads", path.parse(image).base)
          );
        }
      }
    }

    // Check if any category image is removed and remove them from uploads folder.
    const pagesCategoryImages = pageFromDB.categories.map((value) => {
      return { category: value.name, image: value.image };
    });

    let bodyCategoryImages = [];
    for (const key in body) {
      if (
        key !== "name" &&
        key !== "slug" &&
        key !== "categories" &&
        key !== "carouselImages"
      ) {
        bodyCategoryImages.push({ category: key, image: body[key] });
      }
    }

    for (const value of pagesCategoryImages) {
      const image = bodyCategoryImages.find((v) => {
        return v.category === value.category;
      });

      if (!image) {
        if (filesInUploadsFolder.includes(path.parse(value.image).base)) {
          await fs.unlink(
            path.join(__dirname, "../uploads", path.parse(value.image).base)
          );
        }
      }
    }

    bodyCategoryImages = [...bodyCategoryImages, ...updatedCategoryImages];

    const updatedCategories = body.categories.map((value) => {
      const objImage = bodyCategoryImages.find((v) => {
        return v.category === value.name;
      });
      return { ...value, image: objImage.image };
    });

    await Page.findByIdAndUpdate(id, {
      name: body.name,
      slug: body.slug,
      categories: updatedCategories,
      carouselImages: [...body.carouselImages, ...updatedCarouselImages],
    });

    sendSuccessResponse(res, "Page updated successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);

    if (!page) {
      return sendErrorResponse(res, "No such page found.");
    }

    const carouselImages = page.carouselImages;
    const categoriesImages = page.categories.map((value) => {
      return value.image;
    });

    const carouselImagesFileNames = carouselImages.map((value) => {
      return path.parse(value).base;
    });
    const categoriesImagesFileNames = categoriesImages.map((value) => {
      return path.parse(value).base;
    });

    const filesToBeDeleted = [
      ...carouselImagesFileNames,
      ...categoriesImagesFileNames,
    ];

    const uploadsFilesList = await fs.readdir(
      path.join(__dirname, "../uploads")
    );

    for (const file of filesToBeDeleted) {
      if (uploadsFilesList.includes(file)) {
        await fs.unlink(path.join(__dirname, "../uploads", file));
      }
    }

    await Page.findByIdAndDelete(id);

    sendSuccessResponse(res, "Page deleted successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllPages,
  getSinglePage,
  addPage,
  updatePage,
  deletePage,
};
