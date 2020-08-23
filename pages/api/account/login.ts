import jwt from "jsonwebtoken"
import { getAccountModel } from "../../../lib/models/account"
import { encrypt } from "../../../lib/helpers/functional-helper"

export default async (req, res) => {
  const AccountModel = await getAccountModel()

  try {
    const parsedBody = JSON.parse(req.body)
    const encryptedPassword = encrypt(parsedBody.password)

    const accountFound = await AccountModel.findOne({
      where: { name: parsedBody.name, password: encryptedPassword },
    })

    if (accountFound) {
      const claims = accountFound.toJSON()

      const authToken = jwt.sign(claims, process.env.AUTHENTICATION_SECRET, {
        expiresIn: "1h",
      })

      res.json({
        data: accountFound,
        authToken,
        message: "You have logged in successfully!",
      })
    } else {
      res.statusCode = 401
      res.json({
        data: accountFound,
        message: "No account were found with this combination.",
      })
    }

    return res
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, errors: e.errors })
  }
}
