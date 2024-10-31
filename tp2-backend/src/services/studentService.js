// src/services/studentService.js
const { Op } = require('sequelize');
const Student = require('../models/student');

class StudentService {
    /**
     * Get students with pagination and search
     * @param {string} search - Search term for firstname or lastname
     * @param {number} currentPage - Current page number
     * @param {number} pageSize - Number of items per page
     * @returns {Promise<{totalRecords: number, students: Array}>}
     */
    async getStudents(search = '', currentPage = 1, pageSize = 5) {
        const offset = (currentPage - 1) * pageSize;
        const whereCondition = {
            deleted: false
        };

        if (search) {
            whereCondition[Op.or] = [
                { lastname: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Student.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset: offset,
            order: [['sid', 'DESC']]
        });

        return {
            totalRecords: count,
            students: rows
        };
    }

    /**
     * Get student by ID
     * @param {number} id - Student ID
     * @returns {Promise<Student>}
     */
    async getStudentById(id) {
        const student = await Student.findOne({
            where: {
                id,
                deleted: false
            }
        });

        if (!student) {
            throw new Error('Student not found');
        }

        return student;
    }

    /**
     * Create new student
     * @param {Object} studentData - Student information
     * @returns {Promise<Student>}
     */
    async createStudent(studentData) {
        await this.validateStudentData(studentData);
        await this.checkExistingStudent(studentData);

        const newSid = await this.generateNextSid();
        
        const student = await Student.create({
            ...studentData,
            sid: newSid
        });

        return student;
    }

    /**
     * Validate student data
     * @param {Object} data - Student data to validate
     * @throws {Error} If validation fails
     */
    async validateStudentData(data) {
        const { firstname, lastname, dni, email } = data;

        // Required fields
        if (!firstname || !lastname || !dni || !email) {
            throw new Error('All fields are required');
        }

        // Length validation
        if (firstname.length > 100 || lastname.length > 100 || email.length > 100) {
            throw new Error('Fields cannot exceed 100 characters');
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // DNI format validation
        const dniRegex = /^[0-9]{1,10}$/;
        if (!dniRegex.test(dni)) {
            throw new Error('Invalid DNI format');
        }
    }

    /**
     * Check if email or DNI already exists
     * @param {Object} data - Student data to check
     * @throws {Error} If email or DNI already exists
     */
    async checkExistingStudent(data) {
        const existingStudent = await Student.findOne({
            where: {
                deleted: false,
                [Op.or]: [
                    { email: data.email },
                    { dni: data.dni }
                ]
            }
        });

        if (existingStudent) {
            throw new Error('Email or DNI already registered');
        }
    }

    /**
     * Generate next student ID
     * @returns {Promise<number>} Next available SID
     */
    async generateNextSid() {
        const lastStudent = await Student.findOne({
            order: [['sid', 'DESC']]
        });

        return lastStudent ? lastStudent.sid + 1 : 1000;
    }

    /**
     * Soft delete student
     * @param {number} id - Student ID to delete
     * @returns {Promise<boolean>}
     */
    async deleteStudent(id) {
        const student = await Student.findOne({
            where: {
                id,
                deleted: false
            }
        });

        if (!student) {
            throw new Error('Student not found');
        }

        await student.update({ deleted: true });
        return true;
    }

    /**
     * Check email availability
     * @param {string} email - Email to check
     * @returns {Promise<boolean>}
     */
    async isEmailAvailable(email) {
        const existingStudent = await Student.findOne({
            where: {
                email,
                deleted: false
            }
        });

        return !existingStudent;
    }

    /**
     * Check DNI availability
     * @param {string} dni - DNI to check
     * @returns {Promise<boolean>}
     */
    async isDniAvailable(dni) {
        const existingStudent = await Student.findOne({
            where: {
                dni,
                deleted: false
            }
        });

        return !existingStudent;
    }

    /**
     * Get last used student ID
     * @returns {Promise<number>}
     */
    async getLastStudentId() {
        const lastStudent = await Student.findOne({
            order: [['sid', 'DESC']]
        });

        return lastStudent ? lastStudent.sid : 999;
    }
}

module.exports = new StudentService();