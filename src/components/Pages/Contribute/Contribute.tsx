import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotificationAction } from 'actions'
import { t } from 'translations'
import { Button, InputText, Selector, Textarea } from 'components'

import './Contribute.scss'

export const Contribute = () => {
    const dispatch = useDispatch()

    // Report Error Form State
    const [reportWord, setReportWord] = useState('')
    const [reportDesc, setReportDesc] = useState('')
    const [reportErrors, setReportErrors] = useState({ word: false, desc: false })

    // Proposal Form State
    const [proposalType, setProposalType] = useState('word') // 'word' | 'other'
    const [proposalWord, setProposalWord] = useState('')
    const [proposalDesc, setProposalDesc] = useState('')
    const [proposalErrors, setProposalErrors] = useState({ word: false, desc: false })

    const proposalOptions = [
        { name: t('contributeTypeWord'), value: 'word' },
        { name: t('contributeTypeOther'), value: 'other' },
    ]

    const handleReportSubmit = () => {
        const errors = {
            word: reportWord.trim() === '',
            desc: reportDesc.trim() === '',
        }
        setReportErrors(errors)

        if (!errors.word && !errors.desc) {
            dispatch(setNotificationAction({ text: t('contributeThankYou'), type: 'valid' }))
            setReportWord('')
            setReportDesc('')
            setReportErrors({ word: false, desc: false })
        }
    }

    const handleProposalSubmit = () => {
        const errors = {
            word: proposalType === 'word' && proposalWord.trim() === '',
            desc: proposalDesc.trim() === '',
        }
        setProposalErrors(errors)

        if (!errors.word && !errors.desc) {
            dispatch(setNotificationAction({ text: t('contributeThankYou'), type: 'valid' }))
            setProposalWord('')
            setProposalDesc('')
            setProposalErrors({ word: false, desc: false })
        }
    }

    return (
        <div className="contribute-container">
            <div className="contribute">
                <h5 className="contribute__title">
                    <span className="contribute__title-icon">🤝</span>
                    {t('contributeTitle')}
                </h5>

                {/* ── Informacija ── */}
                <div className="contribute__group">
                    <p className="contribute__group-header">{t('contributeInfoTitle')}</p>
                    <div className="contribute__group-body">
                        <p className="contribute__info-text">{t('contributeInfoText')}</p>
                    </div>
                </div>

                {/* ── Report Error ── */}
                <div className="contribute__group">
                    <p className="contribute__group-header">{t('contributeReportErrorTitle')}</p>
                    <div className="contribute__group-body">
                        <div className="contribute__field">
                            <label className="contribute__label">{t('contributeWordLabel')}</label>
                            <InputText
                                className={classNames({ 'error-highlight': reportErrors.word })}
                                value={reportWord}
                                onChange={setReportWord}
                            />
                        </div>
                        <div className="contribute__field-margin" />
                        <div className="contribute__field">
                            <label className="contribute__label">{t('contributeDescLabel')}</label>
                            <Textarea
                                className={classNames({ 'error-highlight': reportErrors.desc })}
                                value={reportDesc}
                                onChange={setReportDesc}
                                autoresize
                            />
                        </div>
                        <div className="contribute__submit-container">
                            <Button
                                title={t('contributeSubmit')}
                                onClick={handleReportSubmit}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Make a Proposal ── */}
                <div className="contribute__group">
                    <p className="contribute__group-header">{t('contributeProposeTitle')}</p>
                    <div className="contribute__group-body">
                        <div className="contribute__field">
                            <label className="contribute__label">{t('contributeProposalType')}</label>
                            <Selector
                                options={proposalOptions}
                                value={proposalType}
                                onSelect={(val) => {
                                    setProposalType(val)
                                    setProposalErrors({ word: false, desc: false })
                                }}
                            />
                        </div>
                        
                        <div className="contribute__field-margin" />

                        {proposalType === 'word' && (
                            <>
                                <div className="contribute__field">
                                    <label className="contribute__label">{t('contributeWordLabel')}</label>
                                    <InputText
                                        className={classNames({ 'error-highlight': proposalErrors.word })}
                                        value={proposalWord}
                                        onChange={setProposalWord}
                                    />
                                </div>
                                <div className="contribute__field-margin" />
                            </>
                        )}

                        <div className="contribute__field">
                            <label className="contribute__label">{t('contributeDescLabel')}</label>
                            <Textarea
                                className={classNames({ 'error-highlight': proposalErrors.desc })}
                                value={proposalDesc}
                                onChange={setProposalDesc}
                                autoresize
                            />
                        </div>
                        <div className="contribute__submit-container">
                            <Button
                                title={t('contributeSubmit')}
                                onClick={handleProposalSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
