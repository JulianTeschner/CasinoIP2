import create from 'zustand';

const useStore = create(set => ({
    userProps: [
        {
            email: undefined, 
            username: undefined,
        }
    ],
    addUser: (newEmail:any, newUsername: any) =>
        set((state:any) => ({
            userProps: [
                {
                    email: newEmail,
                    username: newUsername,
                },
            ]
        })),
    removeUser: () =>
        set((state:any) => ({
            userProps: [
                {
                    email:undefined,
                    username: undefined,
                }
            ]
        }))
}));
export const useUserStore = useStore;