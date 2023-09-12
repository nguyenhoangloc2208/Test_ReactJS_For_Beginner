import { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const ModalAddNew = (props) =>{
    const {show, handleClose} = props;
    const [Name, setName] = useState('');
    const [Job, setJob] = useState('');

    const handleSaveUser = () =>{
        console.log('check name>>>',Name);
        console.log('check job>>>',Job)
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
                                 value={Name} onChange={(event)=>setName(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Job</Form.Label>
                                <Form.Control type="text" placeholder="Enter Job"
                                 value={Job} onChange={(event)=>setJob(event.target.value)}/>
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