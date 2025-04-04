'use client';
import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import CountryCard from './components/CountryCard';
import ComboBox from './components/filters/ComboBox';
import SearchInput from './components/SearchInput';
import CustomPagination from './components/Pagination';
import { Country } from './components/types/country';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [isOrangeTheme, setIsOrangeTheme] = useState(false);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setAllCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSearchTerm("");  
    setCurrentPage(1); 
  };

  const filteredCountries = allCountries.filter(country => {
    const regionMatch = selectedRegion 
      ? country.region.toLowerCase() === selectedRegion.toLowerCase()
      : true;
    
    const searchMatch = searchTerm
      ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return regionMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const toggleTheme = () => {
    setIsOrangeTheme(!isOrangeTheme);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: isOrangeTheme 
        ? 'radial-gradient(circle, rgb(255, 127, 34), rgb(255, 174, 34))'
        : 'radial-gradient(circle, rgb(4, 34, 70), rgb(0, 5, 22))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      transition: 'background 0.5s ease' 
    }}>
      <button 
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: isOrangeTheme ? '#222' : '#fff',
          color: isOrangeTheme ? '#fff' : '#222',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        {isOrangeTheme ? '🌙 Dark' : '☀️ Light '}
      </button>
      <Paper 
        elevation={6}
        sx={{
          width: '80%',
          minHeight: '80vh',
          backgroundColor: 'rgba(74, 119, 186, 0)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0px 8px 40px rgba(74, 119, 186, 0)'
        }}
      >
        <main style={{ flex: 1, 
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
  }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: 'rgba(227, 227, 227, 0.94)',
              textAlign: 'center'
            }}>
              Países del Mundo desarrollado por Daniel Espinosa 
            </h1>
            
            <div style={{ 
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              margin: '0 auto',
              maxWidth: '800px'
            }}>
              <ComboBox onRegionChange={handleRegionChange} />
              <SearchInput 
                onSearchChange={(term) => {
                  setSearchTerm(term);
                  setCurrentPage(1);
                }}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          <CountryCard 
            countries={paginatedCountries}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        <div style={{ flex: 1 }}></div>
          {totalPages > 1 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              sx={{ 
                color: 'rgba(207, 77, 2, 0.62)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}
            />
          )}
        </main>
      </Paper>
    </div>
  );
}