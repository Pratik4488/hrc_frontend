import "./Button.css";
import React, { useState, useEffect, useRef } from "react";
import RefreshIcon from '@material-ui/icons/Refresh';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import { makeStyles } from '@material-ui/core';
// import RefreshIcon from '@mui/icons-material/Refresh';

const useStyles = makeStyles({
    root: {
      backgroundColor:"#19334d",
      color: 'white',
      
    },
  });

export const Button = (props) => {

    const classes = useStyles();

    // fetching data
    const [rows, setRows] = useState([])


    //calling api
    const reloadData = async () => {
        // setRows([]);
        const res = await axios.get("/Fetch");
        setRows(res.data);
        // console.log("data reloaded...");
    }


    useEffect(() => {
        reloadData();
        // console.log(rows);
    }, [])

    useEffect(() => {
        editDisable();
        deleteDisableBtn();
    }, [props.selectedRows])
    // console.log(rows);
    props.getData(rows);





    const [open, setOpen] = useState(false);
    const [newRow, setnewRow] = useState({})

    // console.log(props.selectedRows.length)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addSubmit = async (e) => {
        e.preventDefault();
        // console.log(newRow);
        await axios.post("/Add", newRow);
        handleClose();
        reloadData();
    }





    /// Edit handler
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    function handleEditOpen() {
        setEditOpen(true);
    }
    function handleEditClose() {
        setEditOpen(false);
    }

    const editDisable = () => {
        // console.log("clicked...");
        if (props.selectedRows.length == 1) {
            setIsDisabled(false);
            // console.log("enabled");
        }
        else
            setIsDisabled(true);
    }
    const editSubmit = async (e) => {
        e.preventDefault();
        setEditData({ ...editData, sl_no: props.selectedRows[0] })
        await axios.post("/Edit", editData);
        handleEditClose();
        reloadData();
    }
    // console.log(editData);





    /// delete handler

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteDisable, setDeleteDisable] = useState(true)
    function handleDeleteOpen() {
        setDeleteOpen(true);
    }
    function handleDeleteClose() {
        setDeleteOpen(false);
    }

    const deleteSubmit = async () => {
        props.selectedRows.forEach(e => {
            async function deleteRow(sl_no) {
                await axios.post("/Delete", { sl_no })
            }
            deleteRow(e);
        });
        reloadData();
        handleDeleteClose();
    }

    function deleteDisableBtn() {
        if (props.selectedRows.length > 0)
            setDeleteDisable(false);
        else
            setDeleteDisable(true);
    }




    ////// Advance search handler
    const [advOpen, setAdvOpen] = useState(false);
    const [advSearchData, setAdvSearchData] = useState({})
    function handleAdvOpen() {
        setAdvOpen(true);
    }
    function handleAdvClose() {
        setAdvOpen(false);
    }

    const AdvSearchSubmit = async (e) => {
        e.preventDefault();
        console.log(advSearchData);
        // http://localhost:8081/backend/Advsearch?doc_id=1930036604&cust_number=200418007&invoice_id=1930036604&buisness_year=2019
        const res = await axios.get(`/Advsearch?doc_id=${advSearchData.doc_id}&cust_number=${advSearchData.cust_number}&invoice_id=${advSearchData.invoice_id}&buisness_year=${advSearchData.buisness_year}`)
        // console.log(`/Advsearch?doc_id=${advSearchData.doc_id}&cust_number=${advSearchData.cust_number}&invoice_id=${advSearchData.invoice_id}&buisness_year=${advSearchData.buisness_year}`);
        // const res = await axios.get("/Advsearch?doc_id=1930036604&cust_number=200418007&invoice_id=1930036604&buisness_year=2019")
        setRows(res.data);
        console.log(res.data);
        handleAdvClose();
    }




    /// Search by id handle

    const inputRef = useRef();
    async function searchId(e) {
        if (e.target.value == "")
            reloadData();
        else {
            console.log(e.target.value);
            const res = await axios.get(`/searchbyid?cust_number=${e.target.value}`);
            setRows(res.data);
            // inputRef.current.value = "";
        }
    }
    return (
        <div className="btn_big">
            <div className="btn_left">
                <button className="btn1" id="btn1">PREDICT</button>
                <button className="btn1" >ANALYTICS VIEW</button>
                <button className="btn1" id="btn3" onClick={handleAdvOpen}>ADVANCE SEARCH</button>
                <Dialog open={advOpen} onClose={handleAdvClose}  maxWidth="md" fullWidth={true} >
                    <DialogTitle className={classes.root}>Advance Search</DialogTitle >
                    <DialogContent className={classes.root}>
                        <form className="addForm" action="" onSubmit={AdvSearchSubmit}>
                            <input type="text" name="doc_id" placeholder="Document ID" required onChange={e => setAdvSearchData({ ...advSearchData, doc_id: e.target.value })} />
                            <input type="text" placeholder="Invoice Id" name="invoice_id" required onChange={e => setAdvSearchData({ ...advSearchData, invoice_id: e.target.value })} />
                            <input type="text" placeholder="Customer Number" name="cust_number" required onChange={e => setAdvSearchData({ ...advSearchData, cust_number: e.target.value })} />
                            <input type="text" placeholder="Business Year" name="buisness_year" required onChange={e => setAdvSearchData({ ...advSearchData, buisness_year: e.target.value })} />
                            <div className="addbuttons">
                                <button type="submit">Search</button>
                                <button onClick={handleAdvClose}>Cancel</button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="refresh">
                <button className="refresh_btn" onClick={reloadData}><RefreshIcon /></button>
            </div>
            <div className="search">
                <input type="search" ref={inputRef} placeholder="Search Customer Id" onChange={e => searchId(e)} />
            </div>

            <div className="btn_right">
                <button className="btn2" id="btna" onClick={handleClickOpen}>ADD</button>
                {/* ---------------------- Add Button Dialoge box ------------------------------------- */}
                <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true} >
                    <DialogTitle className={classes.root}>Add Data</DialogTitle>
                    <DialogContent className={classes.root}>
                        <form className="addForm">
                            <input
                                onChange={e => setnewRow({ ...newRow, business_code: e.target.value })}
                                type="text"
                                name="business_code"
                                placeholder="Business Code"
                                required
                            />
                            <input
                                onChange={e => setnewRow({ ...newRow, cust_number: e.target.value })}
                                type="text"
                                name="cust_number"
                                placeholder="Customer Number"
                                required
                            />
                            <label htmlFor="clear_date">Clear Date
                                <input
                                    onChange={e => setnewRow({ ...newRow, clear_date: e.target.value })}
                                    type="date" id="clear_date" name="clear_date" required /></label>

                            <input
                                onChange={e => setnewRow({ ...newRow, buisness_year: e.target.value })}
                                type="text"
                                name="buisness_year"
                                placeholder=" Business Year"
                                required
                            />
                            <input
                                onChange={e => setnewRow({ ...newRow, doc_id: e.target.value })}
                                type="text" name="doc_id" placeholder="Document Id" required />

                            <label htmlFor="posting_date">Posting Date
                                <input
                                    onChange={e => setnewRow({ ...newRow, posting_date: e.target.value })}
                                    type="date"
                                    id="posting_date"
                                    name="posting_date"
                                    placeholder="Posting Date"
                                    required
                                /></label>

                            <label htmlFor="document_create_date">Document Create Date
                                <input
                                    onChange={e => setnewRow({ ...newRow, document_create_date: e.target.value })}
                                    type="date"
                                    id="document_create_date"
                                    name="document_create_date"
                                    placeholder="Document Create Date"
                                    required
                                /></label>

                            <label htmlFor="due_in_date">Due In Date
                                <input

                                    type="date" id="due_in_date" name="due_in_date" placeholder="Due Date" required /></label>

                            <input
                                onChange={e => setnewRow({ ...newRow, invoice_currency: e.target.value })}
                                type="text"
                                name="invoice_currency"
                                placeholder="Invoice Currency"
                                required
                            />
                            <input
                                onChange={e => setnewRow({ ...newRow, document_type: e.target.value })}
                                type="text"
                                name="document_type"
                                placeholder="Document type"
                                required
                            />
                            <input
                                onChange={e => setnewRow({ ...newRow, posting_id: e.target.value })}
                                type="text" name="posting_id" placeholder="Posting Id" required />

                            <input
                                onChange={e => setnewRow({ ...newRow, total_open_amount: e.target.value })}
                                type="text"
                                name="total_open_amount"
                                placeholder="Total Open Amount:"
                                required
                            />
                            <input
                                onChange={e => setnewRow({ ...newRow, cust_payment_terms: e.target.value })}
                                type="text"
                                name="cust_payment_terms"
                                placeholder="Customer Payment Terms"
                                required
                            />
                            <input
                                onChange={e => setnewRow({ ...newRow, invoice_id: e.target.value })}
                                type="text" name="invoice_id" placeholder="Invoice Id" required />

                            <div className="addbuttons">

                                <button
                                    type="submit" onClick={addSubmit}>ADD</button>
                                <button
                                    type="submit" onClick={handleClose}>Cancel</button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                <button className="btn2" onClick={handleEditOpen} disabled={isDisabled}>EDIT</button>
                <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth={true}  >
                    <DialogTitle className={classes.root}>Edit Data</DialogTitle>
                    <DialogContent className={classes.root}>
                        <form className="addForm" action="" onSubmit={editSubmit}>
                            <input type="text" name="invoice_currency" placeholder="Invoice Currency" required onChange={e => setEditData({ ...editData, invoice_currency: e.target.value })} />
                            <input type="text" placeholder="Customer Payment Terms" name="cust_payment_terms" required onChange={e => setEditData({ ...editData, cust_payment_terms: e.target.value })} />
                            <div className="addbuttons">
                                <button type="submit">Edit</button>
                                <button onClick={handleEditClose}>Cancel</button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                <button className="btn2" id="btnb" onClick={handleDeleteOpen} disabled={deleteDisable} >DELETE</button>
                <Dialog open={deleteOpen} onClose={handleDeleteClose} maxWidth="sm" fullWidth={true} >
                    <DialogTitle className={classes.root}>Delete Records ?</DialogTitle>
                    <DialogContent className={classes.root}>
                        <div className="addbuttons">
                            <button onClick={handleDeleteClose}>Cancel</button>
                            <button onClick={deleteSubmit}>Delete</button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
// SL_NO, cust_number, posting_id, invoice_id, is_deleted

// {
//     "business_code": newRow.business_code,
//     "cust_number": newRow.cust_number,
//     "clear_date": parseInt(newRow.clear_date),
//     "buisness_year":newRow.buisness_year,
//     "doc_id": newRow.doc_id,
//     "posting_date": newRow.posting_date,
//     "document_create_date": newRow.document_create_date ,
//     "due_in_date": newRow.due_in_date,
//     "invoice_currency": newRow.invoice_currency,
//     "document_type": newRow.document_type,
//     "posting_id": parseInt(newRow.posting_id),
//     "total_open_amount": newRow.total_open_amount,
//     "baseline_create_date":  newRow.baseline_create_date,
//     "cust_payment_terms":  newRow.cust_payment_terms,
//     "invoice_id":  parseInt(newRow.invoice_id),
// }