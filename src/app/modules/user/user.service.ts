import { User } from "./user.interface";
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


export const userService = {
    createUser,
    getAllUsers,
}