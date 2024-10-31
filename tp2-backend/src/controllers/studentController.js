// src/controllers/studentController.js
const studentService = require('../services/studentService');

const studentController = {
    getAllStudents: async (req, res) => {
        try {
            const { search, currentPage, pageSize } = req.query;
            const result = await studentService.getStudents(search, parseInt(currentPage), parseInt(pageSize));
            
            res.json({
                ...result,
                currentPage: parseInt(currentPage) || 1,
                pageSize: parseInt(pageSize) || 5
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving students',
                error: error.message
            });
        }
    },

    getStudentById: async (req, res) => {
        try {
            const student = await studentService.getStudentById(req.params.id);
            res.json(student);
        } catch (error) {
            res.status(error.message === 'Student not found' ? 404 : 500).json({
                message: error.message
            });
        }
    },

    createStudent: async (req, res) => {
        try {
            const student = await studentService.createStudent(req.body);
            res.status(201).json(student);
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    deleteStudent: async (req, res) => {
        try {
            await studentService.deleteStudent(req.params.id);
            res.json({ message: 'Student deleted successfully' });
        } catch (error) {
            res.status(error.message === 'Student not found' ? 404 : 500).json({
                message: error.message
            });
        }
    },

    checkEmailAvailability: async (req, res) => {
        try {
            const available = await studentService.isEmailAvailable(req.params.email);
            res.json({ available });
        } catch (error) {
            res.status(500).json({
                message: 'Error checking email availability',
                error: error.message
            });
        }
    },

    checkDniAvailability: async (req, res) => {
        try {
            const available = await studentService.isDniAvailable(req.params.dni);
            res.json({ available });
        } catch (error) {
            res.status(500).json({
                message: 'Error checking DNI availability',
                error: error.message
            });
        }
    },

    getLastStudentId: async (req, res) => {
        try {
            const lastSid = await studentService.getLastStudentId();
            res.json({ lastSid });
        } catch (error) {
            res.status(500).json({
                message: 'Error getting last student ID',
                error: error.message
            });
        }
    }
};

module.exports = studentController;