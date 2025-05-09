import { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const UpdateUser = () => {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: ''
  })

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return

      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.ok) {
          const userData = await response.json()
          setFormData({
            username: userData.username || '',
            fullName: userData.fullName || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            address: userData.address || '',
            role: userData.role || 'USER'
          })
        } else {
          Swal.fire('Lỗi', 'Không thể tải thông tin người dùng', 'error')
          router.push('/admin/users')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        Swal.fire('Lỗi', 'Đã xảy ra lỗi khi tải thông tin người dùng', 'error')
        router.push('/admin/users')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, router])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        Swal.fire('Thành công', 'Cập nhật người dùng thành công', 'success')
        router.push('/admin/users')
      } else {
        const error = await response.json()
        Swal.fire('Lỗi', error.message || 'Không thể cập nhật người dùng', 'error')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      Swal.fire('Lỗi', 'Đã xảy ra lỗi khi cập nhật người dùng', 'error')
    }
  }

  if (loading) {
    return <Typography>Đang tải...</Typography>
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Cập nhật thông tin người dùng' />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Tên đăng nhập'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Họ và tên'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Số điện thoại'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Địa chỉ'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Vai trò</InputLabel>
                    <Select name='role' value={formData.role} onChange={handleChange} label='Vai trò' required>
                      <MenuItem value='USER'>Người dùng</MenuItem>
                      <MenuItem value='ADMIN'>Quản trị viên</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                    Cập nhật
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={() => router.push('/admin/users')}>
                    Hủy
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UpdateUser
