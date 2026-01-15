import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { FURNITURE_POSITIONS } from '@/lib/constants';

export interface NoteEntry {
    id: string;        // Unique UUID for the note
    parentId: string;  // ID of the object (e.g., 'bookshelf', 'bed')
    title: string;     // Optional title for the note
    content: string;
    createdAt: number;
    updatedAt: number;
    pinned: boolean;
    color: string;
}

interface GameState {
    hoveredObject: string | null;
    activeNoteId: string | null;      // ID of the specific note being edited
    activeContainerId: string | null; // ID of the object being viewed (e.g., 'bookshelf')
    cameraZoomTarget: [number, number, number] | null; // World position to zoom camera towards
    playerPosition: [number, number, number]; // Player world position for proximity checks

    notes: Record<string, NoteEntry>; // Keyed by Note ID (UUID)
    searchQuery: string;

    // Interaction Actions
    setHoveredObject: (id: string | null) => void;
    setPlayerPosition: (pos: [number, number, number]) => void;
    openContainer: (containerId: string) => void;
    closeContainer: () => void;

    // Note Actions
    createNote: (parentId: string) => string; // Returns the new note ID
    openNote: (id: string) => void;
    closeNote: () => void;
    updateNote: (id: string, content: string, title?: string, color?: string) => void;
    deleteNote: (id: string) => void;
    togglePinNote: (id: string) => void;

    setSearchQuery: (query: string) => void;

    // Selectors
    getNotesByParent: (parentId: string) => NoteEntry[];
}

const NOTE_COLORS = ['#FFFFFF', '#FFF3E0', '#E8F5E9', '#E3F2FD', '#FCE4EC', '#F3E5F5'];

export const useStore = create<GameState>()(
    persist(
        (set, get) => ({
            hoveredObject: null,
            activeNoteId: null,
            activeContainerId: null,
            cameraZoomTarget: null,
            playerPosition: [0, 0, 0],
            notes: {},
            searchQuery: '',

            setHoveredObject: (id) => set({ hoveredObject: id }),
            setPlayerPosition: (pos) => set({ playerPosition: pos }),

            // Container Actions
            openContainer: (containerId) => {
                const pos = FURNITURE_POSITIONS[containerId];
                // Use defined position or default, lifting Y to 1.5 for better viewing angle
                const zoomTarget: [number, number, number] | null = pos
                    ? [pos[0], 1.5, pos[2]]
                    : null;

                set({
                    activeContainerId: containerId,
                    cameraZoomTarget: zoomTarget,
                });
            },
            closeContainer: () => set({ activeContainerId: null, cameraZoomTarget: null }),

            // Note Actions
            createNote: (parentId) => {
                const id = uuidv4();
                const now = Date.now();
                const newNote: NoteEntry = {
                    id,
                    parentId,
                    title: '',
                    content: '',
                    createdAt: now,
                    updatedAt: now,
                    pinned: false,
                    color: NOTE_COLORS[0],
                };

                set((state) => ({
                    notes: { ...state.notes, [id]: newNote }
                }));
                return id;
            },

            openNote: (id) => set({ activeNoteId: id }),

            closeNote: () => set({ activeNoteId: null }),

            updateNote: (id, content, title, color) => set((state) => {
                const note = state.notes[id];
                if (!note) return state;

                return {
                    notes: {
                        ...state.notes,
                        [id]: {
                            ...note,
                            content: content !== undefined ? content : note.content,
                            title: title !== undefined ? title : note.title,
                            color: color !== undefined ? color : note.color,
                            updatedAt: Date.now()
                        }
                    }
                };
            }),

            deleteNote: (id) => set((state) => {
                const newNotes = { ...state.notes };
                delete newNotes[id];
                return { notes: newNotes };
            }),

            togglePinNote: (id) => set((state) => {
                const note = state.notes[id];
                if (!note) return state;
                return {
                    notes: {
                        ...state.notes,
                        [id]: { ...note, pinned: !note.pinned }
                    }
                };
            }),

            setSearchQuery: (query) => set({ searchQuery: query }),

            getNotesByParent: (parentId) => {
                const state = get();
                return Object.values(state.notes)
                    .filter(note => note.parentId === parentId)
                    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.updatedAt - a.updatedAt);
            },
        }),
        {
            name: 'mempal-storage-v2', // Changed version to clear old schema
            partialize: (state) => ({ notes: state.notes }),
        }
    )
);
