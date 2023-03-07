import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FcGoogle } from "react-icons/fc";
import ButtonC from "@/components/ButtonC";
import FormContainer from "@/components/Form/FormContainer";
import FormItem from "@/components/Form/FormItem";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/Auth'

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
	toc: Yup.boolean().required("(The terms and conditions must be accepted)").oneOf([true], "(The terms and conditions must be accepted)")
})

export function SignUp() {
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const [message, setMessage] = useState();
  const [msgColor, setmsgColor] = useState("");
  
  async function handleSubmit(values, setSubmitting) {
    const { email, password } = values;

    const { error, data } = await signUp({ email, password })

    if (error) {
      setSubmitting(false)
      setmsgColor("red")
      setMessage(error.message)
    } 
    if(data) {
      setSubmitting(false)
      setmsgColor("green")
      setMessage('Please check your email for verification')
    }
  }
  
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Project - ALPHA
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
			      {message && <Alert className="mb-2 -mt-5" color={msgColor}>{message}</Alert>}
            <Formik
              initialValues={{
                email: '', 
                password: '', 
                toc: false
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                handleSubmit(values, setSubmitting)
              }}
            >
              {({touched, errors, isSubmitting}) => (
                <Form>
                  <FormContainer>
                    <FormItem
                      invalid={errors.email && touched.email} 
                      className="mb-5"
                    >
                      <Field name="email">
                        {({field}) => (
                          <Input
                            {...field}
                            type="email"
                            name="email"
                            autoComplete="off"
                            label="Email"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="mb-5"
                        name="email"
                        render={(msg) => (
                          <Typography variant="small" className="text-red-500 font-sm mb-5">{msg}</Typography>
                        )}
                      />
                    </FormItem>
                    <FormItem
                      invalid={errors.password && touched.password}
                      className="mb-5"
                    >
                      <Field name="password">
                        {({field}) => (
                          <Input
                            {...field}
                            name="password"
                            type="password"
                            autoComplete="off"
                            label="Password"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="password"
                        className="mb-5"
                        render={(msg) => (
                          <Typography variant="small" className="text-red-500 font-sm mb-5">{msg}</Typography>
                        )}
                      />
                    </FormItem>
                    <FormItem
                      invalid={errors.toc && touched.toc}
                      className="mb-5"
                    >
                      <Field name="toc">
                        {({field}) => (
                          <Checkbox defaultChecked={field.value} {...field} label="I agree the Terms and Conditions" />
                        )}
                      </Field>
                      <ErrorMessage
                        name="toc"
                        className="mb-5 text-center"
                        render={(msg) => (
                          <Typography variant="small" className="text-red-500 text-center font-sm mb-5">{msg}</Typography>
                        )}
                      />
                    </FormItem>
                    <ButtonC 
                      type="submit"
                      loading={isSubmitting} 
                      disabled={isSubmitting}
                      variant="gradient" 
                      fullWidth
                    >
                      { isSubmitting ? 'Creating Account...' : 'Sign Up' }
                    </ButtonC>
                  </FormContainer>
                </Form>
              )}
            </Formik>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" color="black" className="grid mb-4 place-items-center">
              OR
            </Typography>
            <Button
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-12"
              fullWidth
            >
              <FcGoogle className="h-4 w-4 mr-5" />
               Signup with Google
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
