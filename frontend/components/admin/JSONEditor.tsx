'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface JSONEditorProps {
    data: Record<string, any>;
    onChange: (data: Record<string, any>) => void;
}

export default function JSONEditor({ data, onChange }: JSONEditorProps) {
    const [jsonString, setJsonString] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'visual' | 'code'>('visual');

    useEffect(() => {
        setJsonString(JSON.stringify(data, null, 2));
    }, [data]);

    const handleCodeChange = (value: string) => {
        setJsonString(value);
        try {
            const parsed = JSON.parse(value);
            setError('');
            onChange(parsed);
        } catch (err) {
            setError('Invalid JSON format');
        }
    };

    const updateValue = (path: string[], value: any) => {
        const newData = JSON.parse(JSON.stringify(data));
        let current = newData;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }

        current[path[path.length - 1]] = value;
        onChange(newData);
    };

    const deleteKey = (path: string[]) => {
        const newData = JSON.parse(JSON.stringify(data));
        let current = newData;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }

        if (Array.isArray(current)) {
            current.splice(parseInt(path[path.length - 1]), 1);
        } else {
            delete current[path[path.length - 1]];
        }

        onChange(newData);
    };

    const addKey = (path: string[], key: string, value: any) => {
        const newData = JSON.parse(JSON.stringify(data));
        let current = newData;

        for (const p of path) {
            current = current[p];
        }

        if (Array.isArray(current)) {
            current.push(value);
        } else {
            current[key] = value;
        }

        onChange(newData);
    };

    return (
        <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => setMode('visual')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mode === 'visual'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Visual Editor
                </button>
                <button
                    onClick={() => setMode('code')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        mode === 'code'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Code Editor
                </button>
            </div>

            {mode === 'code' ? (
                <div>
          <textarea
              value={jsonString}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-96 px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter JSON data..."
          />
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
            ) : (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <JSONNode
                        data={data}
                        path={[]}
                        onUpdate={updateValue}
                        onDelete={deleteKey}
                        onAdd={addKey}
                    />
                </div>
            )}
        </div>
    );
}

interface JSONNodeProps {
    data: any;
    path: string[];
    onUpdate: (path: string[], value: any) => void;
    onDelete: (path: string[]) => void;
    onAdd: (path: string[], key: string, value: any) => void;
}

function JSONNode({ data, path, onUpdate, onDelete, onAdd }: JSONNodeProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [newKey, setNewKey] = useState('');
    const [showAddField, setShowAddField] = useState(false);

    if (data === null || data === undefined) {
        return (
            <input
                type="text"
                value="null"
                onChange={(e) => onUpdate(path, e.target.value === 'null' ? null : e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 rounded"
            />
        );
    }

    if (typeof data === 'boolean') {
        return (
            <select
                value={data.toString()}
                onChange={(e) => onUpdate(path, e.target.value === 'true')}
                className="px-2 py-1 text-sm border border-gray-300 rounded"
            >
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
        );
    }

    if (typeof data === 'number') {
        return (
            <input
                type="number"
                value={data}
                onChange={(e) => onUpdate(path, parseFloat(e.target.value) || 0)}
                className="px-2 py-1 text-sm border border-gray-300 rounded w-32"
            />
        );
    }

    if (typeof data === 'string') {
        return (
            <input
                type="text"
                value={data}
                onChange={(e) => onUpdate(path, e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 rounded flex-1"
            />
        );
    }

    if (Array.isArray(data)) {
        return (
            <div className="space-y-2">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span>Array ({data.length} items)</span>
                </button>
                {isExpanded && (
                    <div className="ml-6 space-y-2">
                        {data.map((item, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200">
                                <span className="text-xs text-gray-500 font-mono mt-1">[{index}]</span>
                                <div className="flex-1">
                                    <JSONNode
                                        data={item}
                                        path={[...path, index.toString()]}
                                        onUpdate={onUpdate}
                                        onDelete={onDelete}
                                        onAdd={onAdd}
                                    />
                                </div>
                                <button
                                    onClick={() => onDelete([...path, index.toString()])}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => onAdd(path, '', '')}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                            <Plus size={14} />
                            <span>Add Item</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }

    if (typeof data === 'object') {
        return (
            <div className="space-y-2">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span>Object ({Object.keys(data).length} keys)</span>
                </button>
                {isExpanded && (
                    <div className="ml-6 space-y-2">
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200">
                <span className="text-xs text-gray-700 font-mono font-semibold mt-1 min-w-[100px]">
                  {key}:
                </span>
                                <div className="flex-1">
                                    <JSONNode
                                        data={value}
                                        path={[...path, key]}
                                        onUpdate={onUpdate}
                                        onDelete={onDelete}
                                        onAdd={onAdd}
                                    />
                                </div>
                                <button
                                    onClick={() => onDelete([...path, key])}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        {showAddField ? (
                            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                                <input
                                    type="text"
                                    placeholder="Key name"
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && newKey) {
                                            onAdd(path, newKey, '');
                                            setNewKey('');
                                            setShowAddField(false);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        if (newKey) {
                                            onAdd(path, newKey, '');
                                            setNewKey('');
                                            setShowAddField(false);
                                        }
                                    }}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddField(false);
                                        setNewKey('');
                                    }}
                                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAddField(true)}
                                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                                <Plus size={14} />
                                <span>Add Property</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return <span className="text-sm text-gray-600">{String(data)}</span>;
}