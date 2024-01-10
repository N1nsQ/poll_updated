import { Box } from '@mui/material'
import React from 'react'

export default function StyledBox({ children }) {
  return (
    <Box sx={{
        '& .MuiTextField-root': {
            m: 1,
            width: '90%'
        }
    }}>{children}</Box>
  )
}
