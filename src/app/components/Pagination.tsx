import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sx?: SxProps;
}

export default function CustomPagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  sx 
}: CustomPaginationProps) {
  return (
    <Stack 
      spacing={1} 
      sx={{ 
        width: '100%',
        '& .MuiPagination-ul': {
          justifyContent: 'center',
          '& .MuiPaginationItem-root': {
        color: 'white',
        borderColor: 'white',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        color: '#ffd700',
      },
      '& .MuiSvgIcon-root': {
        fill: 'white', 
      },
        }}}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
        size="small"
      />
    </Stack>
  );
}