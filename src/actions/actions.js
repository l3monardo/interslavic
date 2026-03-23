export var ActionTypes;
(function (ActionTypes) {
    ActionTypes["LANG"] = "LANG";
    ActionTypes["FROM_TEXT"] = "FROM_TEXT";
    ActionTypes["SEARCH_TYPE"] = "SEARCH_TYPE";
    ActionTypes["FLAVORISATION_TYPE"] = "FLAVORISATION_TYPE";
    ActionTypes["SET_PAGE"] = "SET_PAGE";
    ActionTypes["SET_INTERFACE_LANG"] = "SET_INTERFACE_LANG";
    ActionTypes["IS_LOADING"] = "IS_LOADING";
    ActionTypes["LOADING_PROGRESS"] = "LOADING_PROGRESS";
    ActionTypes["SET_SEARCH_EXPAND"] = "SET_SEARCH_EXPAND";
    ActionTypes["ALPHABET_TYPE"] = "ALPHABET_TYPE";
    ActionTypes["RUN_SEARCH"] = "RUN_SEARCH";
    ActionTypes["CHANGE_ISV_SEARCH_LETTERS"] = "CHANGE_ISV_SEARCH_LETTERS";
    ActionTypes["CHANGE_ISV_SEARCH_BY_WORDFORMS"] = "CHANGE_ISV_SEARCH_BY_WORDFORMS";
    ActionTypes["POS_FILTER"] = "POS_FILTER";
    ActionTypes["SET_ALPHABETS"] = "SET_ALPHABETS";
    ActionTypes["SHOW_MODAL_DIALOG"] = "SHOW_MODAL_DIALOG";
    ActionTypes["HIDE_MODAL_DIALOG"] = "HIDE_MODAL_DIALOG";
    ActionTypes["SET_NOTIFICATION"] = "SET_NOTIFICATION";
    ActionTypes["CHANGE_CARD_VIEW"] = "CHANGE_CARD_VIEW";
    ActionTypes["CHANGE_ORDER_OF_CASES"] = "CHANGE_ORDER_OF_CASES";
    ActionTypes["CHANGE_CASE_QUESTIONS"] = "CHANGE_CASE_QUESTIONS";
    ActionTypes["CHANGE_DISPLAY_IMPERFECT"] = "CHANGE_DISPLAY_IMPERFECT";
    ActionTypes["DICTIONARY_LANGUAGES"] = "DICTIONARY_LANGUAGES";
    ActionTypes["TOGGLE_PAGE"] = "TOGGLE_PAGE";
    ActionTypes["SET_BADGES"] = "SET_BADGES";
    ActionTypes["TOGGLE_THEME"] = "TOGGLE_THEME";
})(ActionTypes || (ActionTypes = {}));
export function langAction(data) {
    return {
        type: ActionTypes.LANG,
        data,
    };
}
export function showModalDialog(data) {
    return {
        type: ActionTypes.SHOW_MODAL_DIALOG,
        data,
    };
}
export function hideModalDialog() {
    return {
        type: ActionTypes.HIDE_MODAL_DIALOG,
    };
}
export function setNotificationAction(data) {
    return {
        type: ActionTypes.SET_NOTIFICATION,
        data,
    };
}
export function setAlphabetTypeAction(data) {
    return {
        type: ActionTypes.ALPHABET_TYPE,
        data,
    };
}
export function setSearchExpand(data) {
    return {
        type: ActionTypes.SET_SEARCH_EXPAND,
        data,
    };
}
export function fromTextAction(data) {
    return {
        type: ActionTypes.FROM_TEXT,
        data,
    };
}
export function searchTypeAction(data) {
    return {
        type: ActionTypes.SEARCH_TYPE,
        data,
    };
}
export function changeCardViewAction() {
    return {
        type: ActionTypes.CHANGE_CARD_VIEW,
    };
}
export function flavorisationTypeAction(data) {
    return {
        type: ActionTypes.FLAVORISATION_TYPE,
        data,
    };
}
export function setPageAction(data) {
    return {
        type: ActionTypes.SET_PAGE,
        data,
    };
}
export function isLoadingAction(data) {
    return {
        type: ActionTypes.IS_LOADING,
        data,
    };
}
export function loadingProgressAction(data) {
    return {
        type: ActionTypes.LOADING_PROGRESS,
        data,
    };
}
export function setInterfaceLang(data) {
    return {
        type: ActionTypes.SET_INTERFACE_LANG,
        data,
    };
}
export function changeIsvSearchLetters(data) {
    return {
        type: ActionTypes.CHANGE_ISV_SEARCH_LETTERS,
        data,
    };
}
export function changeIsvSearchByWordForms(data) {
    return {
        type: ActionTypes.CHANGE_ISV_SEARCH_BY_WORDFORMS,
        data,
    };
}
export function posFilterAction(data) {
    return {
        type: ActionTypes.POS_FILTER,
        data,
    };
}
export function runSearch() {
    return {
        type: ActionTypes.RUN_SEARCH,
    };
}
export function setAlphabets(data) {
    return {
        type: ActionTypes.SET_ALPHABETS,
        data,
    };
}
export function changeOrderOfCases(data) {
    return {
        type: ActionTypes.CHANGE_ORDER_OF_CASES,
        data,
    };
}
export function changeCaseQuestions(data) {
    return {
        type: ActionTypes.CHANGE_CASE_QUESTIONS,
        data,
    };
}
export function changeDisplayImperfect(data) {
    return {
        type: ActionTypes.CHANGE_DISPLAY_IMPERFECT,
        data,
    };
}
export function changeDictionaryLangAction(data) {
    return {
        type: ActionTypes.DICTIONARY_LANGUAGES,
        data,
    };
}
export function togglePage(data) {
    return {
        type: ActionTypes.TOGGLE_PAGE,
        data,
    };
}
export function setBadges(data) {
    return {
        type: ActionTypes.SET_BADGES,
        data,
    };
}
export function toggleThemeAction(data) {
    return {
        type: ActionTypes.TOGGLE_THEME,
        data,
    };
}
//# sourceMappingURL=actions.js.map