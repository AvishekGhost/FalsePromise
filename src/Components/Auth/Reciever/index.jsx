export const signup = user => {
  return fetch("http://localhost:5000/receiver/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signin = user => {
  return fetch("http://localhost:5000/receiver/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  next();

  return fetch("http://localhost:5000/receiver/signout", {
    method: "GET"
  })
    .then(response => {
      console.log("signout: ", response);
      return response.json();
    })
    .catch(err => {
      console.log("err: ", err);
    });
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};

export const getBloodBanks = () => {
  return fetch("http://localhost:5000/bloodbank/getbloodbank", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getDonors = () => {
  return fetch("http://localhost:5000/donor/getdonors", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const placeorder = user => {
  return fetch("http://localhost:5000/order/placeorder", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
