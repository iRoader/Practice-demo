/**
 * Created by John on 15/10/30.
 */
function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, json, fn){
    var flag = true;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        for(var attr in json){
            //alert(attr)
            var icurrent = 0;
            if(attr == 'opacity'){
                icurrent = Math.round(parseFloat(getStyle(obj, attr))*100);
            }else{
                icurrent = parseInt(getStyle(obj, attr))
            }
            //计算速度
            var speed = (json[attr] - icurrent)/10;
            speed = speed > 0?Math.ceil(speed):Math.floor(speed);
            //检测停止
            if(icurrent != json[attr]){
                flag = false;
            }
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity:' + (icurrent+speed) + ')';
                obj.style.opacity = (icurrent + speed)/100;
            }else{
                obj.style[attr] = icurrent + speed + 'px';
            }

            if(flag){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }

    }, 30)
}

