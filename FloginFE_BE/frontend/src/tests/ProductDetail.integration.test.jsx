import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "../components/ProductDetail";
import * as productService from "../services/productService";

jest.mock("../services/productService");

describe("Product Detail Integration Tests", () => {
  test("Hiển thị chi tiết sản phẩm", async () => {
    productService.getProductById.mockResolvedValue({
      id: 1,
      name: "Laptop Dell",
      price: 15000000,
      quantity: 10,
      category: "Electronic",
      description: "Laptop Dell",
      sku: "D123",
    });

    render(<ProductDetail productId={1} />);

    await waitFor(() => screen.getByLabelText("Tên:"));

    expect(screen.getByLabelText("Tên:").value).toBe("Laptop Dell");
    expect(screen.getByLabelText("Giá:").value).toBe("15000000");
    expect(screen.getByLabelText("Số lượng:").value).toBe("10");
    expect(screen.getByLabelText("Danh mục:").value).toBe("Electronic");
    expect(screen.getByLabelText("Mô tả:").value).toBe("Laptop Dell");
    expect(screen.getByLabelText("SKU:").value).toBe("D123");
  });
});
