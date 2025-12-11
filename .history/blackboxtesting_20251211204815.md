# DentWise Black Box Testing

## Testing Techniques Applied

- **Equivalence Partitioning (EP)**: Dividing input data into partitions where all values in a partition are expected to behave the same way.
- **Boundary Value Analysis (BVA)**: Testing at the boundaries of equivalence partitions where errors are most likely to occur.

---

## Test Cases

### TC-01: Phone Number Formatting - Empty Input (BVA - Lower Boundary)

| Field               | Value                                                                   |
| ------------------- | ----------------------------------------------------------------------- |
| **Test ID**         | TC-01                                                                   |
| **Requirement**     | FR-6 (Admin Doctor Management)                                          |
| **Technique**       | Boundary Value Analysis                                                 |
| **Description**     | Test phone number formatting with empty string (boundary: 0 characters) |
| **Input**           | `""` (empty string)                                                     |
| **Expected Output** | `""` (empty string)                                                     |
| **Rationale**       | Tests the lower boundary (length = 0) of phone number input             |

---

### TC-02: Phone Number Formatting - Minimum Valid Input (BVA - Just Above Lower Boundary)

| Field               | Value                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| **Test ID**         | TC-02                                                                    |
| **Requirement**     | FR-6 (Admin Doctor Management)                                           |
| **Technique**       | Boundary Value Analysis                                                  |
| **Description**     | Test phone number formatting with 1-3 digits (first partition boundary)  |
| **Input**           | `"123"`                                                                  |
| **Expected Output** | `"(+2) 123"`                                                             |
| **Rationale**       | Tests boundary at length = 3 (transition point between formatting rules) |

---

### TC-03: Phone Number Formatting - Mid-Length Input (BVA - Partition Boundary)

| Field               | Value                                                             |
| ------------------- | ----------------------------------------------------------------- |
| **Test ID**         | TC-03                                                             |
| **Requirement**     | FR-6 (Admin Doctor Management)                                    |
| **Technique**       | Boundary Value Analysis                                           |
| **Description**     | Test phone number formatting at 6-digit boundary                  |
| **Input**           | `"123456"`                                                        |
| **Expected Output** | `"(+2) 123 456"`                                                  |
| **Rationale**       | Tests boundary at length = 6 (transition to next formatting rule) |

---

### TC-04: Phone Number Formatting - Full Length Input (BVA - Upper Boundary)

| Field               | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| **Test ID**         | TC-04                                                                 |
| **Requirement**     | FR-6 (Admin Doctor Management)                                        |
| **Technique**       | Boundary Value Analysis                                               |
| **Description**     | Test phone number formatting with 11 digits (maximum expected length) |
| **Input**           | `"01124555246"`                                                       |
| **Expected Output** | `"(+2) 011 245 552 46"`                                               |
| **Rationale**       | Tests upper boundary of phone number length (11 characters)           |

---

### TC-05: Appointment Type Selection - Valid Types (EP - Valid Partition)

| Field               | Value                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Test ID**         | TC-05                                                                               |
| **Requirement**     | FR-2 (Appointment Booking)                                                          |
| **Technique**       | Equivalence Partitioning                                                            |
| **Description**     | Test booking with each valid appointment type                                       |
| **Partitions**      | Valid: `{checkup, cleaning, consultation, emergency}`, Invalid: `{any other value}` |
| **Input**           | `"checkup"`                                                                         |
| **Expected Output** | Appointment created with reason "Regular Checkup", duration "60 min", price "$120"  |
| **Rationale**       | Tests representative value from the valid equivalence class                         |

---

### TC-06: Appointment Type Selection - Invalid Type (EP - Invalid Partition)

| Field               | Value                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Test ID**         | TC-06                                                                                   |
| **Requirement**     | FR-2 (Appointment Booking)                                                              |
| **Technique**       | Equivalence Partitioning                                                                |
| **Description**     | Test booking with invalid/non-existent appointment type                                 |
| **Partitions**      | Valid: `{checkup, cleaning, consultation, emergency}`, Invalid: `{any other value}`     |
| **Input**           | `"surgery"` (invalid type)                                                              |
| **Expected Output** | Appointment type not found; system should handle gracefully (use default or show error) |
| **Rationale**       | Tests representative value from the invalid equivalence class                           |

---

### TC-07: Doctor Form Validation - Required Fields (EP - Valid/Invalid Partitions)

| Field            | Value                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **Test ID**      | TC-07                                                                                           |
| **Requirement**  | FR-6 (Admin Doctor Management)                                                                  |
| **Technique**    | Equivalence Partitioning                                                                        |
| **Description**  | Test doctor creation form with missing required fields                                          |
| **Partitions**   | Valid: `{name AND email AND speciality all provided}`, Invalid: `{any required field missing}`  |
| **Test Cases**   |                                                                                                 |
| Case A (Valid)   | name="Dr. Smith", email="dr@test.com", speciality="General" → Button enabled, creation succeeds |
| Case B (Invalid) | name="", email="dr@test.com", speciality="General" → Button disabled                            |
| Case C (Invalid) | name="Dr. Smith", email="", speciality="General" → Button disabled                              |
| Case D (Invalid) | name="Dr. Smith", email="dr@test.com", speciality="" → Button disabled                          |
| **Rationale**    | Tests all combinations of valid/invalid required field partitions                               |

---

### TC-08: Time Slot Selection - Available vs Booked (EP)

| Field              | Value                                                                             |
| ------------------ | --------------------------------------------------------------------------------- |
| **Test ID**        | TC-08                                                                             |
| **Requirement**    | FR-4 (Doctor Availability Check)                                                  |
| **Technique**      | Equivalence Partitioning                                                          |
| **Description**    | Test time slot availability based on booking status                               |
| **Partitions**     | Available: `{slots NOT in bookedTimeSlots}`, Booked: `{slots IN bookedTimeSlots}` |
| **Precondition**   | Doctor has existing appointment at "14:30" on selected date                       |
| **Test Cases**     |                                                                                   |
| Case A (Available) | Click on "09:00" → Slot is selectable, selectedTime = "09:00"                     |
| Case B (Booked)    | Click on "14:30" → Slot is disabled, shows "(محجوز)", click has no effect         |
| **Rationale**      | Tests both equivalence partitions for time slot availability                      |

---

### TC-09: Available Dates - Boundary Values (BVA)

| Field               | Value                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| **Test ID**         | TC-09                                                                             |
| **Requirement**     | FR-2 (Appointment Booking)                                                        |
| **Technique**       | Boundary Value Analysis                                                           |
| **Description**     | Test that available dates start from tomorrow (not today) and span exactly 5 days |
| **Test Cases**      |                                                                                   |
| Lower Bound         | First available date should be `tomorrow` (today + 1 day), NOT today              |
| Upper Bound         | Last available date should be `tomorrow + 4 days` (5th day from tomorrow)         |
| Count               | Exactly 5 dates should be returned                                                |
| **Expected Output** | Array of 5 date strings starting from tomorrow                                    |
| **Rationale**       | Tests boundaries of the date selection window                                     |

---

### TC-10: Time Slot Boundaries - First and Last Slots (BVA)

| Field                | Value                                                           |
| -------------------- | --------------------------------------------------------------- |
| **Test ID**          | TC-10                                                           |
| **Requirement**      | FR-2 (Appointment Booking)                                      |
| **Technique**        | Boundary Value Analysis                                         |
| **Description**      | Test booking at boundary time slots (first and last of the day) |
| **Time Slot Range**  | 09:00 - 16:30 (with lunch break 12:00-14:00)                    |
| **Test Cases**       |                                                                 |
| First Morning Slot   | "09:00" → Should be selectable and bookable                     |
| Last Morning Slot    | "11:30" → Should be selectable and bookable                     |
| First Afternoon Slot | "14:00" → Should be selectable and bookable                     |
| Last Slot of Day     | "16:30" → Should be selectable and bookable                     |
| **Rationale**        | Tests boundary time slots at beginning/end of available periods |

---

## Summary Table

| Test ID | Technique | Feature Under Test     | Input Domain                    |
| ------- | --------- | ---------------------- | ------------------------------- |
| TC-01   | BVA       | Phone Formatting       | Length = 0 (lower boundary)     |
| TC-02   | BVA       | Phone Formatting       | Length = 3 (partition boundary) |
| TC-03   | BVA       | Phone Formatting       | Length = 6 (partition boundary) |
| TC-04   | BVA       | Phone Formatting       | Length = 11 (upper boundary)    |
| TC-05   | EP        | Appointment Type       | Valid partition                 |
| TC-06   | EP        | Appointment Type       | Invalid partition               |
| TC-07   | EP        | Doctor Form            | Required fields valid/invalid   |
| TC-08   | EP        | Time Slot Availability | Available/Booked partitions     |
| TC-09   | BVA       | Available Dates        | First/Last date boundaries      |
| TC-10   | BVA       | Time Slots             | First/Last slot boundaries      |
