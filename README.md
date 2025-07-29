# 🩸 Blood Donation Application

A MERN stack-based web application to connect blood donors with recipients efficiently, featuring donation requests, blog content, user management, and funding support.

##Live Site

👉 https://web-blood-donate.web.app/ 

## Admin Access

- **Email:** piqamityh@mailinator.com 
- **Password:** Rased%%55

---

##  Features

1. **Authentication System**: Register and login with role-based access (Admin, Donor, Volunteer).
2. **User Profile Management**: Editable profile (excluding email) with image upload via ImgBB.
3. **Create Donation Requests**: Donors can create, update, and delete their own blood donation requests.
4. **Donation Request Management**:
   - Admins manage all requests.
   - Volunteers can update status only.
   - Status control: pending → inprogress → done/canceled.
5. **Blogs (Content Management)**:
   - Admins/Volunteers can add/edit blogs.
   - Admins can publish/unpublish/delete.
   - Public Blog page with View More modal.
6. **Donor Search Page**: Search by blood group, district, and upazila. Results shown after submission.
7. **Funding Page**:
   - Users can fund the organization.
   - Stripe payment integrated.
   - Admin dashboard shows total funds.
8. **JWT & Protected Routes**: Dashboard and sensitive APIs are secured using JWT.
9. **Fully Responsive UI**: Optimized for mobile, tablet, and desktop.
10. **Notification & Alerts**: All CRUD actions use toast/sweetalert instead of browser alerts.

---

##  Technologies

- **Frontend**: React.js, Tailwind CSS, React Router DOM, Axios, Jodit-React, TanStack Query, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Firebase Auth, JWT
- **Payments**: Stripe
- **Image Hosting**: ImgBB
- **Extra**: AOS Animations, Responsive Charts (optional)

---


