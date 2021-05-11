;(function () {
  // 声明构造函数
  function Render(option) {
    var Ro = option || ''
    this.dataArr = Ro.arg
    this.table = document.getElementById(Ro.id)
    this.tbody = this.table.children[0]
    this.page = 0
    this.pageSize = 10
    this.dataNum = Math.ceil(Ro.arg.length / 10)
    this.num = 1
    // 通过表格元素寻找下一个兄弟元素
    this.btnBox = this.table.parentNode.getElementsByClassName('btn')[0]
    this.ulBox = this.btnBox.getElementsByTagName('ul')[0]
    // 存储上下页点击元素
    this.firLi = this.ulBox.firstElementChild
    this.lastLi = this.ulBox.lastElementChild
    // 默认调用的方法
    this.init()
    this.setIdctor()
    this.setMethod()
  }
  // 初始化渲染数据
  Render.prototype.init = function () {
    // 渲染数据前，先
    removeOldData(this.table)
    // 真正的渲染数据\
    if (this.pageSize > this.dataArr.length) this.pageSize = this.dataArr.length
    for (var i = this.page; i < this.pageSize; i++) {
      var tr = document.createElement('tr')
      for (var j = 0; j < 5; j++) {
        var td = document.createElement('td')
        var data = this.dataArr[i][j]
        // 判断当前的内容是什么
        switch (data) {
          case 1:
            data = '双标签'
            break
          case 2:
            data = '单标签'
            break
          case 3:
            data = '标签属性'
            break
          case 4:
            data = '值'
            break
          case 5:
            data = '属性/值'
            break
          case 6:
            data = '方法'
            break
          case 7:
            data = '样式属性'
            break
          case 8:
            data = '样式值'
            break
          case 9:
            data = '其他'
            break
        }
        // 如果当前没有数据，则显示短横线
        td.innerText = data ? data : '-'
        tr.appendChild(td)
      }
      this.tbody.appendChild(tr)
    }
  }
  // 在每次生成新的数据之前删除旧的数据
  function removeOldData(tab) {
    var trs = tab.getElementsByTagName('tr')
    for (var i = trs.length - 1; i >= 1; i--) {
      tab.children[0].removeChild(trs[i])
    }
  }
  // 动态生成页码和高亮
  Render.prototype.setIdctor = function () {
    // var btn = document.querySelectorAll('.btn');
    // if (this.pageSize != this.dataArr.length) {
    //   for (var i = 0; i < btn.length; i++) {
    //     btn[i].style.display = 'block'
    //   }
      for (var i = 0; i < this.dataNum; i++) {
        var li = document.createElement('li')
        i == 0 ? (li.className = 'cur') : li
        li.innerText = i + 1
        this.ulBox.insertBefore(li, this.ulBox.children[this.ulBox.children.length - 1])
      // }
    }
  }
  // 注册上下页的点击事件
  Render.prototype.setMethod = function () {
    // 点击上一页
    this.firLi.onclick = function () {
      if (this.num <= 2) {
        this.num = 1
        this.page = 0
        this.pageSize = 10
        changeClass(this, this.num)
        this.firLi.className = 'gray'
        this.init()
        return
      }
      this.num--
      this.page -= 10
      this.pageSize = this.num * 10
      this.init()
      changeClass(this, this.num)
    }.bind(this)
    // 点击下一页
    this.lastLi.onclick = function () {
      if (this.num >= this.dataNum - 1) {
        this.num = this.dataNum
        this.page = (this.dataNum - 1) * 10
        this.pageSize = this.dataArr.length
        changeClass(this, this.num)
        this.lastLi.className = 'gray'
        this.init()
        return
      }
      this.num++
      this.page += 10
      this.pageSize = this.num * 10
      this.init()
      changeClass(this, this.num)
    }.bind(this)
  }
  // 切换页码的高亮封装
  function changeClass(ro, liNum) {
    ro.firLi.removeAttribute('class')
    ro.lastLi.removeAttribute('class')
    for (var i = 1; i < ro.btnBox.children[0].children.length - 1; i++) {
      ro.btnBox.children[0].children[i].removeAttribute('class')
    }
    ro.btnBox.children[0].children[liNum].className = 'cur'
  }
  window.Render = Render
})()
