import { ManageUsers } from '../../src/pages/users/ManageUsers'
import { getInitialProps } from '../../src/pages/users/getInitialProps'
import { UserService } from '../../src/services/users/UserService'
import { MockUserApiService } from '../../src/services/users/MockUserApiService'

// Don't add neither logic or layout here. This file simply delegates all that to files in the src dir.

ManageUsers.getInitialProps = getInitialProps

ManageUsers.getInjectables = () => [[UserService, MockUserApiService]] // could use GraphQLPostApiService

export default ManageUsers
