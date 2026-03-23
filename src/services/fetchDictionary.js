import { ADD_LANGS } from 'consts';
import { Dictionary } from 'services';
async function fetchStat() {
    return await fetch('data/translateStatistic.json').then((res) => res.json());
}
async function fetchLangs(langList) {
    return await Promise.all(langList.map((lang) => fetch(`data/${lang}.json`).then((res) => res.json())));
}
async function fetchBasic() {
    return await fetch('data/basic.json').then((res) => res.json());
}
export async function fetchLang(lang) {
    if (Dictionary.hasLang(lang)) {
        return;
    }
    const [{ wordList, searchIndex }] = await fetchLangs([lang]);
    Dictionary.addLang(wordList, searchIndex);
}
export async function fetchDictionary(langList) {
    const startFidTime = performance.now();
    const [stat, basicData, langsData] = await Promise.all([
        fetchStat(),
        fetchBasic(),
        fetchLangs(langList.filter((lang) => ADD_LANGS.includes(lang)))
    ]);
    langsData.forEach((langData) => {
        basicData.searchIndex = {
            ...basicData.searchIndex,
            ...langData.searchIndex,
        };
        langData.wordList.forEach((langField, i) => {
            basicData.wordList[i].push(langField);
        });
    });
    const initTime = Dictionary.init(basicData.wordList, basicData.searchIndex, stat);
    const fidTime = Math.round(performance.now() - startFidTime);
    if (!__PRODUCTION__) {
        // eslint-disable-next-line no-console
        console.info('FID', `${fidTime}ms`);
        // eslint-disable-next-line no-console
        console.info('INIT', `${initTime}ms`);
    }
}
//# sourceMappingURL=fetchDictionary.js.map