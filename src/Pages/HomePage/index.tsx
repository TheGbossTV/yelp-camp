const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: "url('https://picsum.photos/id/28/4928/3264')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };
  return (
    <>
      <div style={backgroundStyle} />
      <h1 className="text-2xl font-bold text-white">HomePage</h1>
    </>
  );
};

export default HomePage;
