var env = process.NODE_ENV || 'development'
console.log('env ******', env)

if (env == 'development') {
  process.env.PORT = 1337;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/boilerplate'
} else {
  process.env.PORT = 8000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/boilerplateTest'
}
