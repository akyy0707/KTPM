# 📌 README – Assignment 2: Kiểm Thử Phần Mềm  
**Dự án: FloginFE_BE – Hệ thống Login & Product CRUD**  
**Nhóm 5 – Niên khóa 2025–2026**

---

## 📋 Mục Lục
- [🚀 Cài đặt hệ thống](#-cài-đặt-hệ-thống)
- [💻 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [📘 Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [📝 Giới thiệu dự án](#-giới-thiệu-dự-án)
- [🧪 Nội dung kiểm thử](#-nội-dung-kiểm-thử)
- [🛠 Commands hữu ích](#-commands-hữu-ích)
- [🤝 Đóng góp](#-đóng-góp)

---

# 🚀 Cài đặt hệ thống

## 1️⃣ Yêu cầu hệ thống
- Node.js 18+  
- Java 17+  
- Maven / Gradle  
- Git  

---

## 2️⃣ Clone dự án

```sh
git clone https://github.com/your-repo/FloginFE_BE.git
cd FloginFE_BE
```

---

## 3️⃣ Cài đặt Frontend

```sh
cd frontend
npm install
npm run dev
```

Ứng dụng chạy tại: **http://localhost:5173**

---

## 4️⃣ Cài đặt Backend

```sh
cd backend
mvn clean install
mvn spring-boot:run
```

API chạy tại: **http://localhost:8080**

---

# 📘 Hướng dẫn sử dụng

## 🔐 1. Chức năng Login
- Nhập username & password  
- Nhấn **Login**  
- Hệ thống gọi API `/api/auth/login`  
- Nếu thành công → điều hướng sang trang quản lý sản phẩm  
- Nếu thất bại → hiện thông báo lỗi  

---

## 🛍 2. Chức năng Product CRUD

### ➕ Thêm sản phẩm
- Nhấn **Add Product**  
- Nhập thông tin  
- Nhấn **Save**  

### ✏️ Sửa sản phẩm
- Chọn sản phẩm  
- Nhấn **Edit**  
- Cập nhật trường cần sửa  

### 🗑 Xóa sản phẩm
- Nhấn **Delete** tại dòng tương ứng  

### 📄 Xem danh sách
- Toàn bộ dữ liệu được tải từ API `/api/products`

---
# 💻 Công nghệ sử dụng

### Frontend
- ReactJS / Vite  
- Axios  
- React Testing Library  
- Jest  
- Cypress  

### Backend
- Spring Boot  
- Spring Data JPA  
- JUnit  
- Mockito  
- k6 (Performance Test)

---


# 📝 Giới thiệu dự án
Dự án mô phỏng đầy đủ quy trình **kiểm thử phần mềm** gồm:
- Unit Test  
- Integration Test  
- Mock Test  
- E2E Test  
- Performance Test  

---


# 🧪 Nội dung kiểm thử

## 1️⃣ Test Case & Scenario  
Bao gồm kiểm thử Login và Product CRUD  
(Validation, authentication, API, error handling…)

## 2️⃣ Unit Testing  
- FE: validateUsername(), validatePassword(), ProductForm  
- BE: authenticate(), ProductService CRUD  

## 3️⃣ Integration Testing  
- FE: UI + API interaction  
- BE: Controller + Service + Repo  

## 4️⃣ Mock Testing  
- Mock API, mock repository  

## 5️⃣ Automation Testing  
- Cypress cho Login & Product  

## 6️⃣ Performance  
- k6 load, stress, response time test  

---

# 🛠 Commands hữu ích

```sh
npm test               # chạy unit test frontend
mvn test               # chạy unit test backend
npm run cy:open        # mở giao diện Cypress
k6 run login-load.js   # test tải Login API
```

---

# 🤝 Đóng góp

## Quy trình
1. Fork repo  
2. Tạo branch mới  
3. Commit thay đổi  
4. Tạo Pull Request  

## Coding Standards
- camelCase cho biến  
- kebab-case cho tên file  
- Commit message rõ ràng  

---

## 👥 Thành viên nhóm

| STT | Họ tên                | MSSV       | Đóng góp |
|-----|-----------------------|------------|----------|
| 1   | Ngô Kiến Văn          | 3123410423 | 20%      |
| 2   | Lương Mai Hoàng Văn   | 3123410422 | 20%      |
| 3   | Nguyễn Thanh Văn      | 3123410424 | 20%      |
| 4   | Huỳnh Lê Anh Tuấn     | 3123410407 | 20%      |
| 5   | Nguyễn Võ Anh Kỳ      | 3123410186 | 20%      |
