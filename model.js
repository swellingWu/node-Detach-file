//- 导入模块
const fs = require('fs')
const path = require('path')

//- 定义匹配 <style> 和 <acript> 的正则表达式
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

//- 读取文件
fs.readFile(path.join(__dirname, './index.html'),'utf8',function(err,dataStr) {
    if(err) return console.error("读取文件失败 "+err.message)//! err=0 => true
    //=> 读取成功后拆解出 css,js,html 文件
    resolveCss(dataStr)
    resolveJs(dataStr)
    resolveHTML(dataStr)
})

//- 定义匹配 css
function resolveCss(htmlStr) {
    //? 使用正则提取内容
    const r1 = regStyle.exec(htmlStr);
    const newCss = r1[0].replace('<style>','').replace('</style>','');//=> r1[0] 拆分后的文件中 r1[0] => style
    //? 将提取的样式写入 css 文件
    fs.writeFile(path.join(__dirname, './index.css'),newCss,function(err) {
        if(err) return console.log("写入 css 文件失败 "+err.message)
        console.log("写入 css 样式文件成功");
    })
}

//- 定义匹配 js
function resolveJs(htmlStr) {
    //? 使用正则提取内容
    const r2 = regScript.exec(htmlStr);
    const newJs = r2[0].replace('<script>','').replace('</script>','');
    //? 将提取的样式写入 js 文件
    fs.writeFile(path.join(__dirname, './index.js'),newJs,function(err) {
        if(err) return console.log("写入 js 文件失败 "+err.message)
        console.log("写入 js 样式文件成功");
    })
}

//- 定义匹配 html
function resolveHTML(htmlStr) {
    //? 去除多余的标签替换引入
    const newHTML= htmlStr.replace(regStyle,'<link rel="stylesheet" href="./index.css">').replace(regScript,'<script src="./index.js"></script>')
    fs.writeFile(path.join(__dirname,'./home.html'),newHTML,function(err) {
        if(err) return console.log("写入 html 失败")
        console.log("写入 html 成功")
    })
}