import React, { useState, useEffect } from 'react'
import './dataTable.css'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';

// import data from './rowData.json';

const useStyles = makeStyles({
    root: {
      backgroundColor:"#19334d",
      color: 'white',
      
    },
  });

  
  
// function CustomPagination() {
//     const apiRef = useGridApiContext();
//     const page = useGridSelector(apiRef, gridPageSelector);
//     const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
//     return (
//       <Pagination
//         color="primary"
//         variant="outlined"
//         shape="rounded"
//         page={page + 1}
//         count={pageCount}
//         // @ts-expect-error
//         renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
//         onChange={(event, value) => apiRef.current.setPage(value - 1)}
//       />
//     );
//   }
  
  

export const DataTable = (props) => {

    const [pageSize, setPageSize] = useState(7)
    const [selection, setSelection] = useState([]);
    const checkboxSelection = true;
    useEffect(() => {
      props.selectedRowsCallback(selection);
    }, [selection])
    const classes = useStyles();
    return (
        <div className='tableContainer'>
            <div className='table'>
                 
                <DataGrid  autoHeight
                headerHeight={60}
                className={classes.root}
                rows={props.rowData}
                getRowId={(data) =>data.sl_no }
                
                // rows={[
                //     {
                //         id: 1,
                //         slno: "1",
                //         businessyear: "2021",
                //         postingdate: "20/12/22",
                //         documentcreatedate: "20/11/22",
                //         duedate: "20/11/12",
                //         invoicecurrency: "40",
                //         documenttype: "doc",
                //     },

                // ]}
                    columns={[{
                        field: "sl_no", headerName: "Sl No"                    },
                    {
                        field: 'posting_id', headerName: 'posting id',sortable: false,
                    },
                    {
                        field: 'posting_date', headerName: 'posting date',sortable: false,
                    },
                    {
                        field: 'isOpen', headerName: 'is Open',sortable: false,
                    },
                    {
                        field: 'invoice_id', headerName: 'invoice id',sortable: false,
                    },
                    {
                        field: 'invoice_currency', headerName: 'invoice currency',sortable: false,
                    },
                    {
                        field: 'due_in_date', headerName: 'due in date',sortable: false,
                    },
                    {
                        field: 'document_type', headerName: 'document type',sortable: false,
                    },
                    {
                        field: 'document_create_date1', headerName: 'document create date1',sortable: false,
                    },
                    {
                        field: 'document_create_date', headerName: 'document create date',sortable: false,
                    },
                    {
                        field: 'doc_id', headerName: 'doc id',sortable: false,
                    },
                    {
                        field: 'cust_payment_terms', headerName: 'cust payment terms',sortable: false,
                    },
                    {
                        field: 'cust_number', headerName: 'cust number',sortable: false,
                    },
                    {
                        field: 'clear_date', headerName: 'clear date',sortable: false,
                    },
                    {
                        field: 'business_code', headerName: 'business code',sortable: false,
                    },
                    {
                        field: 'buisness_year', headerName: 'buisness year',sortable: false,
                    },
                    // {
                    //     field: 'area_business', headerName: 'area business',sortable: false,
                    // },
                ]}
                    checkboxSelection={checkboxSelection}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[7,10, 20, 50]}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelection(newSelectionModel);
                      }}
                      selectionModel={selection}
                    // pagination
                    // components={{
                    //     Pagination: CustomPagination,
                    //   }}
                />
            </div>
        </div>
    )
}

// {
//     "doc_id":"1930438491",
//     "cust_number":"200769623",
//     "invoice_id":"1930438491",
//     "buisness_year":"2020"
// }