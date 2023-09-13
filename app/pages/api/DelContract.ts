import type { NextApiRequest, NextApiResponse } from 'next'
import {UsersModel, appointmentModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
         const _contractid_ = req.headers.contractid_;

    mongoose.connect(conectionStr).then(()=>{
        appointmentModel.findOneAndDelete({_id: _contractid_}).then(Returnedusers => {
            res.status(200).json({res: 'done'});
        })
    })
}