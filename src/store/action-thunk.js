import { replaceEmail } from "./inbox-slice";




/*--------------------------------------> Send Email Data <---------------------------------------- */


export const sendEmailData =  (emailData) => {
  return async (dispatch) => {
  try {
    const email = localStorage.getItem("endpoint");

    const response = await fetch(
      `https://mail-box-87267-default-rtdb.firebaseio.com/${email}/emails.json`,
      {
        method: "PUT",
        body: JSON.stringify(emailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Sending Data Failed");
    }
  } catch (error) {
    console.error("Error sending email data:", error);
  }
}
};



/*--------------------------------------> Get Email Data <---------------------------------------- */
export const getEmailData = () => {
  return async (dispatch) => {
    try {
      const email = localStorage.getItem("endpoint");

      const response = await fetch(
        `https://mail-box-87267-default-rtdb.firebaseio.com/${email}/emails.json`
      );

      if (!response.ok) {
        throw new Error("Fetch Data Failed");
      }

      const data = await response.json();
      const emailData = data || { emails: [], totalQuantity: 0 };

      dispatch(
        replaceEmail({
          emails: emailData.emails,
          totalQuantity: emailData.totalQuantity,
        })
      );
    } catch (error) {
      console.error("Error fetching email data:", error);
    }
  };
};
