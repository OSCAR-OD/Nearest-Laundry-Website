import { Modal } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";

const ImageModal = (props) => {
  return (
    <Modal show={props.show} fullscreen={true} onHide={props.onHide}>
      <Modal.Header
        className="border-0 "
        style={{ backgroundColor: "#F3F1E2" }}
      >
        <div className="d-flex w-100">
          <div>
            <p className="fs-17 fw-bolder mt-2 mb-0">{props.title}</p>
          </div>
          <div className="ms-auto">
            <button
              type="button"
              className={`btn btn-danger border-0 btn-circle shadow-none custom-cursor`}
              onClick={props.onHide}
            >
              {/* <X size={18} /> */}
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body
        className="px-20 pb-4 pt-0"
        style={{ backgroundColor: "#F3F1E2" }}
      >
        {props.children}
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
