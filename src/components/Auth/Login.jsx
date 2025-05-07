import { defaultValues, inputs } from '../../data/forms/User/Login';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { supabase } from '../../services/supabase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState(defaultValues);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const goBack = e => {
        e.preventDefault();
        navigate(-1);
    };

    const handleChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();

        const { email, password } = formData;
        const {
            data: { user },
            error,
        } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Error: ', error);
        } else {
            console.log('User: ', user);
            navigate('/');
        }
        setValidated(true);
    };

    return (
        <Container className="mt-5">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    {inputs.map((input, index) => (
                        <Form.Group as={Col} {...input.size} className="mb-3" key={index}>
                            <FloatingLabel label={input.label}>
                                <Form.Control
                                    required
                                    {...input.control}
                                    placeholder=""
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">{input.feedback}</Form.Control.Feedback>
                                <Form.Control.Feedback />
                            </FloatingLabel>
                        </Form.Group>
                    ))}
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Button variant="primary" className="w-100" type="submit">
                            Sign In
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row className="text-center mt-3">
                <p>
                    Don&apos;t have an account?{' '}
                    <a href="/signup" className="text-primary link-underline link-underline-opacity-0">
                        Sign Up
                    </a>
                </p>
            </Row>
        </Container>
    );
};

export default Login;
