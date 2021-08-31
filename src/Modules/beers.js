const originalColumns = [
    { title: 'NAME', field: 'name' },
    { title: 'TAGLINE', field: 'tagline' }, 
    { title: 'FIRST BREWED', field: 'first_brewed' },
    { title: 'ABV', field: 'abv' },
    { title: 'IBU', field: 'ibu' },
    { title: 'TARGET FG', field: 'target_fg' },
    { title: 'TARGET OG', field: 'target_og' },
    { title: 'EBC', field: 'ebc' },
    { title: 'SRM', field: 'srm' },
    { title: 'PH', field: 'ph' },
    { title: 'ATTENUATION LEVEL', field: 'attenuation_level' },
    { title: 'CONTRIBUTED BY', field: 'contributed_by' },
];

// action type
export const SET_BEERLIST = "SET_BEERLIST";
export const SET_COLUMN_HEADERS = "SET_COLUMN_HEADERS";


export const setBeerList = beers => ({
    type: SET_BEERLIST,
    payload: beers
});

export const setColumnHeaders = (oldIndex, newIndex) => ({
    type: SET_COLUMN_HEADERS,
    payload: {oldIndex: oldIndex, newIndex: newIndex}
});

const initialState = {
    beerList: [],
    columnHeaders: originalColumns,
};

const changeColumnOrder = (columns, targetIndex, moveValue) => {
    const newPos = moveValue;
    const tmp = JSON.parse(JSON.stringify(columns));
    const target = tmp.splice(targetIndex, 1)[0];
    tmp.splice(newPos, 0, target);
    return tmp;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BEERLIST:
            state.beerList = action.payload
            return state;

        case SET_COLUMN_HEADERS:
            let col = [...state.columnHeaders];
            col = changeColumnOrder(col, action.payload.oldIndex, action.payload.newIndex);
            state.columnHeaders = col;
            // console.log('col', col);
            
            return state;

        default:
            return state;
    }
};

export default reducer;