import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Pagination from './Pagination';
import fallbackData from './fallbackData.json'; // Import the local JSON file

const News = ({ filter, searchTerm, currentPage, setCurrentPage }) => {
    const [news, setNews] = useState([]);
    const [featuredNews, setFeaturedNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const pageSize = 7;  // Set the number of posts per page

    const fetchData = async (page = 1) => {
        setLoading(true);
        setError(null);
        const apiKey = `8d8ca57b1064482e95aed4cd77a77610`;
        let url = `https://newsapi.org/v2/top-headlines?country=in&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

        if (filter && filter !== 'All') {
            url = `https://newsapi.org/v2/everything?q=${filter}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
        }

        if (searchTerm) {
            url = `https://newsapi.org/v2/everything?q=${searchTerm}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();

            setNews(data.articles);
            setFeaturedNews(data.articles.slice(0, 3)); // Select first 3 articles for the slider
            setTotalPages(Math.ceil(data.totalResults / pageSize));
        } catch (err) {
            console.error("API fetch failed, fetching from local JSON", err);

            const start = (page - 1) * pageSize;
            const end = start + pageSize;

            setNews(fallbackData.articles.slice(start, end));
            setFeaturedNews(fallbackData.articles.slice(0, 3)); // Select first 3 articles for the slider
            setTotalPages(Math.ceil(fallbackData.articles.length / pageSize));
            setError("Failed to fetch data from API, showing fallback data.");
        } finally {
            setLoading(false);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    useEffect(() => {
        fetchData(currentPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [filter, searchTerm, currentPage]);

    return (
        <>
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="md:col-span-2 lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                        <Slider {...settings}>
                            {featuredNews.map((ele, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-4">
                                        <img
                                            src={ele.urlToImage || "https://as2.ftcdn.net/v2/jpg/03/03/32/29/1000_F_303322995_UcqCOYQW1ukNfkpMW0nGIvxiiHhFGe0b.jpg"}
                                            className="w-full h-64 object-cover"
                                            alt="News"
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-medium text-yellow-500">{ele.source.name}</span>
                                            <span className="text-sm text-gray-500">{new Date(ele.publishedAt).toISOString().split('T')[0]}</span>
                                        </div>
                                        <h2 className="mt-2 text-lg font-semibold text-gray-900">{ele.title}</h2>
                                        <p className="text-gray-800 text-base my-5">{ele.description}</p>
                                        <a href={ele.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {news.map((ele, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                <div className="overflow-hidden">
                                    <img
                                        src={ele.urlToImage == null ? "https://as2.ftcdn.net/v2/jpg/03/03/32/29/1000_F_303322995_UcqCOYQW1ukNfkpMW0nGIvxiiHhFGe0b.jpg" : ele.urlToImage}
                                        className="card-img-top transform transition-transform duration-700 hover:scale-125 my-3"
                                        alt="..."
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-yellow-500">{ele.source.name}</span>
                                    <span className="text-sm text-gray-500">{new Date(ele.publishedAt).toISOString().split('T')[0]}</span>
                                </div>
                                <h2 className="mt-2 my-5 text-lg font-semibold text-gray-900 underline-hover">{ele.title}</h2>
                                <p className="text-gray-800 text-base my-5">
                                    {ele.description}
                                </p>
                                <a href={ele.url} target="_blank" rel="noopener noreferrer" className="text-black font-bold">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default News;
