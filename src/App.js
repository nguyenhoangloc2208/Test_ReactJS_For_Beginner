import './App.scss';
import {useState} from 'react'
import Header from './component/Header';
import TableUsers from './component/TableUsers';
import Container from 'react-bootstrap/Container';
import ModalAddNew from './component/ModelAddNew'


function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () =>{
    setIsShowModalAddNew(false)
  }
  
  return (
    <div className='app-container'>
      <Header/>
      <Container>
        <div className="my-3 add-new">
          <span>ListUsers:</span>
          <button className="btn btn-success" onClick={()=>setIsShowModalAddNew(true)}>Add New User</button>
        </div>
        <TableUsers/>
      </Container>

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
