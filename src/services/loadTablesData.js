import { tablesData } from 'consts';
import { getAllDataFromResults, getTableDataUrl } from 'utils';
export const loadTablesData = async () => {
    const results = await Promise.all(tablesData.map(({ spreadsheetId, sheetId }) => (fetch(getTableDataUrl(spreadsheetId, sheetId)).then((res) => res.text()))));
    return getAllDataFromResults(results);
};
//# sourceMappingURL=loadTablesData.js.map