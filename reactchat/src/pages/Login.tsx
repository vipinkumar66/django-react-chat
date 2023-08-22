import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuthServiceContext } from '../context/AuthContext';

/**
 * Component for user login.
 */
const Login = () => {
    // Get the login function from the AuthContext
    const { login } = useAuthServiceContext();

    // Get the navigation function from react-router-dom
    const navigate = useNavigate();

    // Initialize the formik form handling
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            const { username, password } = values;

            // Call the login function with the provided username and password
            const res = await login(username, password);

            if (res) {
                // If login was successful, log the result
                console.log(res);
            } else {
                // If login was unsuccessful, navigate back to the home page
                navigate("/");
            }
        },
    });

    return (
        <div>
            <h1>Login Form</h1>
            {/* Form for user login */}
            <form onSubmit={formik.handleSubmit}>
                <label>Username</label>
                {/* Input field for username */}
                <input
                    type="text"
                    name="username"
                    id="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                {/* Input field for password */}
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {/* Submit button */}
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;
