import {useIntersectionObserver} from "@vueuse/core";

export const lazyPlugin = {
    install(app){
        // 懒加载
        app.directive('img-lazy',{
            //el:指令绑定元素 img
            //binding:binding.value 指令=后面表达式的值 图片url
            mounted(el,binding){
                //console.log(el,binding.value)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        //console.log(isIntersecting);
                        if (isIntersecting) {
                            el.src = binding.value;
                            stop();
                        }
                    },
                )
            }
        })
    }
}