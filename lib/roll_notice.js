/**
 * Author: kobako
 * Github: https://github.com/zhuobinggang/roll_notice_js
 */

const roll_notice = (function () {

    const init = ({ id = 'notice', interval = 50, step = 2, rest_time = 3000 } = {}) => {
        const me = {}

        me.id = id
        me.interval = interval //ms
        me.step = step //px
        me.rest_time = rest_time

        //Wrap contain 
        me.contain_id = 'notice-contain-' + me.id
        $('#' + me.id).wrap('<div id="' + me.contain_id + '" style="overflow:hidden;display:inline-block;width: 100%;"></div>').css({
            'white-space': 'nowrap',
            'display': 'inline-block'
        })
        me.contain_left = $('#' + me.contain_id).offset().left
        me.contain_right = me.contain_left + $('#' + me.contain_id).width()

        //Calculate
        me.left = $('#' + me.id).offset().left
        me.width = $('#' + me.id).width()


        return me
    }

    const start = (me) => {
        roll_rest(me).then(() => {
            return roll_continue(me)
        }).then(() => {
            start(me)
        })
    }
    const roll_rest = (me) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.warn('roll_rest resolved')
                resolve()
            }, me.rest_time)
        })
    }
    const roll_continue = (me) => {
        const width = me.width
        const contain_left = me.contain_left
        const contain_right = me.contain_right

        const interval = me.interval //ms
        const step = me.step //px

        return new Promise((resolve, reject) => {

            function walk_to(left) {
                $('#' + me.id).offset({ left: left })
            }


            function roll_appear_to_disappear() {
                return new Promise((resolve, reject) => {
                    let left = me.left

                    function is_disappear() {
                        if(left + width < contain_left){
                            // console.log('left: '+left + ' width: ' + width + 'contain_left' + contain_left)
                            return true 
                        }
                        // return left + width < contain_left
                    }


                    (function loop() {
                        setTimeout(() => {
                            left -= step;
                            if (is_disappear()) {
                                // console.warn('roll_appear_to_disappear resolved!')
                                resolve()
                            } else {
                                walk_to(left)
                                loop()
                            }
                        }, interval)
                    }())
                })
            }

            function roll_disappear_to_appear() {
                return new Promise((resolve, reject) => {
                    let left = contain_right

                    function is_back_to_start() {
                        return left < contain_left
                    }

                    (function loop() {
                        setTimeout(() => {
                            left -= step;
                            if (is_back_to_start()) {
                                // console.warn('roll_disappear_to_appear resolved!')
                                resolve()
                            } else {
                                walk_to(left)
                                loop()
                            }
                        }, interval)
                    }())

                })
            }

            roll_appear_to_disappear().then(roll_disappear_to_appear).then(resolve)
        })
    }

    return (el) => {
        start(init(el))
    }
}())


if(typeof exports === 'undefined'){
    window['roll_notice'] = roll_notice
}else{
    exports.roll_notice = roll_notice
}
