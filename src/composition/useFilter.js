/* 筛选方式 */
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { filter } from '../utils/TODOStorage';
// 有效的哈希值
const validHash = ['all', 'active', 'completed'];

function useFilter(todoRef) {
  const visibilityRef = ref('all'); /* 默认显示的是所有；他是要跟着hash变化的 */

  /* 组件加载完成之后注册，同时要在组件销毁过后把这个事件销毁。将来写的组件，就不用它了，比如切换页面 || 切换组件显示；所以这里涉及两个问题：
  1. 组件挂载完成的生命周期函数（在setup函数里面如何设置生命周期函数，例如：mounted，onunmouted，updated……）    2. 组件销毁过后的生命周期函数（我们之前用option api 的时候，我们是配置的很简单，就直接设置函数就完了，现在不是配置式了，移出来了，在setup函数里面了，没发配置，那么在vue3里面，它把这个生命周期函数，都给我们提取成一个普通函数了,onmounted,onunmounted,一个是挂载完之后，一个是销毁完之后，跟以前是对应的，只不过是提取出来了）  */

  const onHashChange = () => {
    const hash = location.hash.replace(/#\/?/, '');
    if (validHash.includes(hash)) {
      visibilityRef.value = hash;
    } else {
      location.hash = '';
      visibilityRef.value = 'all';
    }
  };
  /* 组件挂载完成的生命周期函数 监听hash值的变化*/
  onMounted(() => {
    window.addEventListener('hashchange', onHashChange);
  });

  /* 组件销毁过后的生命周期函数 */
  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange);
  });

  /* 计算属性 两种写法：computer({ get(){}  set(){} });简化写法：只有get，返回的结果还是ref包装过后的*/
  const filteredToDosRef = computed(() =>
    filter(visibilityRef.value, todoRef.value)
  );
  /* 未完成的任务 */
  const remainingRef = computed(() => filter('active', todoRef.value).length);
  /* 已经完成的任务 */
  const completedRef = computed(
    () => filter('completed', todoRef.value).length
  );

  return {
    visibilityRef,
    filteredToDosRef,
    remainingRef,
    completedRef,
  };
}
export default useFilter;
