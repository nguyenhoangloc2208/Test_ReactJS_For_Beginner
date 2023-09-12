import {Modal, Button} from 'react-bootstrap';
import { deleteUser } from '../services/UserService';
import {toast} from 'react-toastify'

const ModalConfirm = (props) =>{
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props;

    const ConfirmDelete = async () =>{
        let res = await deleteUser(dataUserDelete.id)
        if(res && +res.statusCode === 204){
            toast.success('Delete user success!')
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        }else{
            toast.error('An erorr...')
        }
        console.log('check res:', res);
    }

    return(
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <span>Are you sure to delete this user, this action can't be undo!</span>
                        <br/>
                        <b>email = {dataUserDelete.email} ?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => ConfirmDelete()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;