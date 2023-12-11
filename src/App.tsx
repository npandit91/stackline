import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProductDetails from "./product/ProductDetails";

function App() {
  return (
    // Basic routes just for the puspose of this task
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="product/:id" element={<ProductDetails />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
