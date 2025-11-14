package com.flogin.controller;

import com.flogin.dto.ProductDto;
import com.flogin.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@DisplayName("Product API Integration Tests")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/products - Lấy danh sách sản phẩm")
    void testGetAllProducts() throws Exception {
        List<ProductDto> products = Arrays.asList(
                new ProductDto(1L, "Laptop", 15000000, 10, "Electronic"),
                new ProductDto(2L, "Mouse", 200000, 50, "Electronic"));

        when(productService.getAllProducts()).thenReturn(products);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Laptop"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Mouse"));
    }

    @Test
    @DisplayName("GET /api/products/{id} - Lấy 1 sản phẩm theo ID")
    void testGetProductById() throws Exception {
        ProductDto product = new ProductDto(1L, "Laptop", 15000000, 10, "Electronic");
        when(productService.getProductById(1L)).thenReturn(product);

        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Laptop"))
                .andExpect(jsonPath("$.price").value(15000000))
                .andExpect(jsonPath("$.quantity").value(10))
                .andExpect(jsonPath("$.category").value("Electronic"));
    }

    @Test
    @DisplayName("POST /api/products - Tạo sản phẩm mới")
    void testCreateProduct() throws Exception {
        ProductDto input = new ProductDto(null, "Laptop", 15000000, 10, "Electronic");
        ProductDto created = new ProductDto(1L, "Laptop", 15000000, 10, "Electronic");

        when(productService.createProduct(any(ProductDto.class))).thenReturn(created);

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Laptop"))
                .andExpect(jsonPath("$.price").value(15000000))
                .andExpect(jsonPath("$.quantity").value(10))
                .andExpect(jsonPath("$.category").value("Electronic"));
    }

    @Test
    @DisplayName("PUT /api/products/{id} - Cập nhật sản phẩm")
    void testUpdateProduct() throws Exception {
        ProductDto input = new ProductDto(null, "Laptop Pro", 20000000, 5, "Electronic");
        ProductDto updated = new ProductDto(1L, "Laptop Pro", 20000000, 5, "Electronic");

        when(productService.updateProduct(any(Long.class), any(ProductDto.class))).thenReturn(updated);

        mockMvc.perform(put("/api/products/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Laptop Pro"))
                .andExpect(jsonPath("$.price").value(20000000))
                .andExpect(jsonPath("$.quantity").value(5))
                .andExpect(jsonPath("$.category").value("Electronic"));
    }

    @Test
    @DisplayName("DELETE /api/products/{id} - Xóa sản phẩm")
    void testDeleteProduct() throws Exception {
        when(productService.deleteProduct(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());
    }

}
