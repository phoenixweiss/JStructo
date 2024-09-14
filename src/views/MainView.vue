<script setup>
import { useNodesStore } from '@/stores/nodesStore'
import { ref, computed } from 'vue'
import { downloadFile } from '@/lib/fileHandlingFunctions'
import yaml from 'js-yaml'

const nodesStore = useNodesStore()

// Модальное окно для подтверждения удаления всех узлов
const showConfirmation = ref(false)

// Сброс всех узлов при создании новой структуры
const createNewStructure = () => {
  showConfirmation.value = true
}

// Подтверждение создания новой структуры
const confirmNewStructure = () => {
  nodesStore.resetNodes() // Сброс узлов через стор
  showConfirmation.value = false
}

// Отмена подтверждения
const cancelNewStructure = () => {
  showConfirmation.value = false
}

// Преобразование узлов в нужный формат
const transformNodes = () => {
  return nodesStore.nodes.map((node) => ({ [node.name]: node.value }))
}

// Сохранение структуры в формате JSON
const saveAsJSON = () => {
  const content = JSON.stringify(transformNodes(), null, 2)
  downloadFile(content, nodesStore.structureName, 'json')
}

// Сохранение структуры в формате YAML
const saveAsYAML = () => {
  const content = yaml.dump(transformNodes())
  downloadFile(content, nodesStore.structureName, 'yaml')
}

// Проверка, заполнено ли имя структуры
const isStructureNameValid = computed(() => nodesStore.structureName.trim() !== '')
</script>

<template>
  <main class="container">
    <h1>{{ $t('ui.main_header') }}</h1>

    <hr />

    <section class="control grid">
      <!-- Кнопка для создания новой структуры данных -->
      <button @click="createNewStructure">{{ $t('ui.create_new_structure') }}</button>

      <!-- Кнопка для загрузки файла (пока не реализована) -->
      <button disabled>{{ $t('ui.load_file') }}</button>
    </section>

    <!-- Модальное окно для подтверждения создания новой структуры -->
    <dialog :open="showConfirmation">
      <article>
        <h2>{{ $t('ui.modals.confirm_new_structure.title') }}</h2>
        <p>{{ $t('ui.modals.confirm_new_structure.content') }}</p>
        <footer>
          <button @click="confirmNewStructure" class="contrast">{{ $t('ui.yes') }}</button>
          <button @click="cancelNewStructure" class="secondary">{{ $t('ui.no') }}</button>
        </footer>
      </article>
    </dialog>

    <!-- Форма для отображения всех узлов -->
    <div v-if="nodesStore.nodes.length">
      <h2>{{ $t('ui.data_structure') }}</h2>

      <!-- Поле для ввода имени структуры -->
      <input
        type="text"
        name="structure_name"
        v-model="nodesStore.structureName"
        :placeholder="$t('ui.structure_name.placeholder')"
      />

      <div class="node-list">
        <div v-for="(node, index) in nodesStore.nodes" :key="index" class="node-item">
          <input
            class="node_name"
            v-model="node.name"
            :placeholder="$t('ui.node_name_placeholder')"
          />
          <input
            class="node_value"
            v-model="node.value"
            :placeholder="$t('ui.node_value_placeholder')"
          />
          <div class="node_actions">
            <button @click="nodesStore.addNode(index)" class="success">
              {{ $t('ui.create_new_node') }}
            </button>
            <button @click="nodesStore.removeNode(index)" class="warning">
              {{ $t('ui.remove_node') }}
            </button>
          </div>
        </div>
      </div>

      <section class="save grid">
        <!-- Кнопки для сохранения структуры -->
        <button @click="saveAsJSON" :disabled="!isStructureNameValid">
          {{ $t('ui.save_as_json') }}
        </button>
        <button @click="saveAsYAML" :disabled="!isStructureNameValid">
          {{ $t('ui.save_as_yaml') }}
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped>
.node-list {
  margin-top: 20px;
  list-style: none;
  margin: 0 auto;

  .node-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    input {
      height: auto;
      margin: 0;
    }

    .node_name {
      flex: 1 1 0;
    }
    .node_value {
      flex: 2 1 0;
    }

    .node_actions {
      flex: 1 1 0;
      display: flex;
      gap: 1rem;
    }

    button {
      margin: 0;

      &.success {
        background-color: #00861f;
        border-color: #006117;
      }

      &.warning {
        background-color: #ac0000;
        border-color: #7c0000;
      }
    }
  }
}
</style>
