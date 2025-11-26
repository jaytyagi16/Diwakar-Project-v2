import React, { useState, useEffect } from 'react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (actionId: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onAction }) => {
  const [search, setSearch] = useState('');
  
  const commands = [
    { id: 'docs', icon: '📋', label: 'Request Documents', shortcut: '⌘⇧D', category: 'actions' },
    { id: 'call', icon: '📞', label: 'Call Claimant', shortcut: '⌘⇧C', category: 'actions' },
    { id: 'siu', icon: '⚠️', label: 'Flag for SIU', shortcut: '⌘⇧F', category: 'actions' },
    { id: 'step1', icon: '1️⃣', label: 'Go to FNOL Intake', shortcut: '⌘1', category: 'navigation' },
    { id: 'step2', icon: '2️⃣', label: 'Go to AI Triage', shortcut: '⌘2', category: 'navigation' },
    { id: 'step3', icon: '3️⃣', label: 'Go to Pre-Investigation', shortcut: '⌘3', category: 'navigation' },
    { id: 'step4', icon: '4️⃣', label: 'Go to Settlement', shortcut: '⌘4', category: 'navigation' },
    { id: 'chat', icon: '💬', label: 'Open AI Chat', shortcut: '⌘J', category: 'tools' },
    { id: 'theme', icon: '🌙', label: 'Toggle Dark Mode', shortcut: '⌘D', category: 'tools' },
    { id: 'compare', icon: '📊', label: 'Compare Similar Claims', shortcut: '⌘I', category: 'tools' },
    { id: 'timeline', icon: '📍', label: 'View Timeline', shortcut: '⌘T', category: 'tools' },
  ];
  
  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(() => {
    if (isOpen) {
        setSearch('');
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <>
      <div className="command-backdrop" onClick={onClose} />
      <div className="command-palette">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl">🔍</span>
          <input 
            type="text"
            placeholder="Search or type a command..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-gray-900 dark:text-white text-base outline-none placeholder-gray-400"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {['actions', 'navigation', 'tools'].map(category => {
            const categoryCommands = filteredCommands.filter(cmd => cmd.category === category);
            if (categoryCommands.length === 0) return null;
            
            return (
                <div key={category} className="mb-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{category}</div>
                {categoryCommands.map(cmd => (
                    <button 
                        key={cmd.id}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
                        onClick={() => { onAction(cmd.id); onClose(); }}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">{cmd.icon}</span>
                        <span className="flex-1 font-medium">{cmd.label}</span>
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">{cmd.shortcut}</span>
                    </button>
                    ))}
                </div>
            );
          })}
          {filteredCommands.length === 0 && (
             <div className="p-8 text-center text-gray-500">No commands found.</div>
          )}
        </div>
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 flex justify-between">
          <span>Navigation <kbd className="font-sans">↑↓</kbd></span>
          <span>Close <kbd className="font-sans">ESC</kbd></span>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;