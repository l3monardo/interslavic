import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './ViewerHeaderComponent.scss';
import FilterIcon from './images/filter-icon.svg';
import FilterRemoveIcon from './images/filter-remove-icon.svg';
import SortArrowIcon from './images/sort-arrow-icon.svg';
const ViewerHeaderComponentReact = ({ agParams }) => {
    const [sort, setSort] = useState(agParams.column.getSort());
    const [isFilter, setFilter] = useState(agParams.column.isFilterActive());
    const filterRef = useRef();
    const fieldId = agParams.column.colId;
    const onSortClick = () => {
        switch (agParams.column.getSort()) {
            case 'asc':
                return agParams.setSort('desc');
            case 'desc':
                return agParams.setSort(null);
            default:
                return agParams.setSort('asc');
        }
    };
    const onFilterClick = () => {
        if (filterRef && filterRef.current) {
            agParams.showColumnMenu(filterRef.current);
        }
    };
    const onSortChanged = useCallback(() => {
        setSort(agParams.column.getSort());
    }, [setSort, agParams.column]);
    const onFilterChanged = useCallback(() => {
        setFilter(agParams.column.isFilterActive());
    }, [setFilter, agParams.column]);
    const onFilterRemoveClick = () => {
        const currentFilter = agParams.api.getFilterModel();
        delete currentFilter[fieldId];
        agParams.api.setFilterModel(currentFilter);
    };
    useEffect(() => {
        agParams.column.addEventListener('sortChanged', onSortChanged);
        agParams.column.addEventListener('filterChanged', onFilterChanged);
        return () => {
            agParams.column.removeEventListener('sortChanged', onSortChanged);
            agParams.column.removeEventListener('filterChanged', onFilterChanged);
        };
    }, [agParams.column, onSortChanged, onFilterChanged]);
    return (_jsxs(_Fragment, { children: [_jsxs("span", { className: "header-cell__start-container", children: [_jsxs("span", { className: "header-cell__sort", onClick: onSortClick, children: [_jsx("span", { className: classNames('header-cell__sort-arrow', {
                                    'rotated': true,
                                    'primary-color': sort === 'asc',
                                    'muted-color': sort !== 'asc',
                                }), children: _jsx(SortArrowIcon, {}) }), _jsx("span", { className: classNames('header-cell__sort-arrow', {
                                    'primary-color': sort === 'desc',
                                    'muted-color': sort !== 'desc',
                                }), children: _jsx(SortArrowIcon, {}) })] }), _jsx("span", { className: "header-cell__label", children: agParams.displayName })] }), _jsxs("span", { className: "header-cell__filter-container", children: [_jsx("span", { className: classNames('header-cell__filter', {
                            'muted-color': !isFilter,
                            'primary-color': isFilter,
                        }), ref: filterRef, onClick: onFilterClick, children: _jsx(FilterIcon, {}) }), isFilter && (_jsx("span", { className: "header-cell__filter-remove", onClick: onFilterRemoveClick, children: _jsx(FilterRemoveIcon, {}) }))] })] }));
};
export class ViewerHeaderComponent {
    agParams;
    mainElement;
    init(agParams) {
        this.agParams = agParams;
        this.mainElement = document.createElement('div');
        this.mainElement.className = 'header-cell';
        createRoot(this.mainElement).render(_jsx(ViewerHeaderComponentReact, { agParams: agParams }));
    }
    getGui() {
        return this.mainElement;
    }
}
//# sourceMappingURL=ViewerHeaderComponent.js.map