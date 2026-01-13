"use client";

import { useStore } from "@/store/useStore";
import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";

export default function Overlay() {
    const hoveredObject = useStore((state) => state.hoveredObject);
    const isNoteOpen = useStore((state) => state.isNoteOpen);
    const activeNoteId = useStore((state) => state.activeNoteId);
    const closeNote = useStore((state) => state.closeNote);
    const saveNote = useStore((state) => state.saveNote);
    const notes = useStore((state) => state.notes);

    const [content, setContent] = useState("");

    // Sync content when opening a note
    useEffect(() => {
        if (isNoteOpen && activeNoteId) {
            setContent(notes[activeNoteId]?.content || "");
        }
    }, [isNoteOpen, activeNoteId, notes]);

    const handleSave = () => {
        if (activeNoteId) {
            saveNote(activeNoteId, content);
            closeNote();
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-center items-center">
            {/* Crosshair */}
            {!isNoteOpen && (
                <div className={`w-2 h-2 rounded-full ${hoveredObject ? "bg-green-400 scale-150" : "bg-white/50"} transition-all duration-200`} />
            )}

            {/* Interaction Prompt */}
            {!isNoteOpen && hoveredObject && (
                <div className="absolute mt-12 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
                    <span className="font-bold text-yellow-400">E</span> to Open {hoveredObject.charAt(0).toUpperCase() + hoveredObject.slice(1)} Notes
                </div>
            )}

            {/* Note Modal */}
            {isNoteOpen && activeNoteId && (
                <div className="pointer-events-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-[500px] border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                        <h2 className="text-xl font-bold capitalize text-zinc-800 dark:text-zinc-100">
                            {activeNoteId} Notes
                        </h2>
                        <button
                            onClick={closeNote}
                            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="p-6">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans text-lg text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
                            placeholder="Write your thoughts here..."
                            autoFocus
                        />
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end gap-3">
                        <button
                            onClick={closeNote}
                            className="px-4 py-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <Save className="w-4 h-4" /> Save Note
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
