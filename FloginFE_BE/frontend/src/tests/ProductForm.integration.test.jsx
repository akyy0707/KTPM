import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../components/ProductForm";
import * as productService from "../services/productService";

jest.mock("../services/productService");

describe("Product Form Integration Tests", () => {
  test("Tạo sản phẩm mới thành công", async () => {
    productService.createProduct.mockResolvedValue({
      id: 1,
      name: "Laptop Dell",
      price: 15000000,
      quantity: 10,
      category: "Electronic",
      description: "Laptop Dell",
      sku: "D123",
    });

    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText("Tên sản phẩm"), {
      target: { value: "Laptop Dell" },
    });
    fireEvent.change(screen.getByLabelText("Giá"), {
      target: { value: "15000000" },
    });
    fireEvent.change(screen.getByLabelText("Số lượng"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Danh mục"), {
      target: { value: "Electronic" },
    });
    fireEvent.change(screen.getByLabelText("Mô tả"), {
      target: { value: "Laptop Dell" },
    });
    fireEvent.change(screen.getByLabelText("SKU"), {
      target: { value: "D123" },
    });

    fireEvent.click(screen.getByText("Lưu"));

    await waitFor(() => {
      expect(screen.getByText("Lưu sản phẩm thành công")).toBeInTheDocument();
    });
  });
});
