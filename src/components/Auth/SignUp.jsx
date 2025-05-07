import { defaultValues, inputs } from '../../data/forms/User/SignUp';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { supabase } from '../../services/supabase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
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
        setValidated([true, false]);
        const { email, password, name, surname, birthdate, display_name } = formData;
        const { error: SignUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    surname,
                    birthdate,
                    display_name,
                },
            },
        });
        if (SignUpError) {
            console.error('Error: ', SignUpError);
            return;
        }
        goBack(e);
    };

    return (
        <Container>
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
                        <Button className="w-100" variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Col>
                </Row>
            </Form>
            <p className="text-center mt-3">
                Already have an account?{' '}
                <a href="/signin" className="text-primary link-underline link-underline-opacity-0">
                    Sign In
                </a>
            </p>
        </Container>
    );
};

export default SignUp;
