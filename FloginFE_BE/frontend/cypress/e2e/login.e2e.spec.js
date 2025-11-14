describe('Login E2E Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    // a) UI form
    it('Hiển thị đầy đủ UI login form', () => {
        cy.get('[data-testid="username-input"]').should('be.visible');
        cy.get('[data-testid="password-input"]').should('be.visible');
        cy.get('[data-testid="login-button"]').should('be.visible');
    });

    // b) Validation messages
    it("Hiển thị lỗi validate khi nhập thiếu", () => {
        cy.window().then((win) => {
            win.__test_validateUsernameFunc = () => "Ten dang nhap khong duoc de trong";
            win.__test_validatePasswordFunc = () => "";
        });
        cy.get("[data-testid=login-button]").click();
        cy.contains('Ten dang nhap khong duoc de trong').should('be.visible');
    });

    // c) Success flow
    it('Login thành công với credentials hợp lệ', () => {

        cy.intercept('POST', '/api/user/login', {
            statusCode: 200,
            body: { EM: 'Đăng nhập thành công', EC: 0, DT: { token: "abc" } }
        });

        cy.get('[data-testid="username-input"]').type('testuser');
        cy.get('[data-testid="password-input"]').type('Test123');
        cy.get('[data-testid="login-button"]').click();

        cy.contains('Đăng nhập thành công').should('be.visible');
    });

    // d) Error API flow
    it("Hiển thị lỗi khi backend trả lỗi xác thực", () => {
        cy.window().then((win) => {
            win.__test_validateUsernameFunc = () => "";
            win.__test_validatePasswordFunc = () => "";

            win.__test_loginUserFunc = () => Promise.resolve({
                success: false,
                message: "Sai thông tin đăng nhập"
            });
        });

        cy.get('[data-testid=username-input]').type("wrong");
        cy.get('[data-testid=password-input]').type("wrong");

        cy.get('[data-testid=login-button]').click();

        cy.contains('Sai thông tin đăng nhập').should('be.visible');
    });
});
