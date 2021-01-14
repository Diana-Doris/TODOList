<template>
  <div id="app">
    <!-- <input
      type="text"
      @input="$event.target.value = 999"
    > -->
    <section class="todoapp">
      <!-- 头部 -->
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keydown.enter="addTodo"
        />
      </header>

      <section
        class="main"
        v-show="todoRef.length"
      >
        <input
          v-model="allDownRef"
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{completed : work.completed, editing: work === editingText}"
            v-for="(work, index) in filteredToDosRef"
            :key="work.id"
          >
            <div class="view">
              <input
                class="toggle"
                type="checkbox"
                v-model="work.completed"
              />
              <label @dblclick="editFunc(work)">{{ work.title }}</label>
              <button
                class="destroy"
                @click="delTodo(index)"
              ></button>
            </div>
            <input
              v-model="work.title"
              @blur="doneTodo(work)"
              @keyup.enter="doneTodo(work)"
              @keyup.escape="cancelEdit(work)"
              class="edit"
              type="text"
            />
          </li>

        </ul>
      </section>

      <footer
        class="footer"
        v-show="todoRef.length"
      >
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 1 ? '' : 's'}} left</span>
        </span>
        <ul class="filters">
          <li><a
              href="#/all"
              :class="{selected: visibilityRef === 'all'}"
            >All</a></li>
          <li><a
              href="#/active"
              :class="{selected: visibilityRef === 'active'}"
            >Active</a></li>
          <li><a
              href="#/completed"
              :class="{selected: visibilityRef === 'completed'}"
            >Completed</a></li>
        </ul>
        <button
          v-show="completedRef"
          class="clear-completed"
          style="display: none"
          @click="cancelCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
// import { ref, watchEffect } from 'vue'
// import localData from './utils/TODOStorage.js'
import useFilter from './composition/useFilter'
import useTodolist from './composition/useTodolist'
import useNewTodo from './composition/useNewTodo'
import useEditTodo from './composition/useEiditTodo'
import useDelete from './composition/useDelete'

/* 数据哪里来，保存到哪里？我们就简单的保存到localStorage里面去;这个页面中要用到所有的任务，就写setup函数,我们在这个页面里面要用到哪些东西，要用到哪些属性，哪些方法，哪些生命周期函数，哪些计算属性，我们肯定会用到任务列表，而且这个任务列表是具有响应式的；它如果数据变化了，它应该保存到localStorage里面，我们如何监控它如何变化呢？在composition api里面，它给我们提供了一个函数，watchEffect(监控副作用)；它的参数里面是一个函数，这个函数里面只要用到了响应式数据，这些响应式数据就会自动被作为依赖，这个函数要依赖响应式数据； */
export default {
  setup (props) {
    /* const todoRef = ref(localData.fetch())
    watchEffect(() => {
      localData.save(todoRef.value)
    }) */

    const { todoRef } = useTodolist();
    const { newTodoRef, addTodo } = useNewTodo(todoRef);
    const { visibilityRef, filteredToDosRef, remainingRef, completedRef } = useFilter(todoRef);
    const { editingText, editFunc, doneTodo, cancelEdit, allDownRef } = useEditTodo(todoRef)
    const { delTodo, cancelCompleted } = useDelete(todoRef)

    console.log(delTodo)
    return {
      todoRef,
      newTodoRef,
      addTodo,
      visibilityRef,
      filteredToDosRef,
      remainingRef,
      completedRef,
      editFunc,
      editingText,
      doneTodo,
      cancelEdit,
      allDownRef,
      delTodo,
      cancelCompleted
    }
  }

}
</script>
