export function validateProduct(product) {
    const errors = {};

    // --- Validate name ---
    if (!product.name || product.name.trim() === '') {
        errors.name = 'Ten san pham khong duoc de trong';
    } else if (product.name.length > 100) {
        errors.name = 'Ten san pham khong duoc qua 100 ky tu';
    }

    // --- Validate price ---
    if (product.price == null || isNaN(product.price)) {
        errors.price = 'Gia san pham phai la mot so';
    } else if (product.price <= 0) {
        errors.price = 'Gia san pham phai lon hon 0';
    }

    // --- Validate quantity ---
    if (product.quantity == null || isNaN(product.quantity)) {
        errors.quantity = 'So luong phai la mot so';
    } else if (product.quantity < 0) {
        errors.quantity = 'So luong phai >= 0';
    }

    // --- Validate description ---
    if (product.description && product.description.length > 300) {
        errors.description = 'Mo ta khong duoc vuot qua 300 ky tu';
    }

    // --- Validate category ---
    if (!product.category || product.category.trim() === '') {
        errors.category = 'Category khong duoc de trong';
    }

    return errors;
}
