import React from "react";
import API from "../../utils/API";

const BankOfferTableRow = (props) => {
  const { bank, loanAmount, interestRate, ltv, term, amortization, status, property, _id } = props;

  console.log(props);

  const rejectAllOffers = () => {
    API.rejectAllOffers(property)
      .then(res => {
        console.log(res.data);
        if (res.data.nModified > 0) {
          API.acceptOffer(_id)
            .then(response => {
              props.onChange(true);
              console.log(response.data);
            })
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <tr>
      <th scope="row">{bank.name}</th>
      <td>${loanAmount}</td>
      <td>{interestRate}%</td>
      <td>{ltv}%</td>
      <td>{term} Years</td>
      <td>{amortization} Years</td>
      <td>
        {status === "Pending" ? <button type="button" className="btn btn-primary" onClick={rejectAllOffers}>Select Bank</button>
          : status === "Accepted" ? <button type="button" className="btn btn-primary" disabled>Accepted</button>
            : <button type="button" className="btn btn-primary" disabled>Rejected</button>
        }

      </td>
    </tr>
  )
};

export default BankOfferTableRow;