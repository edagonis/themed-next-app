import { getAccountModel } from "../../../lib/models/account"
import { encrypt } from "../../../lib/helpers/functional-helper"

export default async (req, res) => {
  const AccountModel = await getAccountModel()
  const parsedBody = JSON.parse(req.body)
  const { account } = parsedBody

  account.password = encrypt(account.password)

  try {
    const saved = await AccountModel.create({ ...account })

    res.statusCode = 200
    res.json({
      status: 200,
      data: saved,
      message: "Conta criada com sucesso!",
    })

    return res
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, errors: e.errors })
  }
}
