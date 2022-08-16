import cls from "./home2.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DeletRntry,
  postUserEntry,
  Refresh,
  UpdateEntry,
} from "../store1/user-actions";
import EntryComp from "../components/EntryComp";
import EntryForm from "../components/EntryForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Datefilter from "../components/DateFilter";
import { toast } from "react-toastify";
import { userActions } from "../store1/user-slice";
import Mydate from "../components/MyDate";
import Modal from "../components/Modal";
const Homepage2 = () => {
  const entries = useSelector((state) => state).entries;
  const threshold = useSelector((state) => state).threshold;
  const token = useSelector((state) => state).token;
  const isAdmin = useSelector((state) => state).isAdmin;
  const name = useSelector((state) => state).name;
  const admin = isAdmin == "true" || isAdmin == true;
  const dispatch = useDispatch();
  const [entryState, setEntryState] = useState(entries);
  const [dateArr, setDateArr] = useState([null, null]);
  const [open, setOpen] = useState(false);
  const [updatedEntry, setUpdatingEntry] = useState({});
  const handleOpen = (ele) => {
    setOpen(true);
    setUpdatingEntry(ele);
  };
  const handleClose = () => {
    setUpdatingEntry({});
    setOpen(false);
  };
  const filterByDate = () => {
    let array = [];
    if (dateArr[0] && dateArr[1] && entries[0]) {
      array = entries.filter((ele) => {
        let date = new Date(ele.timeConsumed).setHours(0, 0, 0, 0);
        if (date >= dateArr[0] && date <= dateArr[1]) {
          return ele;
        }
      });
      setEntryState(array);
    } else {
      setEntryState(entries);
    }
  };
  const caloricWarning = () => {
    let arr = [];
    entries.forEach((ele) => {
      let date = new Date(ele.timeConsumed).setHours(0, 0, 0, 0);

      let indx = arr.findIndex((ele2) => ele2.date == date);
      if (indx >= 0) {
        arr[indx].calorie += ele.calorie;
      } else {
        arr.push({ date: date, calorie: ele.calorie });
      }
    });
    arr.forEach((ele) => {
      if (ele.calorie > threshold) {
        let date = Mydate(new Date(ele.date));

        toast.error(`${date} , calories:${ele.calorie}`);
      }
    });
  };
  const priceWarning = () => {
    let now = new Date();
    let last = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    ).setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    let total = 0;
    entries.forEach((ele) => {
      let date = new Date(ele.timeConsumed).setHours(0, 0, 0, 0);

      if (ele.price && date >= last && date <= now) {
        total += ele.price;
      }
    });
    if (total > 1000) {
      toast.error(`exceeds the monthly limit , total:${total}$`);
    }
  };

  useEffect(() => {
    filterByDate();
  }, [dateArr, entries]);
  useEffect(() => {
    if (entries[0] && !admin) {
      caloricWarning();
      priceWarning();
    }
  }, [entries]);

  useEffect(() => {
    if (token) {
      dispatch(Refresh());
    }
  }, [token]);
  const handleDelet = (id) => {
    dispatch(DeletRntry(id));
  };
  const handleUpdate = (data) => {
    dispatch(UpdateEntry(data));
    handleClose();
  };
  const AddEntry = (data) => {
    dispatch(postUserEntry(data));
  };
  ///////////////////////////////////////////////////////
  const [thisWeekEntries, setThisWeekEntries] = useState(0);
  const [pastWeekEntries, setPastWeekEntries] = useState(0);
  const [avgWeekcalorie, setAvgWeekCalorie] = useState(0);
  const getThisWeekEntris = () => {
    let now = new Date();
    let last = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 6
    ).setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    let array = [];

    array = entries.filter((ele) => {
      let date = new Date(ele.timeConsumed).setHours(0, 0, 0, 0);

      if (date >= last && date <= now) {
        return ele;
      }
    });
    setThisWeekEntries(array.length);
    let num = 0;
    let cal = 0;
    array.forEach((ele) => {
      num++;
      cal += ele.calorie;
    });

    setAvgWeekCalorie(cal / num);
  };
  const getPastWeekEntris = () => {
    let now = new Date();
    let last = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 6
    ).setHours(0, 0, 0, 0);
    let before = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 13
    );
    now.setHours(0, 0, 0, 0);

    let array = [];

    array = entries.filter((ele) => {
      let date = new Date(ele.timeConsumed).setHours(0, 0, 0, 0);

      if (date >= before && date <= last) {
        return ele;
      }
    });
    setPastWeekEntries(array.length);
  };
  useEffect(() => {
    getPastWeekEntris();
    getThisWeekEntris();
  }, [entries]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={cls.body}>
        <p className={admin ? cls.title1 : cls.title}>{name}</p>
        <button
          className={cls.logOuta}
          onClick={() => dispatch(userActions.logout())}
        >
          Logout
        </button>
        {admin && (
          <div className={cls.statics}>
            <p>
              {" "}
              this Week Entries : <span>{thisWeekEntries}</span>{" "}
            </p>
            <p>
              Past Week Entries :<span> {pastWeekEntries}</span>{" "}
            </p>
            <p>
              Average Calorie :{" "}
              <span style={{ maxWidth: "2rem", overFlow: "hidden" }}>
                {" "}
                {avgWeekcalorie >= 0 ? Math.round(avgWeekcalorie) : 0}{" "}
              </span>
            </p>
          </div>
        )}
        {!admin && (
          <div className={cls.filter}>
            {" "}
            <Datefilter changeDate={setDateArr} />
          </div>
        )}
        <div className={cls.formHolder}>
          <EntryForm onSubmit={AddEntry} />
        </div>
        <div className={cls.entryHolder}>
          {entryState.map((ele, inx) => (
            <EntryComp
              openUpdate={() => handleOpen(ele)}
              onDelete={() => handleDelet(ele._id)}
              onUpdate={() => handleUpdate(ele._id)}
              isAdmin={isAdmin}
              key={inx}
              ele={ele}
            />
          ))}
        </div>
        {updatedEntry._id && (
          <Modal
            Update={handleUpdate}
            entry={updatedEntry}
            handleClose={handleClose}
            open={open}
          />
        )}
      </div>
    </LocalizationProvider>
  );
};
export default Homepage2;
