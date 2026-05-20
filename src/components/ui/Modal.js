import React from 'react';
import { X } from '../common/Icon';

const Modal = ({ children, onClose, large, title }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={onClose}>
        <div
            className={`modal-content bg-slate-900 border border-white/20 rounded-2xl p-8 ${large ? 'max-w-3xl' : 'max-w-2xl'} w-full max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
            {children}
        </div>
    </div>
);

export default Modal;