import { Request, Response } from "express";
import Hotel from '../models/hotel';

import cloudinary from "../utils/cloudinary";
    
export const Main = async( req: Request, res: Response ) => {
   
    try {
       const filtHotels = await Hotel.find({city: req.params.city});
       if(filtHotels.length < 1){
        return res.status(200).json({not: 'city not found in the list'});
       }
       
       res.status(200).json({data: filtHotels});
    } catch (error) {
        res.status(400).json(`something went wrong: ${error.message}`);
    }
}

export const Add = async( req: Request, res: Response ) => {
   const { name, city, price_range, address, contact } = req.body;
   const image = req.file;
   
    try {
        const result = await cloudinary.uploader.upload(image.path);
        
        const newHotels = new Hotel({
            name: name,
            city: city,
            price_range: price_range,
            address: address, 
            contact: contact,
            image_url: result.secure_url
       });

       const hot = await newHotels.save();
       
       res.status(200).json(hot);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
}