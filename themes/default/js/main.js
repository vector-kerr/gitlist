$(function () {
    $('.dropdown-toggle').dropdown();
    var sourcecode = $('#sourcecode');
    if (sourcecode.length) {
        var value = sourcecode.text();
        var mode = sourcecode.attr('language');
        var pre = sourcecode.get(0);
        var viewer = CodeMirror(function(elt) {
            pre.parentNode.replaceChild(elt, pre);
        }, {
            value: value,
            lineNumbers: true,
            matchBrackets: true,
            lineWrapping: true,
            readOnly: true,
            mode: mode,
            lineNumberFormatter: function(ln) {
                return '<a name="L'+ ln +'"></a><a href="#L'+ ln +'">'+ ln +'</a>';
            }
        });
    }

    var md_content = $('#md-content');

    if (md_content.length) {
        var converter = new showdown.Converter({'tables': true});
        md_content.html(converter.makeHtml(md_content.text()));
    }

    function paginate() {
        var $pager = $('.pager');

        $pager.find('.next a').one('click', function (e) {
            e.preventDefault();
            $.get(this.href, function (html) {
                $pager.after(html);
                $pager.remove();
                paginate();
            });
        });

        $pager.find('.previous').remove();
    }
    paginate();
});

if ($('#repositories').length) {
    var listOptions = {
        valueNames: ['name']
    };
    var repoList = new List('repositories', listOptions);
}

if ($('#branchList').length) {
    var listBranchOptions = {
        valueNames: ['item']
    };
    var repoList = new List('branchList', listBranchOptions);
}

$('.search').click(function (e) {
    e.stopPropagation();
});
