export const getUsername = () => {
    const name = localStorage.getItem("usernameSaved");
    // ? JSON.parse(localStorage.getItem("usernameSaved"))
    // : [];
    if (name) {
        return JSON.parse(name);
    }
    return "";
};

export const changeUsername = (newName: string) => {
    localStorage.setItem("usernameSaved", JSON.stringify(newName));
};
