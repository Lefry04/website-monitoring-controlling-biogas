import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // icon mata

const Form = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const { loginWithGoogle } = useAuth();

  const handleGoogle = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("Login Google:", user);
      navigate("/dashboard");
    } catch (err) {
      setError("Login Google dibatalkan atau gagal");
    }
  };

  const [error, setError] = useState("");

  // state untuk toggle visibility password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm = event.target.confirm.value;

    if (password !== confirm) {
      return setError("Konfirmasi kata sandi tidak sama");
    }

    try {
      await register(email, password);
      navigate("/daftar/verifikasi");
    } catch (err) {
      setError("Gagal mendaftar: Email invalid atau sudah terdaftar");
    }
  };

  return (
    <div className="bg-black/50 lg:w-2/5 w-9/10 h-fit rounded-2xl p-15 text-start flex flex-col gap-8">
      <h1 className="font-medium text-[28px]">
        Siap mengelola energi cerdas? <br />Daftar sekarang!
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleRegister}>
        <Input
          type="email"
          label="Email"
          placeholder="Masukkan email anda"
          name="email"
          className="border border-white lg:text-lg text-sm text-white"
          ukuran="mb-7"
        />

        <div className="relative mb-7">
          <Input
            type={showPassword ? "text" : "password"}
            label="Kata Sandi"
            placeholder="Masukkan kata sandi anda"
            name="password"
            className="border border-white lg:text-lg text-sm text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 h-8 text-xl right-3 text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative mb-7">
          <Input
            type={showConfirm ? "text" : "password"}
            label="Konfirmasi Kata Sandi"
            placeholder="Konfirmasi kata sandi anda"
            name="confirm"
            className="border border-white lg:text-lg text-sm text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-1/2 h-8 text-xl right-3 text-white"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <Button classname="w-full col-login-button py-4 rounded-2xl" type="submit">
          Daftar
        </Button>
      </form>

      <Button
        type="button"
        onClick={handleGoogle}
        classname="w-full bg-white text-black py-4 rounded-2xl"
      >
        Masuk dengan Google
      </Button>

      <p className="w-full text-end text-white font-light">
        Sudah memiliki akun?{" "}
        <span className="underline cursor-pointer font-bold">
          <Link to="/login">Masuk</Link>
        </span>
      </p>
    </div>
  );
};

export default Form;
