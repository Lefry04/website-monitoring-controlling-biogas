import back1 from "../../assets/background/back1.svg";
import back2 from "../../assets/background/back2.svg";
import back3 from "../../assets/background/back3.svg";
import back4 from "../../assets/background/back4.svg";
import back5 from "../../assets/background/back5.svg";
import back6 from "../../assets/background/back6.svg";
import back7 from "../../assets/background/back7.svg";
import back8 from "../../assets/background/back8.svg";
import back9 from "../../assets/background/back9.svg";
import back10 from "../../assets/background/back10.svg";
import back11 from "../../assets/background/back11.svg";
import back12 from "../../assets/background/back12.svg";
import back13 from "../../assets/background/back13.svg";
import back14 from "../../assets/background/back14.svg";
import back15 from "../../assets/background/back15.svg";


const images = [
    back1, back2, back3, back4, back5,
    back6, back7, back8, back9, back10,
    back11, back12, back13, back14, back15
]

const Background = (props) => {

    const { children } = props;

    return (
        <div className="columns-5 gap-4 px-3 relative">
            {images.map((src, index) => (
                <div key={index} className="mb-1 break-inside-avoid">
                    <img src={src} className="w-full object-cover rounded-lg"/>
                </div>
            ))}
            {children}
        </div>
    )
}

export default Background;