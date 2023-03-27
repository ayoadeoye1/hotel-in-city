import { Request, Response } from "express";
import Hotel from '../models/hotel';
    
export const Main = async( req: Request, res: Response ): Promise<any> => {
   
    try {
       const filtHotels = await Hotel.find({city: req.params.city});
       if(filtHotels.length < 1){
        console.log('no city')
        return res.status(200).json({not: 'city not found in the list'});
       }
       console.log(filtHotels)
       res.status(200).json({data: filtHotels});
    } catch (error) {
        res.status(400).json(`something went wrong: ${error.message}`);
    }
}

export const Add = async( req: Request, res: Response ): Promise<any> => {
   const { name, city, price_range, address, contact } = req.body;
    try {
       const newHotels = new Hotel({
        name,
        city,
        price_range, 
        address, 
        contact
       });

       await newHotels.save();
       console.log(newHotels)
       res.status(200).json(newHotels);
    } catch (error) {
        res.status(400).json(`something went wrong: ${error.message}`);
    }
}