import moment from "moment";

const TransactionList = (props) => {
  const { data } = props;

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.length
              ? data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>£ {item.amount.toFixed(2)}</td>
                    <td>{item.effect == "Cr" ? "Credit" : "Debit"}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.createdAt
                        ? moment(item.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )
                        : ""}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TransactionList;
