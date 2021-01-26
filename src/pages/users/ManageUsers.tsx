import React, { useEffect } from 'react'
import { UserRepository } from '../../repository/UserRepository'
import { GetManageUsersUC } from '../../services/users/useCases/GetManageUsersUC'
import { PageComponent } from '../../utils/architecture/PageComponent'
import { useService } from '../../utils/architecture/di/containerContext'
import { useUseCase } from '../../utils/hooks/useUseCase'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@material-ui/core'

export interface ManageUsersProps {}

export const ManageUsers: PageComponent<ManageUsersProps> = () => {
  const userRepository = useService(UserRepository)
  const userIds = userRepository.useUsersIds()

  const { request: getUsers } = useUseCase(GetManageUsersUC)

  console.log('MANAGE USERS PAGE')
  console.log(userIds)

  useEffect(() => {
    getUsers()
  }, [])

  const createData = (name: string, username: string, phone: string) => {
    return { name, username, phone }
  }

  const rows = [
    createData('Jax', 'ironArms666', '+1 770-736-8031'),
    createData('Bruce', 'crazyBat101', '+21 954-1289'),
    createData('Barry', 'xlr8', '+44 477-935-8478'),
  ]

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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
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
