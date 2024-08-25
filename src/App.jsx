import { useEffect, useState } from "react";

function App() {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Assuming the price range is between 0 and 1000

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setPost(data));

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const filteredArr = post.filter(
    (data) =>
      data.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
      (selectedCategory ? data.category === selectedCategory : true) &&
      data.price >= priceRange[0] &&
      data.price <= priceRange[1]
  );

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.name === "min") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  return (
    <div>
      <h1 className="text-center my-5 text-3xl font-semibold underline">
        Products
      </h1>
      <div className="mx-10 w-3/4 mx-auto ">
        <input
          placeholder="Search"
          type="search"
          className="w-full border-2 p-3 font-bold"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex mx-10 w-3/4 mx-auto mt-4 justify-between">
        <select
          className="w-1/2 border-2 p-3 font-bold mr-2"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex w-1/2 items-center">
          <label className="mr-2 font-bold">Price:</label>
          <input
            name="min"
            type="number"
            className="w-1/3 border-2 p-3 font-bold mr-2"
            placeholder="Min"
            value={priceRange[0]}
            onChange={handlePriceChange}
          />
          <input
            name="max"
            type="number"
            className="w-1/3 border-2 p-3 font-bold"
            placeholder="Max"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap m-4">
        {filteredArr.map((data) => (
          <div key={data.id} className="lg:w-1/4 md:w-1/2 p-2 w-full">
            <div className="border rounded-md overflow-hidden">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={data.image}
                />
              </a>
              <div className="mt-4 p-2">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {data.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {data.title}
                </h2>
                <p className="mt-1">${data.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;





// useEffect: it is use to contact with third party and it is normally use with useState or we can also call it for changing state.
// useMemo: it is used to fetch cathe value.
// useCallback: it is used to fetch function value.