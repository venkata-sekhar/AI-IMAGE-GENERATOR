import React, { useState, useEffect } from 'react';
import { Loader, Card, Formfield } from '../components';

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map((post) => (
            <div key={post._id} className="p-2 max-w-xs"> {/* Moved key here */}
                <Card {...post} />
            </div>
        ));
    }
    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
    );
};

const Home = ({ theme }) => {
    const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8081/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAllPosts(data.data.reverse());
                }
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResults = allPosts.filter(
                    (item) =>
                        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.prompt.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchedResults(searchResults);
            }, 500)
        );
    };

    // Set text and background colors based on theme
    const textColor = theme === 'dark' ? 'text-white' : 'text-[#222328]';
    const backgroundColor = theme === 'dark' ? 'bg-[#222328]' : 'bg-white';

    return (
        <section className={`max-w-7xl mx-auto ${backgroundColor}`}>
            <div>
                <h1 className={`font-extrabold ${textColor} text-[32px]`}>The Community Showcase</h1>
                <p className={`mt-2 ${textColor} text-[16px] max-w-[500px]`}>
                    Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
                </p>
            </div>
            <div className="mt-16">
                <Formfield
                    //LabelName="Search posts"
                    type="text"
                    name="text"
                    placeholder="Search posts"
                    value={searchText}
                    handleChange={handleSearchChange}
                    labelClass={textColor} // Pass theme-based label color
                />
            </div>
            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className={`font-medium ${textColor} text-xl mb-3`}>
                                Showing results for <span className={`text-[#222328]`}>{searchText}</span>
                            </h2>
                        )}
                        <div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {searchText ? (
                                <RenderCards data={searchedResults} title="No search results found" />
                            ) : (
                                <RenderCards data={allPosts} title="No posts found" />
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Home;
