const FOrders = (props) => {
    const { data } = props;
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Amount Earned</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length
                        ? data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.customID}</td>
                                <td>{new Date(item.createdAt).toDateString()}</td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>£ {item.total ?? 20}</td>
                                <td>{item.adjustmentPaid ? "Done" : item.payment ? "Partially Paid" : "Not Paid"} </td>
                                <td>{item.status ?? "Submitted"}</td>
                                <td>{item.status ?? "Submitted"}</td>
                            </tr>
                        ))
                        : null}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default FOrders;
