$(function () {
    $("#test").click(function () {
        //        $.get("data.json", function (data) {
        //            $("#cName").text(data.companyID);
        //            $("#cCredit").text(data.loanCredit);
        //            $("#cGrede1").text(data.grade);
        //            $("#cRepayMethod").text(data.repaymentMethod);
        //            $("#cRepayTime").text(data.repaymentTime);
        //            $("#cGrede2").text(data.grade);
        //            $("#cCharater").text(data.characterClass);
        //            $("#cGrede3").text(data.grade);
        //            $("#cPal").text(data.companyAchievement.pal);
        //            $("#cSum").text(data.companyAchievement.sum);
        //            $("#cGrede4").text(data.grade);
        //            $("#cAch").text(data.companyAchievement.new);
        //            $("#cPro").text(data.historicalProfit.new);
        //            $("#cGrede5").text(data.grade);
        //            $("#cLoan").text(data.historicalCredit.loanOrNot);
        //            $("#cRepay").text(data.historicalCredit.repayOrNot);
        //            $("#cGrede6").text(data.grade);
        //            $("#cGrede7").text(data.grade);
        //            $("#cDis").text(data.mortgage);
        //        });
        window.location.href = "home.html";
    });
    $("#submit").click(function () {
        var companyID = localStorage.getItem("companyID");
        //var companyID = "b6a1a9f8e6964dc0a568f5a4929ce76e";
        var data = {
            companyID: companyID
        };
        $.ajax({
            url: "http://119.29.236.25/search_company",
            type: "POST",
            dataType: "json",
            data: data,
            success: enterCompanyInfo,
            error: function (res) {
                console.log("error", res)
            }
        });
        $.ajax({
            url: "http://119.29.236.25/search_loan",
            type: "POST",
            dataType: "json",
            data: data,
            success: enterloanInfo,
            error: function (res) {
                console.log("error", res)
            }
        });
        var data1 = {
            companyName: sessionStorage.getItem("companyName")
        };
        $.ajax({
            url: "http://119.29.236.25/search_report",
            type: "POST",
            dataType: "json",
            data: data1,
            success: enterVerifyInfo,
            error: function (res) {
                console.log("error", res)
            }
        });

        function enterCompanyInfo(res) {
            var com = res.data.company;
            $("#cName").text(com.CompanyName);
            $("#ccName").text(com.CompanyName);
            sessionStorage.setItem("companyName", com.CompanyName);
        }

        function enterloanInfo(res) {
            var loan = res.data.company;
            $("#cCredit").text(loan.LoanCredit);
            switch (loan.RepaymentMethod) {
                case 1:
                    $("#cRepayMethod").text("一次性还清");
                    break;
                case 2:
                    $("#cRepayMethod").text("等额本息分期还款");
                    break;
                case 3:
                    $("#cRepayMethod").text("等额本金分期还款");
                    break;
                case 4:
                    $("#cRepayMethod").text("活期还款");
                    break;
            }
            $("#cRepayTime").text(loan.RepaymentTime);
            if (loan.RepaymentMethod == 1) {
                //一次性
                if (loan.RepaymentTime <= 12) {
                    $("#cGrede2").text(20);
                }
                if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
                    $("#cGrede2").text(15);
                }
                if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
                    $("#cGrede2").text(10);
                }
                if (loan.RepaymentTime > 120) {
                    $("#cGrede2").text(5);
                }
            }
            if (loan.RepaymentMethod == 2 || loan.RepaymentMethod == 3) {
                //分期
                if (loan.RepaymentTime <= 12) {
                    $("#cGrede2").text(5);
                }
                if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
                    $("#cGrede2").text(10);
                }
                if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
                    $("#cGrede2").text(15);
                }
                if (loan.RepaymentTime > 120) {
                    $("#cGrede2").text(20);
                }
            }
            if (loan.RepaymentMethod == 4) { //活期
                $("#cGrede2").text("0分");
            }

            switch (loan.CharacterClass) {
                case 1:
                    $("#cCharater").text("优秀/Excellent");
                    $("#cGrede3").text(10);
                    break;
                case 2:
                    $("#cCharater").text("良好/Good");
                    $("#cGrede3").text(5);
                    break;
                case 3:
                    $("#cCharater").text("一般/Nomal");
                    $("#cGrede3").text(0);
                    break;
                case 4:
                    $("#cCharater").text("不良/Bad");
                    $("#cGrede3").text(-5);
                    break;
                case 5:
                    $("#cCharater").text("极差/worst");
                    $("#cGrede3").text(-10);
                    break;
            }
            switch (loan.CompanyAchievement.Pal) {
                case 1:
                    $("#cPal").text("盈利");
                    break;
                case 2:
                    $("#cPal").text("亏损");
                    break;
            }
            $("#cSum").text(loan.CompanyAchievement.Sum + "万元");
            if (loan.CompanyAchievement.Pal == 1) {
                if (loan.CompanyAchievement.Sum <= 100) {
                    $("#cGrede4").text(5);
                }
                if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
                    $("#cGrede4").text(10);
                }
                if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
                    $("#cGrede4").text(15);
                }
                if (loan.CompanyAchievement.Sum > 200 && loan.CompanyAchievement.Sum <= 300) {
                    $("#cGrede4").text(20);
                }
                if (loan.CompanyAchievement.Sum > 300 && loan.CompanyAchievement.Sum <= 500) {
                    $("#cGrede4").text(25);
                }
                if (loan.CompanyAchievement.Sum > 500 && loan.CompanyAchievement.Sum <= 1000) {
                    $("#cGrede4").text(30);
                }
                if (loan.CompanyAchievement.Sum > 1000 && loan.CompanyAchievement.Sum <= 3000) {
                    $("#cGrede4").text(35);
                }
                if (loan.CompanyAchievement.Sum > 3000 && loan.CompanyAchievement.Sum <= 5000) {
                    $("#cGrede4").text(40);
                }
                if (loan.CompanyAchievement.Sum > 5000 && loan.CompanyAchievement.Sum <= 10000) {
                    $("#cGrede4").text(45);
                }
            }
            if (loan.CompanyAchievement.Pal == 2) {
                if (loan.CompanyAchievement.Sum <= 100) {
                    $("#cGrede4").text(-5);
                }
                if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
                    $("#cGrede4").text(-10);
                }
                if (loan.CompanyAchievement.Sum > 100 && loan.CompanyAchievement.Sum <= 200) {
                    $("#cGrede4").text(-15);
                }
                if (loan.CompanyAchievement.Sum > 200 && loan.CompanyAchievement.Sum <= 300) {
                    $("#cGrede4").text(-20);
                }
                if (loan.CompanyAchievement.Sum > 300 && loan.CompanyAchievement.Sum <= 500) {
                    $("#cGrede4").text(-25);
                }
                if (loan.CompanyAchievement.Sum > 500 && loan.CompanyAchievement.Sum <= 1000) {
                    $("#cGrede4").text(-30);
                }
                if (loan.CompanyAchievement.Sum > 1000 && loan.CompanyAchievement.Sum <= 3000) {
                    $("#cGrede4").text(-35);
                }
                if (loan.CompanyAchievement.Sum > 3000 && loan.CompanyAchievement.Sum <= 5000) {
                    $("#cGrede4").text(-40);
                }
                if (loan.CompanyAchievement.Sum > 5000 && loan.CompanyAchievement.Sum <= 10000) {
                    $("#cGrede4").text(-45);
                }
            }
            //console.log($("#cGrede4").text() < 25 && $("#cGrede4").text() >= 5);
            if ($("#cGrede4").text() >= 30) {
                $("#cAch").text("优秀。");
            }
            if ($("#cGrede4").text() < 25 && $("#cGrede4").text() >= 5) {
                $("#cAch").text("良好。");
            }
            if ($("#cGrede4").text() < -5 && $("#cGrede4").text() >= -25) {
                $("#cAch").text("不良。");
            }
            if ($("#cGrede4").text() <= -35) {
                $("#cAch").text("较差。");
            }
            switch (loan.HistoricalCredit.LoanOrNot) {
                case true:
                    $("#cLoan").text("有信贷历史");
                    break;
                case false:
                    $("#cLoan").text("无信贷历史");
                    break;
            }
            switch (loan.HistoricalCredit.RepayOrNot) {
                case true:
                    $("#cRepay").text("已还清");
                    break;
                case false:
                    $("#cRepay").text("未还清");
                    break;
            }
            if (!loan.HistoricalCredit.LoanOrNot) {
                $("#cGrede6").text(5);
            } else {
                if (loan.HistoricalCredit.RepayOrNot) {
                    $("#cGrede6").text(10);
                } else {
                    $("#cGrede6").text(-10);
                }
            }
            switch (loan.HistoricalProfit) {
                case 1:
                    $("#cPro").text("优秀");
                    $("#cGrede5").text(50);
                    break;
                case 2:
                    $("#cPro").text("良好");
                    $("#cGrede5").text(25);
                    break;
                case 3:
                    $("#cPro").text("一般");
                    $("#cGrede5").text(0);
                    break;
                case 4:
                    $("#cPro").text("不良");
                    $("#cGrede5").text(-25);
                    break;
                case 5:
                    $("#cPro").text("极差");
                    $("#cGrede5").text(-50);
                    break;
            }

        }

        function enterVerifyInfo(res) {
            var verify = res.data.report[0];
            $("#reportID").text(verify.ResultTimeID);
            switch (verify.ExpectRange) {
                case "F":
                    $("#cGrede1").text("50");
                    break;
                case "E":
                    $("#cGrede1").text("60");
                    break;
                case "D":
                    $("#cGrede1").text("65");
                    break;
                case "C":
                    $("#cGrede1").text("70");
                    break;
                case "B":
                    $("#cGrede1").text("75");
                    break;
                case "A":
                    $("#cGrede1").text("80");
                    break;
                case "S":
                    $("#cGrede1").text("85");
                    break;
                case "SS":
                    $("#cGrede1").text("90");
                    break;
                case "SSS":
                    $("#cGrede1").text("95");
                    break;
            }
            var gradeTotal = parseInt($("#cGrede2").text()) +
                parseInt($("#cGrede3").text()) +
                parseInt($("#cGrede4").text()) +
                parseInt($("#cGrede5").text()) +
                parseInt($("#cGrede6").text());
            console.log(gradeTotal);
            //$("#cGrede7").text(verify.RealRange.Score);
            $("#cGrede7").text(gradeTotal);
            if ($("#cGrede7").text() > $("#cGrede1").text()) {
                $("#cDis").text("符合");
            } else {
                $("#cDis").text("不符合");
            }

        }

    })

})
