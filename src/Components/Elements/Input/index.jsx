import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    const { type, label, placeholder, name, className, ukuran } = props;
    return (
        <div className={ukuran}>
            {
                label ? (
                    <div className="w-full h-full">
                        <label htmlFor={name} className="block mb-1 font-light">{label}</label>
                        <input type={type} placeholder={placeholder} className={`w-full rounded-2xl h-full py-4 px-6 ${className}`} name={name} ref={ref} />
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <input type={type} placeholder={placeholder} className={`rounded-2xl py-4 px-6 w-full h-full ${className}`} name={name} ref={ref} />
                    </div>

                )
            }
        </div>
    )
})

export default Input;