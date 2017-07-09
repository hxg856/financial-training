$(function () {
    $("#test").click(function () {
        $.get("data.json", function (data) {
            $("#cName").text(data.companyID);
            $("#cCredit").text(data.loanCredit);
            $("#cGrede1").text(data.grade);
            $("#cRepayMethod").text(data.repaymentMethod);
            $("#cRepayTime").text(data.repaymentTime);
            $("#cGrede2").text(data.grade);
            $("#cCharater").text(data.characterClass);
            $("#cGrede3").text(data.grade);
            $("#cPal").text(data.companyAchievement.pal);
            $("#cSum").text(data.companyAchievement.sum);
            $("#cGrede4").text(data.grade);
            $("#cAch").text(data.companyAchievement.new);
            $("#cPro").text(data.historicalProfit.new);
            $("#cGrede5").text(data.grade);
            $("#cLoan").text(data.historicalCredit.loanOrNot);
            $("#cRepay").text(data.historicalCredit.repayOrNot);
            $("#cGrede6").text(data.grade);
            $("#cGrede7").text(data.grade);
            $("#cDis").text(data.mortgage);
        });
    });
    $("#submit").click(function () {
        var companyID = "be5ab4f4fe564b02f58d1a7219a5eeeb";
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

        function enterCompanyInfo(res) {
            var com = res.data.company;
            $("#cName").text(com.CompanyName);
            $("#ccName").text(com.CompanyName);
        }

        function enterloanInfo(res) {
            var loan = res.data.company;
            $("#cCredit").text(loan.LoanAim);
            alert(loan.LoanAim);

        }
    })

})
