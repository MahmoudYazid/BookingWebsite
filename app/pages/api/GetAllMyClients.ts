// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {UsersModel, appointmentModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
             const _doctorName_ = req.headers.doctorname_ ;


            mongoose.connect(conectionStr).then(()=>{
            appointmentModel.find({doctorname: _doctorName_}).then(Returnedusers => {
            res.status(200).json({res: Returnedusers});
        })
    })
}