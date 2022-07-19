<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="pageClick(pageNo - 1)">上一页</button>
    <button v-if="startNumAndendNum.start > 1" @click="pageClick(1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndendNum.start > 2">···</button>
    
    <span v-for="page in startNumAndendNum.end" :key="page"> 
      <button v-if="page >= startNumAndendNum.start" @click="pageClick(page)" :class="{active:pageNo==page}">
        {{page}}
      </button>
    </span>
    
    <button v-if="startNumAndendNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndendNum.end < totalPage" @click="pageClick(totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="pageClick(pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total/this.pageSize)
    },

    //计算连续页码start和end
    startNumAndendNum() {
      let start = 0 , end = 0

      if(this.continues > this.totalPage){
        start = 1
        end = this.totalPage
      }else{
        start = this.pageNo - parseInt(this.continues/2)
        end = this.pageNo + parseInt(this.continues/2)

        if(start < 1){
          start = 1
          end = this.continues
        }

        if(end > this.totalPage){
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }

      return {start,end}
    }
  },
  methods: {
    pageClick(pageNum) {
      this.$emit('getPageNo',pageNum)
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-bottom:20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  outline: none;
  border-radius: 2px;
  padding: 0 4px;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  border: 0;
}

.pagination button[disabled] {
  color: #c0c4cc;
  cursor: not-allowed;
}

.pagination button.active {
  cursor: not-allowed;
  /* background-color: #409eff; */
  background-color: #e1251b;
  color: #fff;
}
</style>