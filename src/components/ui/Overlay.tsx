"use client";

import { useStore, NoteEntry } from "@/store/useStore";
import { X, Save, Pin, PinOff, Trash2, Search, List, Bold, Italic, Underline, Palette, Sparkles, BookOpen, Clock, Plus, LayoutGrid, List as ListIcon, StickyNote, Bed, Monitor, Library, Snowflake, Package } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

import { DEFAULT_THEME, getTheme } from "@/lib/theme";

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

function getFurnitureIcon(id: string) {
    const iconProps = { className: "w-8 h-8" };
    switch (id) {
        case 'bed': return <Bed {...iconProps} />;
        case 'desk': return <Monitor {...iconProps} />;
        case 'fridge': return <Snowflake {...iconProps} />;
        case 'bookshelf': return <Library {...iconProps} />;
        default: return <Package {...iconProps} />;
    }
}

// ============= COMPONENTS =============

function FormattingToolbar({ onFormat, theme }: { onFormat: (cmd: string) => void, theme: typeof DEFAULT_THEME }) {
    const btnClass = "p-1.5 rounded-md transition-all hover:bg-black/5 text-xs font-medium";
    const defaultStyle = { color: theme.text };

    return (
        <div className="flex items-center gap-1">
            <button aria-label="Bold" onClick={() => onFormat('bold')} className={`${btnClass}`} style={defaultStyle} title="Bold"><Bold className="w-4 h-4" /></button>
            <button aria-label="Italic" onClick={() => onFormat('italic')} className={`${btnClass}`} style={defaultStyle} title="Italic"><Italic className="w-4 h-4" /></button>
            <button aria-label="Underline" onClick={() => onFormat('underline')} className={`${btnClass}`} style={defaultStyle} title="Underline"><Underline className="w-4 h-4" /></button>
            <div className="w-px h-3 mx-1 bg-current opacity-20" style={{ color: theme.text }} />
            <button aria-label="List" onClick={() => onFormat('list')} className={`${btnClass}`} style={defaultStyle} title="List"><List className="w-4 h-4" /></button>
        </div>
    );
}

function ColorPicker({ currentColor, onColorChange, theme }: { currentColor: string, onColorChange: (color: string) => void, theme: typeof DEFAULT_THEME }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button aria-label="Choose color" onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none" style={{ backgroundColor: currentColor, borderColor: theme.border, '--tw-ring-color': theme.primary } as any}>
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
    const isWhite = note.color === '#FFFFFF';
    return (
        <div
            onClick={onClick}
            className="group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-40 overflow-hidden"
            style={{
                backgroundColor: note.color,
                border: isWhite ? `1px solid ${theme.border}` : 'none',
                color: theme.text
            }}
        >
            {/* Hover Actions (Floating) */}
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                    onClick={(e) => { e.stopPropagation(); onPin(); }}
                    className="p-1.5 bg-white/90 rounded-full hover:text-yellow-600 shadow-sm transition-transform hover:scale-110"
                    title={note.pinned ? "Unpin" : "Pin"}
                >
                    <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'fill-current text-yellow-500' : ''}`} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-1.5 bg-white/90 rounded-full hover:text-red-500 shadow-sm transition-transform hover:scale-110"
                    title="Delete"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
                <h4 className={`font-bold text-lg mb-2 leading-tight ${!note.title ? 'opacity-30 italic' : ''}`}>
                    {note.title || "Untitled"}
                </h4>

                {note.content ? (
                    <p className="text-sm opacity-70 leading-relaxed line-clamp-4">
                        {note.content}
                    </p>
                ) : (
                    <div className="flex-1 opacity-10 flex flex-col gap-2 mt-1">
                        <div className="h-2 w-3/4 bg-current rounded-full" />
                        <div className="h-2 w-1/2 bg-current rounded-full" />
                    </div>
                )}
            </div>

            {/* Footer Meta */}
            <div className="absolute bottom-4 left-5 text-[10px] uppercase tracking-wider font-semibold opacity-40">
                {formatDate(note.updatedAt)}
            </div>

            {/* Pinned Indicator (Always visible if pinned) */}
            {note.pinned && (
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 opacity-50" />
            )}
        </div>
    );
}

function ContainerModal({ containerId, onClose }: { containerId: string, onClose: () => void }) {
    const getNotesByParent = useStore(state => state.getNotesByParent);
    const createNote = useStore(state => state.createNote);
    const openNote = useStore(state => state.openNote);
    const togglePinNote = useStore(state => state.togglePinNote);
    const deleteNote = useStore(state => state.deleteNote);
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
                        <div className="text-4xl filter drop-shadow-sm text-black/50">{getFurnitureIcon(containerId)}</div>
                        <div>
                            <h2 className="text-2xl font-bold capitalize" style={{ color: theme.text }}>{containerId}</h2>
                            <p className="text-sm opacity-60 font-medium">{notes.length} items stored</p>
                        </div>
                    </div>
                    <button aria-label="Close" onClick={onClose} className="p-2 rounded-full hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
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
    const updateNote = useStore(state => state.updateNote);
    const togglePinNote = useStore(state => state.togglePinNote);
    const notes = useStore(state => state.notes);
    const activeContainerId = useStore(state => state.activeContainerId);
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in pointer-events-auto" onClick={handleDone}>
            <div
                className="w-[600px] h-[700px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
                style={{ backgroundColor: theme.bg, boxShadow: `0 25px 50px -12px ${theme.primary}30` }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header Actions */}
                <div className="px-8 py-6 flex justify-between items-center z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => togglePinNote(noteId)}
                            className={`p-2 rounded-full transition-all ${note.pinned ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-black/5 text-gray-400'}`}
                            title={note.pinned ? "Unpin" : "Pin"}
                        >
                            <Pin className={`w-5 h-5 ${note.pinned ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-xs font-semibold tracking-wider opacity-30 uppercase">{isSaving ? 'Saving...' : 'Saved'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ColorPicker currentColor={color} onColorChange={setColor} theme={theme} />
                        <button
                            aria-label="Close"
                            onClick={handleDone}
                            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col px-12 pb-12 overflow-hidden">
                    {/* Title */}
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Untitled Note"
                        className="text-4xl font-extrabold bg-transparent border-none focus:outline-none focus:placeholder:opacity-50 w-full placeholder:opacity-20 text-balance mb-6"
                        style={{ color: theme.text }}
                    />

                    {/* Toolbar (Inline with text area start) */}
                    <div className="flex items-center gap-2 mb-4 opacity-70 hover:opacity-100 transition-opacity">
                        <FormattingToolbar onFormat={handleFormat} theme={theme} />
                    </div>

                    {/* Text Divider */}
                    <div className="w-full h-px bg-current opacity-10 mb-6" style={{ color: theme.text }} />

                    {/* Body */}
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Write your thoughts..."
                        className="flex-1 w-full text-lg bg-transparent resize-none focus:outline-none custom-scrollbar leading-relaxed font-medium opacity-90"
                        style={{ color: theme.text }}
                        autoFocus
                    />
                </div>

                {/* Footer Gradient for style */}
                <div className="h-2 w-full opacity-50" style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }} />
            </div>
        </div>
    );
}

export default function Overlay() {
    const hoveredObject = useStore(state => state.hoveredObject);
    const activeContainerId = useStore(state => state.activeContainerId);
    const activeNoteId = useStore(state => state.activeNoteId);
    const openContainer = useStore(state => state.openContainer);
    const closeContainer = useStore(state => state.closeContainer);
    const closeNote = useStore(state => state.closeNote);

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
                    className="flex items-center gap-5 px-6 py-4 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 backdrop-blur-md transition-all ease-out"
                    style={{
                        position: 'fixed', bottom: '120px', left: '50%', transform: 'translateX(-50%)',
                        backgroundColor: `${promptTheme.bg}E6`, // 90% opacity for glass effect
                        border: `1px solid ${promptTheme.border}`,
                        color: promptTheme.text,
                        boxShadow: `0 20px 40px -10px ${promptTheme.primary}40, 0 0 0 1px ${promptTheme.border} inset`
                    }}
                >
                    {/* Icon Container with subtle background for separation */}
                    <div
                        className="p-3 rounded-xl flex items-center justify-center bg-white/40 shadow-inner"
                        style={{ color: promptTheme.primary }}
                    >
                        {getFurnitureIcon(hoveredObject)}
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-extrabold text-xl capitalize tracking-tight leading-none">
                            {hoveredObject}
                        </span>

                        <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                            {/* Premium Keyboard Key Style */}
                            <div className="flex items-center justify-center w-6 h-6 rounded bg-white border-b-2 border-gray-200 shadow-sm text-xs font-bold font-mono text-gray-600">
                                E
                            </div>
                            <span>to open</span>
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
