import '../scss/style.scss';

var DOMController=(function(){
    var selector={
        text_write:document.querySelectorAll('.text_write'),
        placeholder:document.querySelectorAll('.placeholder'),
        input_name:document.querySelector('#text_name .text_write'),
        input_email:document.querySelector('#text_email .text_write'),
        input_pass:document.querySelector('#text_pass .text_write'),
        input_confirm_pass:document.querySelector('#text_confirm_pass .text_write'),
        name_alert_1:document.querySelector('.name_alert_1'),
        name_alert_2:document.querySelector('.name_alert_2'),
        name_alert_3:document.querySelector('.name_alert_3'),
        email_alert_1:document.querySelector('.email_alert_1'),
        email_alert_2:document.querySelector('.email_alert_2'),
        pass_alert_1:document.querySelector('.pass_alert_1'),
        pass_alert_2:document.querySelector('.pass_alert_2'),
        conf_pass_alert_1:document.querySelector('.conf_pass_alert_1'),
        conf_pass_alert_2:document.querySelector('.conf_pass_alert_2'),
        form_wrap:document.querySelector('.form_wrap'),
        validate:document.querySelectorAll('.validate'),
        locker1:document.querySelector('.locker1'),
        locker2:document.querySelector('.locker2'),
    };
    return {
        getSelector:function(){
            return selector;
        }
    };
})();

var PlaceController=(function(DOMCtrl){
    var selector=DOMCtrl.getSelector();
    return{
        getDOMEvent:function(){
            selector.text_write.forEach((curr,index)=>{
                curr.addEventListener('focus',function(e){
                    selector.placeholder[index].classList.add('uplift');
                });
                curr.addEventListener('blur',function(e){
                    if(e.target.value==0)
                        selector.placeholder[index].classList.remove('uplift');
                });
            });
            
        }
    }
})(DOMController);



var AlertController=(function(DOMCtrl){
    var selector=DOMCtrl.getSelector();
    var pass;
    var flag={
        name_flag:0,
        email_flag:0,
        pass_flag:0,
        confirm_flag:0
    };
    var AlertMsz=function(index){
        var animate=selector.validate[index];
        animate.style.animation=`Vibrate 0.07s linear 16`;
        var arr=['name','email','pass','confirm_pass'];
        var box=document.querySelector(`#text_${arr[index]}`);
        box.style.animation=`BoxVibrate 0.07s linear 8`;
        setTimeout(function(){
            box.style.animation="";
            animate.style.animation="";
        },700);
        
        switch(index){
            case '0':{
                selector.name_alert_1.style.display="block";
                selector.name_alert_2.style.display="none";
                selector.name_alert_3.style.display="none";
                break;
            }
            case '1':{
                selector.email_alert_1.style.display="block";
                selector.email_alert_2.style.display="none";
                break;   
            }
            case '2':{
                selector.pass_alert_1.style.display="block";
                selector.pass_alert_2.style.display="none";
                break;
            }
            case '3':{
                selector.conf_pass_alert_1.style.display="block";
                selector.conf_pass_alert_2.style.display="none";
                break;
            }
        };
    };
    var ChangeType=function(e){
        //console.log(e.target.parentNode.childNodes[3].type);
        var temp=e.target.parentNode.childNodes[3];
        if(temp.type=="password"){
            temp.type="text";
        }
        else{
            temp.type="password";
        }
    };
    return{
        //Name Validation
        NameValidation:function(){
            selector.input_name.addEventListener('input',function(e){
                var name=e.target.value;
                var alert={
                    alert_one:0,
                    alert_two:0,
                    alert_three:0
                }
                //1.should not be empty
                if(name.length==0){
                    selector.name_alert_1.style.display="block";
                    alert.alert_one=1;
                }                
                else{
                    selector.name_alert_1.style.display="none";
                    alert.alert_one=0;
                }
                //2.does not start with numerical and minimum 3 letter word
                if(name.length!=0 && !isNaN(name[0])){
                    selector.name_alert_2.style.display="block";
                    alert.alert_2=1;
                }
                else if(name.length>=1 && name.length<3){
                    selector.name_alert_3.style.display="block";
                    alert.alert_three=1;
                }
                else{
                    selector.name_alert_2.style.display="none";
                    selector.name_alert_3.style.display="none";
                    alert.alert_two=0;
                    alert.alert_three=0;
                }
                if(alert.alert_one==0 && alert.alert_two==0 && alert.alert_three==0){
                    flag.name_flag=1;
                }
                else{
                    flag.name_flag=0;
                }
            });
        },
        //Email Validation
        EmailValidation:function(){
            selector.input_email.addEventListener('input',function(e){
                var email=e.target.value;
                var alert={
                    alert_1:0,
                    alert_2:0
                };
                //1.should not be empty
                if(email.length==0){
                    selector.email_alert_1.style.display="block";
                    alert.alert_1=1;
                }                
                else{
                    selector.email_alert_1.style.display="none";
                    alert.alert_1=0;
                }
                var check=email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
                if(!check && email.length>=1){
                    selector.email_alert_2.style.display="block";
                    alert.alert_2=1;
                }
                else{
                    selector.email_alert_2.style.display="none";
                    alert.alert_2=0;
                }
                if(alert.alert_2==0 && alert.alert_1==0){
                    flag.email_flag=1;
                }
                else{
                    flag.email_flag=0;
                }
            });
        },
        //Password Validation
        PassValidation:function(){
            selector.input_pass.addEventListener('input',function(e){
                pass=e.target.value;
                var alert={
                    alert_1:0,
                    alert_2:0
                };
                //1.should not be empty
                if(pass.length==0){
                    selector.pass_alert_1.style.display="block";
                    alert.alert_1=1;
                }                
                else{
                    selector.pass_alert_1.style.display="none";
                    alert.alert_1=0;
                }
                if(pass.length<8 && pass.length>0){
                    selector.pass_alert_2.style.display="block";
                    alert.alert_2=1;
                }
                else{
                    selector.pass_alert_2.style.display="none";
                    alert.alert_2=0;
                }
                if(alert.alert_2==0 && alert.alert_1==0){
                    flag.pass_flag=1;
                }
                else{
                    flag.pass_flag=0;
                }
            });
        },
        //ConfirmPassword Validation
        ConfirmPassValidation:function(){
            selector.input_confirm_pass.addEventListener('input',function(e){
                var conf=e.target.value;
                var alert={
                    alert_1:0,
                    alert_2:0
                };
                //1.should not be empty
                if(conf.length==0){
                    selector.conf_pass_alert_1.style.display="block";
                    alert.alert_1=1;
                }                
                else{
                    selector.conf_pass_alert_1.style.display="none";
                    alert.alert_1=0;
                }
                if(conf.length>0 && conf!==pass){
                    selector.conf_pass_alert_2.style.display="block";  
                    alert.alert_2=1;  
                }
                else{
                    selector.conf_pass_alert_2.style.display="none";
                    alert.alert_2=0;
                }
                if(alert.alert_2==0 && alert.alert_1==0){
                    flag.confirm_flag=1;
                }
                else{
                    flag.confirm_flag=0;
                }
            });
        },
        //Form Validation
        FormValidation:function(){
            selector.form_wrap.addEventListener('submit',function(e){
                if(flag.name_flag==0 || flag.email_flag==0 || flag.pass_flag==0 || flag.confirm_flag==0){
                    e.preventDefault();
                    if(flag.name_flag==0){
                        AlertMsz('0');
                    }
                    if(flag.email_flag==0){
                        AlertMsz('1');
                    }
                    if(flag.pass_flag==0){
                        AlertMsz('2');
                    }
                    if(flag.confirm_flag==0){
                        AlertMsz('3');
                    }
                }
            });
        },
        Locker:function(){
            selector.locker1.addEventListener('click',function(e){
                selector.locker1.classList.toggle('fa-unlock');
                selector.locker1.classList.toggle('fa-lock');
                ChangeType(e);
            });
            selector.locker2.addEventListener('click',function(e){
                selector.locker2.classList.toggle('fa-unlock');
                selector.locker2.classList.toggle('fa-lock');
                ChangeType(e);
            });
        }
    };
})(DOMController);

var Controller=(function(PlaceCtrl,AlertCtrl){
    return {
        init:function(){
            PlaceController.getDOMEvent();
            AlertCtrl.Locker();
            AlertCtrl.NameValidation();
            AlertCtrl.EmailValidation();
            AlertCtrl.PassValidation();
            AlertCtrl.ConfirmPassValidation();
            AlertCtrl.FormValidation();
            
        }
    };
})(PlaceController,AlertController);

Controller.init();


