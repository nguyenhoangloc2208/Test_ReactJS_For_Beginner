import { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {putUpdateUser} from '../services/UserService'
import { toast } from 'react-toastify'

const ModalEditUser = (props) =>{
    const {show, handleClose, dataUserEdit, handlEditUserFromModal} = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async () =>{
        let res = await putUpdateUser(name, job);
        if(res && res.updatedAt){
            //success
            handlEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
            toast.success('Update user success!');
            handleClose();
        }else{
            //erorr
            toast.error('An erorr...')
        }
        console.log('Check:',res);
    }

    useEffect(()=>{
        if(show){
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    return(
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Edit A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name"
                                 value={name} onChange={(event)=>setName(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Job</Form.Label>
                                <Form.Control type="text" placeholder="Enter Job"
                                 value={job} onChange={(event)=>setJob(event.target.value)}/>
                            </Form.Group>
                        </Form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;