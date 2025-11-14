import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card p-4">
      <h3>Danh sách sản phẩm</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Sửa</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
