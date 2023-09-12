import { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {postCreateUser} from '../services/UserService'
import { toast } from 'react-toastify'

const ModalAddNew = (props) =>{
    const {show, handleClose, handleUpdateTable} = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () =>{
        let res = await postCreateUser(name, job)
        
        if(res && res.name && res.job){
            handleClose();
            setName('');
            setJob('');
            //success
            toast.success('A User is created succeed!')
            handleUpdateTable({
                first_name: name,
                id: res.id
            })
        }else{
            toast.error('An erorr...')
            //erorr
        }
        console.log('check res:', res)
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
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
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;