const uploadAndGetImageURLs = async (files) => {
    const imageURLs = [];
  
    if (Array.isArray(files)) {
      for (const img of files) {
        const fileName = Date.now() + "-" + img.name;
        await img.mv("uploads/" + fileName);
        imageURLs.push("http://localhost:5000/uploads/" + fileName);
      }
    } else {
      const fileName = Date.now() + "-" + files.name;
      await files.mv("uploads/" + fileName);
      imageURLs.push("http://localhost:5000/uploads/" + fileName);
    }
  
    return imageURLs;
  };
  
  module.exports = { uploadAndGetImageURLs };