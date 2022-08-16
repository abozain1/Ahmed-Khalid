import cls from "./Components.module.scss";
const EntryComp = ({ ele, onDelete, isAdmin, openUpdate }) => {
  const admin = isAdmin == "true" || isAdmin == true;
  return (
    <div className={admin?cls.entryMain:cls.entryMain1}>
      <p className={cls.name}>Name : {ele.ownerName}</p>
      <p className={cls.food}>Food :  {ele.food}</p>
      <p className={cls.time}>{ele.timeConsumed}</p>
      <p className={cls.calorie}>Calories : {ele.calorie}</p>
      <p className={cls.price}>Price : {ele.price}</p>
      {admin && <button onClick={onDelete}>delete</button>}
      {admin && <button onClick={openUpdate}>edit</button>}
    </div>
  );
};
export default EntryComp;
