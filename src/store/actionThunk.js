import { replaceEmail } from "./inbox-slice";

export const sendEmailData = (emailData) => {
  const email = localStorage.getItem("endpoint");

  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://mail-box-87267-default-rtdb.firebaseio.com/${email}/email.json`,
        {
          method: "POST",
          body: JSON.stringify(emailData),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Data Failed");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getEmailData = () => {
  const email = localStorage.getItem("endpoint");

  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        `https://mail-box-87267-default-rtdb.firebaseio.com/${email}/email.json`
      );

      if (!response.ok) {
        throw new Error("Fetch Data Failed");
      }

      const data = await response.json(); 
      console.log('ID Checking from Action thunk',data)
      return data;
    };
    try {
      const cartData = await getData();
      dispatch(
        replaceEmail({
          emails: cartData.emails || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
