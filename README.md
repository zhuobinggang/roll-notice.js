## A simple lib to roll your notice

![01](assets/01.png)

![02](assets/02.png)

![03](assets/03.png)

### Usage 

```html
<div id="notice">这是一个公告</div>

<!-- Require jquery -->
<script src="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<!-- Require the lib -->
<script src="./lib/roll_notice.js"></script>
<script>
    //Just use the global function
    roll_notice({ id: 'notice' })
</script>
```

#### DEMO
[DEMO(ch)](https://zhuobinggang.github.io/roll_notice_js/index.html?lang=ch)

[DEMO(en)](https://zhuobinggang.github.io/roll_notice_js/index.html?lang=en)


### Options
```js
roll_notice({ 
    id = 'notice', //Id of the div you want it to roll
    interval = 50, //50 ms per step/frame
    step = 2, //Pixels to move Every steps/frames
    rest_time = 3000, //How many ms to rest when touched the border
})
```