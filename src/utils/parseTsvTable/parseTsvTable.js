export function parseTsvTable(str) {
    return str
        .split('\n')
        .map((l) => l.replace('\r', '').split('\t').map((e) => e.trim()));
}
//# sourceMappingURL=parseTsvTable.js.map