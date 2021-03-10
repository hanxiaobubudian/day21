class Vdom {
    constructor(option) {
        this.type = option.type;
        this.props = option.props || {};
        this.children = option.children;
        // this.key = option.key;
    }
    render() {
        // 渲染时就创建真实dom
        let el = document.createElement(this.type);
        for(let key in this.props) {
            el.setAttribute(key, this.props[key])
        }
        if (Array.isArray(this.children)) {
            this.children.forEach((item, index) => {
                el.appendChild(item.render());
            })
        } else {
            el.innerText = this.children;
        }
        return el;
    }
}

let vdom = new Vdom({
    type: "div",
    props: {
        style: "",
        class: "banner",
    },
    children: [
        new Vdom({
            type: "p",
            children: "这是第一个p",
        }),
        new Vdom({
            type: "p",
            children: "这是第2个p",
        }),
        new Vdom({
            type: "span",
            children: "这是第一个p",
            props: {
                'style': {
                    'width': '100px'
                }
            }
        }),
    ],
});
console.log(vdom);
