/* 给予整个任务列表，这个函数内部会自动完成监控 */
import { ref, watchEffect } from 'vue';
import localData from '../utils/TODOStorage';

// window.localData = localData;
function uesToList() {
  const todoRef = ref(localData.fetch());
  watchEffect(() => {
    localData.save(
      todoRef.value
    ); /* 响应式的值一旦变化，就会在watchEffect里面执行 */
  });
  // window.todoRef = todoRef;
  return {
    todoRef,
  };
}

export default uesToList;
