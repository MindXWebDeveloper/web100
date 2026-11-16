const createPostMiddleWare = async (req, res, next) => {
     try {
    const { title, content, authorId, tags, status } = req.body;
    if (!authorId) {
      return res.status(400).send({
        message: "Author ID is required",
      });
    }
    if (!title) {
      return res.status(400).send({
        message: "Title is required",
      });
    }
    if (title.length < 5 || title.length > 100) {
      return res.status(400).send({
        message: "Title must be between 5 and 100 characters",
      });
    }
    if (!String(content).trim()) {
      return res.status(400).send({
        message: "Content is required",
      });
    }
    if (!Array.isArray(tags)) {
      return res.status(400).send({
        message: "Tags must be an array",
      });
    }
    if (tags.length > 6) {
      return res.status(400).send({
        message: "Tags must be less than 6",
      });
    }
    // loại bỏ thẻ trùng
    req.body.tags = [...new Set(tags)].map((tag) => tag.toLowerCase());
    if (!status) {
      return res.status(400).send({
        message: "Status is required",
      });
    }
    if (status !== "draft" && status !== "published") {
      return res.status(400).send({
        message: "Status must be draft or published",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const TopPostMiddleWare = (req, res, next) => {
  const limit = Number(req.query.limit);
  if(!limit) return next();
  if(!Number.isSafeInteger(limit) || limit < 0) {
    return res.status(400).send({
        message: "limit phải là số nguyên dương"
    });
  }
  next();

}

export {createPostMiddleWare, TopPostMiddleWare}