import BoxSec from "../Fragments/BoxSec";
import { useState } from "react";
import profil from "../../assets/profil.svg";

const Profil = () => {

    const [email, setEmail] = useState("JonathanRichardo@gmail.com");
    const [password, setPassword] = useState("********");
    const [role, setRole] = useState("Admin");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Perubahan disimpan!");
    };

    return (
        <BoxSec>
            <div className="bg-white rounded-2xl p-8 w-full h-full border border-gray-200">
                {/* Header */}
                <h1 className="text-lg font-bold mb-15">Profil Pengguna</h1>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={profil}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mb-3 object-cover"
                    />
                    <h2 className="text-lg font-semibold text-gray-800">Jonathan Richardo</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-800">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-15 rounded-xl box px-4 py-2 outline-none text-gray-700"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium mb-1 text-gray-800">Kata Sandi</label>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-15 rounded-xl box px-4 py-2 outline-none text-gray-700"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-800">Peran</label>
                        <input
                            type="text"
                            value={role}
                            readOnly
                            className="w-full h-15 rounded-xl box px-4 py-2 outline-none text-gray-700"
                        />
                    </div>

                    {/* Tombol Simpan */}
                    <button
                        type="submit"
                        className="w-full h-15 bg-[#37451e] text-white font-medium py-2.5 rounded-xl mt-4 hover:bg-[#2e3a17] transition"
                    >
                        Simpan Perubahan
                    </button>
                </form>
            </div>
        </BoxSec>
    )
}

export default Profil;