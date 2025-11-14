package com.flogin.service;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // ===== CREATE =====
    public ProductDto createProduct(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setCategory(dto.getCategory());

        Product saved = productRepository.save(product);
        return new ProductDto(saved.getId(), saved.getName(), saved.getPrice(), saved.getQuantity(),
                saved.getCategory());
    }

    // ===== READ =====
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return new ProductDto(product.getId(), product.getName(), product.getPrice(), product.getQuantity(),
                product.getCategory());
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(p -> new ProductDto(p.getId(), p.getName(), p.getPrice(), p.getQuantity(), p.getCategory()))
                .collect(Collectors.toList());
    }

    // ===== UPDATE =====
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setCategory(dto.getCategory());

        Product updated = productRepository.save(product);
        return new ProductDto(updated.getId(), updated.getName(), updated.getPrice(), updated.getQuantity(),
                updated.getCategory());
    }

    // ===== DELETE =====
    public boolean deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            return false;
        }
        productRepository.deleteById(id);
        return true;
    }
}
