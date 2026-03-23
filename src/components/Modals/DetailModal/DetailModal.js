import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Component } from 'react';
import { connect } from 'react-redux';
import { alphabetTypes } from 'consts';
import { t } from 'translations';
import { hideModalDialog, setAlphabetTypeAction } from 'actions';
import { expandAbbr, getCaseTips, getCyrillic, getGender, getGlagolitic, getLatin, getNumeralType, getPartOfSpeech, getPronounType, isAnimate, isIndeclinable, isPlural, isSingular, } from 'utils';
import { LineSelector, Text } from 'components';
import { Table } from 'components/Table';
import './DetailModal.scss';
import { conjugationVerb, declensionAdjective, declensionNoun, declensionNumeral, declensionPronoun } from '@interslavic/utils';
/* eslint-disable max-len */
class DetailModalInternal extends Component {
    render() {
        if (!this.props.details) {
            return null;
        }
        const { word, add, details } = this.props;
        return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "modal-dialog__header", children: [_jsxs("span", { className: "modal-dialog__header-title", children: [this.formatStr(word), " ", this.formatStr(add), " ", _jsxs("span", { className: "details", children: ["(", expandAbbr(t, details), ")"] })] }), _jsx("button", { className: "modal-dialog__header-close", "aria-label": t('close'), onClick: this.props.close, children: "\u00D7" })] }), _jsx("div", { className: "modal-dialog__body", children: this.renderBody() }), this.renderFooter()] }));
    }
    renderFooter() {
        const options = alphabetTypes
            .filter(({ value }) => this.props.alphabets[value])
            .map((item) => ({ name: t(item.name), value: item.value }));
        if (options.length === 1) {
            return null;
        }
        return (_jsx("footer", { className: "modal-dialog__footer", children: _jsx(LineSelector, { options: options, value: this.props.alphabetType, onSelect: (type) => this.props.setAlphabetType(type) }) }));
    }
    renderBody() {
        const fieldIsv = this.props.word;
        const fieldAddition = this.props.add;
        const fieldPartOfSpeech = this.props.details;
        const splitted = fieldIsv.split(',');
        if (splitted.length === 1 && fieldPartOfSpeech.indexOf('m./f.') !== -1) {
            return [
                this.renderWord([fieldIsv, fieldAddition, 'm.'], ['showTitle', 'showGender', 'oneMore']),
                this.renderWord([fieldIsv, fieldAddition, 'f.'], ['showTitle', 'showGender']),
            ];
        }
        return splitted.map((word, i) => {
            const options = [];
            if (splitted.length > 1) {
                options.push('showTitle');
                if (i < splitted.length - 1) {
                    options.push('oneMore');
                }
            }
            return this.renderWord([word.trim(), fieldAddition, fieldPartOfSpeech], options);
        });
    }
    renderWord(rawItem, options) {
        const [word, add, details] = rawItem;
        let wordComponent;
        let remark = '';
        switch (getPartOfSpeech(details)) {
            case 'noun':
                if (options.includes('showGender')) {
                    remark = (details === 'm.' ? ' (' + t('noun-masculine') + ')' : ' (' + t('noun-feminine') + ')');
                }
                wordComponent = this.renderNounDetails(word, add, details);
                break;
            case 'adjective':
                wordComponent = this.renderAdjectiveDetails(word, details);
                break;
            case 'verb':
                wordComponent = this.renderVerbDetails(word, add, details);
                break;
            case 'numeral':
                wordComponent = this.renderNumeralDetails(word, details);
                break;
            case 'pronoun':
                wordComponent = this.renderPronounDetails(word, details);
                break;
            default:
                return '';
        }
        return (_jsxs("div", { className: "word", children: [options.includes('showTitle') ? _jsxs("h6", { children: [this.formatStr(word), remark] }) : '', wordComponent, options.includes('oneMore') ? _jsx("hr", {}) : ''] }, word));
    }
    formatStr(str) {
        if (str === '') {
            return '';
        }
        else if (str == null) {
            return '&mdash;';
        }
        else if (str.match(/&\w+;/g)) {
            return str;
        }
        switch (this.props.alphabetType) {
            case 'latin':
                return getLatin(str, this.props.flavorisationType);
            case 'cyrillic':
                return getCyrillic(str, this.props.flavorisationType);
            case 'glagolitic':
                return getGlagolitic(str, this.props.flavorisationType);
        }
    }
    renderVerbDetails(word, add, details) {
        const data = conjugationVerb(word, add, details);
        if (data === null) {
            return (_jsx("div", { children: _jsx(Text, { children: 'No data for conjugation this verb' }) }));
        }
        const tableData1 = [
            [
                '&nbsp@bl;bt;w=2',
                `${t('present')}@;b`,
                ...(this.props.displayImperfect ? [`${t('simplePast')}@;b`] : []),
                `${t('future')}@;b`,
            ],
        ];
        const forms1 = [
            '1sg',
            '2sg',
            '3sg',
            '1pl',
            '2pl',
            '3pl',
        ];
        const pronouns1 = [
            'ja',
            'ty',
            'on ona ono',
            'my',
            'vy',
            'oni one',
        ];
        pronouns1.forEach((pronoun, i) => {
            tableData1.push([
                `${t(forms1[i])}@b`,
                `${this.formatStr(pronoun)}@`,
                `${this.formatStr(data.present[i])}@`,
                ...(this.props.displayImperfect ? [`${this.formatStr(data.imperfect[i])}@`] : []),
                `${this.formatStr(data.future[i])}@`,
            ]);
        });
        const tableData2 = [
            [
                '&nbsp@bl;bt;w=2',
                `${t(this.props.displayImperfect ? 'perfect' : 'past')}@;b`,
                ...(this.props.displayImperfect ? [`${t('pluperfect')}@;b`] : []),
                `${t('conditional')}@;b`,
            ],
        ];
        const forms2 = [
            '1sg',
            '2sg',
            '3sg',
            null,
            null,
            '1pl',
            '2pl',
            '3pl',
        ];
        const pronouns2 = [
            'ja',
            'ty',
            'on',
            'ona',
            'ono',
            'my',
            'vy',
            'oni one',
        ];
        pronouns2.forEach((pronoun, i) => {
            const item = [
                `${this.formatStr(pronoun)}@`,
                `${this.formatStr(data.perfect[i])}@`,
                ...(this.props.displayImperfect ? [`${this.formatStr(data.pluperfect[i])}@`] : []),
                `${this.formatStr(data.conditional[i])}@`,
            ];
            if (forms2[i]) {
                let str = `${t(forms2[i])}@b`;
                if (forms2[i] === '3sg') {
                    str += ';h=3';
                }
                item.unshift(str);
            }
            tableData2.push(item);
        });
        const tableData = [...tableData1,
            ['@w=2;bb;bl;br', '@w=3;bl;br'],
            ...tableData2];
        const tableDataAdd = [
            [
                `${t('infinitive')}@b`,
                this.formatStr(data.infinitive),
            ],
            [
                `${t('imperative')}@b`,
                this.formatStr(data.imperative),
            ],
            [
                `${t('presentActiveParticiple')}@b`,
                this.formatStr(data.prap),
            ],
            [
                `${t('presentPassiveParticiple')}@b`,
                this.formatStr(data.prpp),
            ],
            [
                `${t('pastActiveParticiple')}@b`,
                this.formatStr(data.pfap),
            ],
            [
                `${t('pastPassiveParticiple')}@b`,
                this.formatStr(data.pfpp),
            ],
            [
                `${t('verbalNoun')}@b`,
                this.formatStr(data.gerund),
            ],
        ];
        return (_jsxs(_Fragment, { children: [_jsx(Table, { data: tableData }, 0), _jsx(Table, { data: tableDataAdd }, 2)] }));
    }
    renderAdjectiveDetails(word, details) {
        const { singular, plural, comparison } = declensionAdjective(word, '', details);
        const tableDataSingular = this.getAdjectiveSingularCasesTable(singular);
        const tableDataPlural = this.getAdjectivePluralCasesTable(plural);
        const tableDataComparison = [
            [
                `${t('degreesOfComparison')}@b`,
                `${t('adjective')}@b`,
                `${t('adverb')}@b`,
            ],
            [
                `${t('positive')}@b`,
                `${this.formatStr(comparison.positive[0])}@`,
                `${this.formatStr(comparison.positive[1])}@`,
            ],
            [
                `${t('comparative')}@b`,
                `${this.formatStr(comparison.comparative[0])}@`,
                `${this.formatStr(comparison.comparative[1])}@`,
            ],
            [
                `${t('superlative')}@b`,
                `${this.formatStr(comparison.superlative[0])}@`,
                `${this.formatStr(comparison.superlative[1])}@`,
            ],
        ];
        return (_jsxs(_Fragment, { children: [_jsx(Table, { data: tableDataSingular }, 0), _jsx(Table, { data: tableDataPlural }, 1), _jsx(Table, { data: tableDataComparison }, 2)] }));
    }
    renderNounDetails(word, add, details) {
        const gender = getGender(details);
        const animate = isAnimate(details);
        const plural = isPlural(details);
        const singular = isSingular(details);
        const indeclinable = isIndeclinable(details);
        const cases = declensionNoun(word, add, gender, animate, plural, singular, indeclinable);
        if (cases === null) {
            return (_jsx("div", { children: _jsx(Text, { children: 'No data for declination this word/phrase' }) }));
        }
        const tableDataCases = this.getSimpleCasesTable({
            columns: ['singular', 'plural'],
            cases,
        });
        return _jsx(Table, { data: tableDataCases });
    }
    getSimpleCasesTable(paradigmArray) {
        const tableDataCases = [[`${t('case')}@b`]];
        paradigmArray.columns.forEach((col) => {
            tableDataCases[0].push(t(col) + '@b');
        });
        this.props.orderOfCases.forEach((caseItem) => {
            if (caseItem in paradigmArray.cases) {
                const caseName = t(`case${caseItem[0].toUpperCase()}${caseItem.slice(1)}`);
                const tableRow = [`${caseName}@b@${this.formatStr(getCaseTips(caseItem, 'noun'))}`];
                paradigmArray.cases[caseItem].forEach((caseForm) => {
                    tableRow.push(`${this.formatStr(caseForm)}@`);
                });
                tableDataCases.push(tableRow);
            }
        });
        return tableDataCases;
    }
    getAdjectiveSingularCasesTable(singular) {
        const table = [
            [
                '&nbsp@bl;bt',
                `${t('singular')}@w=4;b`,
            ],
            [
                `${t('case')}@h=2;b`,
                `${t('masculine')}@w=2;b`,
                `${t('neuter')}@h=2;b`,
                `${t('feminine')}@h=2;b`,
            ],
            [
                `${t('masculineAnimate')}@b`,
                `${t('masculineInanimate')}@b`,
            ],
        ];
        this.props.orderOfCases.forEach((caseItem) => {
            if (caseItem in singular) {
                const tableRow = [
                    `${t(`case${caseItem[0].toUpperCase()}${caseItem.slice(1)}`)}@b@${this.formatStr(getCaseTips(caseItem, 'adjectiveSingular'))}`,
                ];
                switch (caseItem) {
                    case 'nom':
                        tableRow.push(`${this.formatStr(singular[caseItem][0])}@w=2`, `${this.formatStr(singular[caseItem][1])}@`, `${this.formatStr(singular[caseItem][2])}@`);
                        break;
                    case 'acc':
                        tableRow.push(`${this.formatStr(singular[caseItem][0].split(' / ')[0])}@`, `${this.formatStr(singular[caseItem][0].split(' / ')[1])}@`, `${this.formatStr(singular[caseItem][1])}@`, `${this.formatStr(singular[caseItem][2])}@`);
                        break;
                    default:
                        tableRow.push(`${this.formatStr(singular[caseItem][0])}@w=3`, `${this.formatStr(singular[caseItem][1])}@`);
                        break;
                }
                table.push(tableRow);
            }
        });
        return table;
    }
    getAdjectivePluralCasesTable(plural) {
        const table = [
            [
                '&nbsp@bl;bt',
                `${t('plural')}@w=3;b`,
            ],
            [
                `${t('case')}@h=2;b`,
                `${t('masculine')}@w=2;b`,
                `${t('feminineOrNeuter')}@h=2;b`,
            ],
            [
                `${t('masculineAnimate')}@b`,
                `${t('masculineInanimate')}@b`,
            ],
        ];
        this.props.orderOfCases.forEach((caseItem) => {
            if (caseItem in plural) {
                const tableRow = [
                    `${t(`case${caseItem[0].toUpperCase()}${caseItem.slice(1)}`)}@b@${this.formatStr(getCaseTips(caseItem, 'adjectivePlural'))}`,
                ];
                switch (caseItem) {
                    case 'nom':
                    case 'acc':
                        tableRow.push(`${this.formatStr(plural[caseItem][0].split(' / ')[0])}@`, `${this.formatStr(plural[caseItem][0].split(' / ')[1])}@`, `${this.formatStr(plural[caseItem][1])}@`);
                        break;
                    default:
                        tableRow.push(`${this.formatStr(plural[caseItem][0])}@w=3`);
                        break;
                }
                table.push(tableRow);
            }
        });
        return table;
    }
    renderNumeralDetails(word, details) {
        const numeralType = getNumeralType(details);
        const numeralParadigm = declensionNumeral(word, numeralType);
        if (numeralParadigm === null) {
            return (_jsx("div", { children: _jsx(Text, { children: 'No data for declination this word' }) }));
        }
        if (numeralParadigm.type === 'noun') {
            const tableDataCases = this.getSimpleCasesTable(numeralParadigm);
            return _jsx(Table, { data: tableDataCases });
        }
        if (numeralParadigm.type === 'adjective') {
            const tableDataSingular = this.getAdjectiveSingularCasesTable(numeralParadigm.casesSingular);
            const tableDataPlural = this.getAdjectivePluralCasesTable(numeralParadigm.casesPlural);
            return (_jsxs(_Fragment, { children: [_jsx(Table, { data: tableDataSingular }, 0), _jsx(Table, { data: tableDataPlural }, 1)] }));
        }
    }
    renderPronounDetails(word, details) {
        const pronounType = getPronounType(details);
        const pronounParadigm = declensionPronoun(word, pronounType);
        if (pronounParadigm === null) {
            return (_jsx("div", { children: _jsx(Text, { children: 'No data for declination this word' }) }));
        }
        if (pronounParadigm.type === 'noun') {
            const tableDataCases = this.getSimpleCasesTable(pronounParadigm);
            return _jsx(Table, { data: tableDataCases });
        }
        if (pronounParadigm.type === 'adjective') {
            const tableDataSingular = this.getAdjectiveSingularCasesTable(pronounParadigm.casesSingular);
            const tableDataPlural = this.getAdjectivePluralCasesTable(pronounParadigm.casesPlural);
            return (_jsxs(_Fragment, { children: [_jsx(Table, { data: tableDataSingular }, 0), _jsx(Table, { data: tableDataPlural }, 1)] }));
        }
    }
}
function mapDispatchToProps(dispatch) {
    return {
        close: () => dispatch(hideModalDialog()),
        setAlphabetType: (type) => dispatch(setAlphabetTypeAction(type)),
    };
}
function mapStateToProps({ modalDialog, alphabetType, flavorisationType, alphabets, interfaceLang, orderOfCases, displayImperfect, }) {
    const { word, add, details } = modalDialog.data;
    return {
        word,
        add,
        details,
        alphabetType,
        alphabets,
        flavorisationType,
        interfaceLang,
        orderOfCases,
        displayImperfect,
    };
}
export const DetailModal = connect(mapStateToProps, mapDispatchToProps)(DetailModalInternal);
export default DetailModal;
//# sourceMappingURL=DetailModal.js.map