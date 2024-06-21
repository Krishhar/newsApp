import { useState } from 'react';
import Nav from './components/Nav';
import News from './components/News';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <>
      <Nav filter={filter} setFilter={setFilter} handleSearch={handleSearch} setSearchTerm={setSearchTerm} />
      <News filter={filter} searchTerm={searchTerm} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default App;
