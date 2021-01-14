import { ref } from 'vue';
function useDelete(todoRef) {
  /* 删除 */
  const delTodo = ele => {
    todoRef.value.splice(ele, 1);
  };
  /* 取消全部completed */
  const cancelCompleted = () => {
    todoRef.value = todoRef.value.filter(item => !item.completed);
  };
  return {
    delTodo,
    cancelCompleted,
  };
}
export default useDelete;
