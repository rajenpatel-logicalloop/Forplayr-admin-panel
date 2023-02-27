// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions
import {
  getAllData,
  getData,
  getRegion,
  getResidence,
  sendnotificationMes,
} from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Row, Col, Card, Input, Collapse } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Title } from "../../../utility/Utils";

// ** Table Header
const CustomHeader = ({
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  residenceStoredata,
  regionStoreData,
  region,
  handleRegionValue,
  residence,
  handleResidenceValue,
  Sendnotification,
  notificationTittle,
  notificationMessage,
  handleNotificationTittle,
  handleNotificationMessage,
}) => {
  // console.log("Residence data  display==>", residenceStoredata);
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row style={{marginBottom:"10px" }}>
        <Col xl="6" className="d-flex align-items-center p-0 1">
          <div className="d-flex align-items-center w-100 1">
            <label htmlFor="rows-per-page">{<Title str="Region" />}</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={region}
              onChange={handleRegionValue}
              style={{ width: "15rem" }}
            >
              {regionStoreData.map((val) => (
                <option value={val._id}>{val.name}</option>
              ))}
            </Input>
          </div>

          <div className="d-flex align-items-center w-100 1">
            <label htmlFor="rows-per-page">{<Title str="Province" />}</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={residence}
              onChange={handleResidenceValue}
              style={{ width: "15rem" }}
            >
              {residenceStoredata.map((val) => (
                <option value={val._id}>{val.name}</option>
              ))}
            </Input>
          </div>
        </Col>
      </Row>
      <Row style={{marginBottom:"10px" }}>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">
              {<Title str="NotificationTittle" />}
            </label>
            <Input
              className="mx-50"
              type="text"
              id="notification-tittle"
              value={notificationTittle}
              onChange={handleNotificationTittle}
              style={{ width: "15rem" }}
            ></Input>
          </div>
        </Col>
        <Col xl="6" className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1">
          <div className="d-flex align-items-center w-100">
            <label className="mb-0">
              {<Title str="NotificationMessage" />}
            </label>
            <Input
              className="mx-50"
              type="text"
              id="notification-message"
              value={notificationMessage}
              onChange={handleNotificationMessage}
              style={{ width: "25rem" }}
            ></Input>
          </div>
        </Col>
      </Row>

      <Row style={{marginBottom:"10px" }}>
        <Col xl="6" className="d-flex align-items-center p-0 1">
          <div className="d-flex align-items-center w-100 1">
            <button
              type="button"
              class="btn btn-primary mr-1 mb-1 waves-effect waves-light"
              onClick={Sendnotification}
            >
              {<Title str="Sendnotification" />}
            </button>
          </div>
        </Col>
      </Row>

      {/* <Row >
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">{<Title str="show" />}</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">{<Title str="entries" />}</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              {<Title str="Search" />}:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
        </Col>
      </Row> */}
    </div>
  );
};

const NotificationsList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.notificationList);
  const residenceStore = useSelector(
    (state) => state.notificationList.residenceData
  );
  const regionStore = useSelector((state) => state.notificationList.regionData);

  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [region, setRegion] = useState("");
  const [residence, setResidence] = useState("");
  const [notificationTittle, setNotificationTittle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData());
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      })
    );
    dispatch(
      getResidence({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: 10000,
      })
    );
    dispatch(
      getRegion({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: 10000,
      })
    );
  }, [dispatch, store?.data?.length, sort, sortColumn, currentPage]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
      })
    );
    setRowsPerPage(value);
  };

  /* regionValue set*/
  const handleRegionValue = (e) => {
    const value = e.currentTarget.value;
    setRegion(value);
  };

  /* Residence value set */
  const handleResidenceValue = (e) => {
    const value = e.currentTarget.value;
    setResidence(value);
    console.log("Residence value==>", residence);
  };

  /*Notification Titte Set */
  const handleNotificationTittle = (e) => {
    const value = e.currentTarget.value;
    setNotificationTittle(value);
  };

  /*Notification Message Set */
  const handleNotificationMessage = (e) => {
    const value = e.currentTarget.value;
    setNotificationMessage(value);
  };

  const Sendnotification = () => {
    dispatch(
      sendnotificationMes({
        region,
        residence,
        noti_Tittle: notificationTittle,
        messageDet: notificationMessage
      })
    );
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    console.log("handleFilter", val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
      })
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store?.data?.length > 0) {
      return store?.data;
    } else if (store?.data?.length === 0 && isFiltered) {
      return [];
    } else {
      return store?.allData;
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
      })
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            //columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                residenceStoredata={residenceStore}
                regionStoreData={regionStore}
                region={region}
                handleRegionValue={handleRegionValue}
                residence={residence}
                handleResidenceValue={handleResidenceValue}
                Sendnotification={Sendnotification}
                notificationTittle={notificationTittle}
                notificationMessage={notificationMessage}
                handleNotificationTittle={handleNotificationTittle}
                handleNotificationMessage={handleNotificationMessage}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  );
};

export default NotificationsList;
