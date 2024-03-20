import { envs } from '../../config'
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from '../mongo'
import { seedData } from './data'

const randomBetween = (x: number) => Math.floor(Math.random() * x)

;(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })
  await main()

  await MongoDatabase.disconnect()
})()

async function main() {
  // clear all
  await Promise.all([UserModel.deleteMany(), ProductModel.deleteMany(), CategoryModel.deleteMany()])

  // create users
  const users = await UserModel.insertMany(seedData.users)

  // create categories
  const categories = await CategoryModel.insertMany(
    seedData.categories.map(category => ({
      ...category,
      user: users[randomBetween(users.length - 1)]._id,
    })),
  )

  // create products
  const products = await ProductModel.insertMany(
    seedData.products.map(product => ({
      ...product,
      category: categories[randomBetween(categories.length - 1)]._id,
      user: users[randomBetween(users.length - 1)]._id,
    })),
  )

  // console.log(styleText('Seeded', 'green')) // for node v21+
}
