// src/tests/validation.test.js
import { validateUsername, validatePassword } from "../utils/loginValidation";
import { validateProduct } from '../utils/productValidation';

describe("Login Validation Tests", () => {
    // ====== Username Tests ======
    test("TC1: Username rong - nen tra ve loi", () => {
        expect(validateUsername("")).toBe("Ten dang nhap khong duoc de trong");
    });

    test("TC2: Username qua ngan - nen tra ve loi", () => {
        expect(validateUsername("ab")).toBe("Ten dang nhap phai co it nhat 3 ky tu");
    });

    test("TC3: Username qua dai - nen tra ve loi", () => {
        const longName = "a".repeat(51);
        expect(validateUsername(longName)).toBe("Ten dang nhap khong duoc vuot qua 50 ky tu");
    });

    test("TC4: Username co ky tu dac biet - nen tra ve loi", () => {
        expect(validateUsername("user@123")).toBe(
            "Ten dang nhap chi duoc chua chu, so, dau cham, gach duoi, gach ngang"
        );
    });

    test("TC5: Username hop le - khong co loi", () => {
        expect(validateUsername("user_123")).toBe("");
    });

    // ====== Password Tests ======
    test("TC6: Password rong - nen tra ve loi", () => {
        expect(validatePassword("")).toBe("Mat khau khong duoc de trong");
    });

    test("TC7: Password qua ngan - nen tra ve loi", () => {
        expect(validatePassword("abc1")).toBe("Mat khau phai co it nhat 6 ky tu");
    });

    test("TC8: Password qua dai - nen tra ve loi", () => {
        const longPass = "a".repeat(101);
        expect(validatePassword(longPass)).toBe("Mat khau khong duoc vuot qua 100 ky tu");
    });

    test("TC9: Password khong co so - nen tra ve loi", () => {
        expect(validatePassword("abcdef")).toBe("Mat khau phai chua ca chu va so");
    });

    test("TC10: Password hop le - khong co loi", () => {
        expect(validatePassword("abc123")).toBe("");
    });
});


// ====== Product Tests ======
describe("Product Validation Tests", () => {
    test("TC1: Name rong", () => {
        const p = { name: "", price: 100, quantity: 5, category: "Food" };
        const e = validateProduct(p);
        expect(e.name).toBe("Ten san pham khong duoc de trong");
    });

    test("TC2: Name qua dai", () => {
        const p = { name: "a".repeat(101), price: 100, quantity: 5, category: "Food" };
        const e = validateProduct(p);
        expect(e.name).toBe("Ten san pham khong duoc qua 100 ky tu");
    });

    test("TC3: Price null", () => {
        const p = { name: "Cake", price: null, quantity: 5, category: "Food" };
        const e = validateProduct(p);
        expect(e.price).toBe("Gia san pham phai la mot so");
    });

    test("TC4: Price <= 0", () => {
        const p = { name: "Cake", price: 0, quantity: 5, category: "Food" };
        const e = validateProduct(p);
        expect(e.price).toBe("Gia san pham phai lon hon 0");
    });

    test("TC5: Quantity null", () => {
        const p = { name: "Cake", price: 100, quantity: null, category: "Food" };
        const e = validateProduct(p);
        expect(e.quantity).toBe("So luong phai la mot so");
    });

    test("TC6: Quantity < 0", () => {
        const p = { name: "Cake", price: 100, quantity: -1, category: "Food" };
        const e = validateProduct(p);
        expect(e.quantity).toBe("So luong phai >= 0");
    });

    test("TC7: Description qua dai", () => {
        const p = { name: "Cake", price: 100, quantity: 5, description: "x".repeat(301), category: "Food" };
        const e = validateProduct(p);
        expect(e.description).toBe("Mo ta khong duoc vuot qua 300 ky tu");
    });

    test("TC8: Category rong", () => {
        const p = { name: "Cake", price: 100, quantity: 5, category: "" };
        const e = validateProduct(p);
        expect(e.category).toBe("Category khong duoc de trong");
    });

    test("TC9: Product hop le", () => {
        const p = { name: "Cake", price: 100, quantity: 5, description: "Ngon", category: "Food" };
        const e = validateProduct(p);
        expect(Object.keys(e).length).toBe(0);
    });
});