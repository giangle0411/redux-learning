import Redux from "redux";

console.clear();

//people dropping off the forms
//actions have type and payloads
const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name,
    },
  };
};

const createClaim = (name, claimAmount) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      claimAmount: claimAmount,
    },
  };
};

// --- reducers (Departments) ---
//take in actions and decide what to do depend on the action types

//takes actions that are claims and record the claims
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    //we care about this form

    //create new array instead of modifying the existing one
    //use this instead of push (modifying)
    return [...oldListOfClaims, action.payload];
  }
  //we dont care the action
  return oldListOfClaims;
};

//takes actions that related to money (create claims or create policies)
//decide to give money if claim or take money if create policy
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.claimAmount;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

//takes actions that related to policies (create of delete)
//if actions are create policy then add return new array of policies
//if actions are delete policy then delete return new array of policies
const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  }
  if (action.type === "DELETE_POLICY") {
    //use filter function to remove an element from the array of policies
    //!! DOES NOT WORK IF HAVE 2 POLICIES ARE THE SAME NAME AND DELETE JUST 1
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }
  return listOfPolicies;
};

//call functions from Redux
const { createStore, combineReducers } = Redux;

//create the whole department by combiding reducers
const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies,
});

//create store from the department
const store = createStore(ourDepartments);

//dispatch actions
//reducers (departments) will determind what to do when they receive their related actions
store.dispatch(createPolicy("Alex", 20));
store.dispatch(createPolicy("Bob", 50));
store.dispatch(createPolicy("Jim", 40));
store.dispatch(createClaim("Alex", 60));
store.dispatch(createClaim("Jim", 100));
store.dispatch(deletePolicy("Bob"));

//console log the results
console.log(store.getState());
