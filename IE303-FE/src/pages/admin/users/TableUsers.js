// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BuildIcon from '@mui/icons-material/Build'
import { IconButton } from '@mui/material'
import { Link } from '@mui/material'

const TableUsers = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Tên người dùng</TableCell>
            <TableCell align='center'>Họ và tên</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Số điện thoại</TableCell>
            <TableCell align='center'>Địa chỉ</TableCell>
            <TableCell align='center'>Vai trò</TableCell>
            <TableCell align='center'>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.username}
              </TableCell>
              <TableCell align='center'>{row.fullName}</TableCell>
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>{row.phoneNumber}</TableCell>
              <TableCell align='center'>{row.address}</TableCell>
              <TableCell align='center'>{row.role}</TableCell>
              <TableCell align='center'>
                <Link href={`/admin/users/update/${row.id}`}>
                  <IconButton>
                    <BuildIcon sx={{ color: 'blue' }} />
                  </IconButton>
                </Link>
                <IconButton>
                  <DeleteForeverIcon sx={{ color: 'red' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableUsers
