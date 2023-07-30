import React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import AdjustIcon from '@mui/icons-material/Adjust';
import CheckIcon from '@mui/icons-material/Check'; // Add this import statement
import CancelIcon from '@mui/icons-material/Cancel';

function createData(id, Text, Predicted_label, True_Label) {
  return {
    id,
    Text,
    Predicted_label,
    True_Label,
  };
}

const headCells = [
  {
    id: 'text',
    numeric: false,
    disablePadding: false,
    label: 'Text',
  },
  {
    id: 'Predicted_label',
    numeric: false,
    disablePadding: false,
    label: 'Predicted label',
  },
  {
    id: 'True_label',
    numeric: false,
    disablePadding: false,
    label: 'True label',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
  const createSortHandler = (property) => (event) => {};

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ visibility: 'hidden' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onDeleteClick, onUpdateClick } = props;
  const [updateText, setUpdateText] = React.useState('');
  const [isUpdateMode, setIsUpdateMode] = React.useState(false);


  const handleUpdateTextChange = (event) => {
    setUpdateText(event.target.value);
  };

  const handleUpdateButtonClick = () => {
    setIsUpdateMode(true);
  };

  const handleCancelClick = () => {
    setIsUpdateMode(false);
    setUpdateText('');
  };

  const handleUpdateSubmit = () => {
    // Call the onUpdateClick handler and pass the updateText to it
    onUpdateClick(updateText);
    // Clear the update text field after the update
    setIsUpdateMode(false);
    setUpdateText('');
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Classification History:
        </Typography>
      )}

      {numSelected > 0 ? (
           <>
           <Tooltip title="Delete">
             <IconButton onClick={onDeleteClick}>
               <DeleteIcon />
             </IconButton>
           </Tooltip>
           <Tooltip title="Update">
             {/* Toggle the text area and buttons based on isUpdateMode */}
             {isUpdateMode ? (
               <div>
                 <textarea
                   rows="2"
                   cols="30"
                   value={updateText}
                   onChange={handleUpdateTextChange}
                   placeholder="Enter new text"
                 />
                 <IconButton onClick={handleUpdateSubmit}>
                   <CheckIcon />
                 </IconButton>
                 <IconButton onClick={handleCancelClick}>
                   <CancelIcon />
                 </IconButton>
               </div>
             ) : (
               <IconButton onClick={handleUpdateButtonClick}>
                 <AdjustIcon />
               </IconButton>
             )}
           </Tooltip>
         </>
      ) : (
        <Tooltip title="list">
         
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://127.0.0.1:9000/fetch')
      .then((response) => {
        // Assuming the fetched data is an array of objects
        const fetchedData = response.data;
        console.log(response)
        // Transform the fetched data using the createData function and set it to the rows state
        const transformedData = fetchedData.map((item) =>
          createData(item.id, item.transcription, item.firstlabel, item.truelabel)
        );
        setRows(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleUpdateClick = (updateText) => {
    if (selected.length === 0 || !updateText) {
      return;
    }

    const idToUpdate = selected[0].id;
    const dataToUpdate = {
      id: idToUpdate,
      truelabel: updateText,
    };

    axios
      .patch('http://127.0.0.1:9000/update', JSON.stringify(dataToUpdate), {
        headers: {
          'Content-Type': 'application/json', // Set the correct Content-Type header
        },
      })
      .then((response) => {
        console.log(response.data.message);

        // Update the rows state with the updated data
        const updatedRows = rows.map((row) =>
          row.id === idToUpdate ? { ...row, True_Label: updateText } : row
        );
        setRows(updatedRows);

        // Clear the selection
        setSelected([]);

        // You may handle the response here if required
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.findIndex((row) => row.id === id);
    let newSelected = [];

    if (selectedIndex === -1) {
      // Only select the clicked row
      newSelected = [rows.find((row) => row.id === id)];
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDeleteClick = () => {
    if (selected.length === 0) {
      return;
    }

    const idToDelete = selected[0].id;
    const dataToDelete = { id: idToDelete };

    axios
      .delete('http://127.0.0.1:9000/delete', {
        data: dataToDelete,
      })
      .then((response) => {
        console.log(response.data.message);

        // Update the rows state locally by removing the deleted row
        setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));

        // Clear the selection
        setSelected([]);

        // Determine the new page number after deletion
        const deletedRowIndex = rows.findIndex((row) => row.id === idToDelete);
        const newPage = Math.min(page, Math.ceil((rows.length - 1) / rowsPerPage));
        setPage(newPage);
      })
      .catch((error) => {
        console.error('Error deleting row:', error);
      });
  };

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );


  const isSelected = (id) => selected.length > 0 && selected[0].id === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  return (
    <Box sx={{ width: '93%', marginLeft: '4%', marginTop: '1%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
    <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteClick={handleDeleteClick}
          onUpdateClick={handleUpdateClick}
        />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: isItemSelected ? 'lightgrey' : 'inherit', // Change the background color when selected
                  }}
                >
                  <TableCell padding="checkbox" sx={{ visibility: 'hidden' }}></TableCell>
                  <TableCell align="right">{row.Text}</TableCell>
                  <TableCell align="right">{row.Predicted_label}</TableCell>
                  <TableCell align="right">{row.True_Label}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
  </Box>
  );
}
