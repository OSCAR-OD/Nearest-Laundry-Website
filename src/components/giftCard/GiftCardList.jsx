import {toast} from "react-toastify";
import {copy} from "react-icons-kit/fa";
import Icon from "react-icons-kit";
import * as React from "react";
const GiftCardList = (props) => {
    const { data } = props;

    const copyGiftCardCode = async (code) => {
        navigator.clipboard.writeText(code);
        toast(`Gift Card ID copied.`,
            {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
                position: 'top-right',
                theme: 'dark'
            }
        )
    }
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Card Value</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length
                        ? data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td onClick={()=>{copyGiftCardCode(item.customID)}}>
                                    {item.customID}
                                    <Icon
                                        icon={copy}
                                        size={20}
                                        className="icon"
                                        style={{cursor: 'pointer', float: 'right'}}
                                    />
                                </td>
                                <td>{item.fromName}</td>
                                <td>
                                    £ {item.userGet}
                                </td>
                                <td>
                                    {item.used? 'Used': 'Not used'}
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
export default GiftCardList;
