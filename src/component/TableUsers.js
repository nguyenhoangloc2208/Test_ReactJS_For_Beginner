import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../services/UserService';
import ModalAddNew from './ModalAddNew'
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _, { clone, debounce } from 'lodash';
import './TableUser.scss';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);

    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [sortBy, setSortBy] = useState('asc');
    const [sortFeild, setSortFeild] = useState('id');

    const [keyword, setKeyword] = useState('');

    const handleClose = () =>{
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) =>{
        setListUsers([user,...listUsers])
    }

    const handlEditUserFromModal = (user) =>{
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }
 
    const handleEditUser = (user) =>{
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user) =>{
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }

    const handleDeleteUserFromModal = (user)=>{
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
    }

    useEffect(()=> {
        getUsers(1);
    }, [])

    const handlePageClick = (event) =>{
        getUsers(+event.selected + 1);
    }

    const getUsers = async (page) =>{
        let res = await fetchAllUser(page);
        if(res && res.data) {
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handleSort = (sortBy, sortFeild) =>{
        setSortBy(sortBy);
        setSortFeild(sortFeild);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortFeild], [sortBy])
        setListUsers(cloneListUsers);
    }

    const handleSearch = debounce((event) =>{
        let term = event.target.value;
        if(term){
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);
        }else{
            getUsers(1);
        }
    }, 300)

    return (<>
        <div className="my-3 add-new">
            <span>ListUsers:</span>
            <button className="btn btn-success" onClick={()=>setIsShowModalAddNew(true)}>Add New User</button>
        </div>
        <div className='col-4 my-3'>
            <input className='form-control' placeholder='Search user by email...' 
            // value={keyword}
            onChange={(event) => handleSearch(event)}/>
        </div>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>
                <div className='sort-header'>
                    <span>ID</span>
                    <span>
                        <i className="fas fa-arrow-down-long"
                        onClick={() => handleSort('asc', 'id')}></i> 
                        <i className="fas fa-arrow-up-long"
                        onClick={() => handleSort('desc', 'id')}></i>
                    </span>
                </div>        
            </th>
            <th >
                <div className='sort-header'>
                    <span>Email</span>
                    <span>
                        <i class="fa-solid fa-filter"></i> 
                    </span>
                </div>   
            </th>
            <th>
                <div className='sort-header'>
                    <span>First Name</span>
                    <span>
                        <i className="fas fa-arrow-down-long"
                        onClick={() => handleSort('asc', 'first_name')}></i> 
                        <i className="fas fa-arrow-up-long"
                        onClick={() => handleSort('desc', 'first_name')}></i>
                    </span>
                </div> 
            </th>
            <th>Last Name</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {listUsers && listUsers.length >0 &&
            listUsers.map((item,index)=>{
                return(
                <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td className='action-btn'>
                        <button className='btn btn-warning mx-3'
                        onClick={()=> handleEditUser(item)}>Edit</button>
                        <button className='btn btn-danger' 
                        onClick={()=> handleDeleteUser(item)}>Delete</button>
                    </td>
                </tr>
                )
            })} 
        </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"   
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />

        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={handleClose}
          handleUpdateTable={handleUpdateTable}
        />

        <ModalEditUser
            show={isShowModalEdit}
            handleClose={handleClose}
            dataUserEdit={dataUserEdit}
            handleUpdateTable={handleUpdateTable}
            handlEditUserFromModal={handlEditUserFromModal}
        />

        <ModalDeleteUser
            show={isShowModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>)
}

export default TableUsers;