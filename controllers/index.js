import { taskService } from "../services/taskService.js";
import { Task } from "../models/Task.js";
//Khai báo đối tượng service
const taskSV = new taskService();
const getAllTask = async () => {
  try {
    //dùng service để gọi api từ backend lấy dữ liệu về
    const result = await taskSV.getAllTask();
    //Bước 3: từ dữ liệu lấy về tách ra 2 mảng  => render dữ liệu lên giao diện
    //task todo
    let taskToDo = result.data.filter((task) => task.status === false);
    console.log("tasktodo", result.data);
    //gọi hàm hiển thị dữ liệu lên giao diện
    renderTaskToDo(taskToDo);
    // task done
    let taskComplete = result.data.filter((task) => task.status === true);
    renderTaskDone(taskComplete);
    console.log("taskComplete", taskComplete);
  } catch (err) {
    //lỗi trong hàm try sẽ trả về biến err của catch
  }
};

const renderTaskToDo = (arrResult) => {
  const contentTaskToDo = arrResult.reduce((content, item, index) => {
    return (content += `
        <li>
         <span style = "cursor:pointer">${item.taskName}</span>
        <span style = "cursor:pointer" onclick = "delTask('${item.taskName}')"><i class ="fa fa-trash"></i></span>
        <span style = "cursor:pointer" onclick = "doneTask('${item.taskName}')"><i class ="fa fa-check"></i></span> 
        </li>
        `);
  }, " ");
  //dom đến giao diện hiển thị các li vào innerHTML của ul
  document.getElementById("todo").innerHTML = contentTaskToDo;
};
const renderTaskDone = (taskComplete) => {
  const contentTaskDone = taskComplete.reduce((content, item, index) => {
    content += `
        <li>
        <span style = "cursor:pointer">${item.taskName}</span>
        <span style = "cursor:pointer" onclick = "delTask('${item.taskName}')"><i class ="fa fa-trash"></i></span>
        <span style = "cursor:pointer"><i class ="fa fa-redo"></i></span> 
        </li>
        `;
    return content;
  }, "");
  //dom đến giao diện hiển thị các li vào innerHTML của ul
  document.getElementById("completed").innerHTML = contentTaskDone;
};
getAllTask();
//=================== Nghiệp vụ thêm task ==================
document.getElementById("addItem").onclick = async (event) => {
  //event target <= đại diện cho thẻ button được onclick
  // lấy thông tin người dùng nhập từ giao diện
  let taskName = document.getElementById("newTask").value;
  //tạo ra object backend yêu cầu
  var taskModel = new Task();
  taskModel.taskName = taskName;
  // gọi api đưa dữ liệu về server
  try {
    let result = await taskSV.addTask(taskModel);
    console.log("kết quả thêm task", result.data);
    //sau khi thêm thành công gọi api getAllTask từ hàm đã viết sẵn
    getAllTask();
  } catch (err) {
    console.log(err);
  }
};
//=====================Nghiệp vụ xóa dữ liệu==========================

window.delTask = async (taskName) => {
  let cfm = confirm("bạn có muốn xóa");
  //gọi api mỗi lần người dùng bấm nút xóa dữ liệu
  if (cfm) {
    try {
      let result = await taskSV.deleteTask(taskName);
      console.log(result.data);
      //gọi api hàm get task sau khi xóa
      getAllTask();
    } catch (err) {
      console.log(err);
    }
  }
};
window.doneTask = async (taskName) => {
  try {
    let result = await taskSV.doneTask(taskName);
    getAllTask();
  } catch (err) {
    console.log(err);
  }
};
getAllTask();
