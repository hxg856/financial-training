$(function () {

    //$("#test").click(function () {
    var companyID = sessionStorage.getItem("companyID");
    //var companyID = "b6a1a9f8e6964dc0a568f5a4929ce76e";
    var companyName = "hxg";
    var data = {
        companyID: companyID
    };
    var data1 = {
        companyName: companyName
    };
    $.ajax({
        url: "http://119.29.236.25/search_company",
        type: "POST",
        data: data,
        dataType: "json",
        success: companyInfo,
        error: function (res) {
            console.log("error", res)
        }

    });
    $.ajax({
        url: "http://119.29.236.25/search_loan",
        type: "POST",
        dataType: "json",
        data: data,
        success: loanInfo,
        error: function (res) {
            console.log("error", res)
        }
    });
    $.ajax({
        url: "http://119.29.236.25/search_report",
        type: "POST",
        dataType: "json",
        data: data1,
        success: verifyInfo,
        error: function (res) {
            console.log("error", res)
        }
    });

    function companyInfo(res) {
        var com = res.data.company;
        $("#name").text(com.CompanyName);
        $("#legalName").text(com.LegalName);
        $("#companyNature").text(com.CompanyNature);
        $("#mainBusiness").text(com.MainBusiness);
        $("#loanReason").text(com.LoanReason);
    }

    function loanInfo(res) {
        var loan = res.data.company;
        $("#loanCredit").text(loan.LoanCredit);
        $("#loanCredit2").text(loan.LoanCredit);
        $("#loanAim").text(loan.LoanAim);
        switch (loan.RepaymentMethod) {
            case 1:
                $("#repaymentMethod").text("一次性还清");
                $("#repaymentMethod1").text("一次性还清");
                break;
            case 2:
                $("#repaymentMethod").text("等额本息分期还款");
                $("#repaymentMethod1").text("等额本息分期还款");
                break;
            case 3:
                $("#repaymentMethod").text("等额本金分期还款");
                $("#repaymentMethod1").text("等额本金分期还款");
                break;
            case 4:
                $("#repaymentMethod").text("活期还款");
                break;
                $("#repaymentMethod1").text("活期还款");
                break;
        }
        $("#repaymentTime").text(loan.RepaymentTime);
        $("#repaymentTime1").text(loan.RepaymentTime);
        $("#repaymentSource").text(loan.RepaymentSource);
        $("#loanCredit1").text(loan.LoanCredit);
        $("#cCredit").text(loan.LoanCredit);
        if (loan.RepaymentMethod == 1) {
            //一次性
            if (loan.RepaymentTime <= 12) {
                $("#grade2").text(20);
            }
            if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
                $("#grade2").text(15);
            }
            if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
                $("#grade2").text(10);
            }
            if (loan.RepaymentTime > 120) {
                $("#grade2").text(5);
            }
        }
        if (loan.RepaymentMethod == 2 || loan.RepaymentMethod == 3) {
            //分期
            if (loan.RepaymentTime <= 12) {
                $("#grade2").text(5);
            }
            if (loan.RepaymentTime <= 60 && loan.RepaymentTime > 12) {
                $("#grade2").text(10);
            }
            if (loan.RepaymentTime <= 120 && loan.RepaymentTime > 60) {
                $("#grade2").text(15);
            }
            if (loan.RepaymentTime > 120) {
                $("#grade2").text(20);
            }
        }
        if (loan.RepaymentMethod == 4) { //活期
            $("#cGrede2").text("0分");
        }
        switch (loan.CharacterClass) {
            case 1:
                $("#characterClass").text("优秀/Excellent");
                $("#characterClass1").text("优秀/Excellent");
                break;
            case 2:
                $("#characterClass").text("良好/Good");
                $("#characterClass1").text("良好/Good");
                break;
            case 3:
                $("#characterClass").text("一般/Nomal");
                $("#characterClass1").text("一般/Nomal");
                break;
            case 4:
                $("#characterClass").text("不良/Bad");
                $("#characterClass1").text("不良/Bad");
                break;
            case 5:
                $("#characterClass").text("极差/worst");
                $("#characterClass1").text("极差/worst");
                break;
        }
        switch (loan.HistoricalProfit) {
            case 1:
                $("#historicalProfit").text("优秀");
                $("#historicalProfit1").text("优秀");
                break;
            case 2:
                $("#historicalProfit").text("良好");
                $("#historicalProfit1").text("良好");
                break;
            case 3:
                $("#historicalProfit").text("一般");
                $("#historicalProfit1").text("一般");
                break;
            case 4:
                $("#historicalProfit").text("不良");
                $("#historicalProfit1").text("不良");
                break;
            case 5:
                $("#historicalProfit").text("极差");
                $("#historicalProfit1").text("极差");
                break;
        }
        switch (loan.CompanyAchievement.Pal) {
            case 1:
                $("#companyAchievement").text("盈利" + loan.CompanyAchievement.Sum + "万元");
                $("#companyAchievement1").text("盈利" + loan.CompanyAchievement.Sum + "万元");
                break;
            case 2:
                $("#companyAchievement").text("亏损" + loan.CompanyAchievement.Sum + "万元");
                $("#companyAchievement1").text("亏损" + loan.CompanyAchievement.Sum + "万元");
                break;
        }
        switch (loan.HistoricalCredit.LoanOrNot) {
            case true:
                $("#historicalCreditLoan").text("有信贷历史");
                $("#historicalCreditLoan1").text("有信贷历史");
                break;
            case false:
                $("#historicalCreditLoan").text("无信贷历史");
                $("#historicalCreditLoan1").text("无信贷历史");
                break;
        }
        switch (loan.HistoricalCredit.RepayOrNot) {
            case true:
                $("#historicalCreditRepay").text("已还清");
                $("#historicalCreditRepay1").text("已还清");
                break;
            case false:
                $("#historicalCreditRepay").text("未还清");
                $("#historicalCreditRepay1").text("未还清");
                break;
        }
        $("#mortgage").text(loan.Mortgage);
    }

    function verifyInfo(res) {
        var verify = res.data.report[0];
        switch (verify.ExpectRange) {
            case "F":
                $("#grade1").text("50");
                $("#grade3").text("F");
                break;
            case "E":
                $("#grade1").text("60");
                $("#grade3").text("E");
                break;
            case "D":
                $("#grade1").text("65");
                $("#grade3").text("D");
                break;
            case "C":
                $("#grade1").text("70");
                $("#grade3").text("C");
                break;
            case "B":
                $("#grade1").text("75");
                $("#grade3").text("B");
                break;
            case "A":
                $("#grade1").text("80");
                $("#grade3").text("A");
                break;
            case "S":
                $("#grade1").text("85");
                $("#grade3").text("S");
                break;
            case "SS":
                $("#grade1").text("90");
                $("#grade3").text("SS");
                break;
            case "SSS":
                $("#grade1").text("95");
                $("#grade3").text("SSS");
                break;
        }
        $("#grade4").text(verify.RealRange.Score);
        if ($("#grade4").text() > $("#grade1").text()) {
            $("#dis").text("符合");
        } else {
            $("#dis").text("不符合");
        }
    }
    //})
})
