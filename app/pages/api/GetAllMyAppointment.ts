// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {UsersModel, appointmentModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
         const _patientname_ = req.headers.patientname_;

    mongoose.connect(conectionStr).then(()=>{
        appointmentModel.find({patientname: _patientname_}).then(Returnedusers => {
            res.status(200).json({res: Returnedusers});
        })
    })
}