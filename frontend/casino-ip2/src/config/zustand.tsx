import create from 'zustand';

const useStore = create(set => ({
    userProps: [
        {
            email: undefined, 
            username: undefined,
        }
    ],
    addUser: (email:any, username: any) =>
        set((state:any) => ({
            userProps: [
                {
                    email: email,
                    username: username,
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