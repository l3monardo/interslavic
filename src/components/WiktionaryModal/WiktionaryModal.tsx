import React from 'react';
import './WiktionaryModal.scss';

interface IWiktionaryModalProps {
    url: string;
    word: string;
    language: string;
    onClose: () => void;
}

export const WiktionaryModal: React.FC<IWiktionaryModalProps> = ({ url, word, language, onClose }) => {
    return (
        <div className="wiktionary-modal-overlay" onClick={onClose}>
            <div className="wiktionary-modal" onClick={(e) => e.stopPropagation()}>
                <div className="wiktionary-modal__header">
                    <h3>
                        {language}: <span className="word">{word}</span>
                    </h3>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="wiktionary-modal__content">
                    <iframe
                        src={url}
                        title={`Wiktionary: ${word}`}
                        className="wiktionary-iframe"
                    />
                </div>
                <div className="wiktionary-modal__footer">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Open in new tab →
                    </a>
                </div>
            </div>
        </div>
    );
};
