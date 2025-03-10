import { validationResult } from "express-validator";

export const validateResult = (req:any,res:any)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ status: 400, errors: errors.array()[0].msg })
          .send();
        return false;
      }
      else
      {
        return true
      }
}