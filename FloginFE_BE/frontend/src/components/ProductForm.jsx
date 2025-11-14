import React, { useState } from "react";
import { createProduct, updateProduct } from "../services/productService";

const ProductForm = ({ existingProduct, onSuccess }) => {
  const [product, setProduct] = useState(
    existingProduct || {
      name: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
      sku: "",
    }
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingProduct) {
        await updateProduct(existingProduct.id, product);
      } else {
        await createProduct(product);
      }
      setSuccessMessage("Lưu sản phẩm thành công");
      setErrorMessage("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setErrorMessage("Lỗi khi lưu sản phẩm");
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h3>{existingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h3>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Số lượng
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Danh mục
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sku" className="form-label">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            className="form-control"
            value={product.sku}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
