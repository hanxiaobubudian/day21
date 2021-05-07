import css from "./css/index.less"
import logo1 from './images/1.jpg'

if (module.hot) {
    // 通知webpack该模块接收hmr
    module.hot.accept(err => {
        if (err) {
            console.error('cannot apply hmr update', err)
        }
    })
}

const img = new Image();
img.src = logo1;
img.classList.add('logo');

const root = document.getElementById('root');
root.append(img)
console.log(999)