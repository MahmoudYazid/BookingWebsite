// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {UsersModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const name_=req.headers.name;
    const password_=req.headers.password;
    const type_=req.headers.type;

      mongoose.connect(conectionStr).
     then(()=>{

        UsersModel.find({
            name:name_,
            
        }).then(usersData =>{
            if(usersData.length > 0){
                 res.status(200).json({res:'exist'});
            }else{

        const newAccount = new UsersModel({
            name: name_,
            password: password_,
            type:type_,
        })
        newAccount.save().then(()=>{
            res.status(200).json({res:'done'});
        });

            }


        })




     })
}
