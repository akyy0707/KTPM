import React, { useEffect, useState } from "react";
import { getProductById } from "../services/productService";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="card p-4">
      <h3>Chi tiết sản phẩm</h3>

      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Tên:
        </label>
        <input
          id="name"
          value={product.name}
          readOnly
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="price" className="form-label">
          Giá:
        </label>
        <input
          id="price"
          value={product.price}
          readOnly
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="quantity" className="form-label">
          Số lượng:
        </label>
        <input
          id="quantity"
          value={product.quantity}
          readOnly
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="category" className="form-label">
          Danh mục:
        </label>
        <input
          id="category"
          value={product.category}
          readOnly
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="description" className="form-label">
          Mô tả:
        </label>
        <textarea
          id="description"
          value={product.description}
          readOnly
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="sku" className="form-label">
          SKU:
        </label>
        <input id="sku" value={product.sku} readOnly className="form-control" />
      </div>
    </div>
  );
};

export default ProductDetail;
