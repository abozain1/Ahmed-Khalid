import cls from "./Components.module.scss";
const EntryComp = ({ ele, onDelete, isAdmin, openUpdate }) => {
  const admin = isAdmin == "true" || isAdmin == true;
  return (
    <div className={cls.entryMain}>
      <p>{ele.ownerName}</p>
      <p>{ele.food}</p>
      <p>{ele.timeConsumed}</p>
      <p>Calories : {ele.calorie}</p>
      <p>Price : {ele.price}</p>
      {admin && <button  onClick={onDelete}>delete</button>}
      {admin && <button onClick={openUpdate}>edit</button>}
    </div>
  );
};
export default EntryComp;
