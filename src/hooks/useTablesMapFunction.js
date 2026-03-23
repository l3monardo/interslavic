import { useCallback, useState } from 'react';
import { tablesData } from 'consts';
import { getTablePublicUrl } from 'utils';
export function useTablesMapFunction() {
    const [tablesMap, setTablesMap] = useState(true);
    const initTablesMapFunction = useCallback((rangesMap) => setTablesMap(rangesMap), [setTablesMap]);
    const getGoogleSheetsLink = useCallback((id, field) => {
        let spreadsheetId;
        let sheetId;
        let rangeMap;
        for (let i = 0; i < tablesData.length; i++) {
            if (tablesData[i].fields.includes(field)) {
                spreadsheetId = tablesData[i].spreadsheetId;
                sheetId = tablesData[i].sheetId;
                rangeMap = tablesMap[i];
                break;
            }
        }
        const publicUrl = getTablePublicUrl(spreadsheetId, sheetId);
        const letter = rangeMap.header.get(field);
        const index = rangeMap.columns.get(id);
        return `${publicUrl}&range=${letter}${index}`;
    }, [tablesMap]);
    return {
        initTablesMapFunction,
        getGoogleSheetsLink,
    };
}
//# sourceMappingURL=useTablesMapFunction.js.map