import { create } from 'zustand';

interface Note {
    id: string;
    content: string;
    createdAt: number;
}

interface GameState {
    hoveredObject: string | null;
    activeNoteId: string | null;
    isNoteOpen: boolean;
    notes: Record<string, Note>;

    setHoveredObject: (id: string | null) => void;
    openNote: (id: string) => void;
    closeNote: () => void;
    saveNote: (id: string, content: string) => void;
}

export const useStore = create<GameState>((set) => ({
    hoveredObject: null,
    activeNoteId: null,
    isNoteOpen: false,
    notes: {},

    setHoveredObject: (id) => set({ hoveredObject: id }),
    openNote: (id) => set({ isNoteOpen: true, activeNoteId: id }),
    closeNote: () => set({ isNoteOpen: false, activeNoteId: null }),
    saveNote: (id, content) => set((state) => ({
        notes: {
            ...state.notes,
            [id]: { id, content, createdAt: Date.now() }
        }
    })),
}));
