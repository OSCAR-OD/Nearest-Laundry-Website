import { useEffect } from "react";

const ViewPortInfo = () => {
  useEffect(() => {
    window.addEventListener("resize", getClientWidthHeigh);
    getClientWidthHeigh();

    function getClientWidthHeigh() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      let title = "sm";

      if (width >= 576) {
        title = "sm : 576";
      }

      if (width >= 768) {
        title = "md : 768";
      }

      if (width >= 992) {
        title = "lg : 992";
      }

      if (width >= 1200) {
        title = "xl : 1200";
      }
      if (width >= 1400) {
        title = "xxl : 1400";
      }

      // let box = document.querySelector('.container');
      // let width = box.offsetWidth;
      // let height = box.offsetHeight;
      // console.log({ width, height });

      // const domRect = box.getBoundingClientRect();
      // console.log(domRect);

      document.querySelector(
        ".viewport-info p"
      ).textContent = `${width} x ${height} [ ${title} ]`;
    }
  }, []);
  return (
    <div
      className="viewport-info"
      style={{
        position: "fixed",
        left: "-2%",
        bottom: "0%",
        backgroundColor: "turquoise",
        padding: "0px 15px",
        fontSize: "20px",
        borderRadius: "6px",
        color: " #fff",
        fontWeight: "700",
        zIndex: "99999999",
      }}
    >
      <p className="ms-4 mb-0"></p>
    </div>
  );
};

export default ViewPortInfo;
