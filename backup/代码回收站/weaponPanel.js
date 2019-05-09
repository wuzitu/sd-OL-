<van-panel title="武装一" status="必杀：{{spMap[gundam.sp1]}}" wx:if="{{gundam.sp1}}">
  <view wx:for="{{[1,2,3]}}" wx:for-item="x" wx:key="x">
    <van-row>
      <van-col span="7">
        <view class='weapon_img'>
          <image src="cloud://online-07f32f.6f6e-online-07f32f/weapon/{{gundam['arm1_'+x].img}}.png"></image>
        </view>
      </van-col>
      <van-col span="11">
        <van-tag color="#0776A0" plain wx:if="{{gundam['arm1_'+x].pd}}">
          {{gundam['arm1_'+x].pd}}
        </van-tag>
        <text>{{gundam['arm1_'+x].name || "名称:??"}}</text>
      </van-col>
      <!-- 武器特效 -->
      <van-col span="6">
        <van-tag color="#f2826a" plain wx:for="{{gundam['arm1_'+x].effact}}" wx:key="x">
          {{item}}
        </van-tag>
      </van-col>
    </van-row>
    <!-- 武器数据 -->
    <van-row gutter="" style="font-size:16px;">
      <van-col span="7">
        <view wx:if="{{gundam['arm1_'+x].power}}">
          系数:{{gundam['arm1_'+x].power ||"?"}}
          <!-- 连发数量 -->
          <text wx:if="{{gundam['arm1_'+x].biuNum}}">{{gundam['arm1_'+x].biuNum}}</text>
        </view>
      </van-col>
      <van-col span="6">
        <view wx:if="{{gundam['arm1_'+x].gongsu}}">攻速:{{gundam['arm1_'+x].gongsu ||"?"}}</view>
      </van-col>
      <van-col span="6">
        <view wx:if="{{gundam['arm1_'+x].des}}">距离:{{gundam['arm1_'+x].des ||"?"}}</view>
      </van-col>
      <van-col span="5">
        <view wx:if="{{gundam['arm1_'+x].ping}}">延迟:{{gundam['arm1_'+x].ping ||"?"}}</view>
      </van-col>
    </van-row>
  </view>
  <!-- 盾牌 -->
  <van-row wx:if="{{gundam.shield1.life || gundam.shield1.def}}" gutter="20">
    <van-col span="7">
      <view class='weapon_img'>
        <image src="cloud://online-07f32f.6f6e-online-07f32f/weapon/999.png"></image>
      </view>
    </van-col>
    <van-col span="8">
      <text>血量:{{gundam.shield1.life || "?"}}</text>
    </van-col>
    <van-col span="8">
      <text>防御:{{gundam.shield1.def || "?"}}</text>
    </van-col>
  </van-row>
  <!-- 盾牌over -->
</van-panel>
<van-panel title="武装二" status="必杀：{{spMap[gundam.sp2]}}" wx:if="{{gundam.sp2}}">
  <view wx:for="{{[1,2,3]}}" wx:for-item="x" wx:key="x">
    <van-row>
      <van-col span="7">
        <view class='weapon_img'>
          <image src="cloud://online-07f32f.6f6e-online-07f32f/weapon/{{gundam['arm2_'+x].img}}.png"></image>
        </view>
      </van-col>
      <van-col span="11">
        <van-tag color="#0776A0" plain wx:if="{{gundam['arm2_'+x].pd}}">
          {{gundam['arm2_'+x].pd}}
        </van-tag>
        <text>{{gundam['arm2_'+x].name || "名称:??"}}</text>
      </van-col>
      <!-- 武器特效 -->
      <van-col span="6">
        <van-tag color="#f2826a" plain wx:for="{{gundam['arm2_'+x].effact}}" wx:key="x">
          {{item}}
        </van-tag>
      </van-col>
    </van-row>
    <!-- 武器数据 -->
    <van-row gutter="" style="font-size:16px;">
      <van-col span="7">
        <view wx:if="{{gundam['arm2_'+x].power}}">
          系数：{{gundam['arm2_'+x].power ||"?"}}
          <!-- 连发数量 -->
          <text wx:if="{{gundam['arm2_'+x].biuNum}}">{{gundam['arm2_'+x].biuNum}}</text>
        </view>
      </van-col>
      <van-col span="6">
        <view wx:if="{{gundam['arm2_'+x].gongsu}}">攻速：{{gundam['arm2_'+x].gongsu ||"?"}}</view>
      </van-col>
      <van-col span="6">
        <view wx:if="{{gundam['arm2_'+x].des}}">距离：{{gundam['arm2_'+x].des ||"?"}}</view>
      </van-col>
      <van-col span="5">
        <view wx:if="{{gundam['arm2_'+x].ping}}">延迟：{{gundam['arm2_'+x].ping ||"?"}}</view>
      </van-col>
    </van-row>
  </view>
  <!-- 盾牌 -->
  <van-row wx:if="{{gundam.shield2.life || gundam.shield2.def}}" gutter="20">
    <van-col span="7">
      <view class='weapon_img'>
        <image src="cloud://online-07f32f.6f6e-online-07f32f/weapon/999.png"></image>
      </view>
    </van-col>
    <van-col span="8">
      <text>血量:{{gundam.shield2.life || "?"}}</text>
    </van-col>
    <van-col span="8">
      <text>防御:{{gundam.shield2.def || "?"}}</text>
    </van-col>
  </van-row>
  <!-- 盾牌over -->
</van-panel>



<van-row>
  <van-col span="7">
    <view class='weapon_img'>
      <image src="cloud://online-07f32f.6f6e-online-07f32f/weapon/{{gundam['arm1_'+x].img}}.png"></image>
    </view>
  </van-col>
  <van-col span="11">
    <van-tag color="#0776A0" plain wx:if="{{gundam['arm1_'+x].pd}}">
      {{gundam['arm1_'+x].pd}}
    </van-tag>
    <text>{{gundam['arm1_'+x].name || "名称:??"}}</text>
  </van-col>
  <!-- 武器特效 -->
  <van-col span="6">
    <van-tag color="#f2826a" plain wx:for="{{gundam['arm1_'+x].effact}}" wx:key="x">
      {{item}}
    </van-tag>
  </van-col>
</van-row>


<van-row gutter="" style="font-size:16px;">
  <van-col span="7">
    <view wx:if="{{gundam['arm1_'+x].power}}">
      系数:{{gundam['arm1_'+x].power ||"?"}}
      <!-- 连发数量 -->
      <text wx:if="{{gundam['arm1_'+x].biuNum}}">{{gundam['arm1_'+x].biuNum}}</text>
    </view>
  </van-col>
  <van-col span="6">
    <view wx:if="{{gundam['arm1_'+x].gongsu}}">攻速:{{gundam['arm1_'+x].gongsu ||"?"}}</view>
  </van-col>
  <van-col span="6">
    <view wx:if="{{gundam['arm1_'+x].des}}">距离:{{gundam['arm1_'+x].des ||"?"}}</view>
  </van-col>
  <van-col span="5">
    <view wx:if="{{gundam['arm1_'+x].ping}}">延迟:{{gundam['arm1_'+x].ping ||"?"}}</view>
  </van-col>
</van-row>



<van-row wx:if="{{gundam.shield2.life || gundam.shield2.def}}" gutter="20">
  <van-col span="7">
    <view class='weapon_img'>
      <image src="cloud://online-07f32f.6f6e-online-07f32f/weapon/999.png"></image>
    </view>
  </van-col>
  <van-col span="8">
    <text>血量:{{gundam.shield2.life || "?"}}</text>
  </van-col>
  <van-col span="8">
    <text>防御:{{gundam.shield2.def || "?"}}</text>
  </van-col>
</van-row>