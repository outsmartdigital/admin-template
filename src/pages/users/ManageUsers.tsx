import React, { useEffect } from 'react'
import { UserRepository } from '../../repository/UserRepository'
import { GetManageUsersUC } from '../../services/users/useCases/GetManageUsersUC'
import { PageComponent } from '../../utils/architecture/PageComponent'
import { useService } from '../../utils/architecture/di/containerContext'
import { useUseCase } from '../../utils/hooks/useUseCase'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { getGlobal } from 'reactn'

export interface ManageUsersProps {}

export const ManageUsers: PageComponent<ManageUsersProps> = () => {
  const userRepository = useService(UserRepository)
  const userIds = userRepository.useUsersIds()

  const { request: getUsers } = useUseCase(GetManageUsersUC)

  const users = userIds.map((id) => userRepository.useUser(id))

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={`${index}-${user.username}`}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ManageUsers
