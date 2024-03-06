import { useState, FormEvent } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../stores";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, remember } =
      event.target as typeof event.target & {
        email: { value: string };
        password: { value: string };
        remember: { checked: boolean };
      };
    console.log(email.value, password.value, remember.checked);

    try {
      await loginUser(email.value, password.value);
      navigate("/dashboard");
    } catch (error) {
      console.log("no se puedo autenticar");
    }
  };

  return (
    <div className="flex-1">
      <div className="text-center">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-40 sm:h-52" src={logo} alt="" />
        </div>

        <p className="mt-3 text-gray-500 dark:text-gray-300">
          Bienvenido, Inicia sesión para continuar
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={onSubmit}>
          <a
            href="#"
            className="flex items-center justify-center bg-white dark:bg-slate-800 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Iniciar Sesión con Google
            </span>
          </a>

          <div className="flex items-center justify-between my-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              o inicia sesión con tu correo electrónico
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ejemplo@empresa.com"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Contraseña
              </label>
              <a
                href="#"
                className="text-xs text-gray-600 hover:underline dark:text-gray-400"
              >
                Olvidaste tu Contraseña?
              </a>
            </div>

            <div className="relative flex items-center mt-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 focus:outline-none rtl:left-0 rtl:right-auto text-gray-500"
              >
                {showPassword ? <LuEyeOff size={24} /> : <LuEye size={24} />}
              </button>

              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="********"
                name="password"
                className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="my-4 flex items-center">
              <input
                type="checkbox"
                name="remember"
                className="text-blue-500"
              />
              <label className="text-gray-600 ml-2">Recuerdame</label>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Ingresar
            </button>
          </div>
        </form>

        {/* <p className="mt-6 text-sm text-center text-gray-400">
          Don&#x27;t have an account yet?{" "}
          <a
            href="#"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign up
          </a>
          .
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
