import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNodesStore = defineStore('nodesStore', () => {
  // Массив узлов для структуры данных
  const nodes = ref([])

  // Имя структуры данных
  const structureName = ref('')

  // Добавление нового узла с пустыми значениями
  const addNode = (index = null) => {
    const newNode = { name: '', value: '' }
    if (index !== null) {
      nodes.value.splice(index + 1, 0, newNode) // Добавляем новый узел под текущим
    } else {
      nodes.value.push(newNode) // Добавляем новый узел в конец списка
    }
  }

  // Удаление узла по индексу
  const removeNode = (index) => {
    nodes.value.splice(index, 1)
  }

  // Сброс всех узлов при создании новой структуры
  const resetNodes = () => {
    nodes.value = []
    addNode() // Добавляем хотя бы один новый узел
  }

  return {
    nodes,
    structureName,
    addNode,
    removeNode,
    resetNodes
  }
})
