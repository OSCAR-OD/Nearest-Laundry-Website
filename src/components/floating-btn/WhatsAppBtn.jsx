import Icon from "react-icons-kit";
import { whatsapp } from "react-icons-kit/fa";

const WhatsAppBtn = () => {
  return (
    <div className={"whatsapp-btn-float"}>
      <a
        className={" position-relative p-0"}
        target="_blank"
        rel="noreferrer"
        href="https://api.whatsapp.com/send/?phone=0447534801503"
      >
        <Icon icon={whatsapp} />
        <span>WhatsApp </span>
      </a>
    </div>
  );
};

export default WhatsAppBtn;
