package com.flogin.service;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@DisplayName("Product Service Unit Tests")
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductDto productDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        product = new Product(1L, "Laptop", 15000000, 10, "Electronics");
        productDto = new ProductDto((long) 1, "Laptop", 15000000, 10, "Electronics");
    }

    // ===== TC1: CREATE =====
    @Test
    @DisplayName("TC1: Tao san pham moi thanh cong")
    void testCreateProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto result = productService.createProduct(productDto);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    // ===== TC2: GET BY ID =====
    @Test
    @DisplayName("TC2: Lay san pham theo ID thanh cong")
    void testGetProductById() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductDto result = productService.getProductById(1L);

        assertNotNull(result);
        assertEquals(15000000, result.getPrice());
        verify(productRepository, times(1)).findById(1L);
    }

    // ===== TC3: UPDATE =====
    @Test
    @DisplayName("TC3: Cap nhat san pham thanh cong")
    void testUpdateProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto updateDto = new ProductDto((long) 1, "Laptop Gaming", 20000000, 8, "Electronics");
        ProductDto result = productService.updateProduct(1L, updateDto);

        assertEquals("Laptop Gaming", result.getName());
        assertEquals(20000000, result.getPrice());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    // ===== TC4: DELETE =====
    @Test
    @DisplayName("TC4: Xoa san pham thanh cong")
    void testDeleteProduct() {
        when(productRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productRepository).deleteById(1L);

        boolean result = productService.deleteProduct(1L);

        assertTrue(result);
        verify(productRepository, times(1)).deleteById(1L);
    }

    // ===== TC5: GET ALL (Pagination) =====
    @Test
    @DisplayName("TC5: Lay danh sach san pham voi pagination")
    void testGetAllProducts() {
        List<Product> products = Arrays.asList(
                new Product(1L, "Laptop", 15000000, 10, "Electronic"));
        when(productRepository.findAll()).thenReturn(products);

        List<ProductDto> result = productService.getAllProducts();
        assertEquals(1, result.size());
        assertEquals("Laptop", result.get(0).getName());
    }

    // ===== TC6: GET BY ID - NOT FOUND =====
    @Test
    @DisplayName("TC6: Lay san pham khong ton tai nem loi RuntimeException")
    void testGetProductById_NotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> productService.getProductById(99L));
    }

    // ===== TC7: DELETE - NOT FOUND =====
    @Test
    @DisplayName("TC7: Xoa san pham khong ton tai tra ve false")
    void testDeleteProduct_NotFound() {
        when(productRepository.existsById(99L)).thenReturn(false);
        boolean result = productService.deleteProduct(99L);
        assertFalse(result);
        verify(productRepository, never()).deleteById(anyLong());
    }
}
