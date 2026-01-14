"use client";

import { useStore, NoteEntry } from "@/store/useStore";
import { X, Save, Pin, PinOff, Trash2, Search, List, Bold, Italic, Underline, Palette, Sparkles, BookOpen, Clock, Plus, LayoutGrid, List as ListIcon, StickyNote } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

// ============= THEME CONFIGURATION =============
const DEFAULT_THEME = {
    bg: '#FFF9F0',      // Warm Cream
    text: '#2C3E50',    // Dark Slate
    primary: '#4ECDC4', // Retro Teal
    accent: '#E74C3C',  // Red
    border: '#E5D5C5',  // Warm Grey/Beige
    wood: '#DEB887',    // Wood Accent
    white: '#FFFFFF',
    surface: '#FFFAF5',
};

const OBJECT_THEMES: Record<string, typeof DEFAULT_THEME> = {
    bookshelf: { ...DEFAULT_THEME, bg: '#FDF5E6', primary: '#8B4513', border: '#D2B48C', text: '#3E2723' }, // Old Lace / Saddle Brown
    bed: { ...DEFAULT_THEME, bg: '#FFF0F5', primary: '#E74C3C', border: '#FFB6C1', text: '#4A235A' }, // Lavender Blush / Red
    desk: { ...DEFAULT_THEME, bg: '#F0F8FF', primary: '#2980B9', border: '#ADD8E6', text: '#154360' }, // Alice Blue / Blue
    fridge: { ...DEFAULT_THEME, bg: '#E0F2F1', primary: '#1ABC9C', border: '#B2DFDB', text: '#004D40' }, // Teal / Green
};

function getTheme(id: string | null) {
    if (!id) return DEFAULT_THEME;
    return OBJECT_THEMES[id] || DEFAULT_THEME;
}

// ============= UTILS =============
function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getFurnitureEmoji(id: string) {
    const emojis: Record<string, string> = {
        bed: "🛏️",
        desk: "💻",
        fridge: "🧊",
        bookshelf: "📚",
    };
    return emojis[id] || "📦";
}

// ============= COMPONENTS =============

function FormattingToolbar({ onFormat, theme }: { onFormat: (cmd: string) => void, theme: typeof DEFAULT_THEME }) {
    const btnClass = "p-2 rounded-lg transition-all hover:scale-105 active:scale-95";
    const activeStyle = { backgroundColor: `${theme.primary}20`, color: theme.primary };
    const defaultStyle = { color: theme.text };

    return (
        <div className="flex items-center gap-1 px-4 py-2 border-b" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
            <button onClick={() => onFormat('bold')} className={btnClass} style={defaultStyle} title="Bold"><Bold className="w-4 h-4" /></button>
            <button onClick={() => onFormat('italic')} className={btnClass} style={defaultStyle} title="Italic"><Italic className="w-4 h-4" /></button>
            <button onClick={() => onFormat('underline')} className={btnClass} style={defaultStyle} title="Underline"><Underline className="w-4 h-4" /></button>
            <div className="w-px h-4 mx-2" style={{ backgroundColor: theme.border }} />
            <button onClick={() => onFormat('list')} className={btnClass} style={defaultStyle} title="List"><List className="w-4 h-4" /></button>
        </div>
    );
}

function ColorPicker({ currentColor, onColorChange, theme }: { currentColor: string, onColorChange: (color: string) => void, theme: typeof DEFAULT_THEME }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105" style={{ backgroundColor: currentColor, borderColor: theme.border }}>
                <Palette className="w-4 h-4 text-black/40" />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 p-3 rounded-xl shadow-xl z-50 w-48 grid grid-cols-3 gap-2 border" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
                    {['#FFFFFF', '#FFF3E0', '#E8F5E9', '#E3F2FD', '#FCE4EC', '#F3E5F5'].map((c) => (
                        <button key={c} onClick={() => { onColorChange(c); setIsOpen(false); }} className="w-8 h-8 rounded-full border border-black/10 hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                    ))}
                </div>
            )}
        </div>
    );
}

function NoteCard({ note, onClick, onPin, onDelete, theme }: { note: NoteEntry; onClick: () => void; onPin: () => void; onDelete: () => void; theme: typeof DEFAULT_THEME }) {
    return (
        <div
            onClick={onClick}
            className="group relative p-4 rounded-xl cursor-pointer border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-32 flex flex-col"
            style={{ backgroundColor: note.color, borderColor: note.color === '#FFFFFF' ? theme.border : 'transparent' }}
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm capitalize truncate pr-4" style={{ color: theme.text }}>{note.title || "Untitled Note"}</h4>
                <div className="flex items-center gap-1">
                    <span className="text-[10px] text-gray-500 font-medium">{formatDate(note.updatedAt)}</span>
                    {note.pinned && <Pin className="w-3.5 h-3.5 fill-current" style={{ color: theme.primary }} />}
                </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80 line-clamp-3" style={{ color: theme.text }}>{note.content || "Empty content..."}</p>

            <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); onPin(); }} className="p-1.5 bg-white/80 rounded-lg hover:text-[#4ECDC4]"><Pin className="w-3 h-3" /></button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 bg-white/80 rounded-lg hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
            </div>
        </div>
    );
}

function ContainerModal({ containerId, onClose }: { containerId: string, onClose: () => void }) {
    const { getNotesByParent, createNote, openNote, togglePinNote, deleteNote } = useStore();
    const notes = getNotesByParent(containerId);
    const theme = getTheme(containerId);

    const handleCreate = () => {
        const newId = createNote(containerId);
        openNote(newId);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md pointer-events-auto z-50 flex items-center justify-center animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="w-[800px] h-[600px] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300"
                style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text }}
                onClick={e => e.stopPropagation()}
            >
                {/* Decoration: Top Color Bar */}
                <div className="h-2 w-full" style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }} />

                {/* Header */}
                <div className="px-8 py-6 border-b flex justify-between items-center bg-white/50 backdrop-blur-sm" style={{ borderColor: theme.border }}>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl filter drop-shadow-sm">{getFurnitureEmoji(containerId)}</div>
                        <div>
                            <h2 className="text-2xl font-bold capitalize" style={{ color: theme.text }}>{containerId}</h2>
                            <p className="text-sm opacity-60 font-medium">{notes.length} items stored</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 transition-colors">
                        <X className="w-6 h-6 opacity-50" />
                    </button>
                </div>

                {/* Grid Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                    {notes.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-500">
                            <BookOpen className="w-20 h-20 drop-shadow-sm opacity-80" style={{ color: theme.primary }} />
                            <div className="text-center opacity-70">
                                <p className="text-xl font-bold mb-2" style={{ color: theme.text }}>This collection is empty.</p>
                                <p className="text-sm font-medium">Start building your memory palace here.</p>
                            </div>
                            <button
                                onClick={handleCreate}
                                className="px-8 py-3 rounded-xl font-bold text-white shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2"
                                style={{ backgroundColor: theme.primary }}
                            >
                                <Plus className="w-5 h-5" />
                                Create First Note
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {/* Create New Card */}
                            <button
                                onClick={handleCreate}
                                className="group h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all hover:bg-white/50"
                                style={{ borderColor: theme.border, color: theme.text }}
                            >
                                <div className="p-2 rounded-full bg-black/5 group-hover:bg-white transition-colors">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold">New Note</span>
                            </button>

                            {notes.map(note => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onClick={() => openNote(note.id)}
                                    onPin={() => togglePinNote(note.id)}
                                    onDelete={() => deleteNote(note.id)}
                                    theme={theme}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function NoteEditor({ noteId, onClose }: { noteId: string, onClose: () => void }) {
    const { updateNote, togglePinNote, notes, activeContainerId } = useStore();
    const note = notes[noteId];
    // Derive theme from active container 
    const theme = getTheme(activeContainerId || note?.parentId);

    // Local state for smooth typing
    const [content, setContent] = useState(note?.content || "");
    const [title, setTitle] = useState(note?.title || "");
    const [color, setColor] = useState(note?.color || '#FFFFFF');
    const [isSaving, setIsSaving] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Sync from store if external change (rare)
    useEffect(() => {
        if (note) {
            if (note.content !== content) setContent(note.content);
            if (note.title !== title) setTitle(note.title);
            setColor(note.color);
        }
    }, [note]);

    // Auto-save debounced
    useEffect(() => {
        const timer = setTimeout(() => {
            if (note && (content !== note.content || color !== note.color || title !== note.title)) {
                setIsSaving(true);
                updateNote(noteId, content, title, color);
                setTimeout(() => setIsSaving(false), 800);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [content, title, color, noteId, updateNote, note]);

    // Refs for flush-on-unmount
    const contentRef = useRef(content);
    const titleRef = useRef(title);
    const colorRef = useRef(color);

    // Sync refs
    useEffect(() => { contentRef.current = content; }, [content]);
    useEffect(() => { titleRef.current = title; }, [title]);
    useEffect(() => { colorRef.current = color; }, [color]);

    // Save on unmount (covers ESC, clicking outside, etc.)
    useEffect(() => {
        return () => {
            useStore.getState().updateNote(noteId, contentRef.current, titleRef.current, colorRef.current);
        };
    }, [noteId]);

    // Manual Save & Close
    const handleDone = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        try {
            updateNote(noteId, content, title, color);
        } catch (err) {
            console.error("Failed to save note:", err);
        }
        onClose();
    };

    const handleFormat = (cmd: string) => {
        if (!textareaRef.current) return;
        const ta = textareaRef.current;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const sel = content.substring(start, end);
        let wrap = ['', ''];
        if (cmd === 'bold') wrap = ['**', '**'];
        if (cmd === 'italic') wrap = ['_', '_'];
        if (cmd === 'list') wrap = ['\n• ', ''];
        setContent(content.substring(0, start) + wrap[0] + sel + wrap[1] + content.substring(end));
        setTimeout(() => ta.focus(), 0);
    };

    if (!note) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[2px] animate-in fade-in pointer-events-auto" onClick={handleDone}>
            <div
                className="w-[500px] h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
                style={{ backgroundColor: theme.bg, border: `4px solid ${color === '#FFFFFF' ? theme.border : color}` }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b flex justify-between items-center bg-white/50" style={{ borderColor: theme.border }}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/50 shadow-sm">
                            <StickyNote className="w-5 h-5" style={{ color: theme.primary }} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase font-bold tracking-wider opacity-40" style={{ color: theme.text }}>Editing Note</span>
                            <span className="text-[10px] text-gray-400">{isSaving ? 'Saving...' : 'All changes saved'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ColorPicker currentColor={color} onColorChange={setColor} theme={theme} />
                        <button onClick={handleDone} className="relative z-50 p-2 hover:bg-black/5 rounded-full transition-transform hover:scale-110 active:scale-90"><X className="w-5 h-5 opacity-60" /></button>
                    </div>
                </div>

                <FormattingToolbar onFormat={handleFormat} theme={theme} />

                {/* Title Input */}
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Untitled Note"
                    className="px-8 mt-6 text-3xl font-bold bg-transparent border-none focus:outline-none w-full placeholder:opacity-30"
                    style={{ color: theme.text }}
                />

                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write something memorable..."
                    className="flex-1 px-8 py-4 text-lg bg-transparent resize-none focus:outline-none custom-scrollbar leading-relaxed"
                    style={{ color: theme.text }}
                    autoFocus
                />

                <div className="p-4 border-t bg-white/50 flex justify-between items-center" style={{ borderColor: theme.border }}>
                    <button onClick={() => togglePinNote(noteId)} className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${note.pinned ? 'bg-[#4ECDC4]/10 text-[#4ECDC4]' : 'text-gray-400 hover:bg-black/5'}`}>
                        <Pin className="w-3 h-3" /> {note.pinned ? 'Pinned' : 'Pin This'}
                    </button>
                    <button onClick={handleDone} className="px-6 py-2 rounded-xl text-white font-bold text-sm hover:shadow-lg transition-all" style={{ backgroundColor: theme.text }}>Done</button>
                </div>
            </div>
        </div>
    );
}

export default function Overlay() {
    const {
        hoveredObject, activeContainerId, activeNoteId,
        openContainer, closeContainer, closeNote
    } = useStore();

    // Dynamic theme for prompt
    const promptTheme = getTheme(hoveredObject);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (activeNoteId) closeNote();
                else if (activeContainerId) closeContainer();
            }
            if (e.key === "e" || e.key === "E") {
                // Handled by InteractionManager also, but good redundancy if UI logic separate
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [hoveredObject, activeContainerId, activeNoteId, openContainer, closeContainer, closeNote]);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 font-sans">

            {/* Interaction Prompt (Dynamic Themed) */}
            {!activeContainerId && hoveredObject && (
                <div
                    className="flex items-center gap-4 px-6 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 backdrop-blur-sm transition-all"
                    style={{
                        position: 'fixed', bottom: '120px', left: '50%', transform: 'translateX(-50%)',
                        backgroundColor: promptTheme.bg,
                        border: `2px solid ${promptTheme.border}`,
                        color: promptTheme.text,
                        boxShadow: `0 10px 25px -5px ${promptTheme.primary}40`
                    }}
                >
                    <span className="text-3xl filter drop-shadow-md">{getFurnitureEmoji(hoveredObject)}</span>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg capitalize tracking-wide">{hoveredObject}</span>
                        <div className="flex items-center gap-2 text-xs opacity-70">
                            <span className="bg-black/10 px-1.5 py-0.5 rounded font-mono border border-black/5">E</span> to open
                        </div>
                    </div>
                </div>
            )}

            {/* Container Modal (The "Spatial" View) */}
            {activeContainerId && (
                <ContainerModal containerId={activeContainerId} onClose={closeContainer} />
            )}

            {/* Note Editor (Overlay on top of Container) */}
            {activeNoteId && (
                <NoteEditor noteId={activeNoteId} onClose={closeNote} />
            )}

            {/* Custom Crosshair */}
            {!activeContainerId && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${hoveredObject ? 'scale-150' : 'bg-white/60'}`}
                        style={{ backgroundColor: hoveredObject ? promptTheme.primary : undefined }}
                    />
                </div>
            )}
        </div>
    );
}
