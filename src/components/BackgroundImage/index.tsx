import backgroundImg from "../../assets/images/background.jpg";

const BackgroundImage = () => {
  return (
    <img
      src={backgroundImg}
      alt="Background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundImage;
