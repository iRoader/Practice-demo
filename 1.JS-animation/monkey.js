/**
 * Created by John on 15/10/27.
 */
function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, attr, iTarget, fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var icurrent = 0;
        if(attr == 'opacity'){
            icurrent = Math.round(parseFloat(getStyle(obj, attr))*100);
        }else{
            icurrent = parseInt(getStyle(obj, attr))
        }
        //计算速度
        var speed = (iTarget - icurrent)/10;
        speed = speed > 0?Math.ceil(speed):Math.floor(speed);
        //检测停止
        if(icurrent == iTarget){
            clearInterval(obj.timer);

            if(fn){
                fn();
            }
        }else{
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity:' + (icurrent+speed) + ')';
                obj.style.opacity = (icurrent + speed)/100;
            }else{
                obj.style[attr] = icurrent + speed + 'px';
            }
        }
    }, 30)
}


