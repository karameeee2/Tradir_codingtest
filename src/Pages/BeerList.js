import Axios from 'axios';
import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '../Style/beerList.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BEERLIST, SET_COLUMN_HEADERS } from '../Modules/beers';
import { ArrowUpward, Search, Clear, FirstPage, LastPage, ChevronLeft, ChevronRight } from '@material-ui/icons';

//icon
const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
}

const BeerList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const beerList = useSelector((state) => state.beers.beerList);
    const columnHeader = useSelector ((state) => state.beers.columnHeaders)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                setError(null);

                dispatch({
                    type: SET_BEERLIST,
                    payload: []
                });

                setLoading(true);
                const res = await Axios.get(
                    'https://api.punkapi.com/v2/beers'
                );

                dispatch({
                    type:SET_BEERLIST,
                    payload: res.data
                });
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        fetchBeers();
    }, [dispatch]);

    if (loading) {
        return <div>Loading....</div>;
    } else if (error) {
        return <div>Error</div>;
    } else if (!beerList) {
        return null;
    }

    // Column Drag
    const _onColumnDragged = (oldIndex, newIndex) => {
        dispatch({
            type:SET_COLUMN_HEADERS, 
            payload:{oldIndex:oldIndex, newIndex:newIndex}
        });
    }

    // abv filter option
    const options = [
        { label:'4-5', value: '4-5' },
        { label:'5-6', value: '5-6' },
        { label:'6-7', value: '6-7' },
        { label:'7-8', value: '7-8' },
        { label:'8-9', value: '8-9' },
        { label:'9-10', value: '9-10' },
        { label:'10-11', value: '10-11' },
        { label:'11-12', value: '11-12' },
        { label:'12-13', value: '12-13' },
        { label:'13-14', value: '13-14' },
        { label:'14-15', value: '14-15' },
        { label:'15-', value: '15-' },
    ]
    // ABV Filter
    const filterCheck = (checked) => {
        console.log('checked', checked);

    }

    return (
        <>
            <div className='filterBox'>
                <span className='filterLine'>
                    ABV Filter | <Checkbox.Group options={options} onChange={filterCheck} />
                </span>
            </div>
            <MaterialTable
                title="Beer List🍻"
                columns={columnHeader}
                key={beerList.id}
                data={beerList}
                options={{
                    paging: true,
                    sorting: false,
                    draggable: true,
                }}
                onColumnDragged={_onColumnDragged}
                icons={tableIcons}

            />
        </>
    )
}

export default BeerList;