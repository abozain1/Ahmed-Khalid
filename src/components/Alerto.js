import { toast } from "react-toastify";

const Alerto = (e) => {
  if (e?.response?.status == 403 || e?.response?.satus == 401) return;
  console.log(e.response);
  console.log(e);

  if (e.response) {
    if (e.response.data.length > 0) {
      return toast.error(e.response.data);
    } else if (e.response.data.title) {
      return toast.error(e.response.data.title);
    } else {
      return toast.error("حدث خطأ ما");
    }
  } else {
    return toast.error("حدث خطأ ما");
  }
};
export default Alerto;
