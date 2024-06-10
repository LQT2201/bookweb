// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8080/api/order')
        const orders = await response.json()
        setOrders(orders)

        const totalPrices = orders.map(order =>
          typeof order.totalPrice === 'object'
            ? parseFloat(order.totalPrice.$numberDecimal)
            : parseFloat(order.totalPrice)
        )

        // Sử dụng reduce để tính tổng
        const totalAmount = totalPrices.reduce((acc, price) => acc + price, 0)

        // Set giá trị tổng vào state total
        setTotal(totalAmount)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrders()
  }, [])

  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Summary! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Total Price of all Orders
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          ${total}
        </Typography>

        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
