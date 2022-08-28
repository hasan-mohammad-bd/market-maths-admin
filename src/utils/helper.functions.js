import { message, Tag } from "antd";

export const uaePhoneRegex =
  /^(?:\+971|00971|0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}$/;
export const isNumberRegex = /^\d+$/;

export const getDataManager = async (dataApi, setLoading, payload, id) => {
  try {
    setLoading && setLoading(true);
    return dataApi(payload, id)
      .then((res) => {
        setLoading && setLoading(false);
        if (res) {
          return res;
        }
      })
      .catch((error) => {
        setLoading && setLoading(false);
        message.error({
          content: error || "Something went wrong",
          duration: 3,
        });
      });
  } catch (error) {
    setLoading && setLoading(false);
    message.error({ content: error || "Something went wrong", duration: 3 });
  }
};

export const extractContent = (html) => {
  var temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
};

export const getDateString = () => {
  const d = new Date();
  const dateString = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return dateString;
};

export const getUnitVatAmount = (price, vat) => {
  const p = Number(price);
  const v = Number(vat);
  const pt = p * (v / 100);
  return pt.toFixed(2);
};

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const validateNumber = (number) => {
  const regex = /^\(?0( *\d\)?){9,10}$/;
  return regex.test(String(number));
};
export const validatePassword = (pass) => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return regex.test(String(pass));
};

export const toCapitalize = (str = "") => {
  const value = str.toString();
  return value[0].toUpperCase() + value.slice(1).toLowerCase();
};

export const getErrorMessage = (errors) => {
  const messages = errors && Object.keys(errors).map((key) => errors[key]);
  return (messages || []).join(", ");
};

export const isEmpty = (strValue) => {
  if (!strValue || strValue.trim() === "" || strValue.trim().length === 0) {
    return true;
  } else {
    return false;
  }
};

export const getStatus = (status) => {
  return (
    <Tag color={status ? "green" : "error"}>
      {status ? "Active" : "Inactive"}
    </Tag>
  );
};

export const getCancelStatus = (status) => {
  switch (status) {
    case 0:
      return <div className="blue-tag">Pending</div>;
    case 1:
      return <div className="red-tag">Cancelled</div>;
    default:
      return <div className="yellow-tag">Rejected</div>;
  }
};

export const getCommissionStatus = (status) => {
  switch (status) {
    case 0:
      return <div className="blue-tag">Pending</div>;
    case 1:
      return <div className="green-tag">Approved</div>;
    default:
      return <div className="red-tag">Rejected</div>;
  }
};

export const getTransactionStatus = (status) => {
  switch (status) {
    case 0:
      return <div className="blue-tag">Pending</div>;
    case 1:
      return <div className="green-tag">Completed</div>;
    default:
      return <div className="red-tag">Cancelled</div>;
  }
};

export const getPriority = (priority) => {
  switch (priority) {
    case 0:
      return <Tag color="green">Low</Tag>;
    case 1:
      return <Tag color="blue">Medium</Tag>;
    case 2:
      return <Tag color="orange">High</Tag>;
    default:
      return <Tag color="red">Critical</Tag>;
  }
};

export const getNameLetters = (name) => {
  const splittedName = name.split(" ");
  const firstName = splittedName[0];
  const lastName = splittedName[1];
  return firstName.charAt(0) + lastName.charAt(0);
};

export const getUserType = (type) => {
  switch (type) {
    case 0:
      return "User";
    case 1:
      return "Seller";
    case 2:
      return "Staff";
    case 3:
      return "Manager";
    default:
      return "Admin";
  }
};

export const getOrderStatus = (type) => {
  switch (type) {
    case 0:
      return "Pending";
    case 1:
      return "Ready to Ship";
    case 2:
      return "Handover Package";
    case 3:
      return "Shipped";
    case 4:
      return "Complete";
    case 5:
      return "Cancelled";
    default:
      return "Returned";
  }
};

export const getPaymentType = (type) => {
  switch (type) {
    case 0:
      return "Cash on Delivery";
    case 1:
      return "Online Payment";
    case 2:
      return "Wallet";
    default:
      return "Reward Point";
  }
};

export const getPaymentStatus = (type) => {
  switch (type) {
    case 0:
      return <div className="blue-tag">Pending</div>;
    case 1:
      return <div className="green-tag">Success</div>;
    default:
      return <div className="red-tag">Failed</div>;
  }
};

export const getMembershipType = (type) => {
  switch (type) {
    case 0:
      return "General";
    default:
      return "Premimum";
  }
};

export const months = [
  {
    label: "January",
    key: "Jan",
  },
  {
    label: "February",
    key: "Feb",
  },
  {
    label: "March",
    key: "Mar",
  },
  {
    label: "April",
    key: "Apr",
  },
  {
    label: "May",
    key: "May",
  },
  {
    label: "June",
    key: "Jun",
  },
  {
    label: "July",
    key: "Jul",
  },
  {
    label: "August",
    key: "Aug",
  },
  {
    label: "September",
    key: "Sep",
  },
  {
    label: "October",
    key: "Oct",
  },
  {
    label: "November",
    key: "Nov",
  },
  {
    label: "December",
    key: "Dec",
  },
];
