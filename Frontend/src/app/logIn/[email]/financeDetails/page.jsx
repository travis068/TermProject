import {AddFinanceForm} from "./components/AddFinanceForm";
import {GetFinanceForm} from "./components/GetFinanceForm";
import { Button } from "@/components/ui/button";

const financeDetails = async (context) => {
    const email = context.params.email;
    return (
        <div className="py-8 px-16">
            <h2 className="text-4xl font-semibold tracking-tight">
                Finance Input Form
            </h2>
            <Button asChild={true} style={{backgroundColor: "powderblue"}}>
                <a href="/">Log Out</a>
            </Button>
            <div className="flex justify">
                <AddFinanceForm email={email}/>
            </div>
            <div className="flex justify">
                <GetFinanceForm email={email}/>
            </div>
        </div>
    );
};

export default financeDetails;