<template>
  <div class="container">
    <div class="top">
        <div class="top_title">拖拽组件</div>
        <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/baseHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>拖拽组件</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="group">
      <draggable class="list_group" element="span" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group  class="list-group" tag="ul">
          <div v-for="element in list" :key="element.order" class="list_group_item">
            <div class="list_group_item_v" @click=" element.fixed=! element.fixed" aria-hidden="true">
              <i class="el-icon-mouse"></i>
              {{element.name}}
              
            </div>
            <span class="badge">{{element.order}}</span>
          </div>
        </transition-group>
      </draggable>

      <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove" class="list_group">
        <transition-group name="no" class="list-group" tag="ul">
          <div class="list_group_item" v-for="element in list2" :key="element.order">
            <div class="list_group_item_v" @click=" element.fixed=! element.fixed" aria-hidden="true">
              <i class="el-icon-mouse"></i>
              {{element.name}}
              
            </div>
            <span class="badge">{{element.order}}</span>
          </div>
        </transition-group>
      </draggable>

    <div class="list_group_data">
      <pre>{{listString}}</pre>
    </div>
    <div class="list_group_data">
      <pre>{{list2String}}</pre>
    </div>
    </div>
    
  </div>
</template>

<script>
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

export default {
  name: "hello",
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.container{
  /* display: flex; */
  /* justify-content: center; */
  /* width: 100%; */
  padding: 20px;
  background: #fff;
}
.top_title {
  font-size: 30px;
    font-weight: bold;
}
.breadcrumb {
    margin: 10px 0;
}
.group {
  display: flex;
  justify-content: space-between;
}
.list_group {
  width: 23%;
  min-height: 50px;
  /* height: 100%; */
}
.list_group_item {
  /* width: 300px; */
  height: 50px;
  min-height: 50px;
  /* background-color: #42b983; */
  border: 1px solid #eee;
  /* color: #ffffff; */
  /* font-size: 20px; */
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  cursor: move;
  /* transition: 0.5s; */
}
.list_group_item i {
  cursor: pointer;
}
.list_group_item_v {
  margin-left: 10px;
}

.badge {
  display: inline-block;
  background: rgba(66, 63, 63, 0.815);
  width: 20px;
  /* line-height: 50px; */
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
}
.sortable_control {
  margin-bottom: 40px;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list_group_data {
  min-height: 20px;
  width: 23%;
  background: #dbd8d8e7;
}
.list-group {
  min-height: 50px;
}

</style>
