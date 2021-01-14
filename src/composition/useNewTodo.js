/* 新增：需要拿到响应式数据 */
import { ref } from 'vue';
import localData from '../utils/TODOStorage';

function useNewToDo(todoRef) {
  let newTodoRef = ref(''); /* 新任务的标题 */
  const { generateId } = localData;
  const addTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return;
    }
    /* 生成一个任务对象，至少包含一个标题，包括当前的完成状态，将其加入到任务列表中 */
    const TODOList = {
      title: value,
      completed: false /* 新增的任务一开始是没有完成的 */,
      id: generateId(),
    };
    todoRef.value.push(TODOList);
    // console.log(todoRef.value);
    newTodoRef.value = '';
    // console.log(TODOList);
  };
  return { newTodoRef, addTodo };
}

export default useNewToDo;
