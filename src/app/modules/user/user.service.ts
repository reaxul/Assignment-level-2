import { Order, User } from "./user.interface";
import { UserModel } from "./user.model";



const createUser = async (user: User) => {
    const result = await UserModel.create(user);
    return result;
}

const getAllUsers = async () => {
    const result = await UserModel.find().select({
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    })
    return result;
}

const getSingleUser = async (userId: number) => {
    const result = await UserModel.findOne({ userId });
    return result;
};

const updateUser = async (userId: number, updateData: Partial<User>) => {
    const result = await UserModel.findOneAndUpdate({ userId }, updateData, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteUser = async (userId: number) => {
    const result = await UserModel.findOneAndDelete({ userId });
    return result;
};

const createOrder = async (userId: number, orderData: Order) => {
    const result = await UserModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          orders: orderData,
        },
      },
    );
    return result;
  };

export const userService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createOrder,
}