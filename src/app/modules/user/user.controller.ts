import { Request, Response } from "express";
import { userService } from "./user.service";



const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const result = await userService.createUser(userData);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await userService.getSingleUser(userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                "error": {
                    "code": 404,
                    "description": "User not found!"
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            "error": {
                "code": 500,
                "description": "Something went wrong!"
            }
        });
    }
}

export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
}