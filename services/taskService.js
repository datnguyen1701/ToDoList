import {BaseService} from "./BaseService.js";
export class taskService extends BaseService {
  constructor() {
    super();// gọi lại phương thức constructor của class cha
  };
  getAllTask = () => {
    const promise = this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');// đây là ví dụ của kế thừa
    return promise;
  };
  //định nghĩa hàm đưa dữ liệu về backend
  addTask = (task) => {
    //dùng định dạng backend quy định
    const promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: task, //{taskName:'abc'}
    });
    return promise;
  };
  //định nghĩa hàm xóa dữ liệu
  deleteTask = (taskName) => {
    return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`);//ĐÂY LÀ VÍ DỤ CỦA KẾ THỪA
  };
  //định nghĩa hàm done task
  doneTask = (taskName) =>{
    const promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method:"PUT",
    })
    return promise;
  }
}
