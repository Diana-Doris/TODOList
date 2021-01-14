/* 获取目前所有的任务 */
const LOCAL_KEY = 'ToDoMvc';
function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
}

/* 保存任务列表 */
function save(arr) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
}

/* 生成随机数  Date.now() 返回的是1970年到当前时间的毫秒数 */
function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/* 根据hash变化改变数据 */
export function filter(hash = 'all', todoRef) {
  if (hash === 'all') {
    return todoRef;
  } else if (hash === 'active') {
    // console.log('a');
    return todoRef.filter(ele => !ele.completed);
  } else if (hash === 'completed') {
    // console.log(c);
    return todoRef.filter(ele => ele.completed);
  }
  throw new Error('无效值');
}
export default {
  fetch,
  save,
  generateId,
};
