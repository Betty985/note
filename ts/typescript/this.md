this的值在函数被调用时才会指定。顶级的非方法式调用会将this视为window，在严格模式下，this为undefined。
# this和箭头函数
箭头函数能保存函数创建时的this值，而不是调用时的值。
# this参数
指定实例类型。TypeScript知道对象的方法期望在某个对象上调用。 也就是说this是该对象的类型的。
# 回调函数里的this
当回调函数被调用时，它会被当成一个普通函数调用，this将为undefined。
this: void意味着函数不需要一个this类型。
指定this类型为void又想使用this，可以用箭头函数。箭头函数不会捕获this，可以把它们传给期望this：void的函数。
