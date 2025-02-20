import Accordion from "react-bootstrap/Accordion";

const ProductFaq = ({ faqs }) => {
  // rating

  return (
    <div className="container">
      <hr className="mb-3 mt-1  w-100" />
      <h5 className="card-title">Product Faqs</h5>
      <hr className="mt-3 w-100" />

      {faqs.length > 0 ? (
        <Accordion>
          {faqs.map((item, index) =>
            item.faq.map((i, ind) => (
              <Accordion.Item
                eventKey={index + "" + ind}
                key={index + "" + ind}
              >
                <Accordion.Header>{i.question}</Accordion.Header>
                <Accordion.Body>{i.answer}</Accordion.Body>
              </Accordion.Item>
            ))
          )}
        </Accordion>
      ) : (
        <p>There are no faqs yet.</p>
      )}
    </div>
  );
};

export default ProductFaq;
