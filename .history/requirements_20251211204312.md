# DentWise Application Requirements

## Functional Requirements

| ID       | Requirement                                                                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FR-1** | **User Authentication** — Users must be able to register and log in to the application using Clerk authentication.                                   |
| **FR-2** | **Appointment Booking** — Authenticated users must be able to book appointments by selecting a doctor, date, time, and appointment type.             |
| **FR-3** | **View User Appointments** — Authenticated users must be able to view their upcoming appointments on the appointments page and dashboard.            |
| **FR-4** | **Doctor Availability Check** — The system must prevent double-booking by showing only available time slots for the selected doctor on a given date. |
| **FR-5** | **AI Voice Assistant (Pro Feature)** — Users with a "Pro" plan must be able to start a voice call with the AI dental assistant via VAPI integration. |
| **FR-6** | **Admin Doctor Management** — Admin users must be able to create, update, and view doctor records in the admin panel.                                |
| **FR-7** | **Email Confirmation** — When an appointment is successfully booked, a confirmation email should be sent to the user's email address.                |

---

## Non-Functional Requirements

| ID        | Type         | Requirement                                                                                                                                                                                                                    |
| --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **NFR-1** | **Security** | Only authenticated users can access protected routes (`/dashboard`, `/appointments`, `/voice`, `/admin`). Admin routes must only be accessible to users whose email matches the configured `ADMIN_EMAIL` environment variable. |
