const { UserList, MovieList } = require("../data")
const _ = require("loadsh")


/**
 * 4 arguments of gql resolvers
 * parent, args, context, info (not very useful)
 */
const resolvers = {
  Query: {
    users: () => {
      if (UserList) return { data: UserList }
      return { error: "There was an error on UserList" }
    },

    user: (args) => {
      const filter = args.id
      const user = _.find(UserList, { id: Number(filter) })
      return user
    },

    movies: () => {
      return MovieList
    },

    movie: (args) => {
      const filter = args.name
      const movie = _.find(MovieList, { name: filter })
      return movie
    },
  },

  // User's related fileds
  User: {
    favouriteMovies: (parent, args) => {
      console.log(parent)
      return _.filter(MovieList, (movie) => movie.yearOfPublication < args.age * 100)
    },

    friends: (args) => {
      return _.filter(UserList, (user) => user.age === args.age && user.id !== args.id)
    }
  },

  Mutation: {
    createUser: (args) => {
      const user = args.createUserinput
      user.id = UserList[UserList.length - 1].id + 1
      UserList.push(user)
      return user
    },

    updateUsername: (args) => {
      const { id, newUsername } = args.updateUsernameInput
      let userToUpdate

      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername
          userToUpdate = user
        }
      })

      return userToUpdate
    },

    deleteUser: (args) => {
      const user = _.find(UserList, { id: Number(args.idToDelete) })
      _.remove(UserList, (user) => user.id === Number(args.idToDelete))
      return user
    }
  },

  UsersResult: {
    __resolveType: (obj) => {
      if (obj.data) return "UsersSuccessfulResult"

      if (obj.error) return "UsersErrorResult"

      return null
    }
  }
}

module.exports = {
  resolvers
}