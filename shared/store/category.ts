import {create} from "zustand";

interface Category {
    activeId: number;
    setActiveId: (activeId: number) => void
}

export const useCategoryStore = create<Category>()((set) => ({
    activeId: 1,
    setActiveId: (activeId: number) => set({activeId})

}))



