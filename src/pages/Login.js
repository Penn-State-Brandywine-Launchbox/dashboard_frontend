import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { SparklesIcon, LightningBoltIcon } from '@heroicons/react/outline'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDg5A-ZTsoFMiSPXs9YnPlH4svF72yAoss",
    authDomain: "psulaunchbox.firebaseapp.com",
    projectId: "psulaunchbox",
    storageBucket: "psulaunchbox.appspot.com",
    messagingSenderId: "313509793012",
    appId: "1:313509793012:web:a407e0d847c84746cd22a1",
    measurementId: "G-ZFVR1T4SB0"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function firebaseLogin() {
    document.getElementById("submitButton").innerHTML = `<i class="fa-solid fa-spinner fa-spin text-sm fa-fw"></i>&nbsp; Signing you in...`
    signInWithEmailAndPassword(auth, document.getElementById("email").value, document.getElementById("password").value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.href = "../dashboard"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        document.getElementById("error").classList.remove("hidden");
        document.getElementById("error").innerText = errorMessage;
        document.getElementById("submitButton").innerHTML = "Sign in";
      });
    
}


const Home = () => {

  document.title = "Utility Works - Login" 
  return (
    <div className="flex min-h-full bg-white" >
    <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            className="h-20 text-center mx-auto w-auto"
            src="../Logo.png"
            alt="PSU Brandywine Launchbox"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <a href="../register" className="font-medium text-orange-600 hover:text-orange-500">
              create an account
            </a>
          </p>
        </div>

        <div className="mt-8">
   
        <div id="error" class="hidden bg-red-600 text-white px-2 py-1 text-md rounded-md border border-red-500 shadow-lg">
                <h1 class="text-md">Something went wrong when trying to create your account.</h1>
            </div>

          <div className="mt-6">

        

            <div  className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  id="submitButton"
                  onClick={firebaseLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative hidden w-0 flex-1 lg:block">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://pbs.twimg.com/media/FOJz3jlWQAIJUCq.jpg:large"
        alt=""
      />
    </div>
  </div>




  )
}

  
export default Home;