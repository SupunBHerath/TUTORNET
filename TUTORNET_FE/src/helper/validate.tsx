import toast from 'react-hot-toast';

interface EmailErrors {
    email?: string;
}
interface passwordErrors {
    passaword?: any;
}

/** Validate login function */
export async function emailValidate(value: { email: string }): Promise<EmailErrors> {
    const errors: EmailErrors = emailVerify({}, value);
    return errors;
}

function emailVerify(errors: EmailErrors, values: { email: string }): EmailErrors {
    if (!values.email) {
        errors.email = toast.error('Please enter an email');
    } else if (!values.email.includes('@')) {
        errors.email = toast.error('Please enter a valid email');
    }
    return errors;
}
export async function passwordValidate(value: { passaword: any }): Promise<passwordErrors> {
    const errors: passwordErrors = passwordVerify({}, value);
    return errors;
}

function passwordVerify(errors: passwordErrors, values: { passaword: string }): passwordErrors {
    if (!values.passaword) {
        errors.passaword = toast.error('Please enter an password');
    } else if (!values.passaword.includes('@')) {
        errors.passaword = toast.error('Please enter a valid password');
    }
    return errors;
}
