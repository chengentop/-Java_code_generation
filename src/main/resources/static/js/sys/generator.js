$(function () {
    $("#sysGeneratorGrid").Grid({
        url: 'views/pages/sys/generator',
        colModel: [
            {label: '表名', name: 'tableName', index: 'table_name', width: 100, key: true},
            {label: 'Engine', name: 'engine', index: 'engine', width: 70},
            {label: '表备注', name: 'tableComment', index: 'table_comment', width: 100},
            {
                label: '创建时间', name: 'createTime', index: 'create_time', width: 100, formatter: function (value) {
                return transDate(value);
            }
            }
        ]
    });
});

var vm = new Vue({
    el: '#sysGenerator',
    data: {
        q: {
            tableName: null
        }
    },
    methods: {
        query: function () {
            $("#sysGeneratorGrid").jqGrid('setGridParam', {
                postData: {'tableName': vm.q.tableName},
                page: 1
            }).trigger("reloadGrid");
        },
        reloadSearch: function () {
            vm.q = {
                tableName: ''
            }
            vm.query();
        },
        generator: function () {
            var tableNames = getSelectedRows("#sysGeneratorGrid");
            if (tableNames == null) {
                return;
            }
            location.href = "../sys/generator/code?tables=" + JSON.stringify(tableNames);
        }
    }
});

