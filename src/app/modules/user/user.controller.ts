import { Request, Response } from "express";
import { userService } from "./user.service";
import { userValidationSchema } from "./user.validation";



const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const userParseData = userValidationSchema.parse(userData)
        const result = await userService.createUser(userParseData);
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

const updateUser = async (req: Request, res: Response) => {
    try {
        const updateData = userValidationSchema.partial().parse(req.body);
        const userId = parseInt(req.params.userId);
        const user = await userService.getSingleUser(userId);

        if (!user)
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });

        const updatedUser = await userService.updateUser(userId, updateData);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await userService.getSingleUser(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }

        await userService.deleteUser(userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
};

const addProductInOrder = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await userService.getSingleUser(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }

        const orderData = {
            productName: req.body.productName,
            price: parseFloat(req.body.price),
            quantity: parseInt(req.body.quantity),
        };

        if (!user.orders) {
            user.orders = [];
        }

        user.orders.push(orderData);

        await userService.updateUser(userId, { orders: user.orders });

        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
};

const getOrdersForUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await userService.getSingleUser(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }

        const orders = user.orders || [];

        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: {
                orders: orders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await userService.getSingleUser(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }

        const orders = user.orders || [];
        const totalPrice = orders.reduce((acc, order) => acc + order.price * order.quantity, 0);

        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: totalPrice,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
};

export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addProductInOrder,
    getOrdersForUser,
    calculateTotalPrice,
}