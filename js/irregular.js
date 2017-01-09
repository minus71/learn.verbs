var Learn;
(function(){
    console.info("Init");
    var _elm;
    var _list;
    var _ok = 0;
    var _fail = 0;
    var _total = 0;

    function ok(){
        _ok++;
        Learn.updateCount();
    };

    function fail(){
        _fail++;
        Learn.updateCount();
    };


    Learn = {
        start:function(elm,list){
            _elm = $(elm);
            _list = list;
            _total = list.length * 3;
            Learn.reset();
        },
        setResetButton:function(ebtn){
            $(ebtn).click(Learn.reset);
        },
        updateCount: function(){
            var perc_ok = _ok / _total;
            $('.total',_elm).text(perc_ok.toFixed(2)*100+"%");
        },
        reset : function(){
            _ok=0;
            _fail=0;
            function inputText(name,value) {
                var input_text = $(
                    '<div class="input-group question">' +
//                    '  <span class="input-group-addon" id="basic-addon1">'+name+'</span>' +
                    '  <input type="text" class="form-control" placeholder="'+name+'" aria-describedby="basic-addon1">' +
                    '</div>');


                // var input_text = $('<input class="question '+name+'" />');
                input_text.attr('data-value',value);
                return input_text;
            }


            function checkValue(parent){
                var btn_check = $('<button type="button" class="btn btn-default"/>');
                btn_check.text('Check');
                btn_check.click(function(){
                    $('.question',parent).each(function(e,v){
                        var elm = $(v);
                        var actual = $('input',elm).val();
                        var expected = elm.attr('data-value');
                        $('input',elm).attr('disabled','true');
                        btn_check.attr('disabled','true');
                        var pass = expected==actual;
                        elm.addClass(pass?'ok':'fail');
                        if(pass){
                            ok();
                        }else{
                            fail();
                            elm.append(
                                '<span class="input-group-addon" id="basic-addon2">'
                                + expected + 
                            '</span>');
                        }
                    });
                });
                return btn_check;
            }



            var qs_elms = [];
            var t_elm = $('<div class="col-md-12"></div>');
            t_elm.append('<span class="total"><span>');

            qs_elms.push(t_elm);

            for(var i in _list){
                var q = _list[i];
                var q_elm = $('<div class="col-md-3 question-group"></div>');
                var lbl = $('<span>'+q[0]+'</span>');
                q_elm.append(lbl);
                var answers = $('<div class="answers" />');
                answers.append(inputText('Present',q[1]));
                answers.append(inputText('Simple Past',q[2]));
                var a3 = inputText('Past Particle',q[3]);
                answers.append(a3);

                function autoOk(elm,ans,btn){
                    $('input',elm).keyup(function(e){
                        if(e.keyCode == 13){
                            btn.trigger( "click" )
                        }
                    });
                }


                q_elm.append(answers);
                var check = checkValue(answers);
                autoOk(a3,answers,check);
                q_elm.append(check);
                qs_elms.push(q_elm);
            }
            _elm.html(qs_elms);
        }
    };
})();