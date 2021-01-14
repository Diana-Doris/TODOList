import { ref, computed } from 'vue';

function useEditTodo(todoRef) {
  let editingText = ref(null); //当前正在修改哪一个todo
  /* 打开input */
  const editFunc = todo => {
    originTitle = todo.title;
    editingText.value = todo;
  };
  /* 失焦 */
  const doneTodo = todo => {
    editingText.value = null;
    /* inp框里面没有任何东西了就删除 */
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      // 删除
      todoRef.value.splice(todoRef.value.indexOf(todo), 1);
    }
  };
  /* 取消修改 */
  let originTitle = null; /* 缓存之前的title */
  const cancelEdit = todo => {
    editingText.value = null;
    todo.title = originTitle;
  };
  /* 设置完成状态 */
  // const setAllStatus = completed => {
  //   todoRef.value.forEach(ele => {
  //     ele.completed = completed;
  //   });
  // };
  /* 全部选中 */
  const allDownRef = computed({
    get() {
      return todoRef.value.filter(ele => !ele.completed).length === 0;
    } /* 这里双向绑定的时候也会重新赋值 */,
    set(checked) {
      console.log(checked);
      todoRef.value.forEach(ele => {
        ele.completed = checked;
      });
    },
  });

  console.log(allDownRef);
  return {
    editingText,
    editFunc,
    doneTodo,
    cancelEdit,
    allDownRef,
  };
}

export default useEditTodo;
