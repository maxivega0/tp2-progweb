// src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * GET /api/students
 * Get all students with optional search and pagination
 * Query params:
 * - search: string to filter students by firstname or lastname
 * - currentPage: current page number (default: 1)
 * - pageSize: number of items per page (default: 5)
 */
router.get('/', studentController.getAllStudents);

/**
 * GET /api/students/:id
 * Get a single student by ID
 */
router.get('/:id', studentController.getStudentById);

/**
 * POST /api/students
 * Create a new student
 * Body should contain:
 * - firstname: string (required)
 * - lastname: string (required)
 * - dni: number (required)
 * - email: string (required)
 */
router.post('/', studentController.createStudent);

/**
 * DELETE /api/students/:id
 * Soft delete a student by ID (sets deleted flag to true)
 */
router.delete('/:id', studentController.deleteStudent);

/**
 * GET /api/students/check/email/:email
 * Check if email is available (not used by any active student)
 */
router.get('/check/email/:email', studentController.checkEmailAvailability);

/**
 * GET /api/students/check/dni/:dni
 * Check if DNI is available (not used by any active student)
 */
router.get('/check/dni/:dni', studentController.checkDniAvailability);

/**
 * GET /api/students/sid/last
 * Get the last used student ID (sid) for generating the next one
 */
router.get('/sid/last', studentController.getLastStudentId);

module.exports = router;