/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
export const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Show all bootcamps' });
};

/**
 * @desc    Get a bootcamp by id
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
export const getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Display bootcamp ${req.params.id}` });
};

/**
 * @desc    Create a new bootcamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
export const createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Create a new bootcamp' });
};

/**
 * @desc    Create a bootcamp by id
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
export const updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

/**
 * @desc    Delete a bootcamp by id
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
export const deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
