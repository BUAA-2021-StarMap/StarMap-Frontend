<template>
  <div>
    
  
    <customertable/>
    <customercharts/>
  </div>
</template>
<script>

import customertable from "@/components/CustomerTable.vue";
import customercharts from "@/components/CustomerCharts.vue";
export default {
  name: "CustomerAll",
  components: {customertable,customercharts},
  //data() {return{}},
};
</script>