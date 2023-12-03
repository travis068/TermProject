import {AddFinanceForm} from "./components/AddFinanceForm";
import {GetFinanceForm} from "./components/GetFinanceForm";
import { Button } from "@/components/ui/button";
import { getFinanceDetails } from "@/services/api_integration";

const financeDetails = async (context) => {
    const email = decodeURIComponent( context.params.email);

    const data = await getFinanceDetails(email);
    console.log(email);
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
                <GetFinanceForm email={email} data={JSON.parse(data)}/>
            </div>
        </div>
    );
};

export default financeDetails;