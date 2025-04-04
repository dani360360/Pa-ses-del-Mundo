import { useRef, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';

import { Country } from './types/country';

interface CountryCardProps {
  countries: Country[];
  onNextPage: () => void;
  onPrevPage: () => void;
  currentPage: number;       
  totalPages: number;         
}

export default function CountryCard({ 
  countries, 
  onNextPage,
  onPrevPage,
  currentPage,
  totalPages
}: CountryCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardSize = 300;

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const scrollAmount = cardSize * 2; 
    const newPosition = direction === 'left' 
      ? containerRef.current.scrollLeft - scrollAmount
      : containerRef.current.scrollLeft + scrollAmount;

    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    if (direction === 'right' && isEndOfScroll()) {
      onNextPage();
    }
  };

  const isEndOfScroll = () => {
    if (!containerRef.current) return false;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    return scrollLeft + clientWidth >= scrollWidth - 50;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [currentPage]);

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      }}>
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          marginBottom: '24px',
          display: 'flex',
          overflowX: 'auto',
          gap: 3,
          px: 2,
          py: 3,
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
          height: cardSize + 120
        }}
      >
        {countries.map((country) => (
          <Card
            key={country.name.common}
            sx={{
              width: cardSize,
              height: cardSize,
              scrollSnapAlign: 'center',
              backgroundColor: 'rgb(5, 23, 43)',
              boxShadow: 8,
              borderRadius: '12px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'rgb(255, 127, 34)',
                boxShadow: 12
              },
              '&:active': {
                transform: 'scale(0.95)',
                backgroundColor: 'rgb(25, 86, 100)',
                boxShadow: 6
              }
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: '80%',
                objectFit: 'cover',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px'
              }}
              image={country.flags.png}
              alt={country.name.common}
            />
            <CardContent sx={{ 
              height: '20%', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              '&:last-child': { pb: 1 } 
            }}>
              <Typography variant="subtitle1" noWrap sx={{ color: 'white' }}>
                {country.name.common}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'white' }}>
                {country.region}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <IconButton
        onClick={() => currentPage > 1 ? onPrevPage() : handleScroll('left')}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={() => currentPage < totalPages ? onNextPage() : handleScroll('right')}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}