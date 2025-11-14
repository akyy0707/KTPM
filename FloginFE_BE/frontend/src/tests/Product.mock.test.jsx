import * as productService from "../services/productService";

jest.mock("../services/productService");

describe(" Product Mock Tests (Full CRUD + Error Cases)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // CREATE -------------------------------------------------------------
  test("Mock: Create product thành công", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 15000000 };
    productService.createProduct.mockResolvedValue(mockProduct);

    const result = await productService.createProduct({
      name: "Laptop",
      price: 15000000,
    });

    expect(result).toEqual(mockProduct);
    expect(productService.createProduct).toHaveBeenCalledTimes(1);
  });

  test("Mock: Create product thất bại", async () => {
    const errorMsg = "Thiếu thông tin sản phẩm";
    productService.createProduct.mockRejectedValue(new Error(errorMsg));

    await expect(productService.createProduct({ name: "" })).rejects.toThrow(
      errorMsg
    );

    expect(productService.createProduct).toHaveBeenCalledTimes(1);
  });

  // READ ---------------------------------------------------------------
  test("Mock: Get products with pagination thành công", async () => {
    const mockResponse = {
      data: [
        { id: 1, name: "Laptop", price: 15000000 },
        { id: 2, name: "Phone", price: 8000000 },
      ],
      page: 1,
      total: 2,
    };

    productService.getAllProducts.mockResolvedValue(mockResponse);

    const result = await productService.getAllProducts(1, 5);
    expect(result.data.length).toBe(2);
    expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
  });

  test("Mock: Get products thất bại (network error)", async () => {
    productService.getAllProducts.mockRejectedValue(
      new Error("Network error: cannot fetch products")
    );

    await expect(productService.getAllProducts(1, 5)).rejects.toThrow(
      "Network error: cannot fetch products"
    );

    expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
  });

  // UPDATE -------------------------------------------------------------
  test("Mock: Update product - success", async () => {
    const updatedProduct = { id: 1, name: "Laptop Pro", price: 18000000 };
    productService.updateProduct.mockResolvedValue(updatedProduct);

    const result = await productService.updateProduct(1, updatedProduct);
    expect(result).toEqual(updatedProduct);
    expect(productService.updateProduct).toHaveBeenCalledTimes(1);
  });

  test("Mock: Update product - failure", async () => {
    const errorMessage = "Không tìm thấy sản phẩm";
    productService.updateProduct.mockRejectedValue(new Error(errorMessage));

    await expect(
      productService.updateProduct(99, { name: "None" })
    ).rejects.toThrow(errorMessage);

    expect(productService.updateProduct).toHaveBeenCalledTimes(1);
  });

  // DELETE -------------------------------------------------------------
  test("Mock: Delete product thành công", async () => {
    productService.deleteProduct.mockResolvedValue({ success: true });

    const result = await productService.deleteProduct(1);
    expect(result.success).toBe(true);
    expect(productService.deleteProduct).toHaveBeenCalledTimes(1);
  });

  test("Mock: Delete product thất bại", async () => {
    productService.deleteProduct.mockRejectedValue(
      new Error("Xóa thất bại - ID không tồn tại")
    );

    await expect(productService.deleteProduct(999)).rejects.toThrow(
      "Xóa thất bại - ID không tồn tại"
    );

    expect(productService.deleteProduct).toHaveBeenCalledTimes(1);
  });
});
