import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import cls from "./Components.module.scss";
import Mydate from "./MyDate";
import { toast } from "react-toastify";
const EntryForm = ({ onSubmit, ele }) => {
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState({
    food: "",
    calorie: "",
    price: "",
  });
  const handleinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    if (ele?._id) {
      setData({ food: ele.food, calorie: ele.calorie, price: ele.price });
      setValue(new Date(ele.timeConsumed));
    }
  }, [ele]);
  const handleSubmit = () => {
    if (data.food.length < 1 || !Number(data.calorie)) {
      return toast.error("complete entry data");
    }
    onSubmit({ ...data, timeConsumed: Mydate(value), id: ele?._id });
  };
  return (
    <div className={cls.form}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          maxDate={new Date()}
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </LocalizationProvider>
      <div>
        <input
          maxLength={12}
          placeholder="food"
          type={"text"}
          name="food"
          value={data.food}
          onChange={handleinput}
        />{" "}
        <p></p>
      </div>
      <div>
        <input
          placeholder="calorie"
          maxLength={1}
          type={"number"}
          name="calorie"
          value={data.calorie}
          onChange={handleinput}
        />{" "}
        <p></p>
      </div>
      <div>
        <input
          placeholder="price"
          type={"number"}
          name="price"
          value={data.price}
          onChange={handleinput}
        />{" "}
        <p></p>
      </div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};
export default EntryForm;
