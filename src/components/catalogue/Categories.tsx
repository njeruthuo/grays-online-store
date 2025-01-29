const Categories = () => {
  return (
    <>
      <div className="card-color">
        <div>
          <div className="category-header">SHOP BY</div>
          <div className="category-container">
            <div>
              <h2>Category</h2>
              <div>{/* Category list here */}</div>
            </div>

            <div>
              <h2>Price</h2>
              <div>{/* Category list here */}</div>
            </div>

            <div>
              <h2>Manufacturer</h2>
              <div>{/* Category list here */}</div>
            </div>

            <div>
              <h2>Color</h2>
              <div>{/* Category list here */}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-color mt-6">
        <div>
          <div className="category-header">BEST SELLERS</div>
          <div className="category-container">
            <p>A list of most sold products.</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;
