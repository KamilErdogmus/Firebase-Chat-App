const RoomPage = ({ setisAuth, setRoom }) => {
  //* Çıkış yapınca çalışacak fonksiyon
  const logout = () => {
    setisAuth(false);
    localStorage.removeItem("token");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //* Formun ilk input elemanının değerini alır
    const target = e.target[0].value.trim().toLowerCase();
    //! detaylı konsol
    // console.dir(target);

    setRoom(target);
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Choose a Room</p>
      <input type="text" placeholder="Ex:React" />
      <button type="submit">Enter Room</button>
      <button onClick={logout} type="button">
        Log Out
      </button>
    </form>
  );
};

export default RoomPage;
