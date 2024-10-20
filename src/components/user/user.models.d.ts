export interface editUserDTO {
    userName: string;
    email: string;
    phone: string;
    image: string;
    imageFile: File;
}

export interface editUserDetailsDTO {
    userName: string;
    email: string;
    image?: File;
    imageURL?: string;
    phone: string;
}