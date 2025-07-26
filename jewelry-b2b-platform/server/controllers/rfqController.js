exports.listRFQs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      product,
      deliveryLocation,
      buyer, // Optional filters
    } = req.query;

    const filter = {};

    if (product) filter.product = { $regex: product, $options: 'i' };
    if (deliveryLocation) filter.deliveryLocation = { $regex: deliveryLocation, $options: 'i' };
    if (buyer) filter.buyer = buyer;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const result = await rfqService.listRFQs(filter, pageNum, limitNum);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
