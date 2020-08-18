<template>
  <el-container>
    <el-header>智慧团建解密工具</el-header>
    <el-main>
      <div>
        <div style="margin:30px 0;">
          <el-radio v-model="radioType" label="1" border>登录KEY/业务5冲突ID解密</el-radio>
          <el-radio v-model="radioType" label="2" border>登录后用户/组织ID解密</el-radio>
          <el-radio v-model="radioType" label="3" border>注册组织ID解密</el-radio>
          <el-radio v-model="radioType" label="4" border>业务ID解密</el-radio>
        </div>
        <div style="margin: 20px 0;">
          <!--            <div>-->
          <!--              <label for="i1" class="leftLabel">待解密内容：</label>-->
          <!--              <el-input id="i1" placeholder="请输入内容" v-model="inputVal_i1" clearable class="rightInput">-->
          <!--              </el-input>-->
          <!--            </div>-->
          <div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="待解密内容" for="i1">
                <el-input v-model="form.inputVal_i1" placeholder="请输入内容" id="i1"></el-input>
              </el-form-item>
              <el-form-item label="解密重要KEY" for="i2">
                <el-input v-model="form.inputVal_i2" placeholder="请输入内容" id="i2"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="deStr">立即解密</el-button>
                <el-button @click="resetVal">全部清空</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div style="margin: 20px 0;">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="解密后内容">
                <el-input v-model="inputVal_i3" :disabled="show2?true:false" :readonly="show2?false:true"></el-input>
              </el-form-item>
              <el-form-item v-if="show2" label="解密后用户ID">
                <el-input v-model="inputVal_i31" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item v-if="show2" label="解密后组织ID">
                <el-input v-model="inputVal_i32" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="copyVal('a')" v-if="radioType == '2' && show2">复制用户ID</el-button>
                <el-button @click="copyVal('b')" v-if="radioType == '2' && show2">复制组织ID</el-button>
                <el-button @click="copyVal('c')" v-if="radioType == '1' && !show2">复制内容</el-button>
                <el-button @click="copyVal('d')" v-if="radioType == '2' && !show2">复制用户/组织ID</el-button>
                <el-button @click="copyVal('e')" v-if="radioType == '3'">复制组织ID</el-button>
                <el-button @click="copyVal('f')" v-if="radioType == '4'">复制业务ID</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>{{err}}</div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        radioType: '1',
        inputVal_i3: '',
        inputVal_i31: '',
        inputVal_i32: '',
        err: '',
        show2: false,
        form: {
          inputVal_i1: '',
          inputVal_i2: '',
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
    },
    methods: {
      resetVal() {
        this.radioType = "1"
        this.form.inputVal_i1 = ""
        this.form.inputVal_i2 = ""
      },
      copyVal(t) {
        let oInput = document.createElement('input');
        if (t == "a") {
          oInput.value = this.inputVal_i31;
        }
        if (t == "b") {
          oInput.value = this.inputVal_i31;
        }
        if (t == "c" || t == "d" || t == "e" || t == "f") {
          oInput.value = this.inputVal_i3;
        }
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.remove()
        // document.body.removeChild(_input); // 删除临时实例
      },
      deStr() {
        if (this.form.inputVal_i1.length <= 0) {

        }
        if (this.radioType == "1") {
          this.form.inputVal_i2 = ""
        }
        if (this.radioType == "4" || this.radioType == "2" || this.radioType == "3") {
          if (this.form.inputVal_i2.length <= 0) {
            
          }
        }
        let param = new FormData();
        param.append("radioType", this.radioType)
        param.append("inputVal", this.form.inputVal_i1)
        param.append("inputKey", this.form.inputVal_i2)
        this.PF('/decryStr', param, {}).then((response) => {
          let res = response.data
          this.radioType = res.i_type
          this.inputVal_i3 = res.i_val
          this.err = res.i_err
          console.log(res.i_val.substring(8, 9) == "_")
          if (res.i_val.length > 9 && res.i_val.substring(8, 9) == "_") {
            this.show2 = true
            this.inputVal_i31 = res.i_val.substring(0, 8)
            this.inputVal_i32 = res.i_val.substring(9)
            this.form.inputVal_i1 = ""
            this.form.inputVal_i2 = res.i_val.substring(0, 8)
            this.radioType = "2"
          } else {
            this.show2 = false
          }
        }).catch(function (error) {
          console.log(error)
          // this.$elementMessage('网络繁忙，请稍后再试', "error")
        })
      }
    }
  }
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

  .leftLabel {
    float: left;
    display: block;
  }

  .rightInput {
    float: left;
    display: block;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 80px !important;
    line-height: 80px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100% !important;
    line-height: 100% !important;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>