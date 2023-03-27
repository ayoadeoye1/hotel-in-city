import * as mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: String,
    city: String,
    price_range: String,
    address: String,
    contact: String,
})

export default mongoose.model('Hotel', hotelSchema);