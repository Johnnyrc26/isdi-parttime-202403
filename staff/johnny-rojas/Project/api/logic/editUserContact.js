import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const editUserContact = (userId, updates) => {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      
      const updateFields = {}

      if (updates.email) {
        validate.email(updates.email, 'email')
        updateFields.email = updates.email
      }

      if (updates.phone) {
        validate.phone(updates.phone, 'phone')
        updateFields.phone = updates.phone
      }

      return User.findByIdAndUpdate(userId, updateFields, { new: true }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
          if (!user) {
            throw new NotFoundError('user not found')
          }
          return user
        })
    })
}

export default editUserContact
