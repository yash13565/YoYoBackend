const hotel = require("../models/hotel.js");
const Room =  require("../models/room.js");

exports.postHotel = async (req, res, next) => {
  const newHotel = new hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted.");
  } catch (error) {
    next(error);
  }
};

exports.getByIdHotel = async (req, res, next) => {
  try {
    const foundHotel = await hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (error) {
    next(error);
  }
};

exports.getHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await hotel
      .find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 990 } })
      .limit(req.query);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotel.countDocuments({ type: "apartment" });
    const villaCount = await hotel.countDocuments({ type: "villa" });
    const resortsCount = await hotel.countDocuments({ type: "resorts" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "villas", count: villaCount },
      { type: "resorts", count: resortsCount },
    ]);
  } catch (error) {
    next(error);
  }
};

exports.getHotelRooms = async (req, res, next) => {
  try {
    const Hotel =await  hotel.findById(req.params.id);
    const list = await Promise.all(
      Hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};