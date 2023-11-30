import {SignUpForm} from "./components/SignUpForm";

const signUp = () => {
    return (
        <div className="py-8 px-16" >
            <h2 className="text-4xl font-semibold tracking-tight">
                Sign Up
            </h2>
            <div className="flex justify">
                <SignUpForm/>
            </div>
        </div>
    );
};

export default signUp;
