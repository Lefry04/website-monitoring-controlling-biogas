import Input from "../Elements/Input";
import Button from "../Elements/Button";

const Form = () => {
    return (
        <form>
            <Input type="text" label="Nama" placeholder="Masukkan nama lengkap" name="name" />
            <Input type="text" label="Email" placeholder="Masukkan email" name="email" />
            <Input type="password" label="Buat Kata Sandi" placeholder="Masukkan kata sandi" name="password" />
            <Input type="password" label="Konfirmasi kata sandi" placeholder="Konfirmasi lagi kata sandi" name="password" />
            <Button classname="w-full bg-amber-700 cursor-pointer">Daftar</Button>
        </form>
    )
}

export default Form;