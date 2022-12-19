import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import CustomDatePicker from "examples/DatePicker";
import MDButton from "components/MDButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Icon } from "@mui/material";
import { useGlobalStore } from "store";
import { exportExcel } from "utils";
import ThemedIconButton from "components/UI/ThemedIconButton";
import FilterTypeStatus from "examples/Actions/FilterTypeStatus";

function DataTable({
  showTotalEntries,
  entriesPerPage,
  canSearch,
  table,
  isSorted,
  noEndBorder,
  pagination,
  withDateFilter = false,
  withLimit = false,
  withPagination = false,
  withExport = false,
  refetchFn = () => {},
  filterFn,
  totalData = 0,
  CustomRow = false,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "20"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    headerGroups,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    rows,
    page,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  const {
    setParams,
    defaulParams: { limit, offset },
  } = useGlobalStore();

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue, setPageSize]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;
    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }
    return sortedValue;
  };

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));
  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));
  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);
  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;
  // Setting the entries ending point
  let entriesEnd;
  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const currentPage = Math.round(offset / limit + 1);
  const nextPageCustom = totalData > offset && limit === rows.length;
  const prevPageCustom = currentPage > 1;

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        {canSearch && (
          <MDBox width="11rem">
            <MDInput
              placeholder="Search..."
              value={search}
              size="small"
              fullWidth
              onChange={({ currentTarget }) => {
                setSearch(search);
                onSearchChange(currentTarget.value);
              }}
            />
          </MDBox>
        )}
        {(entriesPerPage || withLimit) && (
          <MDBox display="flex" alignItems="center">
            <Autocomplete
              disableClearable
              value={pageSize.toString()}
              options={entries}
              onChange={(_, newValue) => {
                setEntriesPerPage(parseInt(newValue, 10));
                if (withLimit) {
                  setParams({ limit: Number(newValue), offset: 0 });
                  refetchFn();
                }
              }}
              size="small"
              sx={{ width: "5rem" }}
              renderInput={(params) => <MDInput {...params} />}
            />
            <MDTypography variant="caption" color="secondary">
              &nbsp;&nbsp;entries per page
            </MDTypography>
          </MDBox>
        )}
        <MDBox display="flex" justifyContent="end" alignItems="center" gap={2}>
          {withDateFilter && (
            <>
              <FilterTypeStatus />
              <CustomDatePicker label="Start" type="start" width={150} />
              <CustomDatePicker label="End" type="end" width={150} />
              <MDButton
                onClick={() => (filterFn ? filterFn() : refetchFn())}
                color="info"
                variant="gradient"
              >
                Filter
              </MDButton>
            </>
          )}
          {withExport && (
            <ThemedIconButton onClick={() => exportExcel(table.rows)}>
              <FileDownloadIcon sx={{ color: "inherit" }} />
            </ThemedIconButton>
          )}
        </MDBox>
      </MDBox>
      <MDBox sx={{ width: "100%", overflow: "auto", height: "100%" }}>
        <Table {...getTableProps()} width={100}>
          <MDBox component="thead">
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <DataTableHeadCell
                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "left"}
                    sorted={setSortedValue(column)}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            ))}
          </MDBox>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <DataTableBodyCell
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : "left"}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })}
            {CustomRow && <CustomRow />}
          </TableBody>
        </Table>
      </MDBox>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && pagination && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
        {withPagination && data.length !== 0 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {prevPageCustom && (
              <MDPagination
                item
                onClick={() => {
                  setParams({ limit, offset: offset - limit });
                  refetchFn();
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            <MDPagination item>{currentPage}</MDPagination>
            {nextPageCustom && (
              <MDPagination
                item
                onClick={() => {
                  setParams({ limit, offset: offset + limit });
                  refetchFn();
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
