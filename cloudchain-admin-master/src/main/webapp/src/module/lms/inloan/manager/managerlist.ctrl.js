angular.module('MetronicApp').controller('managerListController', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'settings', 'commonUtil', 'Table', function ($rootScope, $scope, $http, uiGridConstants, settings,  commonUtil, Table) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax(); // initialize core components
    });
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    var vm = this;
    vm.menuLen = 4;
    vm.pageParams = {
        bean: 'lmsInReceiptForLoan',
        method: 'page',
        page: 1,
        rows: 10,
        check_status3:'WAIT_CHECK',
        check_status1:'STATUS_CHECK_PASS',
        check_status2:'STATUS_CHECK_PASS',

    }
    vm.column = [{
        field: "id",
        displayName: 'ID',
        width: '5%',
        visible: false,
        enableColumnMenu: false,// 是否显示列头部菜单按钮
    },

        {
            field: "code",
            displayName: '客户编码',
            width: '20%',

        },
        {
            field: "customer_name",
            displayName: '客户名称',
            width: '10%',
        },
        {
            field: "loan_type",
            displayName: '贷款品种',
            width: '10%',
            cellTemplate:'<div style="padding:5px">{{row.entity.loan_type=="INVENTORY_FINANCE"?"货好贷":(row.entity.loan_type=="ORDER_FINANCE"?"单好贷":row.entity.loan_type)}}</div>'
        },
        {
            field: "apply_loan_code",
            displayName: '申请流水号',
            width: '10%'
        },
        {
            field: "check_status3",
            displayName: '审核状态',
            width: '10%',
            cellTemplate:'<div style="padding:5px">{{row.entity.check_status3=="WAIT_COMMIT"?"待提交":(row.entity.check_status3=="WAIT_CHECK"?"待审核":(row.entity.check_status3=="ACTIVE"?"生效":(row.entity.check_status3=="FINISHED"?"完成":(row.entity.check_status3=="WAIT_IN"?"待入库":(row.entity.check_status3=="CHECKING"?"审核中":(row.entity.check_status3=="CHECKED"?"已审核":(row.entity.check_status3=="FINISH_IN"?"入库完成":(row.entity.check_status3=="UN_CHECKED"?"未审核":(row.entity.check_status3=="STATUS_CHECK_PASS"?"审核通过":(row.entity.check_status3=="CHECK_FAIL"?"审核失败":(row.entity.check_status3=="EXTENDED"?"已放款":(row.entity.check_status3=="PART_REFUND"?"部分还款":(row.entity.check_status3=="REFUNDED"?"还款完成":(row.entity.check_status3=="NONE"?"无需回款":(row.entity.check_status3=="UN_BACKED"?"未回款":(row.entity.check_status3=="UN_CLEARED"?"未结清":(row.entity.check_status3=="CLEARED"?"已结清":(row.entity.check_status3=="NO_CLEARED"?"无需结清":(row.entity.check_status3=="INVALID"?"失效":(row.entity.check_status3=="OPEN"?"打开":row.entity.check_status3))))))))))))))))))))}}</div>'
        },
        {
            field: "apply_amount",
            displayName: '申请金额',
            width: '10%',
        },
        {
            field: "apply_time",
            displayName: '申请日期',
            width: '10%',
        },
        {
            field: "checked_amount",
            displayName: '审批额度',
            width: '10%'
        }
        ,
        {
            field: "real_total_amount",
            displayName: '实际产品总价',
            width: '10%'
        }
        ,
        {
            field: "real_loaned_amount",
            displayName: '实际已贷总金额',
            width: '10%'
        } ,
        {
            field: "real_max_apply_amount",
            displayName: '实际可申请金额',
            width: '10%'
        },
        {
            field: "check_status1",
            displayName: '产品部审核状态',
            width: '10%',
            cellTemplate:'<div style="padding:5px">{{row.entity.check_status1=="WAIT_COMMIT"?"待提交":(row.entity.check_status1=="WAIT_CHECK"?"待审核":(row.entity.check_status1=="ACTIVE"?"生效":(row.entity.check_status1=="FINISHED"?"完成":(row.entity.check_status1=="WAIT_IN"?"待入库":(row.entity.check_status1=="CHECKING"?"审核中":(row.entity.check_status1=="CHECKED"?"已审核":(row.entity.check_status1=="FINISH_IN"?"入库完成":(row.entity.check_status1=="UN_CHECKED"?"未审核":(row.entity.check_status1=="STATUS_CHECK_PASS"?"审核通过":(row.entity.check_status1=="CHECK_FAIL"?"审核失败":(row.entity.check_status1=="EXTENDED"?"已放款":(row.entity.check_status1=="PART_REFUND"?"部分还款":(row.entity.check_status1=="REFUNDED"?"还款完成":(row.entity.check_status1=="NONE"?"无需回款":(row.entity.check_status1=="UN_BACKED"?"未回款":(row.entity.check_status1=="UN_CLEARED"?"未结清":(row.entity.check_status1=="CLEARED"?"已结清":(row.entity.check_status1=="NO_CLEARED"?"无需结清":(row.entity.check_status1=="INVALID"?"失效":(row.entity.check_status1=="OPEN"?"打开":row.entity.check_status1))))))))))))))))))))}}</div>'
        }
        ,
        {
            field: "check_option1",
            displayName: '产品部审批意见',
            width: '10%'
        } ,
        {
            field: "check_person_code1",
            displayName: '产品部审核人员编号',
            width: '10%'
        }
        ,
        {
            field: "check_person_name1",
            displayName: '产品部审核人员姓名',
            width: '10%'
        }
        ,
        {
            field: "check_status2",
            displayName: '金融部审核状态',
            width: '10%',
            cellTemplate:'<div style="padding:5px">{{row.entity.check_status2=="WAIT_COMMIT"?"待提交":(row.entity.check_status2=="WAIT_CHECK"?"待审核":(row.entity.check_status2=="ACTIVE"?"生效":(row.entity.check_status2=="FINISHED"?"完成":(row.entity.check_status2=="WAIT_IN"?"待入库":(row.entity.check_status2=="CHECKING"?"审核中":(row.entity.check_status2=="CHECKED"?"已审核":(row.entity.check_status2=="FINISH_IN"?"入库完成":(row.entity.check_status2=="UN_CHECKED"?"未审核":(row.entity.check_status2=="STATUS_CHECK_PASS"?"审核通过":(row.entity.check_status2=="CHECK_FAIL"?"审核失败":(row.entity.check_status2=="EXTENDED"?"已放款":(row.entity.check_status2=="PART_REFUND"?"部分还款":(row.entity.check_status2=="REFUNDED"?"还款完成":(row.entity.check_status2=="NONE"?"无需回款":(row.entity.check_status2=="UN_BACKED"?"未回款":(row.entity.check_status2=="UN_CLEARED"?"未结清":(row.entity.check_status2=="CLEARED"?"已结清":(row.entity.check_status2=="NO_CLEARED"?"无需结清":(row.entity.check_status2=="INVALID"?"失效":(row.entity.check_status2=="OPEN"?"打开":row.entity.check_status2))))))))))))))))))))}}</div>'
        }
        ,
        {
            field: "check_option2",
            displayName: '金融部审批意见',
            width: '10%'
        } ,
        {
            field: "check_person_code2",
            displayName: '金融部审核人员编号',
            width: '10%'
        }
        ,
        {
            field: "check_person_name2",
            displayName: '金融部审核人员姓名',
            width: '10%'
        }
        ,
        {
            field: "check_option3",
            displayName: '审批意见',
            width: '10%'
        } ,
        {
            field: "check_person_code3",
            displayName: '审核人员编号',
            width: '10%'
        }
        ,
        {
            field: "check_person_name3",
            displayName: '审核人员姓名',
            width: '10%'
        }
    ]
    vm.getPage = function () {
        $http({
            url: "/process", method: "get",
            params: vm.pageParams
        }).success(function (data) {
            vm.data = data;
        })
    };
    vm.getPage();

    //审批
    vm.approve = function(){
        if(vm.entity.getSelectedRows().length == 0){

            msgAlert.info('请先选择要审批记录');
            return false;

        }else if(vm.entity.getSelectedRows().length > 1){

            msgAlert.info('每次只能审批一条记录');
            return false;

        }else{

            window.location.href="#/lms/inloan/manager/managercheck?id="+vm.entity.getSelectedRows()[0].id;

        }
    }
    vm.getPageByFilter = function(){
        var applyLoanCode = $('input[name="applyLoanCode"]').val();
        var customerName = $('input[name="customerName"]').val();

        var loanType = $('#id_loan_type').val();
        if(loanType == " "){
            loanType ="";
        }

        if(applyLoanCode == "" && customerName == "" && loanType == ""){
            msgAlert.info('搜索条件不能为空');
            return false;
        }
        vm.pageParams = {
            applyLoanCode:applyLoanCode,
            customerName:customerName,
            loanType:loanType,
            bean:'lmsInReceiptForLoan',
            method:'page',
            page:1,
            rows:10
        }
        vm.getPage();
    }
}])



