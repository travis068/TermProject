"use client";

import * as React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
import { getFinanceDetails } from "@/services/api_integration";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );


export async function GetFinanceForm({ className, email, ...props }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const data = await getFinanceDetails(email);
    console.log(data);

    if(data.Count == 0) {
      return (<h2>No data available</h2>);
    } 
    
    let dates = data.map(entry => entry.entry_date);
    let budgets = data.map(entry => Number(entry.budget));
    let groceries = data.map(entry => Number(entry.groceries));
    let accounts = data.map(entry => Number(entry.account));
    let shoppings = data.map(entry => Number(entry.shopping));
    let savings = data.map(entry => Number(entry.savings));

    // Output the results
    console.log("Budgets:", budgets);
    console.log("Groceries:", groceries);
    console.log("Current Balance:", accounts);
    console.log("Shoppings:", shoppings);
    console.log("Savings:", savings);
    console.log("Dates:", dates);

    return (
        <div className="py-8 px-16">
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                data: budgets,
                backgroundColor: "purple",
              },
              {
                data: savings,
                backgroundColor: "green",
              },
              {
                data: accounts,
                backgroundColor: "orange",
              },
            ],
          }}
        />
      </div>
    );
}