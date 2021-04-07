import { useUser } from "../../../hooks/api/use-user"

const paginate = async (options) => {
  const { getAllUsers } = await useUser()

  const { page, limit, orderBy, filterBy } = options

  let users, maxRows
  try {
    users = await getAllUsers()
    maxRows = await users.lengh
  } catch (err) {
    throw new Error(err)
  }

  return { users, maxRows }
}

export default async (req, res) => {
  const { page, limit, filterBy, orderBy } = req.query

  const getUsers = async () => {
    const params = {
      page: page ? page : 0,
      limit: limit ? limit : 10,
      filterBy: filterBy ? filterBy : "level",
      orderBy: orderBy ? orderBy : "DESC",
    }

    try {
      const result = await paginate(params)
      return result
    } catch (e) {
      throw e
    }
  }

  try {
    const result = await getUsers()
    console.log(result)
    const { users: data, maxRows } = result

    res.statusCode = 200
    res.json({
      data,
      maxRows,
      message: "Users fetched successfully!",
    })

    return res
  } catch (e) {
    res.statusCode = 500
    res.json({
      message: "An error occurred while trying to fetch users. " + e,
    })

    return res
  }
}
