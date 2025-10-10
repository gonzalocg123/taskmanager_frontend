import React from 'react';

const TaskItem = ({ 
    task, 
    isEditing, 
    editForm, 
    onEditFormChange, 
    onStartEdit, 
    onCancelEdit, 
    onSaveEdit, 
    onToggleComplete, 
    onDelete 
    }) => {
    if (isEditing) {
        return (
        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <input
            type="text"
            value={editForm.title}
            onChange={(e) => onEditFormChange({...editForm, title: e.target.value})}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Título"
            />
            <textarea
            value={editForm.description}
            onChange={(e) => onEditFormChange({...editForm, description: e.target.value})}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            placeholder="Descripción"
            rows="2"
            />
            <div className="flex gap-2">
            <button 
                onClick={onSaveEdit} 
                className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
            >
                Guardar
            </button>
            <button 
                onClick={onCancelEdit} 
                className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
                Cancelar
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className={`p-4 border rounded-lg flex justify-between items-start ${
        task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:bg-gray-50'
        }`}>
        <div className="flex-1">
            <div className="flex items-start gap-3">
            <button
                onClick={() => onToggleComplete(task)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'
                }`}
            >
                {task.completed && '✓'}
            </button>
            <div className="flex-1">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
                </h3>
                {task.description && (
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                )}
            </div>
            </div>
        </div>
        <div className="flex gap-2 ml-4">
            {!task.completed && (
            <button 
                onClick={() => onStartEdit(task)} 
                className="px-3 py-1 text-blue-600 bg-blue-100 rounded hover:bg-blue-200" 
                title="Editar"
            >
                ✏️
            </button>
            )}
            <button 
            onClick={() => onDelete(task.id)} 
            className="px-3 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200" 
            title="Eliminar"
            >
            🗑️
            </button>
        </div>
        </div>
    );
};

export default TaskItem;