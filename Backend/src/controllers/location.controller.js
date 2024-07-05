import { Locations } from "../models/location.model.js";
import ApiError from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";

const availableLocations = asyncHandlerFunction(async (req, res) => {
    
  const { pinOfAddress, city } = req.body;

  const already = await Locations.findOne({
    pinOfAddress,
  });

  if (already) {
    throw new ApiError(401, "This Pin is already There");
  }

  const location = await Locations.create({
    city,
    pinOfAddress,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { location }, "new location is created "));
});
// delete location
// edit location
export { availableLocations };
