// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {UsersModel, doctorstimeModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    mongoose.connect(conectionStr).then(()=>{
        doctorstimeModel.find({}).then(Returnedusers => {
            res.status(200).json({res: Returnedusers});
        })
    })
}