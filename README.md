# Web100

Các bài học nằm trong những thư mục riêng (`Lesson1`, `Lesson2`, `Lesson2_BT`, ...). Mỗi thư mục có `package.json` riêng, vì vậy hãy cài dependencies trong đúng thư mục bài học cần chạy.

## Yêu cầu

- Cài Node.js phiên bản LTS (npm được cài kèm Node.js).

## Cài đặt và chạy

Sau khi clone repository, ví dụ chạy bài `Lesson5_BT`:

```bash
cd Lesson5_BT
npm ci
npm run dev
```

`npm ci` dùng `package-lock.json` để cài đúng phiên bản dependencies. Nếu thư mục bài học không có `package-lock.json`, dùng `npm install` thay thế.

Để chạy bài khác, quay lại thư mục gốc rồi vào thư mục bài đó. Các bài có script `dev` có thể chạy bằng `npm run dev`. `Lesson1` hiện chưa khai báo script này.

Một số bài cần cấu hình MongoDB riêng. Hãy dùng thông tin kết nối của bạn và không commit credentials hoặc file môi trường vào repository.
