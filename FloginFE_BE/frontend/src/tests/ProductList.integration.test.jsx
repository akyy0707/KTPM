import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../components/ProductList";
import * as productService from "../services/productService";

jest.mock("../services/productService");

test("Hiển thị danh sách sản phẩm từ API", async () => {
  productService.getAllProducts.mockResolvedValue([
    {
      id: 1,
      name: "Laptop Dell",
      price: 15000000,
      quantity: 10,
      category: "Electronic",
    },
    {
      id: 2,
      name: "Mouse Logitech",
      price: 500000,
      quantity: 20,
      category: "Electronic",
    },
  ]);

  render(<ProductList />);

  await waitFor(() => screen.getByText("Laptop Dell"));
  expect(screen.getByText("Laptop Dell")).toBeInTheDocument();
  expect(screen.getByText("Mouse Logitech")).toBeInTheDocument();
});
