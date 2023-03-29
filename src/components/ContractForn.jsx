import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getContract } from '../utils/ethers';

const ContractForm = ({ abi, address, functionName }) => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contract = getContract(abi, address);
    const result = await contract[functionName](inputValue);
    setOutputValue(result.toString());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{functionName} Input</Form.Label>
        <Form.Control
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{functionName} Output</Form.Label>
        <Form.Control type="text" readOnly value={outputValue} />
      </Form.Group>
    </Form>
  );
};

export default ContractForm;
