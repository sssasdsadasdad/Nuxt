<template>
  <section class="container authenticated">
      
    <!-- 时间弹层 -->
    <div class="layer-date"  v-if="none">
      <div class="date-content">
        <div class="top">
          <div class="left">
            <div class="year">
              <p>开始时间</p>
              <select v-model="startTime.year" class="leftYear">
                <option v-for="(item,index) in year" :value="item" :key="index">{{item}}</option>
              </select>&nbsp;年
            </div>

            <div class="date-container clearfix">
              <div class="month ">
                <select v-model="startTime.month" class="leftMonth">
                  <template v-for="item in month">
                    <option v-if="item == startTime.month" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>月
              </div>
              <div class="day">
                <select v-model="startTime.day" class="leftDay">
                  <template v-for="item in day">
                    <option v-if="item == startTime.day" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>日
              </div>
            </div>
          </div>
          <div class="right">
            <div class="year">
              <p>结束时间</p>
              <select v-model="endTime.year" class="rightYear">
                <option v-for="item in year" :value="item">{{item}}</option>
              </select>&nbsp;年
            </div>

            <div class="date-container clearfix">
              <div class="month">
                <select v-model="endTime.month" class="rightMonth">
                  <template v-for="(item,index) in month">
                    <option v-if="item == endTime.month" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>月
              </div>
              <div class="day">
                <select v-model="endTime.day" class="rightDay">
                  <template v-for="item in day">
                    <option v-if="item == endTime.day" selected="selected" :value="item">{{item}}</option>
                    <option v-else :value="item">{{item}}</option>
                  </template>
                </select>日
              </div>
            </div>
          </div>
        </div>
        <div @click="confirm" class="confirm-btn">确定</div>
      </div>
    </div>
    <header @click="selectTimeShow" class="header">
      <div class="date-wrapper">
        <span class="todayDate">
          <i class="icon iconfont icon-rili icon-y" style="display:inline-block;"></i>
          {{startTime.year}}/{{startTime.month}}/{{startTime.day}}</span>-<span class="tomorrowDate">{{endTime.year}}/{{endTime.month}}/{{endTime.day}}</span>
      </div>

      <div class="selectTime">选择时间</div>
    </header>

    <div class="content">
      <div class="top clearfix">
        <p>排序</p>
        <p :class="[item.className,{selected:tabActiveIndex==index}]" v-for="(item,index) in tabList" v-bind:key="index" @click="tabChange(index)">
            {{item.text}}
            <i class="icon iconfont icon-sanjiaoxing" style="display:inline-block">
            </i>
        </p>
      </div>
      <div class="scrollload-container">
        <div class="wrapper scrollload-content">
          <div class="list">  
            <ul v-for="(item,index) in contentList.result" v-bind:key="index">
              <li class="clear"><div class="left">会员编号</div><div class="right">{{item.dreamUsername}}</div></li>
              <li class="clear"><div class="left">手机号</div><div class="right"><span>{{item.dreamUsername}}</span> <a href="javascript:;" class="copy clipBtn" data-clipboard-text="18507970986">复制</a></div></li>
              <li class="clear"><div class="left">认证时间</div><div class="right">{{formatData(item.dreamUpdatetime)}}</div></li>
              <li class="clear"><div class="left">级别</div><div class="right"><span>会员</span><span class="recomend">推广人</span> <span>{{item.dreamTjrid}}</span></div></li>
            </ul>
            <pagination v-if="contentList.totalPages" :pagination="contentList.totalPages" @changePagination="changePagination" :nowActive="contentList.pageNo" style="margin-bottom:56px;margin-top:10px;"></pagination>
            <div v-if="!contentList.totalPages" style="text-align:center;line-height:36px;background-color:#f3f3f3">没有更多数据啦......</div>
          </div>
        </div>      
      </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getUserList2new } from "~/apis/agents";
import { mapGetters } from "vuex";
import { dateFormat } from "~static/js/util";
import loadmore from "~components/common/loadmore";
import pagination from "~components/pagination"
import keepUserOnline from '~static/js/keepUserOnline'
export default {
  data() {
    return {
      initYear: 2015,
      startTime: {},
      endTime: {},
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      year: [],
      none: false,
      contentList:'',
      tabActiveIndex: 1,
      tabList: [
        { className: "second", text: "级别" },
        { className: "last", text: "认证时间" }
      ],
      formatDate: "",
      userInfos: {}
    };
  },
  computed: {
//  ...mapGetters({
//    userInfos: "getUserInfo"
//  })
  },
  async created() {
    keepUserOnline(this.$route, 'user').then(res => {
      this.userInfos = res.user
    })
    let date = new Date();
    let nowYear = date.getFullYear();
    for (let i = nowYear; i >= this.initYear; i--) {
      this.year.push(i);
    }
    this.startTime = {
      year: nowYear,
      month: Number(date.getMonth() + 1),
      day: date.getDate()
    };
    let end = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    this.endTime = {
      year: end.getFullYear(),
      month: Number(end.getMonth() + 1),
      day: end.getDate()
    };
    this.getList()
      .then(res => {
        this.contentList = res;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    selectTimeShow() {
      this.none = true;
    },
    confirm() {
      this.none = false;
      this.getList()
        .then(res => {
          this.contentList = res;
        })
        .catch(e => {
          console.log(e);
        });
    },
    formatData(timestamp) {
      let date = dateFormat("y-M-d HH:mm:ss", timestamp);
      return date;
    },
    dateJoin(time) {
      let str = [];
      for (let value in time) {
        str.push(time[value]);
      }
      return str.join("-");
    },
    async getList(dreamIsok = 1, dreamAgent = 0, index = 1) {
      if (this.tabActiveIndex == 0) {
        dreamAgent = 1;
      } else {
        dreamAgent = 0;
      }
      let data = {};
      let startT = this.dateJoin(this.startTime);
      let endT = this.dateJoin(this.endTime);
      let userId = this.userInfos.id;
      let returnResult = null;
      data.startTime = startT;
      data.endTime = endT;
      data.id = userId;
      data.dreamIsok = dreamIsok;
      data.dreamAgent = dreamAgent;
      data.index = index;
      let result = await getUserList2new(data);
      return result;
    },
    tabChange(index) {
      this.tabActiveIndex = index;
      this.getList(1, 1, 1)
        .then(res => {
          this.contentList = res;
        })
        .catch(e => {
          console.log(e);
        });
    },
    changePagination(index){
     this.getList(1,1,index).then(res=>{
        this.contentList = res
     }).catch(e=>{
        console.log(e)
     })
    }
    
  },
  components: {
   pagination
  }
};
</script>

<style scoped>
@import "~static/css/wusercenter/authenticated.css";
</style>