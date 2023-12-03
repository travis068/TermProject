export const signUp = async (email, password, firstName, lastName) => {
    const body = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
    };
    const resp = await fetch(
        `https://i501h7k2bg.execute-api.us-east-1.amazonaws.com/prod/signUp`,
        {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    try {
        const data = await resp.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }
};

// import axios from 'axios';

// export const signUp = (email, password, firstName, lastName) => {
//     const body = {
//         email: email,
//         password: password,
//         first_name: firstName,
//         last_name: lastName,
//     };
//     var endPoint = `https://sfud06xrh5.execute-api.us-east-1.amazonaws.com/production/signIn`;
//     axios.post(endPoint, body)
//     .then(res => {
//         console.log(res.data)
//     }).catch(err => {
//         console.log(err)
//     })
// }

export const logIn = async (email, password) => {
    const body = {
        email: email,
        password: password,
    };
    const resp = await fetch(
        `https://i501h7k2bg.execute-api.us-east-1.amazonaws.com/prod/logIn`,
        {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    try {
        const data = await resp.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }
};

export const getFinanceDetails = async (email) => {
    const body = {
        email: email,
    };
    const resp = await fetch(
        `https://i501h7k2bg.execute-api.us-east-1.amazonaws.com/prod/getData`,
        {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    try {
        const data = await resp.json();
        return data.body;
    } catch (err) {
        console.log("err", err);
    }
};

export const addFinanceDetails = async (email, entry_date, account, budget, groceries, shopping, savings) => {
    const body = {
        email: email,
        entry_date: entry_date,
        account: account,
        budget: budget,
        groceries: groceries,
        shopping: shopping,
        savings: savings,
    };
    const resp = await fetch(
        `https://i501h7k2bg.execute-api.us-east-1.amazonaws.com/prod/addData`,
        {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    try {
        const data = await resp.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }
};

