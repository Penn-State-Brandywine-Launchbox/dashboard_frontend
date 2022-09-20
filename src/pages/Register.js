import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { SparklesIcon, LightningBoltIcon } from '@heroicons/react/outline'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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


function firebaseRegister() {
    const auth = getAuth();

    if (document.getElementById("email").value != document.getElementById("email_confirmed"))
    createUserWithEmailAndPassword(auth, document.getElementById("email").value, document.getElementById("password").value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}



const Register = () => {

  document.title = "PSU Launchbox - Register "
  return (
    <div className="flex min-h-full bg-white" >
    <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            className="h-12 w-auto"
            src="https://invent.psu.edu/wp-content/uploads/2020/06/Brandywine-LaunchBox_Logo_3c_RGB.png"
            alt="PSU Launchbox"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <a href="../" className="font-medium text-orange-600 hover:text-orange-500">
              login to an existing account
            </a>
          </p>
        </div>

        <div className="mt-8">
   

          <div className="mt-6">
            <form action="#" method="POST" className="space-y-6">
            <div id="error" class="bg-red-600 text-white px-2 py-1 text-md rounded-md border border-red-500 shadow-lg">
                <h1 class="text-md">Something went wrong when trying to create your account.</h1>
            </div>
            
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

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
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
                    I've read the Terms of Service and Privacy Policy
                  </label>
                </div>

             
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="relative hidden w-0 flex-1 lg:block">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://www.brandywine.psu.edu/sites/brandywine/files/styles/photo_gallery_large/public/launchbox20crowd.jpg?itok=_kqJhBZ2"
        alt=""
      />
    </div>
  </div>




  )
}

  
export default Register;