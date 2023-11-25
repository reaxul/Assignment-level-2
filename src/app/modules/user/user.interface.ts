export type Name = {
    firstName: string;
    lastName: string;
}


export type Address = {
    street: string;
    city: string;
    country: string;
}

export type User = {
    userId: number;
    username: string;
    password: string;
    fullName: Name;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: Address;
}