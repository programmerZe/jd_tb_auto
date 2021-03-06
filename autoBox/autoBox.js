"ui";
"auto";
events.observeKey();
events.onKeyDown("volume_down",function(event){
            threads.shutDownAll();
        });
ui.layout(
    <vertical padding="16">
        <button id="jdAutoButton" text="JD叠蛋糕" style="Widget.AppCompat.Button.Colored" w="*"/>
        <button id="jdGoldButton" text="JD小金人" style="Widget.AppCompat.Button.Colored" w="*"/>
        <button id="tbAutoButton" text="TB领猫币" style="Widget.AppCompat.Button.Colored" w="*"/>
        <text margin="8">
        1.音量下键结束活动
        </text>
        <text margin="8">
        2.如果无法自动进入活动界面，请手动进入活动界面
        </text>
        <text margin="8">
        3.如果有的活动无法自动完成，请手动完成
        </text>
    </vertical>
);
ui.jdAutoButton.on("click", ()=>{
    threads.start(JDAutoThread);
});
ui.tbAutoButton.on("click", ()=>{
    threads.start(tbAutoThread);
});
ui.jdGoldButton.on("click", ()=>{
    threads.start(jdGoldThread);
});
var JDAutoThread = function(){
    // JD叠蛋糕
    toast("JD叠蛋糕");
    auto.waitFor();
var appName = "京东";

var finishButtonNum = 1;
// 建立一个循环，不断的检测里面控件的存在并且做出对应操作
while(true){
    // 打开京东APP
    launchApp(appName);
    // 睡眠3秒，等待程序加载
    sleep(3000);
    // 进入京东主界面，检查是否存在“我的”右下角，如果存在，点击进去，接着判断是否存在全民叠蛋糕活动，如果有则点击进入
    if(descContains("我的").exists()){
        log("进入我的界面");
        descContains("我的").findOne().click();
        sleep(2000);
        // 判断是否有全民叠蛋糕活动
        if(textContains("叠蛋糕分").exists()){
            log("进入叠蛋糕界面");
            if(idContains("ur").exists()){
                idContains("ur").findOne().click();
            }else if(idContains("ur").exists()){
                idContains("us").findOne().click();
            }
        }
        sleep(2000);
    }

    // 签到
    if(textContains("签到").exists()){
        log("签到");
        textContains("签到").findOne().click()
    }

    // 进入活动界面，点击中间的“做任务领金币”控件，进入任务界面
    if(idContains("homeSceneBtn").exists() && !textContains("去完成").exists()){
        log("进入活动界面并且点击做任务按钮");
        idContains("homeSceneBtn").findOne().click();
        sleep(1500);
    }

    // 进入任务界面，判断已完成控件，如果存在则点击
    if(textContains("去完成").exists()){
        log("进入任务界面");
        textContains("去完成").find()[finishButtonNum].click();
        sleep(4000);
    }

    if(textContains("战队红包").exists() || descContains("战队红包").exists()){
        log("进入组队界面");
        if(descContains("返回").findOne().click()){
            finishButtonNum = finishButtonNum + 1;
        }
        sleep(2000);
    }
    
    if(textContains("恭喜完成").exists()){
        descContains("返回").findOne().click();
        log("浏览八秒完成返回");
        sleep(2000);
        continue;
    }

    if(idContains("g4").exists() && idContains("fd").exists() && !textContains("vk image").exists()){
        sleep(2000);
        back();
        log("back返回");
        sleep(2000);
    }


    // 进入浏览活动界面，不用等待直接返回
    if(textContains("玩一玩").exists() || descContains("领券中心").exists() || textContains("逛新品").exists()
    || textContains("东东萌宠").exists() || textContains("全民开").exists() || textContains("1元包邮").exists()
    || textContains("豆苗").exists() || textContains("购物返豆").exists() || textContains("互动好物").exists()
    || textContains("城市嘉年华").exists() || textContains("城市嘉年华").exists() || textContains("超级盒子免息驾到").exists()
    || textContains("大牌爆").exists() || descContains("大牌爆").exists() || textContains("京享值").exists() 
    || descContains("京享值").exists() || descContains("趋势报告").exists() || textContains("趋势报告").exists()
    || descContains("618省钱攻略").exists() || textContains("618省钱攻略").exists()
    || descContains("综艺狂欢趴").exists() || textContains("综艺狂欢趴").exists()){
        if(textContains("豆苗").exists() || textContains("趋势报告").exists() 
        || textContains("东东萌宠").exists() || textContains("逛新品").exists()
        || textContains("超级盒子免息驾到").exists() || textContains("大牌爆").exists() || descContains("大牌爆").exists()
        || textContains("京享值").exists() || descContains("京享值").exists()){
            back();
            log("back返回");
            sleep(2000);
        }else{
            descContains("返回").findOne().click();
            log("直接返回");
            sleep(2000);
        }
        continue;
    }

    if(idContains("arv").exists()){
        log("点击屏幕中的X");
        idContains("arv").findOne().click();
        sleep(2000);
    }

    if(textContains("忍痛离开").exists()){
        textContains("忍痛离开").findOne().click();
        sleep(2000);
    }

    // 进入浏览商品活动界面，浏览完毕后自动返回
    if(textContains("浏览以下5个商品").exists() && !textContains("去完成").exists()){
        log("进入浏览商品活动界面");
        var imges = idContains("view_").find();
        var i = 0;
        while(imges && !textContains("已完成").exists()){
            imges[i].click();
            sleep(3000);
            if(textContains("店铺").exists() || textContains("加入购物车").exists()){
                descContains("返回").findOne().click();
                log("完成店铺浏览，返回");
            }
            sleep(2000);
            i = i+1;
        }
        descContains("返回").findOne().click();
        log("浏览商品任务结束，返回");
        sleep(2000);
        
    }

    // 进入加购物车活动界面，完成后自动返回
    if(textContains("当前页").exists()){
        log("进入加购物车活动界面");
        var shopCart = idContains("cart_").find();
        var i = 0;
        while(shopCart && !textContains("已完成").exists()){
            shopCart[i].click();
            sleep(3000);
            i = i+1;
            log("添加购物车");
        }
        descContains("返回").findOne().click();
        log("任务完成，返回");
        sleep(2000);
    }

}
};

var tbAutoThread = function(){
// TB领猫币
    toast("TB领猫币");
    auto.waitFor();
    var appName = "手机淘宝";
    
    // 建立一个循环，不断的检测里面控件的存在并且做出对应操作
    while(true){
        // 打开淘宝APP
        launchApp(appName);
        
        // 判断是否有瓜分10亿
        if(className("android.widget.FrameLayout").depth(12).indexInParent(9).exists()){
            log("进入瓜分10亿界面");
            className("android.widget.FrameLayout").depth(12).indexInParent(9).findOne().click();
            sleep(1500);
        }   
        
        if(textContains("收下祝福").exists()){
            log("收下祝福");
            textContains("收下祝福").findOne().click();
        }
        // 签到
        if(textContains("签到").exists()){
            log("签到");
            textContains("签到").findOne().click()
        }
        // 进入活动界面，点击中间的“做任务领金币”控件，进入任务界面
        if(textContains("做任务").exists() && !textContains("去完成").exists() && !textContains("去浏览").exists()){
            log("进入活动界面并且点击做任务按钮");
            textContains("做任务").findOne().click();
            sleep(1500);
        }
    
        // 进入任务界面，判断已完成控件，如果存在则点击
        if(textContains("去完成").exists()){
            log("进入去完成任务界面");
            textContains("去完成").findOne().click();
            sleep(2000);
        }
        if(textContains("去浏览").exists()){
            log("去浏览");
            textContains("去浏览").findOne().click();
            sleep(2000);
        }
        
        // 参与列车活动
        if(textContains("去参与").exists()){
            log("参与列车活动");
            textContains("去参与").findOne().click();
            sleep(2000);
        }
    
        if(textContains("我的战报").exists()){
            textContains("返回").findOne().click();
        }
    
        if(textContains("去逛逛").exists()){
            log("去逛逛");
            if(textContains("去逛逛").find()[1]){
                textContains("去逛逛").find()[1].click();
            }else if(textContains("去逛逛").find()[0]){
                textContains("去逛逛").find()[0].click();
            }
            sleep(2000);
        }
        
        if(descContains("任务已完成").exists() || textContains("任务已完成").exists() || 
        textContains("继续逛逛吧").exists() || descContains("继续逛逛吧").exists() || descContains("任务完成").exists()
        ||descContains("返回看看").exists() || descContains("请返回重试").exists() || textContains("请返回重试").exists()){
            back();
            log("直接返回");
            continue;
        }
        sleep(3000);
    
    }
};

var jdGoldThread = function(){
// JD小金人
    toast("JD小金人");
    auto.waitFor();
    var appName = "京东";
    
    // 建立一个循环，不断的检测里面控件的存在并且做出对应操作
    while(true){
        // 打开京东APP
        launchApp(appName);
        // 睡眠3秒，等待程序加载
        sleep(3000);
        // 进入京东主界面，检查是否存在“我的”右下角，如果存在，点击进去，接着判断是否存在全民叠蛋糕活动，如果有则点击进入
        if(descContains("我的").exists()){
            log("进入我的界面");
            descContains("我的").findOne().click();
            sleep(2000);
            // 判断是否有全民叠蛋糕活动
            if(textContains("叠蛋糕分").exists()){
                log("进入叠蛋糕界面");
                if(idContains("ur").exists()){
                    idContains("ur").findOne().click();
                }else if(idContains("ur").exists()){
                    idContains("us").findOne().click();
                }
            }
            sleep(2000);
        }
        
        // 不断点击金小人
        while(idContains("goldElfin").exists() && !textContains("去完成").exists()){
            idContains("goldElfin").findOne().click();
        }
    }
};
