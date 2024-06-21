// Pagination.js
import React from 'react';
import './page.css';
import next from '../assets/right-arrow.png'
import prev from '../assets/left-arrow.png'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const maxPagesToShow = 7;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className=' flex justify-center'>
            <div className="pagination-container">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button arrow-button"
                >
                    <span className="arrow"><img src={prev} height={'15px'} width={'20px'} /></span>
                </button>
                <div className="pagination-numbers">
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button arrow-button"
                >
                    <span className="arrow"><img src={next} height={'15px'} width={'20px'} /></span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;