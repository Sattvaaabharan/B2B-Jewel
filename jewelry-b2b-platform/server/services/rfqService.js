const RFQ = require('../models/RFQ');

exports.listRFQs = async (filter = {}, page = 1, limit = 10) => {
  const query = RFQ.find(filter).sort({ createdAt: -1 });

  // Pagination
  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit);

  const rfqs = await query.exec();
  const totalCount = await RFQ.countDocuments(filter);

  return {
    rfqs,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    totalCount,
  };
};
