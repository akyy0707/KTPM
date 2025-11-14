package com.flogin.service;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceMockTest {

    @Mock
    private ProductRepository productRepository; // (a) Mock repository

    @InjectMocks
    private ProductService productService; // (b) Inject mock vào service

    // ===== CREATE PRODUCT =====
    @Test
    void testCreateProduct_Success() {
        ProductDto dto = new ProductDto(null, "Laptop", 15000000, 10, "Electronics");
        Product savedEntity = new Product(1L, "Laptop", 15000000, 10, "Electronics");

        when(productRepository.save(any(Product.class))).thenReturn(savedEntity);

        ProductDto result = productService.createProduct(dto);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        assertEquals(15000000, result.getPrice());
        verify(productRepository).save(any(Product.class)); // (c) verify
    }

    // ===== READ: GET BY ID =====
    @Test
    void testGetProductById_Success() {
        Product entity = new Product(1L, "Phone", 8000000, 5, "Mobile");
        when(productRepository.findById(1L)).thenReturn(Optional.of(entity));

        ProductDto result = productService.getProductById(1L);

        assertNotNull(result);
        assertEquals("Phone", result.getName());
        verify(productRepository).findById(1L);
    }

    @Test
    void testGetProductById_NotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> productService.getProductById(99L));

        assertEquals("Product not found", ex.getMessage());
        verify(productRepository).findById(99L);
    }

    // ===== READ: GET ALL =====
    @Test
    void testGetAllProducts() {
        List<Product> mockList = Arrays.asList(
                new Product(1L, "TV", 12000000, 3, "Electronics"),
                new Product(2L, "Headphone", 2000000, 15, "Audio"));
        when(productRepository.findAll()).thenReturn(mockList);

        List<ProductDto> results = productService.getAllProducts();

        assertEquals(2, results.size());
        verify(productRepository).findAll();
    }

    // ===== UPDATE =====
    @Test
    void testUpdateProduct_Success() {
        Product existing = new Product(1L, "Tablet", 7000000, 5, "Electronics");
        ProductDto updateDto = new ProductDto(1L, "Tablet Pro", 9000000, 7, "Electronics");

        when(productRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(productRepository.save(any(Product.class))).thenReturn(
                new Product(1L, "Tablet Pro", 9000000, 7, "Electronics"));

        ProductDto result = productService.updateProduct(1L, updateDto);

        assertEquals("Tablet Pro", result.getName());
        assertEquals(9000000, result.getPrice());
        verify(productRepository).findById(1L);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testUpdateProduct_NotFound() {
        ProductDto dto = new ProductDto(1L, "Tablet", 9000000, 5, "Electronics");
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> productService.updateProduct(1L, dto));

        assertEquals("Product not found", ex.getMessage());
        verify(productRepository).findById(1L);
        verify(productRepository, never()).save(any(Product.class));
    }

    // ===== DELETE =====
    @Test
    void testDeleteProduct_Success() {
        when(productRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productRepository).deleteById(1L);

        boolean result = productService.deleteProduct(1L);

        assertTrue(result);
        verify(productRepository).existsById(1L);
        verify(productRepository).deleteById(1L);
    }

    @Test
    void testDeleteProduct_NotFound() {
        when(productRepository.existsById(99L)).thenReturn(false);

        boolean result = productService.deleteProduct(99L);

        assertFalse(result);
        verify(productRepository).existsById(99L);
        verify(productRepository, never()).deleteById(anyLong());
    }
}
