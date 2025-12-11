# DentWise Agile Testing Documentation

## Sprint Overview

**Sprint Name:** Sprint 1 - Core Booking Features  
**Sprint Goal:** Implement and test phone number formatting and avatar generation features  
**Sprint Duration:** 2 weeks (Dec 11-25, 2025)

---

## Sprint Backlog

| ID     | User Story              | Story Points | Priority | Status      |
| ------ | ----------------------- | ------------ | -------- | ----------- |
| US-001 | Phone Number Formatting | 5            | High     | In Progress |
| US-002 | Avatar Generation       | 3            | Medium   | In Progress |

---

## User Stories

### US-001: Phone Number Formatting

**Title:** As a user, I want my phone number to be formatted automatically so that it displays correctly with the Egyptian country code.

**Description:**  
When a user enters their phone number in any format, the system should automatically format it to the standard Egyptian format: `(+2) XXX XXX XXX XX`

**Acceptance Criteria:**

1. ✅ Phone numbers are formatted with `(+2)` prefix
2. ✅ Non-digit characters are removed automatically
3. ✅ Empty input returns empty string
4. ✅ Phone number is grouped into proper segments (3-3-3-2)
5. ✅ Maximum 11 digits are displayed

**Story Points:** 5  
**Priority:** High  
**Assignee:** Development Team

---

### US-002: Avatar Generation

**Title:** As a user, I want an avatar to be generated based on my name and gender so that my profile has a personalized image.

**Description:**  
When a user registers or updates their profile, the system should generate a unique avatar URL based on their name and gender selection.

**Acceptance Criteria:**

1. ✅ Male users get avatar from `/boy` endpoint
2. ✅ Female users get avatar from `/girl` endpoint
3. ✅ Username is derived from name (lowercase, no spaces)
4. ✅ Empty or null names throw appropriate errors
5. ✅ Names with spaces are properly normalized

**Story Points:** 3  
**Priority:** Medium  
**Assignee:** Development Team

---

## Testing Tasks

### Task 1: Unit Testing - Phone Formatter

| Task ID | Description                                   | Status  | Assigned To |
| ------- | --------------------------------------------- | ------- | ----------- |
| T-001-1 | Write normal case tests (valid phone numbers) | ✅ Done | QA Team     |
| T-001-2 | Write edge case tests (boundary values)       | ✅ Done | QA Team     |
| T-001-3 | Write invalid case tests (empty, non-digits)  | ✅ Done | QA Team     |
| T-001-4 | Write exception case tests (null input)       | ✅ Done | QA Team     |
| T-001-5 | Achieve 100% code coverage                    | ✅ Done | QA Team     |

**Test Results:**

- Total Tests: 8
- Passed: 8 ✅
- Failed: 0
- Coverage: 100% branch coverage

---

### Task 2: Unit Testing - Avatar Generator

| Task ID | Description                                      | Status  | Assigned To |
| ------- | ------------------------------------------------ | ------- | ----------- |
| T-002-1 | Write normal case tests (male/female avatars)    | ✅ Done | QA Team     |
| T-002-2 | Write edge case tests (spaces, case sensitivity) | ✅ Done | QA Team     |
| T-002-3 | Write invalid case tests (empty, whitespace)     | ✅ Done | QA Team     |
| T-002-4 | Write exception case tests (null input)          | ✅ Done | QA Team     |
| T-002-5 | Achieve 100% code coverage                       | ✅ Done | QA Team     |

**Test Results:**

- Total Tests: 8
- Passed: 8 ✅
- Failed: 0
- Coverage: 100% branch coverage

---

## Test Case Summary

### PhoneFormatter Test Cases

| Test ID | Test Name                     | Category  | Input           | Expected Output         |
| ------- | ----------------------------- | --------- | --------------- | ----------------------- |
| TC-001  | testNormal_FullEgyptianNumber | Normal    | `"01124555246"` | `"(+2) 011 245 552 46"` |
| TC-002  | testNormal_SixDigits          | Normal    | `"123456"`      | `"(+2) 123 456"`        |
| TC-003  | testEdge_ThreeDigits          | Edge      | `"123"`         | `"(+2) 123"`            |
| TC-004  | testEdge_NineDigits           | Edge      | `"123456789"`   | `"(+2) 123 456 789"`    |
| TC-005  | testEdge_SingleDigit          | Edge      | `"5"`           | `"(+2) 5"`              |
| TC-006  | testInvalid_EmptyString       | Invalid   | `""`            | `""`                    |
| TC-007  | testInvalid_NonDigitsOnly     | Invalid   | `"abc!@#$%"`    | `""`                    |
| TC-008  | testException_NullInput       | Exception | `null`          | `NullPointerException`  |

### AvatarGenerator Test Cases

| Test ID | Test Name                    | Category  | Input              | Expected Output             |
| ------- | ---------------------------- | --------- | ------------------ | --------------------------- |
| TC-009  | testNormal_MaleAvatar        | Normal    | `"John", MALE`     | `".../boy?username=john"`   |
| TC-010  | testNormal_FemaleAvatar      | Normal    | `"Sarah", FEMALE`  | `".../girl?username=sarah"` |
| TC-011  | testEdge_NameWithSpaces      | Edge      | `"John Doe Smith"` | `"johndoesmith"`            |
| TC-012  | testEdge_MixedCaseName       | Edge      | `"JoHn DoE"`       | `"johndoe"`                 |
| TC-013  | testEdge_SingleCharacterName | Edge      | `"A"`              | `"a"`                       |
| TC-014  | testInvalid_EmptyString      | Invalid   | `""`               | `IllegalArgumentException`  |
| TC-015  | testInvalid_WhitespaceOnly   | Invalid   | `"   "`            | `IllegalArgumentException`  |
| TC-016  | testException_NullName       | Exception | `null`             | `IllegalArgumentException`  |

---

## Jira Configuration Guide

### Creating Sprint Backlog in Jira

1. **Create a New Sprint:**
   - Go to Backlog view → Click "Create Sprint"
   - Name: "Sprint 1 - Core Booking Features"
   - Duration: 2 weeks

2. **Create User Stories:**
   - Issue Type: Story
   - Add to Sprint 1
   - Set Story Points and Priority

3. **Create Testing Sub-tasks:**
   - Under each Story, create Sub-tasks for testing
   - Label with "testing" or "qa"

### Xray Test Management Integration

1. **Link Test Cases to User Stories:**
   - Create Test issues in Xray
   - Link to corresponding User Story

2. **Create Test Execution:**
   - Group related tests into Test Execution
   - Track pass/fail status

3. **Generate Coverage Report:**
   - View traceability between requirements and tests

---

## Definition of Done

- [ ] All acceptance criteria met
- [x] Unit tests written and passing
- [x] Code coverage ≥ 80%
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No critical bugs remaining

---

## Sprint Metrics

| Metric             | Value |
| ------------------ | ----- |
| Total Story Points | 8     |
| Tests Written      | 16    |
| Tests Passing      | 16    |
| Code Coverage      | 100%  |
| Bugs Found         | 0     |
