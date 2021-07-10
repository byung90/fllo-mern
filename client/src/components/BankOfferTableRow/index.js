import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

const BankOfferTableRow = (props) => {
  const { name, loanAmount, interestRate, ltv, term, amortization, status } = props;

  return (
    <tr>
      <th scope="row">{name}</th>
      <td>${loanAmount}</td>
      <td>{interestRate}%</td>
      <td>{ltv}%</td>
      <td>{term} Years</td>
      <td>{amortization} Years</td>
      <td>
        {status === "Pending" ? <button type="button" className="btn btn-primary">Select Bank</button>
          : status === "accepted" ? <button type="button" className="btn btn-primary" disabled>Accepted</button>
            : <button type="button" className="btn btn-primary" disabled>Rejected</button>
        }

      </td>
    </tr>
  )
};

export default BankOfferTableRow;