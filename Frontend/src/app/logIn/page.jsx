import {LogInForm} from "./components/LogInForm";

const logIn = () => {
    return (
        <div className="py-8 px-16">
            <h2 className="text-4xl font-semibold tracking-tight">
                Log In
            </h2>
            <div className="flex justify">
                <LogInForm/>
            </div>
        </div>
    );
};

export default logIn;